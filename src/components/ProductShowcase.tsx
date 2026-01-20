"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ProductShowcase() {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top center",
                    end: "bottom bottom",
                    scrub: 1,
                },
            });

            // Line animation
            tl.fromTo(lineRef.current,
                { scaleX: 0, opacity: 0 },
                { scaleX: 1, opacity: 1, duration: 1, ease: "power2.out" }
            );

            // Title Reveal
            tl.from(titleRef.current, {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power2.out",
            }, "-=0.5");

            // Image Parallax Reveal
            tl.from(imageRef.current, {
                y: 100,
                opacity: 0,
                scale: 0.9,
                duration: 1.5,
                ease: "power2.out",
            }, "-=0.8");

            // Subtitle
            tl.from(subtitleRef.current, {
                y: 30,
                opacity: 0,
                duration: 1,
                ease: "power2.out",
            }, "-=1");

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="py-32 md:py-48 px-6 min-h-screen flex flex-col items-center justify-center relative">
            <div className="max-w-6xl w-full text-center">
                {/* Accent Line */}
                <div ref={lineRef} className="w-24 h-[1px] bg-accent-gold mx-auto mb-12 origin-center"></div>

                {/* Product Name */}
                <h2 ref={titleRef} className="text-4xl sm:text-6xl md:text-8xl font-sans font-bold text-off-white mb-8 tracking-tight">
                    Inaya
                </h2>

                {/* Subtitle / Description */}
                <p ref={subtitleRef} className="text-lg sm:text-xl md:text-3xl font-body text-gray-400 font-light max-w-4xl mx-auto leading-relaxed mb-16 md:mb-24 px-4">
                    India’s First <span className="text-accent-gold">Digital Infrastructure</span> for Educational Purposes.
                </p>

                {/* Large Cinematic Image Placeholder */}
                {/* Large Cinematic Image Placeholder */}
                <div ref={imageRef} className="relative w-full aspect-video md:aspect-[21/9] bg-soft-graphite rounded-sm overflow-hidden border border-white/5 shadow-2xl shadow-black/50 group">
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-charcoal via-transparent to-transparent opacity-60 z-10 pointer-events-none"></div>

                    <Image
                        src="/images/projects/inaya-school/showcase.jpg"
                        alt="Inaya Digital Infrastructure Showcase"
                        fill
                        className="object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700"
                        onError={(e) => {
                            // Fallback to the CSS mock UI if image is missing
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const fallback = document.getElementById('inaya-fallback-ui');
                            if (fallback) fallback.style.display = 'flex';
                        }}
                    />

                    {/* Fallback Mock UI (Hidden by default if image loads) */}
                    <div id="inaya-fallback-ui" className="absolute inset-0 flex items-center justify-center p-8 active-fallback" style={{ display: 'none' }}>
                        <div className="w-[80%] h-[80%] border border-white/10 rounded-lg flex flex-col p-8 backdrop-blur-sm bg-white/5">
                            <div className="w-32 h-8 bg-white/10 rounded mb-8"></div>
                            <div className="flex gap-4 mb-4">
                                <div className="w-1/3 h-48 bg-accent-gold/10 rounded border border-accent-gold/20"></div>
                                <div className="w-1/3 h-48 bg-white/5 rounded"></div>
                                <div className="w-1/3 h-48 bg-white/5 rounded"></div>
                            </div>
                            <div className="w-full h-2 bg-white/10 rounded mt-auto"></div>
                        </div>
                    </div>

                    {/* Hover interaction */}
                    <div className="absolute inset-0 bg-accent-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-20"></div>
                </div>
            </div>
        </section>
    );
}
