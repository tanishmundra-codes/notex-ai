import { NextResponse } from 'next/server';
import DodoPayments from 'dodopayments';
import { auth, currentUser } from '@clerk/nextjs/server';

const client = new DodoPayments({
    bearerToken: process.env.DODO_PAYMENTS_API_KEY,
    environment: 'test_mode',
});

export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        const user = await currentUser();

        if (!userId || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const email = user.primaryEmailAddress?.emailAddress;

        if (!email) {
            return NextResponse.json({ error: 'Email required' }, { status: 400 });
        }

        const productId = process.env.DODO_PAYMENTS_PRODUCT_ID || 'prod_one_time';

        const session = await client.checkoutSessions.create({
            product_cart: [
                { product_id: productId, quantity: 1 }
            ],
            customer: {
                email: email,
                name: user.fullName || user.firstName || 'User',
            },
            billing_address: {
                country: 'IN',
            },
            return_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard`,
        });

        return NextResponse.json({ url: session.checkout_url });
    } catch (error: any) {
        console.error('[CHECKOUT_ERROR]', error);
        return NextResponse.json(
            { error: error?.message || 'Internal Error' },
            { status: 500 }
        );
    }
}
