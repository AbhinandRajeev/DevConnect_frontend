import React from 'react'
import { FaInstagram, FaTwitter, FaFacebookF, FaLinkedinIn, FaArrowRight } from 'react-icons/fa';

function DevConnectFooter() {
    return (
        <footer className="bg-[#0a1122] text-white pt-10 pb-6 px-4">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8 md:gap-0">
                {/* About Us */}
                <div className="flex-1 min-w-[300px] md:max-w-[40%]">
                    <h2 className="font-serif font-semibold mb-2">ABOUT US</h2>
                    <p className="leading-relaxed text-base text-left">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate dolorem veniam deserunt quisquam eius ad hic maxime dicta ipsum nemo itaque necessitatibus quas nobis, illum voluptate, pariatur recusandae alias harum!
                    </p>
                </div>
                
                <div className="flex-1 min-w-[220px] md:max-w-[25%] flex flex-col mt-6 md:mt-0">
                    <h2 className="font-serif font-semibold mb-2">NEWSLETTER</h2>
                    <p className="mb-2">Stay updated with our latest trends</p>
                    <form className="flex">
                        <input
                            type="email"
                            placeholder="Email ID"
                            className="p-2 rounded-l bg-white text-gray-900 focus:outline-none"
                        />
                        <button type="submit" className="bg-yellow-400 px-4 py-2 rounded-r flex items-center">
                            <FaArrowRight className="text-gray-900" />
                        </button>
                    </form>
                </div>
                {/* Follow Us */}
                <div className="flex-1 min-w-[180px] md:max-w-[20%] flex flex-col mt-6 md:mt-0">
                    <h2 className="font-serif font-semibold mb-2">FOLLOW US</h2>
                    <p className="mb-2">Let us be social</p>
                    <div className="flex space-x-4 mt-1">
                        <a href="#" aria-label="Instagram"><FaInstagram className="w-6 h-6 hover:text-yellow-400" /></a>
                        <a href="#" aria-label="Twitter"><FaTwitter className="w-6 h-6 hover:text-yellow-400" /></a>
                        <a href="#" aria-label="Facebook"><FaFacebookF className="w-6 h-6 hover:text-yellow-400" /></a>
                        <a href="#" aria-label="LinkedIn"><FaLinkedinIn className="w-6 h-6 hover:text-yellow-400" /></a>
                    </div>
                </div>
            </div>
            {/* Footer Bottom */}
            <div className="text-center mt-8 text-xs text-gray-300">
                Copyright © 2025 All rights reserved

            </div>
        </footer>
    )
}

export default DevConnectFooter
