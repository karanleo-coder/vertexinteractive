import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Validate event
        if (body.event !== "send_user_access_email") {
            return NextResponse.json(
                { error: "Invalid event" },
                { status: 400 }
            );
        }

        const { user, meta } = body;

        if (!user?.email || !user?.profile_name) {
            return NextResponse.json(
                { error: "Missing required user fields" },
                { status: 400 }
            );
        }

        const finalPayload = {
            event: body.event,
            user: {
                profile_name: user.profile_name,
                email: user.email,
                phone: user.phone || null
            },
            access: {
                form_link: process.env.FORM_LINK,
                login_type: "email"
            },
            meta: meta || {}
        };

        // If Make is not connected yet
        if (!process.env.MAKE_WEBHOOK_URL) {
            return NextResponse.json({
                status: "ok",
                message: "Make not connected yet",
                data: finalPayload
            });
        }

        // Send to Make
        const res = await fetch(process.env.MAKE_WEBHOOK_URL!, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(finalPayload)
        });

        if (!res.ok) {
            throw new Error("Make webhook failed");
        }

        return NextResponse.json({
            status: "success",
            request_id: meta?.request_id || null
        });

    } catch (err) {
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
