import React from 'react'
import AdminHeader from '../components/AdminHeader'
import AdminSideBar from "../components/AdminSideBar";
import { Button, Card } from "flowbite-react";
import { TabItem, Tabs } from "flowbite-react";
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";

function AdminPosts() {
    return (
        <>
            <AdminHeader />
            <section className='pt-22'>
                <div className='flex'>
                    <div className='w-64 '>
                        <AdminSideBar />
                    </div>

                    <div className="mx-auto w-2/3">
                        <h1 className="text-center  text-2xl font-bold my-5">All Posts</h1>
                        <div className="bg-gray-200 p-8 rounded shadow">
                            <Tabs aria-label="Full width tabs" variant="fullWidth">
                                <TabItem active title="Post List" icon={MdDashboard}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 md:px-0 max-w-5xl mx-auto">

                                        {/* CARD 1 */}
                                        <Card className="bg-gray-900 rounded-xl shadow-md hover:shadow-lg transition duration-300 flex flex-col scale-95">

                                            {/* USER INFO */}
                                            <div className="flex items-center gap-3 px-4 pt-3">
                                                <img
                                                    src="/images/profilepic.jpg"
                                                    alt="User Avatar"
                                                    className="w-10 h-10 rounded-full border border-gray-700 object-cover"
                                                />
                                                <p className="text-white font-semibold text-base">John Doe</p>
                                            </div>

                                            {/* PROJECT IMAGE */}
                                            <img
                                                src="/images/blogdemo.png"
                                                alt="Project"
                                                className="rounded-lg w-full object-cover h-36 mt-3"
                                            />

                                            <div className="p-4 flex flex-col grow">
                                                <h5 className="text-xl font-semibold mb-2 text-white">
                                                    DevConnect Platform
                                                </h5>

                                                <p className="text-gray-300 mb-4 text-sm leading-relaxed grow">
                                                    A community platform for developers to showcase, sell, and get hired —
                                                    built using React and Express.
                                                </p>

                                                <p className="text-xs text-gray-400 font-mono tracking-wide mb-2">
                                                    Tech Stack: React, Node.js, MongoDB, Razorpay
                                                </p>

                                                <div className="mt-auto">
                                                    <p className="text-lg font-bold text-white">Price: $49</p>
                                                </div>
                                            </div>
                                        </Card>

                                        {/* CARD 2 (Same structure) */}
                                        <Card className="bg-gray-900 rounded-xl shadow-md hover:shadow-lg transition duration-300 flex flex-col scale-95">

                                            <div className="flex items-center gap-3 px-4 pt-3">
                                                <img
                                                    src="/images/profilepic.jpg"
                                                    alt="User Avatar"
                                                    className="w-10 h-10 rounded-full border border-gray-700 object-cover"
                                                />
                                                <p className="text-white font-semibold text-base">John Doe</p>
                                            </div>

                                            <img
                                                src="/images/blogdemo.png"
                                                alt="Project"
                                                className="rounded-lg w-full object-cover h-36 mt-3"
                                            />

                                            <div className="p-4 flex flex-col grow">
                                                <h5 className="text-xl font-semibold mb-2 text-white">
                                                    DevConnect Platform
                                                </h5>

                                                <p className="text-gray-300 mb-4 text-sm leading-relaxed grow">
                                                    A community platform for developers to showcase, sell, and get hired —
                                                    built using React and Express.
                                                </p>

                                                <p className="text-xs text-gray-400 font-mono tracking-wide mb-2">
                                                    Tech Stack: React, Node.js, MongoDB, Razorpay
                                                </p>

                                                <div className="mt-auto">
                                                    <p className="text-lg font-bold text-white">Price: $49</p>
                                                </div>
                                            </div>
                                        </Card>

                                    </div>

                                </TabItem>
                                <TabItem title="Users" icon={HiUserCircle}>
                                    <div className="flex flex-wrap gap-x-8 gap-y-6 justify-start">
                                        <div className="w-72">
                                            <Card className="flex m-0 p-4 items-center bg-gray-600">
                                                <div className="flex items-center space-x-4">
                                                    <img src="/images/profilepic.jpg" alt="" className="rounded" width="50px" />
                                                    <div>
                                                        <h5 className="font-bold tracking-tight text-white">Manu</h5>
                                                        <h6 className="text-white text-sm">manu@gmail.com</h6>
                                                    </div>
                                                </div>
                                            </Card>
                                        </div>
                                        <div className="w-72">
                                            <Card className="flex m-0 p-4 items-center bg-gray-600">
                                                <div className="flex items-center space-x-4">
                                                    <img src="/images/profilepic.jpg" alt="" className="rounded" width="50px" />
                                                    <div>
                                                        <h5 className="font-bold tracking-tight text-white">Manu</h5>
                                                        <h6 className="text-white text-sm">manu@gmail.com</h6>
                                                    </div>
                                                </div>
                                            </Card>
                                        </div>
                                        <div className="w-72">
                                            <Card className="flex m-0 p-4 items-center bg-gray-600">
                                                <div className="flex items-center space-x-4">
                                                    <img src="/images/profilepic.jpg" alt="" className="rounded" width="50px" />
                                                    <div>
                                                        <h5 className="font-bold tracking-tight text-white">Manu</h5>
                                                        <h6 className="text-white text-sm">manu@gmail.com</h6>
                                                    </div>
                                                </div>
                                            </Card>
                                        </div>
                                    </div>
                                </TabItem>
                            </Tabs>
                        </div>
                    </div>

                </div>
            </section>
        </>
    )
}

export default AdminPosts
