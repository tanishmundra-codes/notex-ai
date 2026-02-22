import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function VideoDemoPage() {
    return (
        <div className="min-h-screen bg-white flex flex-col pt-24 px-4 md:px-8">
            <div className="max-w-5xl mx-auto w-full">
                <Button asChild variant="ghost" className="mb-6 pl-0 hover:bg-transparent">
                    <Link href="/" className="flex items-center text-gray-600 hover:text-black transition-colors">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Home
                    </Link>
                </Button>

                <div className="mb-4">
                    <h1 className="text-3xl md:text-4xl font-black tracking-tight text-black mb-3 text-center">
                        See NotexAI in Action
                    </h1>
                    <p className="text-base text-gray-500 max-w-xl mx-auto text-center">
                        Watch how easy it is to upload your documents, interact with our intelligent editor, and turn your raw notes into structured, actionable answers in seconds.
                    </p>
                </div>

                <div className="flex justify-center mt-6">
                    <div className="relative w-full max-w-3xl aspect-video rounded-xl overflow-hidden border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] bg-gray-100 object-cover">
                        {/* 
                         * Replace the src attribute below with the actual video path
                         * You can place your video file in the `public/` directory
                         * For example: src="/demo-video.mp4" 
                         */}
                        <video
                            className="w-full h-full object-cover"
                            controls
                            autoPlay
                            muted
                            playsInline
                            poster="/image.png"
                        >
                            <source src="/demo-video.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>

                <div className="mt-12 text-center pb-20">
                    <h2 className="text-2xl font-bold mb-6">Ready to transform your workflow?</h2>
                    <Button
                        asChild
                        variant="brutal-dark"
                        className="px-8 py-6 text-lg font-bold cursor-pointer"
                    >
                        <Link href="/dashboard">Create Your Free Account</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
