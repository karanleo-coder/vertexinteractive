import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import RegisterForm from "@/components/RegisterForm";
import ProjectScreenshots from "@/components/ProjectScreenshots";

// Mock Data
// Mock Data
const projects = {
    "untitled-game": {
        title: "Untitled Game",
        description: "An open-world, story-driven game in Unreal Engine, developed entirely by a single individual.",
        features: ["Open-World Exploration", "Cinematic Storytelling", "Solo Development"],
        color: "#c5a059"
    },
    "inaya-ai": {
        title: "Inaya AI",
        description: "A lightweight personal AI assistant designed for memory management and daily productivity.",
        features: ["Memory Recall", "Task Management", "Natural Conversation"],
        color: "#c5a059"
    },
    "inaya-school": {
        title: "Inaya School",
        description: "A comprehensive digital infrastructure built for educational institutions to ensure privacy and ownership.",
        features: ["Student Portals", "Admin Dashboard", "Private Cloud"],
        color: "#c5a059"
    },
    "custom-ai": {
        title: "Custom AI Model",
        description: "A proprietary AI model being built from scratch to ensure sovereign AI capabilities.",
        features: ["Foundational Architecture", "Data Sovereignty", "High Efficiency"],
        color: "#c5a059"
    },
    "lightweight-os": {
        title: "Lightweight OS",
        description: "A custom operating system designed to minimize server overhead and maximize hardware utilization.",
        features: ["Low Latency", "Resource Optimization", "Bare Metal"],
        color: "#c5a059"
    },
    "mahabharata-game": {
        title: "Mahabharata",
        description: "A culturally inspired game project combining Indian mythology with semi-realistic visuals.",
        features: ["Mythological Story", "Action RPG", "Immersive World"],
        color: "#c5a059"
    },
    "anti-social": {
        title: "Anti-Social",
        description: "A platform focused on meaningful engagement rather than passive consumption.",
        features: ["Intentional UI", "No Algo-Feed", "Mental Well-being"],
        color: "#c5a059"
    }
};

type Props = {
    params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props) {
    const { id } = await params;
    const project = projects[id as keyof typeof projects];
    if (!project) return { title: "Project Not Found" };
    return {
        title: `${project.title} | Vertex Interactive`,
        description: project.description,
    };
}

export default async function ProjectDetail({ params }: Props) {
    const { id } = await params;
    const project = projects[id as keyof typeof projects];

    if (!project) {
        // For demo purposes, fallback to generic if ID not in map, or 404
        // notFound(); 
        // I'll return a generic "Project Not Found" or just generic content for unknown IDs to prevent errors during demo
    }

    const displayProject = project || {
        title: id.charAt(0).toUpperCase() + id.slice(1).replace("-", " "),
        description: "A premium digital solution engineered by Vertex Interactive.",
        features: ["Scalable Architecture", "Premium Design", "Seamless Interaction"],
        color: "#c5a059"
    };

    return (
        <main className="min-h-screen bg-deep-charcoal pb-24">
            {/* Hero Section */}
            <section className="h-[70vh] flex flex-col justify-end p-6 md:p-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-deep-charcoal via-transparent to-transparent z-10"></div>
                {/* Background abstract */}
                <div className="absolute inset-0 bg-soft-graphite opacity-20">
                    <div className="w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-700 via-deep-charcoal to-deep-charcoal"></div>
                </div>

                <div className="relative z-20 max-w-4xl">
                    <Link href="/projects" className="inline-flex items-center gap-2 text-gray-400 hover:text-accent-gold transition-colors mb-8 group">
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                        <span className="text-xs uppercase tracking-widest">Back to Projects</span>
                    </Link>

                    <h1 className="text-6xl md:text-9xl font-bold font-sans text-off-white mb-6 uppercase tracking-[-0.02em] leading-none">
                        {displayProject.title}
                    </h1>
                    <div className="w-32 h-1 bg-accent-gold mb-8"></div>
                </div>
            </section>

            {/* About Section */}
            <section className="px-6 md:px-24 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                    <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-4">About the Project</h2>
                    <p className="text-xl md:text-2xl text-off-white font-light leading-relaxed">
                        {displayProject.description}
                    </p>
                </div>
                <div className="flex flex-col gap-4 justify-center">
                    <div className="p-6 border border-white/5 rounded-lg bg-white/5 backdrop-blur-sm">
                        <span className="text-accent-gold text-4xl font-bold block mb-2">01.</span>
                        <p className="text-sm text-gray-400">Discovery & Strategy</p>
                    </div>
                    <div className="p-6 border border-white/5 rounded-lg bg-white/5 backdrop-blur-sm ml-8">
                        <span className="text-accent-gold text-4xl font-bold block mb-2">02.</span>
                        <p className="text-sm text-gray-400">Design & Engineering</p>
                    </div>
                </div>
            </section>

            {/* Features (Moved Up) */}
            <section className="px-6 md:px-24 py-24 bg-soft-graphite/20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {displayProject.features.map((feature, i) => (
                        <div key={i} className="flex flex-col gap-4">
                            <div className="w-12 h-12 rounded-full bg-accent-gold/10 flex items-center justify-center text-accent-gold border border-accent-gold/20">
                                ❖
                            </div>
                            <h4 className="text-xl font-bold text-off-white">{feature}</h4>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Designed to optimize performance and enhance the user experience through measured interaction.
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Screenshots Section (Moved Down) */}
            <ProjectScreenshots projectId={id} title={displayProject.title} />

            {/* Register */}
            <div className="max-w-4xl mx-auto px-6 mt-24">
                <RegisterForm />
            </div>
        </main>
    );
}
