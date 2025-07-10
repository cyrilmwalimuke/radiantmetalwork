import React from 'react'
import Link from 'next/link'
import { Facebook, Instagram, Mail, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-black text-white px-6 lg:px-20 py-12 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">
        {/* Support Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link href="#" className="hover:text-white">Contact Us</Link></li>
            <li><Link href="#" className="hover:text-white">Shipping Info</Link></li>
            <li><Link href="#" className="hover:text-white">Returns</Link></li>
            <li><Link href="#" className="hover:text-white">FAQ</Link></li>
          </ul>
        </div>

        {/* Company Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="#about" className="hover:text-white">About</a></li>
            <li><a href="#portfolio" className="hover:text-white">Portfolio</a></li>
            <li><a href="#about" className="hover:text-white">Services</a></li>
            <li><a href="#quote" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Connect</h3>
          <div className="space-y-2 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Phone size={16} /> <span>(+254) 794 210038</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={16} /> <span>info@radiantmetalsworkshop.com</span>
            </div>
            <div className="flex space-x-4 mt-4">
              <Link href="#"><Facebook size={18} className="hover:text-white" /></Link>
              <Link href="#"><Instagram size={18} className="hover:text-white" /></Link>
            </div>
          </div>
        </div>

        {/* Newsletter or Logo */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Get a Quote</h3>
          <p className="text-sm text-gray-400 mb-3">Send us your welding design or idea for a free quote.</p>
          <Link href="#quote" className="inline-block mt-2 px-4 py-2 text-sm bg-white text-black rounded hover:bg-gray-300 transition">
            Request Quote
          </Link>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Radiant Metals Workshop. All rights reserved.</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <Link href="#" className="hover:text-white">Privacy Policy</Link>
          <Link href="#" className="hover:text-white">Terms of Service</Link>
        </div>
      </div>
    </footer>
  )
}
