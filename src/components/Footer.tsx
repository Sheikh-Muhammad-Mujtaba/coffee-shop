'use client';

import { ArrowUp, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import React from 'react';
import Link from 'next/link';

function Footer() {
    const handleBackToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <footer className="w-full bg-[#F6EBDA] py-12 mt-[100px]">
            <div className="relative container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Company Info */}
                    <div className="text-center md:text-left">
                        <h3 className="font-bold text-xl mb-4 text-[#FF902B] font-serif">Cafe <span className='text-black'>Street</span></h3>
                        <p className="text-sm text-gray-600 mb-4">
                            123 Main St, Anytown, USA 12345
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="text-center md:text-left">
                        <h3 className="font-bold text-xl mb-4 text-[#FF902B]">Quick Links</h3>
                        <ul className="space-y-2">
                            {['About', 'Services', 'Contact', 'Blog'].map((item) => (
                                <li key={item}>
                                    <Link href={'#'} className="text-gray-600 hover:text-[#FF902B] transition duration-300">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div className="text-center md:text-left">
                        <h3 className="font-bold text-xl mb-4 text-[#FF902B]">Connect With Us</h3>
                        <div className="flex justify-center md:justify-start space-x-4">
                            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                                <Link key={index} href="#" className="text-gray-600 hover:text-[#FF902B] transition duration-300">
                                    <Icon size={24} />
                                </Link>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Back to Top Button */}
                <button
                    title="Back to top"
                    onClick={handleBackToTop}
                    className="absolute right-4 top-[-50px] rounded-full p-4 bg-[#FF902B] text-white hover:bg-[#e6811b] transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                    <ArrowUp size={24} />
                </button>
                <p className="text-sm text-gray-600 text-center mt-7 border-t-2 pt-7">© {new Date().getFullYear()} Cafe Street. All Rights Reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;

