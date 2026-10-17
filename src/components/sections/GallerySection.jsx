import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { siteConfig } from '../../config/siteConfig';
import SectionHeader from '../SectionHeader';
import SectionShell from './SectionShell';
import { ease } from '../../lib/motion';
import { resolveMediaUrl } from '../../lib/mediaUrl';

/** Work gallery — wired to api.gallery_items via HomePage props */
export default function GallerySection({ items = [] }) {
  const reduced = useReducedMotion();
  const home = siteConfig.content.home;
  const display = items.filter((item) => item.published !== false);
  if (!display.length) return null;

  return (
    <SectionShell variant="default" tight>
      <SectionHeader
        badge={home.galleryBadge}
        title={home.galleryTitle}
        highlight={home.galleryHighlight}
        description={home.gallerySubtitle}
        centered
        centerOnMobile
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {display.map((item, i) => {
          const src = resolveMediaUrl(item.image_url || item.image);
          return (
            <motion.div
              key={item.id || i}
              initial={reduced ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4, ease: ease.editorial }}
              className={`gallery-tile card-premium ${i === 0 ? 'col-span-2 lg:col-span-2 aspect-[16/10] lg:aspect-[2/1]' : ''}`}
            >
              {src ? (
                <img src={src} alt={item.title || ''} loading="lazy" />
              ) : (
                <div className="w-full h-full bg-surface-alt grid place-items-center text-muted text-sm">No image</div>
              )}
              <div className="gallery-tile-overlay">
                {item.category && <span className="label-meta text-cream/80 mb-1">{item.category}</span>}
                <span className="font-display text-lg leading-snug">{item.title}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </SectionShell>
  );
}
