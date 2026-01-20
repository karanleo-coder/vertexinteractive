"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface ProjectProps {
    id: string;
    title: string;
    category: string;
    index: number;
}

export default function ProjectCard({ id, title, category, index }: ProjectProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const isEven = index % 2 === 0;

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(cardRef.current, {
                y: 100,
                opacity: 0,
                duration: 1.5,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: cardRef.current,
                    start: "top 85%",
                    end: "bottom center",
                    toggleActions: "play none none reverse",
                    // scrub: 1
                }
            });
        }, cardRef);
        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={cardRef}
            className={`flex flex-col md:flex-row gap-12 items-center w-full max-w-7xl mx-auto py-24 px-6 ${isEven ? '' : 'md:flex-row-reverse'}`}
        >
            {/* Project Image Area */}
            <Link href={`/projects/${id}`} className="w-full md:w-3/5 group cursor-none-target">
                <div className="relative aspect-[16/9] bg-soft-graphite rounded-sm overflow-hidden border border-white/5 transition-transform duration-700 ease-out group-hover:scale-[1.02]">
                    {/* Placeholder for project image */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-30 text-9xl font-bold text-black/20 group-hover:text-black/40 transition-colors">
                        {index + 1}
                    </div>
                </div>
            </Link>

            {/* Project Info */}
            <div className="w-full md:w-2/5 flex flex-col items-start justify-center">
                <span className="text-accent-gold text-xs tracking-[0.2em] mb-4 uppercase">{category}</span>
                <h3 className="text-4xl md:text-5xl font-sans font-bold text-off-white mb-6 leading-tight">
                    <Link href={`/projects/${id}`} className="hover:text-accent-gold transition-colors duration-300">
                        {title}
                    </Link>
                </h3>
                <p className="text-gray-400 font-body mb-8 max-w-md line-clamp-3">
                    A deeply engineered solution for modern infrastructure, focusing on scalability and user-centric design patterns.
                </p>

                <Link
                    href={`/projects/${id}`}
                    className="flex items-center gap-4 text-off-white text-sm uppercase tracking-widest group hover:text-accent-gold transition-colors"
                >
                    View Case Study
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" />
                </Link>
            </div>
        </div>
    );
}
