import { NextResponse } from 'next/server';
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(req: Request) {
    try {
        const bodyText = await req.text();
        const signature = req.headers.get('webhook-signature');
        const webhookSecret = process.env.DODO_PAYMENTS_WEBHOOK_KEY;

        if (!signature || !webhookSecret) {
            return new NextResponse('Missing signature or secret', { status: 400 });
        }

        const event = JSON.parse(bodyText);

        if (event.type === 'checkout.session.completed') {
            const session = event.data;

            const email = session.customer?.email;

            if (email) {
                console.log('Payment successful for:', email);
                await convex.mutation(api.user.upgradeUser, { email });
                console.log('Upgraded user in Convex successfully');
            }
        }

        return new NextResponse('Webhook Handled', { status: 200 });
    } catch (error) {
        console.error('[WEBHOOK_ERROR]', error);
        return new NextResponse('Webhook Error', { status: 400 });
    }
}
