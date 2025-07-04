import React from 'react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="py-8 border-t px-8 bg-black text-white">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8">
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Shipping Info
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Returns
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#about" className="hover:text-foreground">
                    About
                  </a>
                </li>
                <li>
                  <a href="#portfolio" className="hover:text-foreground">
                    Portfolio
                  </a>
                </li>
                <li>
                  <Link href="#about" className="hover:text-foreground">
                    Services
                  </Link>
                </li>
                <li>
                  <a href="#quote" className="hover:text-foreground">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <p className="text-sm text-muted-foreground mb-2">(+254) 794 210038</p>
              <p className="text-sm text-muted-foreground"></p>
            </div>
          </div>
          {/* <Separator className="my-8" /> */}
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Radiant Metals Workshop. All rights reserved.</p>
            <div className="flex space-x-4 text-sm text-gray-500">
              <Link href="#" className="hover:text-foreground">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-gray-300">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
  )
}
