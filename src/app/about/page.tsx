"use client";

import InteractiveBackground from "@/components/InteractiveBackground";
import Image from "next/image";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".anim-item", {
                y: 30,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                }
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <main ref={containerRef} className="min-h-screen relative pt-32 pb-24 px-6 overflow-hidden bg-deep-charcoal">
            <InteractiveBackground />

            <div className="max-w-5xl mx-auto relative z-10 flex flex-col gap-24">

                {/* Section 1: The Quote */}
                <section className="text-center py-12 anim-item">
                    <h2 className="text-3xl md:text-5xl font-sans font-light text-off-white italic opacity-90 leading-tight">
                        "Never give up, even when the situation tells you to.<br />
                        Persistence is the bridge between <span className="text-accent-gold not-italic">vision</span> and <span className="text-accent-gold not-italic">reality</span>."
                    </h2>
                </section>

                {/* Section 2: Company Philosophy & Details */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start anim-item">
                    <div>
                        <span className="text-accent-gold text-xs tracking-[0.3em] uppercase mb-4 block">The Entity</span>
                        <h1 className="text-5xl md:text-7xl font-sans font-bold text-off-white mb-6">
                            Vertex Interactive
                        </h1>
                        <div className="flex flex-col gap-2 text-gray-500 font-mono text-sm mb-6">
                            <p>EST. 2025 • Bangalore, India</p>
                            <p>Independent Technology Studio</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        <p className="text-lg text-gray-400 font-body leading-relaxed">
                            Vertex Interactive is an independent technology studio focused on building meaningful digital systems from the ground up.
                        </p>
                        <p className="text-lg text-gray-400 font-body leading-relaxed">
                            We prioritize ownership, privacy, and scalability. Every product is engineered to solve real problems with clarity and minimal complexity, avoiding short-lived trends in favor of long-term value.
                        </p>
                        <div className="p-4 border-l-2 border-accent-gold/50 bg-white/5">
                            <p className="text-off-white italic">"Bringing huge changes from small, thoughtful steps."</p>
                        </div>
                    </div>
                </section>

                {/* Section 3: Founder Profile */}
                <section className="anim-item">
                    <h3 className="text-2xl font-sans font-bold text-off-white mb-12 flex items-center gap-4">
                        <span className="w-8 h-[1px] bg-accent-gold"></span>
                        THE FOUNDER
                        <span className="w-full h-[1px] bg-white/10"></span>
                    </h3>

                    <div className="relative bg-soft-graphite/30 rounded-xl border border-white/5 overflow-hidden p-8 md:p-12">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>

                        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12">
                            {/* Founder Info Column */}
                            <div className="md:col-span-1 flex flex-col gap-6">
                                <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border border-accent-gold/20 shadow-2xl shadow-black/50 group">
                                    <Image
                                        src="/images/founder/profile.jpg"
                                        alt="Karan Gowda"
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.style.display = 'none';
                                            if (target.parentElement) target.parentElement.style.display = 'none';
                                        }}
                                    />
                                    {/* Fallback initials if image fails (optional layering) */}
                                    {/* <div className="absolute inset-0 flex items-center justify-center bg-deep-charcoal -z-10 text-4xl font-bold text-accent-gold">KG</div> */}
                                </div>
                                <div>
                                    <h4 className="text-3xl font-bold text-off-white">Karan Gowda</h4>
                                    <p className="text-accent-gold uppercase tracking-wider text-sm mt-1">Founder & CEO</p>
                                    <p className="text-gray-500 text-xs mt-1">Born 2009 • Sole Architect</p>
                                </div>
                            </div>

                            {/* Bio & Skills Column */}
                            <div className="md:col-span-2 flex flex-col gap-8">
                                <div>
                                    <h5 className="text-xs uppercase tracking-widest text-gray-500 mb-4">Bio</h5>
                                    <p className="text-gray-300 leading-relaxed text-lg font-light">
                                        Karan Gowda is a self-driven technologist and independent product builder. As the sole creator of Vertex Interactive, his work spans robust backend architecture, cross-platform application development, and experimental system software.
                                    </p>
                                    <p className="text-gray-300 leading-relaxed text-lg font-light mt-4">
                                        He builds with a singular vision: to create technology that helps people think better and work smarter, turning ambitious ideas into reality through structured execution.
                                    </p>
                                </div>

                                <div>
                                    <h5 className="text-xs uppercase tracking-widest text-gray-500 mb-4">Core Competencies</h5>
                                    <div className="flex flex-wrap gap-3">
                                        {["System Architecture", "AI & ML", "Game Development (UE)", "Flutter", "Python", "React/Next.js", "Server Optimization"].map(skill => (
                                            <span key={skill} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300 hover:border-accent-gold/50 transition-colors cursor-default">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </main>
    );
}
