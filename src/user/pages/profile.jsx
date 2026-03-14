import React from "react";
import { Tabs, TabItem, Card, Button } from "flowbite-react";
import { HiUserCircle, HiAdjustments } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { FiUpload } from "react-icons/fi";
import EditProfile from "../components/EditProfile";
import Header from "../components/Header";
import { FaGithub, FaGlobe, FaFileAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import AddProject from "../components/AddProject";
import { Link } from 'react-router-dom';
import { getUserAPI, ProfilePostAPI, UserApplicationsAPI } from "../../services/allAPIs";
import ProfileProjectCard from "../components/ProfileProjectCard";
import { jwtDecode } from "jwt-decode";


function Profile() {
    const [openModal, setOpenModal] = useState(false);

    const [token, setToken] = useState('')
    const [myPost, setMyPost] = useState([])
    const [myApplications, setMyApplications] = useState([])
    const [userData, setUserData] = useState({
        skills: []
    })

    const getUserIdFromToken = (token) => {
        try {
            const decoded = jwtDecode(token.replace(/"/g, ""));
            console.log("Decoded token:", decoded); 
            return decoded.userId;
        } catch (err) {
            console.log("Invalid token", err);
            return null;
        }
    };


    const getProfilePost = async (token) => {
        const updatedToken = token.replace(/"/g, "")
        const reqHeader = {
            Authorization: `Bearer ${updatedToken}`
        }

        try {
            const response = await ProfilePostAPI(reqHeader)
            console.log(response)
            setMyPost(response.data)
        }
        catch (err) {
            console.log("Err" + err)
        }
    }

    const getProfileImage = (profile) => {
        if (profile && profile.startsWith("http")) {
            return profile;
        }

        if (profile) {
            return `http://localhost:3000/uploads/${profile}?t=${Date.now()}`;
        }

        return "/images/profilepic.jpg";
    };

    const getUserData = async (token, userId) => {
        const updatedToken = token.replace(/"/g, "")
        const reqHeader = {
            Authorization: `Bearer ${updatedToken}`
        }
        try {
            const response = await getUserAPI(userId, reqHeader)
            console.log(response)
            setUserData(response.data)

        }
        catch (err) {
            console.log("Err" + err)
        }
    }

    const getUserApplications = async (token) => {
        const updatedToken = token.replace(/"/g, "")
        const reqHeader = {
            Authorization: `Bearer ${updatedToken}`
        }
        try {
            const response = await UserApplicationsAPI(reqHeader)
            console.log("User Applications:", response.data)
            if (response.status === 200) {
                setMyApplications(response.data)
            }
        }
        catch (err) {
            console.log("Error fetching applications", err)
        }
    }




    useEffect(() => {
        const savedToken = sessionStorage.getItem("token");

        if (savedToken) {
            setToken(savedToken);

            // posts
            getProfilePost(savedToken);

            // user profile
            const userId = getUserIdFromToken(savedToken);
            if (userId) {
                getUserData(savedToken, userId);
            }

            // job applications
            getUserApplications(savedToken);
        }
    }, []);


    return (
        <>
            <Header />

            {/* Profile Header */}
            <section className="px-24 pt-10 bg-neutral-50">
                <div className="bg-white rounded-2xl shadow ring-1 ring-gray-100">
                    {/* Header banner */}
                    <div className="h-28 w-full rounded-t-2xl bg-linear-to-r from-slate-900 via-slate-800 to-slate-700"></div>

                    {/* Content row */}
                    <div className="px-8 pb-6 -mt-20 flex flex-col md:flex-row items-start md:items-center gap-6">

                        {/* Avatar */}
                        <div className="shrink-0">
                            <div className="rounded-full bg-white p-2 shadow-lg ring-8 ring-white">
                                <img
                                    src={getProfileImage(userData.profile)}
                                    alt="Profile"
                                    className="rounded-full w-32 h-32 object-cover"
                                />


                            </div>
                        </div>

                        {/* Name + meta */}
                        <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-3">
                                <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                                    {userData?.username}
                                </h1>

                                <img
                                    src="/images/bluetick.png"
                                    alt="Verified"
                                    className="h-6 w-6"
                                    width={24}
                                    height={24}
                                />
                            </div>



                            {/* Quick links */}
                            <div className="mt-3 flex flex-wrap items-center gap-4 text-slate-600">
                                <a className="inline-flex items-center gap-2 hover:text-slate-900" href="https://github.com/johndoe" target="_blank" rel="noreferrer">
                                    <FaGithub />{userData?.github || "github.com/johndoe"}
                                </a>
                                <a className="inline-flex items-center gap-2 hover:text-slate-900" href="https://johndoe.dev" target="_blank" rel="noreferrer">
                                    <FaGlobe />{userData?.portfolio || "johndoe.dev"}
                                </a>

                            </div>
                        </div>

                        {/* Edit + Add Buttons */}
                        <div className="flex items-center gap-3 self-start md:self-center">
                            <EditProfile userData={userData} setUserData={setUserData} />

                            {/* Add Post Button */}
                            <AddProject />

                            {/* Modal */}

                        </div>
                    </div>
                </div>
            </section>


            <section className="px-24 py-8 bg-neutral-50">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 bg-white rounded-xl shadow p-6 ring-1 ring-gray-100">
                        <h2 className="text-xl font-semibold mb-3">Bio</h2>
                        <p className="text-slate-700">
                            {userData?.bio || "Not added a bio yet."}
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow p-6 ring-1 ring-gray-100">
                        <h2 className="text-xl font-semibold mb-3">Skills</h2>
                        <div className="flex flex-wrap gap-2">
                            {
                                userData.skills.length > 0 ?
                                    userData.skills.map((skill) => (
                                        <span key={skill} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">{skill}</span>
                                    )) : "No skills added yet."
                            }
                        </div>
                    </div>
                </div>
            </section>


            {/* Tabs Section */}
            <section className="p-5 px-8 mt-10">
                <div className="overflow-x-auto bg-gray-200 p-5 rounded shadow">
                    <Tabs aria-label="Full width tabs" variant="fullWidth">
                        {/* Projects */}
                        <TabItem active title="Projects" icon={HiUserCircle}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-0 max-w-7xl mx-auto">

                                {
                                    myPost.length > 0 ?
                                        myPost.map((post) => (
                                            <ProfileProjectCard key={post._id} post={post} refreshPosts={() => getProfilePost(token)} />
                                        )) : "No Posts..."
                                }


                            </div>

                        </TabItem>


                        <TabItem title="Job Applications" icon={MdDashboard}>
                            {myApplications.length > 0 ? (
                                myApplications.map((app) => (
                                    <div key={app._id} className="bg-white rounded-2xl p-6 mb-5 border border-slate-200 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_30px_-12px_rgba(0,0,0,0.15)] transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden group">
                                        
                                        {/* Status Accent Bar */}
                                        <div className="absolute top-0 left-0 w-1.5 h-full bg-yellow-400"></div>
                                        
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 ml-4">
                                            
                                            {/* Company & Role Info */}
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-1">
                                                    <h4 className="text-xl font-extrabold text-slate-900 tracking-tight leading-none group-hover:text-[#0A66C2] transition-colors">{app.companyId?.username || "Unknown Company"}</h4>
                                                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 text-xs font-bold tracking-wider uppercase">
                                                        {app.jobId?.type || "Full-Time"}
                                                    </span>
                                                </div>
                                                <h5 className="text-lg font-semibold text-slate-700 mb-3">{app.jobId?.title || "Unknown Role"}</h5>
                                                
                                                <div className="flex items-center gap-4 text-sm text-slate-500 font-medium">
                                                    <div className="flex items-center gap-1.5">
                                                        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                                        Applied: {new Date(app.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Application Status Badge */}
                                            <div className="shrink-0 flex items-center self-start md:self-center">
                                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-yellow-50 border border-yellow-200 shadow-xs">
                                                    <span className="relative flex h-2.5 w-2.5">
                                                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                                                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-yellow-500"></span>
                                                    </span>
                                                    <span className="text-sm font-bold text-yellow-700 tracking-wide uppercase">
                                                        Pending Review
                                                    </span>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-10 bg-white rounded-xl border border-gray-100 shadow-sm">
                                    <h3 className="text-xl font-semibold text-slate-800 mb-2">No Job Applications Yet</h3>
                                    <p className="text-slate-500 mb-5">You haven't applied to any roles on the marketplace.</p>
                                    <Link to="/careers">
                                        <Button color="blue" className="mx-auto">
                                            Explore Careers
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </TabItem>

                        {/* Purchase History */}
                        {/* <TabItem title="Purchase History" icon={HiAdjustments}>
                            <Card className="w-full">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h5 className="text-xl font-bold">E-Commerce Clone</h5>
                                        <p>Seller: Jane Smith</p>
                                        <p>Date: 2025-10-15</p>
                                        <p>Price: $49</p>
                                    </div>
                                    <img src="/images/project3.png" alt="Project" width={120} />
                                </div>
                            </Card>
                            <Card className="w-full mt-4">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h5 className="text-xl font-bold">Blog CMS</h5>
                                        <p>Seller: DevTeam</p>
                                        <p>Date: 2025-09-30</p>
                                        <p>Price: $29</p>
                                    </div>
                                    <img src="/images/project4.png" alt="Project" width={120} />
                                </div>
                            </Card>
                        </TabItem> */}
                    </Tabs>
                </div>
            </section>
        </>
    );
}

export default Profile;
