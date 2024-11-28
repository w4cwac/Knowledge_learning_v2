import { getCourseForUser } from "@/data"
import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import { stripe } from "@/lib/stripe"
import { NextResponse } from "next/server"
import Stripe from "stripe"

export async function POST(
    request: Request,
    {params} : { params: { courseId: string }}
) {
    try {
        const body = await request.text()
        const signature = request.headers.get("Stripe-Signature") as string

        let event: Stripe.Event
        try {
            event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
        } catch (error) {
            console.log("STRIPE_WEBHOOK_EVENT", error)
            return new NextResponse("Bad Request", { status: 400 })
        }

        const session = event.data.object as Stripe.Checkout.Session
        const userId = session.metadata?.userId
        const courseId = session.metadata?.courseId

        if (event.type === "checkout.session.completed") {
            if (!userId || !courseId) {
                console.log("STRIPE_WEBHOOK", "Missing metadata")
                return new NextResponse("Bad Request", { status: 400 })
            }
            await db.purchase.create({
                data: {
                    courseId,
                    userId,
                }
            })
        } else {
            return new NextResponse(`Unhandled event type ${event.type}`, { status: 200 })
        }

        return new NextResponse("OK", { status: 200})
    } catch (error) {
        console.log("STRIPE_WEBHOOK", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}