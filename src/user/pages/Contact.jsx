import React from 'react'
import { FiMapPin, FiPhone, FiMail } from 'react-icons/fi';
import Header from '../components/Header';
import DevConnectFooter from '../../components/DevConnectFooter'

function Contact() {
  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <div className="relative bg-slate-900 pt-24 pb-32 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="absolute inset-0 bg-linear-to-b from-transparent to-slate-900 pointer-events-none"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6 mt-10">
                Get in <span className="text-[#0A66C2]">Touch</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Have questions about DevConnect? Whether you're a developer looking to sell projects or a company searching for talent, our team is here to help.
            </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-[#F3F2EF] pb-24 px-4 sm:px-6 relative z-20 -mt-16">
        <div className="max-w-7xl mx-auto">
            
            {/* Contact Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 pt-16">
                
                {/* Email Card */}
                <div className="bg-white rounded-3xl p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col items-center text-center transform hover:-translate-y-1 transition-all duration-300">
                    <div className="w-16 h-16 rounded-2xl bg-[#E8F4F8] flex items-center justify-center mb-6 border border-[#CEE7F0]">
                        <FiMail className="w-7 h-7 text-[#0A66C2]" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Email Us</h3>
                    <p className="text-slate-500 mb-4 text-sm">Our friendly team is here to help.</p>
                    <a href="mailto:support@devconnect.com" className="text-[#0A66C2] font-semibold hover:text-[#004182] transition-colors">
                        support@devconnect.com
                    </a>
                </div>

                {/* Location Card */}
                <div className="bg-white rounded-3xl p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col items-center text-center transform hover:-translate-y-1 transition-all duration-300">
                    <div className="w-16 h-16 rounded-2xl bg-[#E8F4F8] flex items-center justify-center mb-6 border border-[#CEE7F0]">
                        <FiMapPin className="w-7 h-7 text-[#0A66C2]" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Office</h3>
                    <p className="text-slate-500 mb-4 text-sm">Come say hello at our HQ.</p>
                    <p className="text-slate-900 font-medium">
                        100 Tech Park, Block B<br />Kakkanad, Kerala 682030
                    </p>
                </div>

                {/* Phone Card */}
                <div className="bg-white rounded-3xl p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col items-center text-center transform hover:-translate-y-1 transition-all duration-300">
                    <div className="w-16 h-16 rounded-2xl bg-[#E8F4F8] flex items-center justify-center mb-6 border border-[#CEE7F0]">
                        <FiPhone className="w-7 h-7 text-[#0A66C2]" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Phone</h3>
                    <p className="text-slate-500 mb-4 text-sm">Mon-Fri from 9am to 6pm.</p>
                    <p className="text-slate-900 font-medium">
                        +91 987 654 3210
                    </p>
                </div>

            </div>

            {/* Form & Map Section */}
            <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden flex flex-col lg:flex-row">
                
                {/* Contact Form */}
                <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16">
                    <div className="mb-8">
                        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-3">Send us a message</h2>
                        <p className="text-slate-500">We usually respond within 24 hours.</p>
                    </div>

                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block mb-2 text-sm font-semibold text-slate-700">First Name</label>
                                <input type="text" placeholder="John" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-[#0A66C2]/20 focus:border-[#0A66C2] focus:bg-white outline-none transition-all placeholder:text-slate-400 text-slate-900" />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-semibold text-slate-700">Last Name</label>
                                <input type="text" placeholder="Doe" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-[#0A66C2]/20 focus:border-[#0A66C2] focus:bg-white outline-none transition-all placeholder:text-slate-400 text-slate-900" />
                            </div>
                        </div>

                        <div>
                            <label className="block mb-2 text-sm font-semibold text-slate-700">Email Address</label>
                            <input type="email" placeholder="john@example.com" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-[#0A66C2]/20 focus:border-[#0A66C2] focus:bg-white outline-none transition-all placeholder:text-slate-400 text-slate-900" />
                        </div>

                        <div>
                            <label className="block mb-2 text-sm font-semibold text-slate-700">Message</label>
                            <textarea placeholder="How can we help you?" rows={5} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-[#0A66C2]/20 focus:border-[#0A66C2] focus:bg-white outline-none transition-all placeholder:text-slate-400 text-slate-900 resize-none"></textarea>
                        </div>

                        <button type="submit" className="w-full bg-[#0A66C2] hover:bg-[#004182] active:scale-[0.99] text-white py-3.5 rounded-xl font-semibold text-base shadow-[0_4px_10px_rgba(10,102,194,0.3)] hover:shadow-[0_6px_15px_rgba(10,102,194,0.4)] transition-all flex justify-center items-center gap-2">
                            Send Message
                        </button>
                    </form>
                </div>

                {/* Map */}
                <div className="w-full lg:w-1/2 p-4 lg:p-8 flex">
                    <div className="w-full h-[400px] lg:h-auto rounded-2xl overflow-hidden bg-slate-100 relative shadow-inner border border-slate-200">
                        <iframe
                            title="location"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.098726898475!2d76.33451181451839!3d9.978537292877832!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080d577d9a9931%3A0xa998167e1b446a63!2sKakkanad%2C%20Kerala!5e0!3m2!1sen!2sin!4v1633709421461!5m2!1sen!2sin"
                            className="absolute inset-0 w-full h-full border-0"
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>

            </div>

        </div>
      </div>
      <DevConnectFooter />
    </>
  )
}

export default Contact;
