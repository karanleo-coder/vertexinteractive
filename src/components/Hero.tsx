"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const sloganRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Intro Animation
            gsap.from(textRef.current, {
                y: 100,
                opacity: 0,
                duration: 2,
                ease: "power4.out",
                delay: 0.5,
            });

            gsap.from(sloganRef.current, {
                y: 50,
                opacity: 0,
                duration: 2,
                ease: "power4.out",
                delay: 1,
            });

            // Parallax Effect on Scroll
            gsap.to(textRef.current, {
                y: -100,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                },
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-black"
        >
            <div className="relative z-10 text-center px-6">
                <h1
                    ref={textRef}
                    className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-sans font-bold tracking-tight leading-none text-off-white mb-6 p-4"
                >
                    VERTEX
                    <span className="block text-2xl md:text-4xl font-light tracking-[0.2em] text-accent-gold mt-2 opacity-80">
                        INTERACTIVE
                    </span>
                </h1>

                <p
                    ref={sloganRef}
                    className="text-lg md:text-2xl font-body font-light text-gray-400 max-w-2xl mx-auto leading-relaxed"
                >
                    Bringing huge changes from small, thoughtful steps.
                </p>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
                <span className="text-xs uppercase tracking-widest text-accent-gold">Scroll</span>
                <div className="w-[1px] h-16 bg-gradient-to-b from-accent-gold to-transparent"></div>
            </div>
        </section>
    );
}
