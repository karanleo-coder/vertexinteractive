"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const testimonials = [
    {
        quote: "A complete shift in how we manage institutions.",
        author: "Dr. A. Sharma",
        role: "Principal, DPS"
    },
    {
        quote: "Precision and elegance in every interaction.",
        author: "R. Verma",
        role: "Director, EdTech Solutions"
    },
    {
        quote: "Finally, software that feels engineered, not just built.",
        author: "S. Gupta",
        role: "Trustee, Heritage School"
    },
    {
        quote: "The dark mode implementation is simply stunning.",
        author: "Design Monthly",
        role: "Editorial"
    }
];

export default function Testimonials() {
    const containerRef = useRef<HTMLDivElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const slider = sliderRef.current;
        if (!slider) return;

        // Clone for infinite loop
        const content = slider.innerHTML;
        slider.innerHTML = content + content;

        const totalWidth = slider.scrollWidth / 2;

        gsap.to(slider, {
            x: -totalWidth,
            duration: 30, // Slow, deliberate speed
            ease: "none",
            repeat: -1,
        });

        // Interactive slowing on hover
        slider.addEventListener("mouseenter", () => gsap.to(slider, { timeScale: 0.2, duration: 1 }));
        slider.addEventListener("mouseleave", () => gsap.to(slider, { timeScale: 1, duration: 1 }));

        return () => {
            gsap.killTweensOf(slider);
        };
    }, []);

    return (
        <section className="py-32 w-full overflow-hidden bg-soft-graphite/30 relative border-y border-white/5">
            <div className="absolute inset-0 bg-gradient-to-r from-deep-charcoal via-transparent to-deep-charcoal z-20 pointer-events-none"></div>

            <div ref={containerRef} className="max-w-[100vw]">
                <div ref={sliderRef} className="flex gap-16 md:gap-32 px-16 w-max items-center">
                    {testimonials.map((t, i) => (
                        <div key={i} className="flex flex-col gap-6 w-[60vw] md:w-[40vw] opacity-80 hover:opacity-100 transition-opacity duration-500">
                            <p className="text-3xl md:text-5xl font-sans font-light leading-tight text-off-white">
                                "{t.quote}"
                            </p>
                            <div className="flex flex-col">
                                <span className="text-accent-gold font-bold tracking-wider uppercase text-sm">{t.author}</span>
                                <span className="text-gray-500 text-sm font-body">{t.role}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
