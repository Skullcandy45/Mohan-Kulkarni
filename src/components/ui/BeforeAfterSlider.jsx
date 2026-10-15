import React, { useState, useRef } from 'react';
import { ChevronsLeftRight, Sparkles } from 'lucide-react';

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = 'Before Treatment',
  afterLabel = 'After Smile Design',
  title = '',
  className = '',
}) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef(null);
  const isDragging = useRef(false);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  const handleStart = () => {
    isDragging.current = true;
  };

  const handleEnd = () => {
    isDragging.current = false;
  };

  return (
    <div className={`relative overflow-hidden rounded-3xl select-none group shadow-glass border border-dent-500/15 ${className}`}>
      <div
        ref={containerRef}
        onMouseDown={handleStart}
        onMouseUp={handleEnd}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleEnd}
        onTouchStart={handleStart}
        onTouchEnd={handleEnd}
        onTouchMove={handleTouchMove}
        className="relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden cursor-ew-resize bg-dent-950"
      >
        {/* "After" Image (Underneath) */}
        <img
          src={afterImage}
          alt={afterLabel}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 z-10 bg-dent-950/80 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-semibold text-emerald-300 border border-emerald-500/30 flex items-center gap-1 shadow-sm">
          <Sparkles size={11} /> {afterLabel}
        </div>

        {/* "Before" Image (Clipped Layer on Top) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={beforeImage}
            alt={beforeLabel}
            className="absolute inset-0 w-full h-full object-cover max-w-none"
            style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}
          />
          <div className="absolute top-4 left-4 z-10 bg-dent-950/80 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-semibold text-gray-300 border border-white/20 shadow-sm">
            {beforeLabel}
          </div>
        </div>

        {/* Draggable Divider Line & Knob */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)] z-20 pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white text-dent-900 shadow-2xl flex items-center justify-center border-2 border-dent-600 transition-transform group-hover:scale-110">
            <ChevronsLeftRight size={16} className="text-dent-600" />
          </div>
        </div>

        {/* Hover Cue */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none bg-dent-950/70 backdrop-blur-md text-white text-[11px] px-3 py-1 rounded-full border border-white/10 opacity-70 group-hover:opacity-100 transition-opacity">
          Drag horizontally to compare
        </div>
      </div>

      {title && (
        <div className="p-4 bg-white border-t border-dent-100 flex items-center justify-between">
          <span className="text-sm font-bold text-dent-950">{title}</span>
          <span className="text-xs text-dent-600 font-medium">100% Verified Case</span>
        </div>
      )}
    </div>
  );
}
