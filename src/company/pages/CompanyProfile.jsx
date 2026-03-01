import React from 'react'
import { useState, useEffect } from "react";
import { Tabs, TabItem, Card, Button, Modal, TextInput } from "flowbite-react";
import { HiUserCircle, HiClipboardList } from "react-icons/hi";
import { MdDelete, MdDashboard } from "react-icons/md";
import { FaGithub, FaGlobe, FaMapMarkerAlt } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import Header from '../../user/components/Header';
import CompanyProfileEdit from '../components/CompanyProfileEdit';
import { AddJobAPI, CompanyJobsAPI, DeleteJobsAPI } from '../../services/allAPIs';


function CompanyProfile() {

  const [token, setToken] = useState('')

  const [jobs, setJobs] = useState([])

  const [userData, setUserData] = useState({})

  const [jobDetails, setJobDetails] = useState({
    title: "",
    location: "",
    jobType: "",
    salary: "",
    qualification: "",
    experience: "",
    description: ""
  })

  const [openModal, setOpenModal] = useState(false);

  const addJob = async () => {
    console.log(jobDetails)
    if (
      jobDetails.title == "" ||
      jobDetails.location == "" ||
      jobDetails.jobType == "" ||
      jobDetails.salary == "" ||
      jobDetails.qualification == "" ||
      jobDetails.experience == "" ||
      jobDetails.description == ""
    ) {
      alert('Please fill the form')
    }
    else {
      const updatedToken = token.replace(/"/g, "")
      const reqHeader = {
        Authorization: `Bearer ${updatedToken}`
      }
      try {
        const response = await AddJobAPI(jobDetails, reqHeader)
        console.log(response)
        if (response.status == 200) {
          alert(response.data.message)
          setOpenModal(false)
          getCompanyJobs(token)
        }
        else {
          alert(response.response.data)
        }
      }
      catch (err) {
        console.log("Error" + err)
      }

    }
  }

  const getCompanyJobs = async (token) => {
    const updatedToken = token.replace(/"/g, "")
    const reqHeader = {
      Authorization: `Bearer ${updatedToken}`
    }
    try {
      const response = await CompanyJobsAPI(reqHeader)
      console.log(response)
      setJobs(response.data)
    }
    catch (err) {
      console.log("Error" + err)
    }
  }

  const handleDelete = async (id) => {
    console.log("Delete id" + id)
    const updatedToken = token.replace(/"/g, "")
    const reqHeader = {
      Authorization: `Bearer ${updatedToken}`
    }

    try {
      const response = await DeleteJobsAPI(id, reqHeader)
      console.log(response)
      alert(response.data.message)
      getCompanyJobs(token)
    }
    catch (err) {
      console.log("Error" + err)
    }
  }


  useEffect(() => {
    const savedToken = sessionStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      getCompanyJobs(token);
    }
  }, [token]);

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("userDetails"))
    if (storedUser) {
      setUserData(storedUser)
    }
  }, [])

  return (
    <>
      <Header />

      <section className="px-24 pt-10 bg-neutral-50">
        <div className="bg-white rounded-2xl shadow ring-1 ring-gray-100">

          {/* Header banner (dark gradient) */}
          <div className="h-28 w-full rounded-t-2xl bg-linear-to-r from-slate-900 via-slate-800 to-slate-700"></div>

          {/* Content Row */}
          <div className="px-8 pb-6 -mt-14 flex flex-col md:flex-row items-start md:items-center gap-6">

            {/* Company Logo */}
            <div className="shrink-0">
              <div className="rounded-full bg-white p-2 shadow-lg ring-8 ring-white">
                <img
                  src="/images/company.jpg"
                  alt="Company Logo"
                  className="rounded-full w-32 h-32 object-cover"
                  width={128}
                  height={128}
                />
              </div>
            </div>

            {/* Company Name + Meta */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                  {userData.username}
                </h1>

                <img
                  src="/images/bluetick.png"
                  alt="Verified Company"
                  className="h-6 w-6"
                  width={24}
                  height={24}
                />
              </div>

              <p className="mt-2 text-slate-600">
                Innovative software development company specializing in cloud engineering,
                Full stack development, and enterprise-scale digital transformation.
              </p>

              {/* Quick links */}
              <div className="mt-3 flex flex-wrap items-center gap-4 text-slate-600">

                <a
                  className="inline-flex items-center gap-2 hover:text-slate-900"
                  href="https://technova.com"
                  target="_blank" rel="noreferrer"
                >
                  <FaGlobe /> technova.com
                </a>

                <a
                  className="inline-flex items-center gap-2 hover:text-slate-900"
                  href="mailto:contact@technova.com"
                >
                  <FaEnvelope /> contact@technova.com
                </a>


                <span className="inline-flex items-center gap-2 text-slate-600">
                  <FaMapMarkerAlt /> Kochi, Kerala
                </span>
              </div>
            </div>

            {/* Admin Actions */}
            <div className="flex items-center gap-3 self-start md:self-center">
              {/* <EditProfile /> */}
              <Button onClick={() => setOpenModal(true)} color='blue'>Add</Button>
              <CompanyProfileEdit />
            </div>
          </div>
        </div>
      </section>

      <section className="p-5 px-8 mt-10">


        <div className="">

          <Modal show={openModal} onClose={() => setOpenModal(false)} size="md" className="z-50">
            <div className="bg-gray-900 rounded-t px-8 py-5 flex items-center justify-between w-[600px] mx-auto">
              <span className="text-white text-2xl">Application form</span>
              <button
                className="text-white text-2xl hover:text-red-400"
                onClick={() => setOpenModal(false)}
                aria-label="Close"
              >
                &times;
              </button>
            </div>
            <div className="bg-white px-8 py-6 rounded-b w-[600px] mx-auto">
              <form>
                <input onChange={(e) => setJobDetails({ ...jobDetails, title: e.target.value })} className="w-full border border-gray-300 rounded px-4 py-2 mb-3 focus:outline-none" placeholder="Job Title" />
                <input onChange={(e) => setJobDetails({ ...jobDetails, location: e.target.value })} className="w-full border border-gray-300 rounded px-4 py-2 mb-3 focus:outline-none" placeholder="Location" />
                <input onChange={(e) => setJobDetails({ ...jobDetails, jobType: e.target.value })} className="w-full border border-gray-300 rounded px-4 py-2 mb-3 focus:outline-none" placeholder="Job Type" />
                <input onChange={(e) => setJobDetails({ ...jobDetails, salary: e.target.value })} className="w-full border border-gray-300 rounded px-4 py-2 mb-3 focus:outline-none" placeholder="Salary" />
                <input onChange={(e) => setJobDetails({ ...jobDetails, qualification: e.target.value })} className="w-full border border-gray-300 rounded px-4 py-2 mb-3 focus:outline-none" placeholder="Qualification" />
                <input onChange={(e) => setJobDetails({ ...jobDetails, experience: e.target.value })} className="w-full border border-gray-300 rounded px-4 py-2 mb-3 focus:outline-none" placeholder="Experience" />
                <textarea onChange={(e) => setJobDetails({ ...jobDetails, description: e.target.value })} className="w-full border border-gray-300 rounded px-4 py-2 mb-3 focus:outline-none" placeholder="Description" rows={2}></textarea>
              </form>
              <div className="flex justify-end space-x-3 mt-2">
                <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded mr-2">
                  Reset
                </button>
                <button onClick={addJob} className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded">
                  Add Job
                </button>
              </div>
            </div>
          </Modal>
        </div>

        {/* Tabs */}
        <div className="bg-gray-200 p-8 rounded shadow max-w-7xl mx-auto">
          <Tabs aria-label="Full width tabs" variant="fullWidth">
            <TabItem active title="Job Posts" icon={MdDashboard}>
              <div className="w-full space-y-5">
                {
                  jobs.length > 0 ?
                    jobs.map(item => (
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
                            onClick={() => handleDelete(item._id)}
                            className="h-10 bg-[#a01c1c] text-white rounded px-5 flex items-center hover:bg-[#850808] font-medium ml-4 mt-1"
                          >
                            Delete
                            <MdDelete className="w-5 h-5 ml-2" />
                          </button>
                        </div>
                      </Card>
                    )) : "No jobs found"
                }
              </div>
            </TabItem>

            <TabItem title="View Applicants" icon={HiUserCircle}>
              <div className="flex flex-wrap gap-x-8 gap-y-6 justify-start">
                <div className="w-72">
                  <Card className="flex m-0 p-4 items-center bg-gray-600">
                    <div className="flex items-center space-x-4">
                      <img src="/images/book1.jpg" alt="" className="rounded" width="50px" />
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
                      <img src="/images/book1.jpg" alt="" className="rounded" width="50px" />
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
                      <img src="/images/book1.jpg" alt="" className="rounded" width="50px" />
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

      </section>

    </>
  )
}

export default CompanyProfile
