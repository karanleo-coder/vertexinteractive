import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const { name, email, description } = body;

        // Basic validation
        if (!name || !email || !description) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const payload = {
            event: "support_request",
            user: {
                name,
                email
            },
            ticket: {
                description
            },
            meta: {
                source: "nextjs",
                timestamp: new Date().toISOString(),
                request_id: crypto.randomUUID()
            }
        };

        // Check if Make webhook URL is configured
        if (!process.env.makeurl) {
            console.warn("MAKE_WEBHOOK_URL is not defined in environment variables.");
            return NextResponse.json({
                status: "ok",
                message: "Make not connected yet (mock success)",
                data: payload
            });
        }

        // Send to Make
        const res = await fetch(process.env.makeurl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        if (!res.ok) {
            throw new Error(`Make webhook failed with status: ${res.status}`);
        }

        return NextResponse.json({
            status: "success",
            message: "Support request sent successfully"
        });

    } catch (error) {
        console.error("Support API Error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
