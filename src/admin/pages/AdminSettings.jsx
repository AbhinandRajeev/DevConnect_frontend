import React from 'react'
import AdminHeader from '../components/AdminHeader'
import AdminSideBar from "../components/AdminSideBar";
import { Button } from "flowbite-react";
import { FaUserEdit } from "react-icons/fa";

function AdminSettings() {
  return (
    <>
    <AdminHeader/>

    <section className='pt-30 ps-20'>
        <div className='flex'>
          <div className='w-64'>
            <AdminSideBar />
          </div>
          <div className='w-2/3 flex ps-10'>
            {/* Left Column */}
            <div className="w-1/2 pr-8 flex flex-col justify-center text-justify">
              <h1 className="text-center text-3xl font-serif mb-6">Settings</h1>
              <p className="font-serif mb-6 leading-relaxed text-gray-800">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis id maxime quia asperiores in cupiditate voluptatum quisquam nemo vitae odio, facilis aperiam. Ipsum incidunt labore asperiores! Blanditiis soluta fuga aut? Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed neque, facilis?
              </p>
              <p className="font-serif leading-relaxed text-gray-800">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis id maxime quia asperiores in cupiditate voluptatum quisquam nemo vitae odio, facilis aperiam. Ipsum incidunt labore asperiores! Blanditiis soluta fuga aut? Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed neque, facilis, consequatur quos eveniet inventore ipsam beatae iure fugiat eligendi quae laborum incidunt eum quis, est blanditiis exercitationem velit excepturi?
              </p>
            </div>
            {/* Right Column */}
            <div className="w-1/2 flex items-center justify-center">
              <div className="bg-blue-100 rounded-xl px-10 py-6 w-full">
                <div className="relative inline-block">
                  <img
                    src="/images/profilepic.jpg"
                    alt="Profile"
                    className="rounded-full w-40 h-40 object-cover ms-30"
                  />

                  <Button
                    color="blue"
                    className="absolute bottom-2 right-0"
                  >
                    <FaUserEdit />
                  </Button>
                </div>
                <form className="space-y-4">
                  <input type="text" className="block w-full rounded border p-2" placeholder="Ann" />
                  <input type="text" className="block w-full rounded border p-2" placeholder="admin123" />
                  <input type="text" className="block w-full rounded border p-2" placeholder="admin123" />
                  <div className="flex gap-3 mt-6">
                    <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded mr-2">
                      Reset
                    </button>
                    <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded">
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    
    </>
  )
}

export default AdminSettings
