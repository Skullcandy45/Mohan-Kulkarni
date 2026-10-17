import React, { useState, useEffect, useId, useRef, forwardRef, useImperativeHandle } from 'react';
import { api } from '../lib/api';
import ErrorMessage from './ErrorMessage';
import { resolveMediaUrl } from '../lib/mediaUrl';
import { Upload, X, Loader2 } from 'lucide-react';

const FileUpload = forwardRef(function FileUpload(
  {
    value = '',
    onUploadSuccess,
    onUploadError,
    onUploadingChange,
    accept = 'image/*',
    /** 'dropzone' (default) | 'button' | 'none' (hidden input only; use ref.open()) */
    variant = 'dropzone',
    buttonLabel = 'Add image',
    showStorage = true,
    /** When true, parent renders previews (e.g. GalleryUrlsEditor grid) */
    hidePreview = false,
  },
  ref,
) {
  const inputId = useId();
  const fileInputRef = useRef(null);
  const previewObjectUrl = useRef(null);

  useImperativeHandle(ref, () => ({
    open: () => fileInputRef.current?.click(),
  }));
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [storageInfo, setStorageInfo] = useState(null);
  const [lastUploadedUrl, setLastUploadedUrl] = useState(null);

  const valueTrim = typeof value === 'string' ? value.trim() : '';
  const remoteRaw = valueTrim || lastUploadedUrl || '';
  const remoteSrc = remoteRaw ? resolveMediaUrl(remoteRaw) : '';
  const displaySrc = preview || remoteSrc;

  useEffect(() => {
    if (valueTrim && lastUploadedUrl && valueTrim === lastUploadedUrl.trim()) {
      setLastUploadedUrl(null);
    }
  }, [valueTrim, lastUploadedUrl]);

  useEffect(() => {
    onUploadingChange?.(uploading);
  }, [uploading, onUploadingChange]);

  useEffect(() => {
    loadStorageInfo();
    return () => {
      if (previewObjectUrl.current) {
        URL.revokeObjectURL(previewObjectUrl.current);
        previewObjectUrl.current = null;
      }
    };
  }, []);

  const revokePreviewUrl = () => {
    if (previewObjectUrl.current) {
      URL.revokeObjectURL(previewObjectUrl.current);
      previewObjectUrl.current = null;
    }
  };

  const loadStorageInfo = async () => {
    try {
      const response = await api.getStorageInfo();
      if (response.success && response.data?.storage) {
        const storage = response.data.storage;
        const available = Math.max(0, storage.limit - storage.used);
        setStorageInfo({
          used: storage.used || 0,
          limit: storage.limit || 0,
          available,
        });
      }
    } catch (err) {
      console.error('Failed to load storage info:', err);
    }
  };

  const runUpload = async (selectedFile) => {
    try {
      setUploading(true);
      setError(null);
      const response = await api.uploadFile(selectedFile);
      if (response.success) {
        const url =
          response.data?.file?.url ||
          response.data?.url ||
          response.data?.file_url ||
          null;
        if (!url) throw new Error('Upload succeeded but URL was not returned');
        setLastUploadedUrl(url);
        onUploadSuccess?.(url);
        revokePreviewUrl();
        setPreview(null);
        await loadStorageInfo();
      } else {
        const errorMsg = response.error?.message || response.message || 'Upload failed';
        setError(errorMsg);
        onUploadError?.(errorMsg);
      }
    } catch (err) {
      let errorMsg = 'Upload failed';
      if (err.response?.data?.error?.message) {
        errorMsg = err.response.data.error.message;
      } else if (err.response?.data?.message) {
        errorMsg = err.response.data.message;
      } else if (err.message) {
        errorMsg = err.message;
      }
      setError(errorMsg);
      onUploadError?.(errorMsg);
    } finally {
      setUploading(false);
    }
  };

  const handleFileSelect = async (e) => {
    const selectedFile = e.target.files[0];
    e.target.value = '';
    if (!selectedFile) return;

    setError(null);
    revokePreviewUrl();

    if (selectedFile.type.startsWith('image/')) {
      const url = URL.createObjectURL(selectedFile);
      previewObjectUrl.current = url;
      setPreview(url);
    } else {
      setPreview(null);
    }

    const maxSize = 5 * 1024 * 1024;
    if (selectedFile.size > maxSize) {
      setError('File size exceeds 5MB limit');
      revokePreviewUrl();
      setPreview(null);
      return;
    }

    if (storageInfo && selectedFile.size > storageInfo.available) {
      const fileSizeMB = (selectedFile.size / 1024 / 1024).toFixed(2);
      const availableMB = (storageInfo.available / 1024 / 1024).toFixed(2);
      setError(
        `Storage limit exceeded! File size (${fileSizeMB} MB) exceeds available storage (${availableMB} MB).`
      );
      revokePreviewUrl();
      setPreview(null);
      return;
    }

    await runUpload(selectedFile);
  };

  const formatMB = (bytes) => (bytes / 1024 / 1024).toFixed(2);

  const clearStaging = () => {
    if (uploading) return;
    revokePreviewUrl();
    setPreview(null);
  };

  const isButton = variant === 'button';
  const isHidden = variant === 'none';

  if (isHidden) {
    return (
      <>
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileSelect}
          disabled={uploading}
          className="hidden"
          id={inputId}
        />
        {error && <ErrorMessage message={error} />}
      </>
    );
  }

  return (
    <div className={isButton ? 'space-y-2' : 'space-y-3'}>
      {showStorage && storageInfo && (
        <div className="text-sm font-medium text-gray-700 bg-blue-50 border border-blue-200 rounded-lg px-4 py-2">
          Storage:{' '}
          <span className="font-bold">{formatMB(storageInfo.used)}</span> /{' '}
          <span className="font-bold">{formatMB(storageInfo.limit)} MB</span> used
          {storageInfo.available < 1024 * 1024 && (
            <span className="ml-2 text-red-600 font-semibold">Low storage!</span>
          )}
        </div>
      )}

      {!hidePreview && displaySrc && (
        <div className="relative inline-block">
          <img
            src={displaySrc}
            alt="Upload preview"
            className="max-w-xs max-h-32 rounded-lg border border-slate-200 object-cover shadow-sm"
          />
          {uploading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center rounded-lg bg-white/80 backdrop-blur-[1px]">
              <Loader2 className="h-6 w-6 animate-spin text-orange-500" aria-hidden />
              <span className="mt-1 text-xs font-medium text-slate-700">Uploading…</span>
            </div>
          )}
          {preview && !uploading && (
            <button
              type="button"
              onClick={clearStaging}
              className="absolute top-2 right-2 bg-white p-1 rounded-full shadow hover:bg-gray-100"
              aria-label="Clear preview"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        disabled={uploading}
        className="hidden"
        id={inputId}
      />

      {isButton ? (
        <label
          htmlFor={inputId}
          className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 active:scale-[0.97] ${
            uploading
              ? 'bg-[#EBF4FF]/70 text-[#3B82F6] cursor-wait'
              : 'bg-[#EBF4FF] text-[#3B82F6] hover:bg-[#DBEAFE] cursor-pointer'
          }`}
        >
          {uploading ? (
            <Loader2 className="w-4 h-4 animate-spin shrink-0" aria-hidden />
          ) : (
            <Upload className="w-4 h-4 shrink-0" aria-hidden />
          )}
          {uploading ? 'Uploading…' : buttonLabel}
        </label>
      ) : (
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            uploading
              ? 'border-orange-300 bg-orange-50/50 cursor-wait'
              : 'border-gray-300 hover:border-orange-400 cursor-pointer'
          }`}
        >
          <label
            htmlFor={inputId}
            className={uploading ? 'cursor-wait opacity-80' : 'cursor-pointer block'}
          >
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center">
              {uploading ? (
                <Loader2 className="w-10 h-10 text-orange-500 animate-spin" aria-hidden />
              ) : (
                <Upload className="w-10 h-10 text-gray-400" aria-hidden />
              )}
            </div>
            <p className="text-sm text-gray-600 mb-1">
              {uploading ? 'Uploading…' : 'Click to choose an image — uploads automatically'}
            </p>
            <p className="text-xs text-gray-500">Max file size: 5MB</p>
          </label>
        </div>
      )}

      {error && <ErrorMessage message={error} />}
    </div>
  );
});

export default FileUpload;
