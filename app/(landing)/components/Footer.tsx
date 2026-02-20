"use client";

import Link from "next/link";
import { Twitter, Github, Linkedin, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white dark:bg-[#1D1D1D] border-t border-zinc-200 dark:border-zinc-800 pt-16 pb-8">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">

          {/* Column 1: Branding */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-6 w-6 bg-zinc-950 dark:bg-white rounded flex items-center justify-center text-white dark:text-black font-bold text-xs">
                N
              </div>
              <span className="font-bold text-zinc-950 dark:text-white tracking-tight">NotexAi</span>
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 leading-relaxed">
              Transforming how students consume and retain knowledge from video lectures.
            </p>
          </div>

          {/* Column 2: Product */}
          <div>
            <h4 className="font-semibold text-zinc-950 dark:text-white mb-4 text-sm tracking-tight">Product</h4>
            <ul className="space-y-3 text-sm text-zinc-500 dark:text-zinc-400">
              <li>
                <Link href="#features" className="hover:text-zinc-950 dark:hover:text-white transition-colors">Features</Link>
              </li>
              <li>
                <Link href="#pricing" className="hover:text-zinc-950 dark:hover:text-white transition-colors">Pricing</Link>
              </li>
              <li>
                <Link href="/changelog" className="hover:text-zinc-950 dark:hover:text-white transition-colors">Changelog</Link>
              </li>
              <li>
                <Link href="/docs" className="hover:text-zinc-950 dark:hover:text-white transition-colors">Documentation</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="font-semibold text-zinc-950 dark:text-white mb-4 text-sm tracking-tight">Company</h4>
            <ul className="space-y-3 text-sm text-zinc-500 dark:text-zinc-400">
              <li>
                <Link href="/about" className="hover:text-zinc-950 dark:hover:text-white transition-colors">About</Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-zinc-950 dark:hover:text-white transition-colors">Blog</Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-zinc-950 dark:hover:text-white transition-colors">Careers</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-zinc-950 dark:hover:text-white transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h4 className="font-semibold text-zinc-950 dark:text-white mb-4 text-sm tracking-tight">Legal</h4>
            <ul className="space-y-3 text-sm text-zinc-500 dark:text-zinc-400">
              <li>
                <Link href="/privacy" className="hover:text-zinc-950 dark:hover:text-white transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-zinc-950 dark:hover:text-white transition-colors">Terms of Service</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Socials */}
        <div className="pt-8 border-t border-zinc-100 dark:border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-zinc-400">
            © 2026 NotexAi. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <Link href="https://twitter.com" target="_blank" className="text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors">
              <Twitter className="w-5 h-5" />
            </Link>
            <Link href="https://github.com" target="_blank" className="text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors">
              <Github className="w-5 h-5" />
            </Link>
            <Link href="https://linkedin.com" target="_blank" className="text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors">
              <Linkedin className="w-5 h-5" />
            </Link>
            <Link href="https://instagram.com" target="_blank" className="text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors">
              <Instagram className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}