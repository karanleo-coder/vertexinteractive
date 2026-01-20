"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { Menu, X } from "lucide-react";

const navItems = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "About", href: "/about" },
];

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
    const pathname = usePathname();

    useEffect(() => {
        if (isOpen) {
            gsap.to(menuRef.current, {
                x: 0,
                duration: 1,
                ease: "power3.inOut",
            });
            gsap.fromTo(
                linkRefs.current,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power3.out",
                    delay: 0.4,
                }
            );
        } else {
            gsap.to(menuRef.current, {
                x: "100%",
                duration: 0.8,
                ease: "power3.inOut",
            });
        }
    }, [isOpen]);

    useEffect(() => {
        // Close menu on route change
        setIsOpen(false);
    }, [pathname]);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <>
            {/* Menu Trigger */}
            <button
                onClick={toggleMenu}
                className="fixed top-8 right-8 z-50 p-4 rounded-full bg-deep-charcoal/80 backdrop-blur-md border border-white/10 text-off-white hover:text-accent-gold transition-colors duration-300 group"
                aria-label="Toggle Menu"
            >
                <div className="relative w-6 h-6 overflow-hidden">
                    <Menu className={`absolute inset-0 transition-transform duration-500 ${isOpen ? '-translate-y-full' : 'translate-y-0'}`} />
                    <X className={`absolute inset-0 transition-transform duration-500 ${isOpen ? 'translate-y-0' : 'translate-y-full'}`} />
                </div>
            </button>

            {/* Full Screen Menu Overlay */}
            <div
                ref={menuRef}
                className="fixed inset-0 z-40 bg-deep-charcoal translate-x-full"
            >
                {/* Background Texture/Blur */}
                <div className="absolute inset-0 opacity-5 pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%221%22/%3E%3C/svg%3E")' }}></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 pointer-events-none"></div>

                <div className="h-full flex flex-col justify-center items-center relative z-10">
                    <nav className="flex flex-col space-y-8 text-center">
                        {navItems.map((item, index) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                ref={(el) => { linkRefs.current[index] = el }}
                                className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-sans font-black tracking-tighter uppercase text-off-white hover:text-accent-gold transition-all duration-300 opacity-0 transform translate-y-10 leading-none"
                                onClick={() => setIsOpen(false)}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="absolute bottom-12 text-sm text-gray-500 font-body tracking-widest uppercase">
                        Vertex Interactive
                    </div>
                </div>
            </div>
        </>
    );
}
