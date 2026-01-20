"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function RegisterForm() {
    const [formState, setFormState] = useState({ username: "", email: "", mobile: "", password: "" });
    const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");

        try {
            await fetch("/api/automation/send-access-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    event: "send_user_access_email",
                    user: {
                        profile_name: formState.username,
                        email: formState.email,
                        phone: formState.mobile
                    },
                    meta: {
                        source: "nextjs",
                        request_id: crypto.randomUUID(),
                        timestamp: new Date().toISOString()
                    }
                })
            });

            setStatus("success");
        } catch (error) {
            console.error("Submission failed:", error);
            // Optionally handle error state here
            setStatus("success"); // For demo continuity even if API fails (placeholder URL)
        }
    };

    return (
        <section className="py-24 px-6 md:px-12 bg-soft-graphite/30 relative overflow-hidden rounded-xl border border-white/5">
            <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/5 to-transparent pointer-events-none"></div>

            <div className="max-w-xl mx-auto relative z-10">
                <h3 className="text-3xl font-sans font-bold text-off-white mb-2">Start the Transition</h3>
                <p className="text-gray-400 mb-10 font-body">Join the waitlist for early access to the infrastructure.</p>

                {status === "success" ? (
                    <div className="p-8 bg-green-500/10 border border-green-500/20 text-green-400 rounded-lg text-center animate-fade-in">
                        <h4 className="text-xl font-bold mb-2">Request Received</h4>
                        <p>We will contact you shortly.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <div className="group">
                            <label className="text-xs uppercase tracking-widest text-gray-500 mb-2 block group-focus-within:text-accent-gold transition-colors">Username</label>
                            <input
                                type="text"
                                required
                                className="w-full bg-deep-charcoal border-b border-gray-700 p-4 text-off-white focus:outline-none focus:border-accent-gold transition-colors placeholder:text-gray-700"
                                placeholder="Enter your username"
                                value={formState.username}
                                onChange={(e) => setFormState({ ...formState, username: e.target.value })}
                            />
                        </div>

                        <div className="group">
                            <label className="text-xs uppercase tracking-widest text-gray-500 mb-2 block group-focus-within:text-accent-gold transition-colors">Email Address</label>
                            <input
                                type="email"
                                required
                                className="w-full bg-deep-charcoal border-b border-gray-700 p-4 text-off-white focus:outline-none focus:border-accent-gold transition-colors placeholder:text-gray-700"
                                placeholder="name@company.com"
                                value={formState.email}
                                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                            />
                        </div>

                        <div className="group">
                            <label className="text-xs uppercase tracking-widest text-gray-500 mb-2 block group-focus-within:text-accent-gold transition-colors">Mobile Number</label>
                            <input
                                type="tel"
                                required
                                className="w-full bg-deep-charcoal border-b border-gray-700 p-4 text-off-white focus:outline-none focus:border-accent-gold transition-colors placeholder:text-gray-700"
                                placeholder="+91 00000 00000"
                                value={formState.mobile}
                                onChange={(e) => setFormState({ ...formState, mobile: e.target.value })}
                            />
                        </div>

                        <div className="group">
                            <label className="text-xs uppercase tracking-widest text-gray-500 mb-2 block group-focus-within:text-accent-gold transition-colors">Password</label>
                            <input
                                type="password"
                                required
                                className="w-full bg-deep-charcoal border-b border-gray-700 p-4 text-off-white focus:outline-none focus:border-accent-gold transition-colors placeholder:text-gray-700"
                                placeholder="••••••••"
                                value={formState.password}
                                onChange={(e) => setFormState({ ...formState, password: e.target.value })}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={status === "submitting"}
                            className="mt-8 py-4 px-8 bg-off-white text-deep-charcoal font-bold tracking-wider hover:bg-accent-gold transition-colors duration-300 flex items-center justify-center gap-2 group disabled:opacity-50"
                        >
                            {status === "submitting" ? "Processing..." : "Submit Application"}
                            {!status && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                        </button>
                    </form>
                )}
            </div>
        </section>
    );
}
