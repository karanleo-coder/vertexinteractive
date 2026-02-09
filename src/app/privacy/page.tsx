"use client";

import InteractiveBackground from "@/components/InteractiveBackground";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Shield, Lock, Eye, AlertTriangle, Scale, Mail } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function PrivacyPage() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".anim-item", {
                y: 30,
                opacity: 0,
                duration: 1,
                stagger: 0.15,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                }
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    const prohibitedActivities = [
        "Reverse engineering, decompiling, or disassembling the software",
        "Attempting to bypass security measures or access controls",
        "Copying, modifying, or creating derivative works",
        "Attempting unauthorized server access or disrupting services",
        "Automated scraping or data extraction without permission",
        "Any activity violating the Information Technology Act, 2000 (India)"
    ];

    const violations = [
        "Immediate account termination",
        "Legal action under Indian Copyright Act, 1957",
        "Civil and criminal penalties as per applicable laws",
        "Liability for damages and legal costs"
    ];

    const dataCollection = [
        "Student academic records (with consent)",
        "Faculty information",
        "Parent contact details",
        "Usage analytics (anonymous)"
    ];

    const dataUsage = [
        "Solely for educational and administrative purposes",
        "Never sold to third parties",
        "Shared only with authorized college personnel"
    ];

    const userRights = [
        "Right to access personal data",
        "Right to correction/rectification",
        "Right to withdraw consent",
        "Right to grievance redressal"
    ];

    const securityMeasures = [
        "SSL/TLS encryption",
        "Secure Indian servers",
        "Regular security audits",
        "Compliance with IT Act, 2000 and SPDI Rules, 2011"
    ];

    return (
        <main ref={containerRef} className="min-h-screen relative pt-32 pb-24 px-6 overflow-hidden bg-deep-charcoal">
            <InteractiveBackground />

            <div className="max-w-4xl mx-auto relative z-10 flex flex-col gap-16">

                {/* Header */}
                <section className="text-center anim-item">
                    <span className="text-accent-gold text-xs tracking-[0.3em] uppercase mb-4 block">Legal</span>
                    <h1 className="text-4xl md:text-6xl font-sans font-bold text-off-white mb-6">Privacy Policy</h1>
                    <p className="text-gray-400 font-body max-w-2xl mx-auto">
                        Your privacy and data security are paramount to us. This policy outlines how we collect, use, and protect your information.
                    </p>
                </section>

                {/* Copyright Notice */}
                <section className="anim-item bg-soft-graphite/30 rounded-xl border border-white/5 p-8 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/5 to-transparent pointer-events-none"></div>
                    <div className="flex items-start gap-4 relative z-10">
                        <div className="w-12 h-12 bg-accent-gold/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Shield className="w-6 h-6 text-accent-gold" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-off-white mb-3">Copyright Notice</h2>
                            <p className="text-gray-400 leading-relaxed">
                                © 2024 Vertex Interactive. All rights reserved. KLE Nagarbhavi College name and logo are property of KLE Society. All app content, design, and code are proprietary to Vertex Interactive.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Prohibited Activities */}
                <section className="anim-item">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center">
                            <AlertTriangle className="w-5 h-5 text-red-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-off-white">Prohibited Activities</h2>
                    </div>
                    <div className="bg-soft-graphite/20 rounded-xl border border-white/5 p-6">
                        <p className="text-gray-400 mb-4">Users are strictly prohibited from:</p>
                        <ul className="space-y-3">
                            {prohibitedActivities.map((item, index) => (
                                <li key={index} className="flex items-start gap-3 text-gray-300">
                                    <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="mt-6 bg-red-500/5 border border-red-500/10 rounded-xl p-6">
                        <p className="text-red-400/80 font-medium mb-3">Violations may result in:</p>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {violations.map((item, index) => (
                                <li key={index} className="flex items-start gap-3 text-gray-400 text-sm">
                                    <Scale className="w-4 h-4 text-red-400/60 mt-0.5 flex-shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* Privacy Policy Highlights */}
                <section className="anim-item">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-10 h-10 bg-accent-gold/10 rounded-lg flex items-center justify-center">
                            <Eye className="w-5 h-5 text-accent-gold" />
                        </div>
                        <h2 className="text-2xl font-bold text-off-white">Privacy Policy Highlights</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Data Collection */}
                        <div className="bg-soft-graphite/20 rounded-xl border border-white/5 p-6">
                            <h3 className="text-lg font-semibold text-off-white mb-4">Data Collection</h3>
                            <ul className="space-y-2">
                                {dataCollection.map((item, index) => (
                                    <li key={index} className="flex items-start gap-3 text-gray-400 text-sm">
                                        <span className="w-1.5 h-1.5 bg-accent-gold rounded-full mt-1.5 flex-shrink-0"></span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Data Usage */}
                        <div className="bg-soft-graphite/20 rounded-xl border border-white/5 p-6">
                            <h3 className="text-lg font-semibold text-off-white mb-4">Data Usage</h3>
                            <ul className="space-y-2">
                                {dataUsage.map((item, index) => (
                                    <li key={index} className="flex items-start gap-3 text-gray-400 text-sm">
                                        <span className="w-1.5 h-1.5 bg-accent-gold rounded-full mt-1.5 flex-shrink-0"></span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* User Rights */}
                        <div className="bg-soft-graphite/20 rounded-xl border border-white/5 p-6">
                            <h3 className="text-lg font-semibold text-off-white mb-4">User Rights (Under Indian Law)</h3>
                            <ul className="space-y-2">
                                {userRights.map((item, index) => (
                                    <li key={index} className="flex items-start gap-3 text-gray-400 text-sm">
                                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-1.5 flex-shrink-0"></span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Security Measures */}
                        <div className="bg-soft-graphite/20 rounded-xl border border-white/5 p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Lock className="w-4 h-4 text-accent-gold" />
                                <h3 className="text-lg font-semibold text-off-white">Security Measures</h3>
                            </div>
                            <ul className="space-y-2">
                                {securityMeasures.map((item, index) => (
                                    <li key={index} className="flex items-start gap-3 text-gray-400 text-sm">
                                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 flex-shrink-0"></span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Grievance Officer */}
                <section className="anim-item bg-soft-graphite/30 rounded-xl border border-accent-gold/20 p-8 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/5 to-transparent pointer-events-none"></div>
                    <div className="flex items-start gap-4 relative z-10">
                        <div className="w-12 h-12 bg-accent-gold/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Mail className="w-6 h-6 text-accent-gold" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-off-white mb-3">Grievance Officer</h2>
                            <p className="text-gray-400 leading-relaxed">
                                As required by Indian IT Rules, we appoint a Grievance Officer. Contact details are available within the website on our{" "}
                                <a href="/support" className="text-accent-gold hover:underline underline-offset-4 transition-colors">
                                    Support page
                                </a>.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Last Updated */}
                <div className="text-center text-gray-600 text-sm anim-item">
                    <p>Last updated: February 2026</p>
                </div>

            </div>
        </main>
    );
}
