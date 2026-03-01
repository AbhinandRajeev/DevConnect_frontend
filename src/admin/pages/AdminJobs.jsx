import React, { useEffect, useState } from 'react'
import AdminHeader from "../components/AdminHeader";
import AdminSideBar from "../components/AdminSideBar";
import { Button, Card } from "flowbite-react";
import { Tabs, TabItem, TextInput } from "flowbite-react";
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { MdDashboard, MdDelete } from "react-icons/md";
import { AllCompaniesAdminAPI, AllJobsAdminAPI } from '../../services/allAPIs';

function AdminJobs() {

  const [token, setToken] = useState('')

  const [allJobs, setAllJobs] = useState([])

  const [allCompanies, setAllCompanies] = useState([])

  const getAllJobs = async () => {
    const updatedToken = token.replace(/"/g, "")
    const reqHeader = {
      Authorization: `Bearer ${updatedToken}`
    }
    try {
      const response = await AllJobsAdminAPI(reqHeader)
      setAllJobs(response.data)
    }
    catch (err) {
      console.log("Err" + err)
    }
  }

  const getAllCompanies = async () => {
    const updatedToken = token.replace(/"/g, "")
    const reqHeader = {
      Authorization: `Bearer ${updatedToken}`
    }
    try {
      const response = await AllCompaniesAdminAPI(reqHeader)
      console.log(response)
      setAllCompanies(response.data)
    }
    catch (err) {
      console.log("Err" + err)
    }
  }

  useEffect(() => {
    setToken(sessionStorage.getItem('token'))
    if (token) {
      getAllJobs(token)
      getAllCompanies(token)
    }
  }, [token])

  return (
    <>
      <AdminHeader />

      <section className='pt-22'>
        <div className='flex'>
          <div className='w-64 '>
            <AdminSideBar />
          </div>

          <div className="mx-auto w-2/3">
            <h1 className="text-center text-2xl font-bold my-5">All Jobs</h1>

            <div className="flex flex-row justify-between my-10">
              <div className="">
                <div className='flex '>
                  <TextInput className='me-3' id="small" type="text" sizing="md" placeholder='Search By Title' />
                  <Button color='blue'>Search</Button>
                </div>
              </div>
            </div>

            <div className="bg-gray-200 p-8 rounded shadow">
              <Tabs aria-label="Full width tabs" variant="fullWidth">
                <TabItem active title="Job Posts" icon={MdDashboard}>
                  <div className="w-full space-y-5">
                    {
                      allJobs.length > 0 ?
                        allJobs.map(item => (
                          <Card className="w-full border border-[#232e3d] bg-[#232e3d] rounded shadow-sm px-4 py-3">
                            <div className="flex justify-between items-start">
                              <div className="w-full">
                                <div className="font-serif text-2xl font-semibold mb-1 text-white">{item.title}</div>
                                <hr className="mb-2 border-gray-400" />
                                <div className="flex items-center mb-1 text-blue-300 text-lg">
                                  <HiClipboardList className="mr-2" />
                                  <a href="#" className="underline">{item.location}</a>
                                </div>
                                <div className="text-gray-300 text-base mb-0.5">Job Type : {item.jobType}</div>
                                <div className="text-gray-300 text-base mb-0.5">Salary : {item.salary}</div>
                                <div className="text-gray-300 text-base mb-0.5">Qualification : {item.qualification}</div>
                                <div className="text-gray-300 text-base mb-0.5">Experience : {item.experience}</div>
                                <div className="text-gray-400 text-base mb-0.5">
                                  Description : {item.description}
                                </div>
                              </div>
                              <button
                                className="h-10 bg-[#a01c1c] text-white rounded px-5 flex items-center hover:bg-[#850808] font-medium ml-4 mt-1"
                              >
                                Delete
                                <MdDelete className="w-5 h-5 ml-2" />
                              </button>
                            </div>
                          </Card>
                        )) : "No Jobs found"
                    }
                  </div>
                </TabItem>

                <TabItem title="View Companies" icon={HiUserCircle}>
                  <div className="flex flex-wrap gap-x-8 gap-y-6 justify-start">
                    {
                      allCompanies.length > 0 ?
                        allCompanies.map(item => (
                          <div className="w-72" key={item._id}>
                            <Card className="flex m-0 p-4 items-center bg-gray-600">
                              <div className="flex items-center space-x-4">

                                <img
                                  src={item.profile ? item.profile : "/images/person2.jpg"}
                                  alt=""
                                  className="rounded w-12 h-12 object-cover"
                                />

                                <div>
                                  <h5 className="font-bold tracking-tight text-white">{item.username}</h5>
                                  <h6 className="text-white text-sm">{item.email}</h6>
                                </div>
                              </div>
                            </Card>
                          </div>
                        ))
                        : "No companies found"
                    }
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

export default AdminJobs
