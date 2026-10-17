import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../config/siteConfig';
import { getMemberImageUrl } from '../lib/memberImage';
import { useMotionSafe } from '../lib/motion';

/**
 * Team member card — photo on top, readable text footer with bio (matches service_1 DoctorCard).
 */
export default function TeamMemberCard({ member, index = 0, variant = 'grid' }) {
  const reduced = useMotionSafe();
  const bookLabel = siteConfig.content?.common?.ctaButton || 'Book a call';
  const [imgSrc, setImgSrc] = useState(() => getMemberImageUrl(member));
  const role = member.role || member.specialty || 'Team member';
  const isHome = variant === 'home' || variant === 'editorial';

  const onImgError = () => {
    setImgSrc(getMemberImageUrl({ ...member, image: '', image_url: '' }));
  };

  return (
    <motion.article
      initial={reduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      whileHover={
        isHome && !reduced
          ? { y: -6, transition: { type: 'spring', stiffness: 400, damping: 28 } }
          : undefined
      }
      className={[
        'group overflow-hidden rounded-3xl bg-white border border-line flex flex-col h-full',
        isHome ? 'card-elevated shadow-elegant' : 'shadow-elegant',
      ].join(' ')}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-bg-subtle shrink-0">
        <img
          src={imgSrc}
          alt={member.name}
          onError={onImgError}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          loading="lazy"
        />
        {member.experience ? (
          <div className="absolute top-4 right-4">
            <span className="chip-ink text-[10px] tracking-widest normal-case font-semibold">
              {member.experience}
            </span>
          </div>
        ) : null}
      </div>

      <div className="flex flex-col flex-1 p-5 sm:p-6">
        <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-muted mb-1">
          {role}
        </p>
        <h3 className="font-display font-medium text-xl sm:text-2xl text-ink leading-tight tracking-tight">
          {member.name}
        </h3>
        {member.bio ? (
          <p className="text-sm text-muted leading-relaxed mt-2 line-clamp-3">
            {member.bio}
          </p>
        ) : null}

        <Link
          to="/appointment"
          className="mt-4 inline-flex items-center gap-1.5 self-start text-[13px] font-semibold text-primary hover:text-primary-dark transition-colors"
        >
          <Calendar size={14} aria-hidden />
          {bookLabel}
          <ArrowUpRight size={14} aria-hidden />
        </Link>
      </div>
    </motion.article>
  );
}
