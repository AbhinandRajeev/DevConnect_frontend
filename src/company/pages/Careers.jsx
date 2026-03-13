import React, { useState } from 'react';
import { FiMapPin, FiX } from 'react-icons/fi';
import Header from '../../user/components/Header'
import DevConnectFooter from '../../components/DevConnectFooter';
import { AllJobsAPI, ApplyJobAPI } from '../../services/allAPIs';
import { useEffect } from 'react';
import { useContext } from 'react';
import { searchContext } from '../../ContextShareAPI/ContextShare';

function Careers() {
  const [token, setToken] = useState('')
  const [viewJobs, setViewJobs] = useState([])
  const { searchKey, setSearchKey } = useContext(searchContext)

  const [showModal, setShowModal] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null)
  const [form, setForm] = useState({
    name: "",
    qualification: "",
    email: "",
    phone: "",
    coverLetter: "",
    resume: null
  });

  console.log(form)

  const openModal = (id) => {
    setSelectedJobId(id)
    setShowModal(true);
  }

  const closeModal = () => {
    setShowModal(false);
    setSelectedJobId(null)
    setForm({ name: "", qualification: "", email: "", phone: "", coverLetter: "", resume: null });
  };

  const getAllJobs = async (searchKey, token) => {
    const updatedToken = token.replace(/"/g, "")
    const reqHeader = {
      Authorization: `Bearer ${updatedToken}`
    }
    try {
      const response = await AllJobsAPI(searchKey, reqHeader)
      console.log(response)
      if (response.status == 200) {
        setViewJobs(response.data)
      }
      else {
        alert(response.response.data)
      }
    }
    catch (err) {
      console.log("Error" + err)
    }
  }

  const handleApply = async (e) => {
    e.preventDefault()

    const { name, qualification, email, phone, coverLetter, resume } = form
    
    if (!name || !qualification || !email || !phone || !coverLetter || !resume) {
      alert("Please fill all the fields and upload your resume!")
      return
    }
    
    // Using FormData for file upload
    const reqBody = new FormData()
    reqBody.append("jobId", selectedJobId)
    reqBody.append("name", name)
    reqBody.append("qualification", qualification)
    reqBody.append("email", email)
    reqBody.append("phone", phone)
    reqBody.append("coverLetter", coverLetter)
    reqBody.append("resume", resume)

    const updatedToken = token.replace(/"/g, "")
    // Using multipart/form-data with token
    const reqHeader = {
      Authorization: `Bearer ${updatedToken}`,
      "Content-Type": "multipart/form-data",
    }
    
    try {
      const response = await ApplyJobAPI(reqBody, reqHeader)
      if (response.status === 200) {
        alert("Application submitted successfully!")
        closeModal()
      } else {
        alert("Failed to submit application: " + (response.response?.data || "Unknown Error"))
      }
    } catch (err) {
      console.log(err)
      alert("Error occurred while submitting application.")
    }
  }

  const handleReset = () => setForm({ name: "", qualification: "", email: "", phone: "", coverLetter: "", resume: null });

  useEffect(() => {
    const savedToken = sessionStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, [])

  useEffect(() => {
    if (token) {
      getAllJobs(searchKey, token);
    }
  }, [searchKey, token]);

  return (
    <>
      <Header />
      <div className="bg-gray-50 min-h-screen py-10 px-8">
        <h1 className="text-center text-4xl font-serif mb-3 text-gray-700">Careers</h1>
        <p className="text-center max-w-6xl mx-auto mb-10 text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio inventore placeat nemo voluptatem iure...
        </p>
        <div className="flex justify-center w-full mb-8">
          <input
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
            type="text"
            placeholder="Search"
            className="w-full max-w-md px-4 py-2 rounded-lg border border-gray-300 
      focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
        </div>


        <h2 className="text-2xl font-serif mb-8">Current openings</h2>
        <div className="max-w-3xl mx-auto space-y-6">

          {/* Job Card */}
          {
            viewJobs.length > 0 ?
              viewJobs.map(item => (
                <div className="bg-white border rounded shadow-sm p-5 flex justify-between items-center">
                  <div>
                    <div className="font-serif text-lg font-medium mb-2 text-gray-700">{item.title}</div>
                    <div className="flex items-center mb-2 text-blue-800 text-sm">
                      <FiMapPin className="mr-1" /> {item.location}
                    </div>
                    <div className="text-gray-700 text-sm">Job Type: {item.jobType}</div>
                    <div className="text-gray-700 text-sm">Salary: {item.salary}</div>
                    <div className="text-gray-700 text-sm mb-1">Qualification : {item.qualification}</div>
                    <div className="text-gray-700 text-sm">Experience: {item.experience}</div>
                    <div className="text-gray-700 text-sm">Description : {item.description}</div>
                  </div>

                  <button onClick={() => openModal(item._id)}

                    className="px-8 py-2 bg-[#4d5ac7] text-white rounded hover:bg-[#2a336e] font-serif flex items-center"
                  >
                    Apply

                  </button>
                </div>
              )) : "No jobs found"
          }

          {/* Modal */}
          {showModal && (
            <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-md flex items-center justify-center">
              <div className="bg-white rounded-xl shadow-lg w-full max-w-xl mx-auto overflow-hidden relative">
                {/* Modal Header */}
                <div className="bg-[#19213b] py-4 px-6 flex items-center justify-between">
                  <h3 className="text-2xl font-serif text-white">Application form</h3>
                  <button
                    onClick={closeModal}
                    className="text-white hover:text-yellow-400 text-2xl"
                    aria-label="Close"
                  >
                    <FiX />
                  </button>
                </div>
                {/* Modal Body */}
                <form className="px-6 py-8 space-y-4 bg-white" onSubmit={handleApply}>
                  <div className="grid grid-cols-2 gap-5">
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="p-2 border rounded text-gray-700 bg-gray-50 focus:outline-blue-300"
                      required
                    />
                    <input
                      type="text"
                      name="qualification"
                      placeholder="Qualification"
                      value={form.qualification}
                      onChange={(e) => setForm({ ...form, qualification: e.target.value })}
                      className="p-2 border rounded text-gray-700 bg-gray-50 focus:outline-blue-300"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-5">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Id"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="p-2 border rounded text-gray-700 bg-gray-50 focus:outline-blue-300"
                      required
                    />
                    <input
                      type="text"
                      name="phone"
                      placeholder="Phone"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="p-2 border rounded text-gray-700 bg-gray-50 focus:outline-blue-300"
                      required
                    />
                  </div>
                  <textarea
                    name="coverLetter"
                    placeholder="Cover Letter"
                    value={form.coverLetter}
                    onChange={(e) => setForm({ ...form, coverLetter: e.target.value })}
                    className="p-2 border rounded text-gray-700 bg-gray-50 focus:outline-blue-300 w-full"
                    rows={3}
                    required
                  />
                  <div>
                    <label className="block mb-2 text-gray-600 font-serif">Resume</label>
                    <div className="relative">
                      <input
                        type="file"
                        name="resume"
                        id="resume"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => setForm({ ...form, resume: e.target.files[0] })}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                      <div className="flex items-center border rounded-lg overflow-hidden bg-gray-50">
                        <label
                          htmlFor="resume"
                          className="bg-[#4d5ac7] text-white px-4 py-2 font-serif text-sm cursor-pointer hover:bg-[#2a336e] transition"
                        >
                          Choose File
                        </label>
                        <span className="px-3 py-2 text-gray-600 text-sm truncate">
                          {form.resume ? form.resume.name : "No file chosen"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-4 mt-6">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="bg-[#fd7e14] text-white font-serif px-5 py-2 rounded hover:bg-orange-500"
                    >
                      Reset
                    </button>
                    <button
                      type="submit"
                      className="bg-[#18bc5c] text-white font-serif px-5 py-2 rounded hover:bg-green-700"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>

      <DevConnectFooter />
    </>
  );
}

export default Careers;
