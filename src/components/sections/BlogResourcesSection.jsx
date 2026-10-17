import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';
import {
  HomeScrollStagger,
  HomeScrollStaggerItem,
} from '../motion/HomeScrollReveal';
import TypeInBold from '../motion/TypeInBold';

export default function BlogResourcesSection() {
  const posts = siteConfig.content.home.dentora?.blogPosts || [];

  if (!posts.length) return null;

  return (
    <section className="section bg-white border-t border-line-fine">
      <div className="shell">
        <div className="flex items-end justify-between gap-4 mb-8 sm:mb-10">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink">
            <TypeInBold text="Dental care insights" charMs={24} />
          </h2>
          <Link to="/services" className="text-sm font-semibold text-primary inline-flex items-center gap-1 group">
            View all <ArrowUpRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <HomeScrollStagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {posts.map((post) => (
            <HomeScrollStaggerItem key={post.title}>
              <article className="group rounded-[28px] overflow-hidden border border-line-fine bg-[#F8FAFC] hover:shadow-lg transition-shadow duration-300 h-full">
                <div className="aspect-[16/10] overflow-hidden image-frame">
                  <img
                    src={post.image}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5 sm:p-6">
                  <div className="flex items-center gap-2 text-xs text-muted font-mono uppercase tracking-wide">
                    <span className="chip-emerald normal-case tracking-normal text-[11px]">{post.category}</span>
                    <span>{post.date}</span>
                  </div>
                  <h3 className="mt-3 font-display font-semibold text-lg text-ink leading-snug">{post.title}</h3>
                  <Link
                    to={post.link || '/services'}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary group/link"
                  >
                    Learn More
                    <ArrowUpRight size={14} className="group-hover/link:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </article>
            </HomeScrollStaggerItem>
          ))}
        </HomeScrollStagger>
      </div>
    </section>
  );
}
