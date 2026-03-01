import React from "react";
import Header from "../components/Header";
import DevConnectFooter from "../../components/DevConnectFooter";
import { Link } from "react-router-dom";
import Prism from "../components/Prism";

function Home() {
    return (
        <>
            <Header variant="dark" />


            {/* HERO */}
            <section className="relative min-h-screen flex items-center overflow-hidden">

                <div className="absolute inset-0 bg-black -z-30" />


                {/* Prism Background */}
                <div className="absolute inset-0 -z-10">
                    <Prism
                        animationType="hover"
                        timeScale={0.5}
                        height={3.5}
                        baseWidth={5.5}
                        scale={3.6}
                        hueShift={0}
                        colorFrequency={1}
                        noise={0}
                        glow={1}
                    />
                </div>

                <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/40 pointer-events-none" />




                <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
                    <div className="max-w-3xl mx-auto text-center sm:text-left">
                        {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-white/90">
                            <span className="inline-block w-2 h-2 rounded-full bg-[#0A66C2]" />
                            <span className="text-sm font-medium">DevConnect Marketplace</span>
                            <span className="text-white/50">•</span>
                            <span className="text-sm text-white/70">Build → Showcase → Sell</span>
                        </div> */}

                        <h1 className="mt-3 text-5xl md:text-6xl font-black leading-[1.06] tracking-tight text-white drop-shadow-xl">
                            Build. Showcase.
                            <br />
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-white via-white to-white/70">
                                Sell Your Projects.
                            </span>
                        </h1>

                        <p className="mt-5 text-white/80 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                            DevConnect is a modern marketplace designed for developers to sell applications,
                            gain visibility, and get hired.
                        </p>

                        <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-4">

                            <Link to="/allprojects">
                                <button className="w-full sm:w-auto px-7 py-3 rounded-lg bg-[#0A66C2] hover:bg-[#004182] text-white text-base font-semibold transition-all shadow-lg shadow-black/20">
                                    Explore Marketplace
                                </button>
                            </Link>

                            <Link to="/careers">
                                <button className="w-full sm:w-auto px-7 py-3 rounded-lg bg-white/10 hover:bg-white/15 text-white text-base font-semibold transition-all border border-white/20 backdrop-blur-md">
                                    Explore Careers
                                </button>
                            </Link>
                        </div>

                        {/* Quick stats */}
                        {/* FEATURE STRIP */}
                        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl">

                            {/* Sell */}
                            <div className="h-full rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md px-6 py-6
                  flex flex-col gap-2 hover:bg-white/15 transition">
                                <h3 className="text-white text-xl font-bold">Sell</h3>
                                <p className="text-white/70 text-sm leading-relaxed">
                                    Turn side-projects into a steady income stream.
                                </p>
                            </div>

                            {/* Showcase */}
                            <div className="h-full rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md px-6 py-6
                  flex flex-col gap-2 hover:bg-white/15 transition">
                                <h3 className="text-white text-xl font-bold">Showcase</h3>
                                <p className="text-white/70 text-sm leading-relaxed">
                                    Build a strong, verified developer profile.
                                </p>
                            </div>

                            {/* Hire */}
                            <div className="h-full rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md px-6 py-6
                  flex flex-col gap-2 hover:bg-white/15 transition">
                                <h3 className="text-white text-xl font-bold">Hire</h3>
                                <p className="text-white/70 text-sm leading-relaxed">
                                    Discover top talent and ready-made products.
                                </p>
                            </div>

                        </div>

                    </div>
                </div>
            </section>




            {/* TRENDING PROJECTS */}
            {/*<section className="bg-white py-20 px-6 md:px-16 lg:px-32">
                <h2 className="text-4xl font-extrabold text-center mb-16 tracking-tight">
                    Trending <span className="text-black">Projects</span>
                </h2>

                <div className="grid gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">

                    <ProjectCard/>
                </div>
            </section>*/}

            {/* ABOUT SECTION */}

            {/* ABOUT */}
            <section className="bg-[#F3F2EF] py-20 sm:py-24">
                <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">

                    {/* Title */}
                    <div className="text-center max-w-3xl mx-auto pb-12">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                            About <span className="text-slate-700">DevConnect</span>
                        </h2>

                        <p className="text-slate-600 mt-4 text-lg leading-relaxed">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt in est molestias velit
                            necessitatibus sint ab atque numquam? Sed ullam atque error dolorem harum.
                        </p>
                    </div>

                    {/* Content Blocks */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">

                        {/* Card 1 */}
                        <div className="bg-slate-50 hover:bg-white rounded-2xl border border-gray-200 p-8 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] hover:shadow-[0_10px_30px_-12px_rgba(0,0,0,0.25)] transition-all duration-300">
                            <div className="w-12 h-12 rounded-xl bg-[#E8F4F8] border border-[#CEE7F0] flex items-center justify-center mb-5">
                                <svg className="w-6 h-6 text-[#0A66C2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-slate-900">Sell Your Projects</h3>
                            <p className="text-slate-600 leading-relaxed text-sm">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque nihil quasi rerum soluta.
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-slate-50 hover:bg-white rounded-2xl border border-gray-200 p-8 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] hover:shadow-[0_10px_30px_-12px_rgba(0,0,0,0.25)] transition-all duration-300">
                            <div className="w-12 h-12 rounded-xl bg-[#E8F4F8] border border-[#CEE7F0] flex items-center justify-center mb-5">
                                <svg className="w-6 h-6 text-[#0A66C2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-slate-900">Build Your Portfolio</h3>
                            <p className="text-slate-600 leading-relaxed text-sm">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi ea velit adipisci sed.
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-slate-50 hover:bg-white rounded-2xl border border-gray-200 p-8 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] hover:shadow-[0_10px_30px_-12px_rgba(0,0,0,0.25)] transition-all duration-300">
                            <div className="w-12 h-12 rounded-xl bg-[#E8F4F8] border border-[#CEE7F0] flex items-center justify-center mb-5">
                                <svg className="w-6 h-6 text-[#0A66C2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857M12 12a4 4 0 100-8 4 4 0 000 8z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-slate-900">Discover & Hire Talent</h3>
                            <p className="text-slate-600 leading-relaxed text-sm">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit sunt beatae unde asperiores.
                            </p>
                        </div>

                    </div>
                </div>
            </section>




            {/* TESTIMONIALS */}
            <section className="bg-white py-20 sm:py-24">
                <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">

                    {/* Title */}
                    <div className="text-center max-w-3xl mx-auto pb-12">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                            What Developers <span className="text-slate-700">Say</span>
                        </h2>
                        <p className="text-slate-600 mt-4 text-lg leading-relaxed">
                            Trusted by developers, freelancers, and tech creators worldwide.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">

                        {/* Card 1 */}
                        <div className="bg-slate-50 hover:bg-white p-8 rounded-2xl border border-gray-200 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] hover:shadow-[0_10px_30px_-12px_rgba(0,0,0,0.25)] transition-all duration-300">

                            <p className="text-slate-700 leading-relaxed">
                                “DevConnect helped me sell my first full-stack project. Perfect platform for developers!”
                            </p>
                            <div className="flex items-center gap-4 mt-8">
                                <img src="/images/person.jpg" className="w-14 h-14 rounded-full object-cover" alt="" />
                                <div>
                                    <h4 className="text-lg font-bold text-slate-900">Rahul Kumar</h4>
                                    <p className="text-sm text-slate-500">MERN Developer</p>
                                </div>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-slate-50 hover:bg-white p-8 rounded-2xl border border-gray-200 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] hover:shadow-[0_10px_30px_-12px_rgba(0,0,0,0.25)] transition-all duration-300">

                            <p className="text-slate-700 leading-relaxed">
                                “I got new freelance clients thanks to DevConnect. My portfolio finally gets visibility!”
                            </p>
                            <div className="flex items-center gap-4 mt-8">
                                <img src="/images/person3.jpg" className="w-14 h-14 rounded-full object-cover" alt="" />
                                <div>
                                    <h4 className="text-lg font-bold text-slate-900">Anjali Sharma</h4>
                                    <p className="text-sm text-slate-500">Frontend Engineer</p>
                                </div>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-slate-50 hover:bg-white p-8 rounded-2xl border border-gray-200 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] hover:shadow-[0_10px_30px_-12px_rgba(0,0,0,0.25)] transition-all duration-300">

                            <p className="text-slate-700 leading-relaxed">
                                “A great experience! Uploading projects is super easy and the UI is clean.”
                            </p>
                            <div className="flex items-center gap-4 mt-8">
                                <img src="/images/person2.jpg" className="w-14 h-14 rounded-full object-cover" alt="" />
                                <div>
                                    <h4 className="text-lg font-bold text-slate-900">Vishnu R</h4>
                                    <p className="text-sm text-slate-500">Backend Developer</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>



            <DevConnectFooter />
        </>
    )
}

export default Home;
