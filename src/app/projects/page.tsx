import ProjectCard from "@/components/ProjectCard";

const projects = [
    { id: "untitled-game", title: "Untitled", category: "Open World Game" },
    { id: "inaya-ai", title: "Inaya AI", category: "Personal Assistant" },
    { id: "inaya-school", title: "Inaya School", category: "Digital Infrastructure" },
    { id: "custom-ai", title: "Custom AI Model", category: "Artificial Intelligence" },
    { id: "lightweight-os", title: "Lightweight OS", category: "System Software" },
    { id: "mahabharata-game", title: "Mahabharata", category: "Game Development" },
    { id: "anti-social", title: "Anti-Social", category: "Social Platform" },
];

export default function ProjectsPage() {
    return (
        <main className="min-h-screen pt-32 pb-24 relative">
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%221%22/%3E%3C/svg%3E")' }}></div>

            <header className="px-6 mb-24 max-w-7xl mx-auto text-left">
                <h1 className="text-6xl md:text-9xl font-sans font-bold text-off-white mb-6">Work</h1>
                <div className="w-24 h-1 bg-accent-gold mb-8"></div>
                <p className="text-xl md:text-2xl text-gray-400 font-body max-w-2xl">
                    Selected works demonstrating precision, depth, and impact.
                </p>
            </header>

            <div className="flex flex-col gap-12 relative z-10">
                {projects.map((project, index) => (
                    <ProjectCard key={project.id} {...project} index={index} />
                ))}
            </div>
        </main>
    );
}
