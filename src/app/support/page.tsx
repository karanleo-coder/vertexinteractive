"use client";

import { useState, type FormEvent } from "react";
import InteractiveBackground from "@/components/InteractiveBackground";
import { ArrowRight, CheckCircle, AlertCircle } from "lucide-react";

export default function SupportPage() {
    const [formState, setFormState] = useState({ name: "", email: "", description: "" });
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");
    const [submittedEmail, setSubmittedEmail] = useState("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setStatus("submitting");
        setErrorMessage("");

        try {
            const response = await fetch("/api/support", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: formState.name,
                    email: formState.email,
                    description: formState.description
                })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Submission failed");
            }

            setSubmittedEmail(formState.email);
            setStatus("success");
            setFormState({ name: "", email: "", description: "" });
        } catch (error) {
            console.error("Support submission error:", error);
            const message = error instanceof Error ? error.message : "Something went wrong. Please try again.";
            setStatus("error");
            setErrorMessage(message);
        }
    };

    return (
        <main className="min-h-screen relative pt-32 pb-24 px-6 overflow-hidden bg-deep-charcoal flex flex-col items-center justify-center">
            <InteractiveBackground />

            <div className="max-w-2xl w-full mx-auto relative z-10">
                <div className="text-center mb-12">
                    <span className="text-accent-gold text-xs tracking-[0.3em] uppercase mb-4 block">Assistance</span>
                    <h1 className="text-4xl md:text-5xl font-sans font-bold text-off-white mb-4">Support Center</h1>
                    <p className="text-gray-400 font-body max-w-lg mx-auto">
                        Encountering issues? Submit a detailed request below and our engineering team will investigate.
                    </p>
                </div>

                <div className="bg-soft-graphite/30 rounded-xl border border-white/5 p-8 md:p-12 relative overflow-hidden backdrop-blur-sm">
                    <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>

                    {status === "success" ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center animate-fade-in">
                            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-6 border border-green-500/20">
                                <CheckCircle className="w-8 h-8 text-green-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-off-white mb-2">Request Received</h3>
                            <p className="text-gray-400 max-w-md">
                                Your support ticket has been created successfully. We will review the details and contact you at <span className="text-accent-gold">{submittedEmail}</span> shortly.
                            </p>
                            <button
                                onClick={() => {
                                    setStatus("idle");
                                    setSubmittedEmail("");
                                }}
                                className="mt-8 text-sm text-gray-500 hover:text-off-white transition-colors underline underline-offset-4"
                            >
                                Submit another request
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
                            {status === "error" && (
                                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3 text-red-400 text-sm mb-2">
                                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                    <p>{errorMessage}</p>
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="group">
                                    <label className="text-xs uppercase tracking-widest text-gray-500 mb-2 block group-focus-within:text-accent-gold transition-colors">Name</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full bg-deep-charcoal border-b border-gray-700 p-4 text-off-white focus:outline-none focus:border-accent-gold transition-colors placeholder:text-gray-700/50"
                                        placeholder="Enter your name"
                                        value={formState.name}
                                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                    />
                                </div>

                                <div className="group">
                                    <label className="text-xs uppercase tracking-widest text-gray-500 mb-2 block group-focus-within:text-accent-gold transition-colors">Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        className="w-full bg-deep-charcoal border-b border-gray-700 p-4 text-off-white focus:outline-none focus:border-accent-gold transition-colors placeholder:text-gray-700/50"
                                        placeholder="name@company.com"
                                        value={formState.email}
                                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="group">
                                <label className="text-xs uppercase tracking-widest text-gray-500 mb-2 block group-focus-within:text-accent-gold transition-colors">Description of Issue</label>
                                <textarea
                                    required
                                    rows={5}
                                    className="w-full bg-deep-charcoal border-b border-gray-700 p-4 text-off-white focus:outline-none focus:border-accent-gold transition-colors placeholder:text-gray-700/50 resize-none"
                                    placeholder="Please describe the problem you are facing in detail..."
                                    value={formState.description}
                                    onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={status === "submitting"}
                                className="mt-4 py-4 px-8 bg-off-white text-deep-charcoal font-bold tracking-wider hover:bg-accent-gold transition-colors duration-300 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {status === "submitting" ? "Submitting Ticket..." : "Submit Support Request"}
                                {!status.includes("submitting") && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </main>
    );
}
