import React, { useState } from 'react';
import { FiMapPin, FiX } from 'react-icons/fi';
import Header from '../../user/components/Header'
import DevConnectFooter from '../../components/DevConnectFooter';
import { AllJobsAPI } from '../../services/allAPIs';
import { useEffect } from 'react';
import { useContext } from 'react';
import { searchContext } from '../../ContextShareAPI/ContextShare';

function Careers() {
  const [token, setToken] = useState('')
  const [viewJobs, setViewJobs] = useState([])
  const { searchKey, setSearchKey } = useContext(searchContext)

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

                  <button
                    
                    className="px-8 py-2 bg-[#4d5ac7] text-white rounded hover:bg-[#2a336e] font-serif flex items-center"
                  >
                    Apply

                  </button>
                </div>
              )) : "No jobs found"
          }

        </div>
      </div>

      <DevConnectFooter />
    </>
  );
}

export default Careers;
