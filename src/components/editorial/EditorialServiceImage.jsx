import React from 'react';

export const FLIP_CARD_IMAGE_SIZES = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';

export default function EditorialServiceImage({
  src,
  alt = '',
  sizes = FLIP_CARD_IMAGE_SIZES,
  pictureClassName = '',
  className = '',
}) {
  return (
    <div className={`overflow-hidden ${pictureClassName}`}>
      <img
        src={src}
        alt={alt}
        sizes={sizes}
        className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${className}`}
        loading="lazy"
      />
    </div>
  );
}
