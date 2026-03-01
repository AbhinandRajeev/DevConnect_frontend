import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import ProjectCard from '../components/ProjectCard';
import DevConnectFooter from '../../components/DevConnectFooter';
import Header from '../components/Header';
import { AllPostAPI } from '../../services/allAPIs';
import { searchContext } from '../../ContextShareAPI/ContextShare';

function AllProjects() {

    const [token, setToken] = useState('')

    const [allPosts, setAllPosts] = useState([])

    const { searchKey, setSearchKey } = useContext(searchContext)
    console.log(searchKey)

    const getAllPosts = async (searchKey, token) => {

        const updatedToken = token.replace(/"/g, "")
        const reqHeader = {
            Authorization: `Bearer ${updatedToken}`
        }

        try {
            const response = await AllPostAPI(searchKey, reqHeader)
            console.log(response)
            setAllPosts(response.data)
        }
        catch (err) {
            console.log("Error" + err)
        }
    }

    useEffect(() => {
        const savedToken = setToken(sessionStorage.getItem('token'))
        if (savedToken) {
            setToken(savedToken)
        }
    }, [])

    useEffect(() => {
        if (token) {
            getAllPosts(searchKey, token);
        }
    }, [searchKey, token]);

    return (
        <>
            <Header />
            {
                token ?
                    <div className="min-h-screen bg-[#F3F2EF]">
                        {/* Main Content Container */}
                        <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                            {/* Page Header */}
                            <div className=" mb-8">
                                <h1 className='text-3xl font-semibold text-gray-900 mb-2'>Projects</h1>
                                <p className="text-gray-600 text-sm">Discover and explore projects from the community</p>
                            </div>

                            {/* Search Section */}
                            <div className="mb-8">
                                <div className="max-w-2xl">
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                        </div>
                                        <input
                                            value={searchKey}
                                            onChange={(e) => setSearchKey(e.target.value)}
                                            type="text"
                                            placeholder="Search projects..."
                                            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all duration-200 text-gray-900 placeholder-gray-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Projects Grid */}
                            <section>
                                <div className="flex">
                                    <div className="flex-1">
                                        {allPosts.length > 0 ? (
                                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                                {allPosts.map((post) => (
                                                    <ProjectCard key={post._id} post={post} refreshPosts={() => getAllPosts(searchKey, token)} />
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                                                <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <p className="text-gray-600 text-lg font-medium">No projects found</p>
                                                <p className="text-gray-500 text-sm mt-2">Try adjusting your search criteria</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div> :
                    <div className="min-h-screen bg-[#F3F2EF] flex flex-col justify-center items-center p-6">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 max-w-md text-center">
                            <div className="mb-6">
                                <img
                                    src="/images/padlock.gif"
                                    alt="Lock"
                                    className="h-48 mx-auto"
                                />
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Access Restricted</h2>
                            <p className="text-gray-600 mb-6">
                                Please{' '}
                                <Link to={'/login'} className="text-blue-600 hover:text-blue-700 font-medium underline">
                                    Login
                                </Link>
                                {' '}to see what users are posting...
                            </p>
                        </div>
                    </div>
            }

            <DevConnectFooter />
        </>
    )
}

export default AllProjects
