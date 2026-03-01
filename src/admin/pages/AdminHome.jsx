import React from 'react'
import AdminHeader from "../components/AdminHeader";
import AdminSideBar from "../components/AdminSideBar";
import { Button, Card } from "flowbite-react";

function AdminHome() {
  return (
    <div>
      <AdminHeader />
      <section className='pt-22'>
        <div className='flex'>
          <div className='w-64 '>
            <AdminSideBar />
          </div>

          <div className='w-2/3 '>
            <div className='flex flex-row  justify-evenly p-10 '>

              <div className='basis-2xs'>
                <Card className="max-w-sm w-40 h-30 m-5">
                  <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Users
                  </h5>  
                </Card>
              </div>

              <div className='basis-2xs'>
                <Card className="max-w-sm w-40 h-30 m-5">
                  <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Companies
                  </h5>  
                </Card>
              </div>

              {/* <div className='basis-2xs'>
                <Card className="max-w-sm w-40 h-30 m-5">
                  <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Noteworthy 2021
                  </h5>  
                </Card>
              </div> */}

              <div className='basis-2xs'>
                <Card className="max-w-sm w-40 h-30 m-5">
                  <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Posts
                  </h5>  
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AdminHome
