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
import { getUserAPI, ProfilePostAPI } from "../../services/allAPIs";
import ProfileProjectCard from "../components/ProfileProjectCard";
import { jwtDecode } from "jwt-decode";


function Profile() {
    const [openModal, setOpenModal] = useState(false);

    const [token, setToken] = useState('')
    const [myPost, setMyPost] = useState([])
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
                            <Card className="w-full">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h5 className="text-xl font-bold">TechCorp</h5>
                                        <p>Role: Frontend Developer</p>
                                        <p>Status: Shortlisted</p>
                                        <p>Applied On: 2025-11-01</p>
                                    </div>
                                </div>
                            </Card>
                            <Card className="w-full mt-4">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h5 className="text-xl font-bold">InnovateX</h5>
                                        <p>Role: Full Stack Developer</p>
                                        <p>Status: Pending</p>
                                        <p>Applied On: 2025-10-25</p>
                                    </div>
                                </div>
                            </Card>
                        </TabItem>

                        {/* Purchase History */}
                        <TabItem title="Purchase History" icon={HiAdjustments}>
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
                        </TabItem>
                    </Tabs>
                </div>
            </section>
        </>
    );
}

export default Profile;
