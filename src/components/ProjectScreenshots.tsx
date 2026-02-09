"use client";

import { useState } from "react";
import Image from "next/image";

interface Props {
    projectId: string;
    title: string;
}

export default function ProjectScreenshots({ projectId, title }: Props) {
    // We'll track the loading status of each potential screenshot [1, 2, 3]
    // true = valid, false = error/hidden
    const [imageStates, setImageStates] = useState<Record<number, boolean>>({
        1: true,
        2: true,
        3: true
    });

    const handleImageError = (index: number) => {
        setImageStates(prev => ({ ...prev, [index]: false }));
    };

    // If all images failed, hide the entire section
    const allFailed = !imageStates[1] && !imageStates[2] && !imageStates[3];

    if (allFailed) return null;

    return (
        <section className="py-24 overflow-hidden">
            <h3 className="px-6 md:px-24 text-4xl font-sans font-bold mb-12">Interface Design</h3>
            <div className="flex gap-8 px-6 md:px-24 overflow-x-auto pb-8 snap-x">
                {[1, 2, 3].map((i) => {
                    if (!imageStates[i]) return null;

                    return (
                        <div key={i} className="min-w-[80vw] md:min-w-[60vw] aspect-video bg-soft-graphite rounded-lg border border-white/10 relative shadow-2xl snap-center shrink-0 group overflow-hidden">
                            <Image
                                src={`/images/projects/${projectId}/screenshot-${i}.jpg`}
                                alt={`${title} Screenshot ${i}`}
                                fill
                                className="object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                                onError={() => handleImageError(i)}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
