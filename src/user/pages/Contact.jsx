import React from 'react'
import { FiMapPin, FiPhone, FiMail } from 'react-icons/fi';
import Header from '../components/Header';
import DevConnectFooter from '../../components/DevConnectFooter'

function Contact() {
  return (
    <>
      <Header/>
      <div className="bg-white min-h-screen flex flex-col items-center py-8 px-4">
        <h1 className=" text-4xl font-serif font-semibold mb-4">Contacts</h1>
        <p className="text-center  mb-10 text-gray-700 text-2xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio inventore placeat nemo voluptatem iure, iste asperiores quia amet sint, similique corrupti praesentium delectus nesciunt odit laudantium. Beatae repudiandae amet odit! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta, doloremque ullam itaque atque totam quasi molestias cumque ducimus fuga voluptate suscipit vel distinctio omnis voluptates obcaecati quidem quas iure? Facere?
        </p>

        {/* Contact Info Section */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-14 mb-10 w-full">
          <div className="flex flex-col items-center min-w-[180px]">
            <span className="mb-2">
              <FiMapPin className="w-8 h-8 text-gray-400" />
            </span>
            <div className="text-center text-gray-700 text-sm">
              <span className="font-bold">123 Main Street</span>, Apt 4B,<br /><span className="font-bold">Anytown, CA 91234</span>
            </div>
          </div>
          <div className="flex flex-col items-center min-w-[180px]">
            <span className="mb-2">
              <FiPhone className="w-8 h-8 text-gray-400" />
            </span>
            <div className="text-center text-gray-700 text-sm">
              <span className="font-bold">+91 9874561230</span>
            </div>
          </div>
          <div className="flex flex-col items-center min-w-[180px]">
            <span className="mb-2">
              <FiMail className="w-8 h-8 text-gray-400" />
            </span>
            <div className="text-center text-gray-700 text-sm">
              <a href="mailto:bookstore@gmail.com" className="font-bold hover:underline">bookstore@gmail.com</a>
            </div>
          </div>
        </div>

        {/* Form & Map Row */}
        <div className="flex flex-col md:flex-row w-full max-w-4xl mx-auto gap-8">
          {/* Contact Form */}
          <div className="bg-gray-100 p-7 rounded-md flex-1 flex flex-col justify-center shadow">
            <h2 className="text-lg font-medium mb-4 text-center">Send me Message</h2>
            <form className="flex flex-col gap-4">
              <input type="text" placeholder="Name" className="p-2 rounded border border-gray-300 focus:outline-none" />
              <input type="email" placeholder="Email Id" className="p-2 rounded border border-gray-300 focus:outline-none" />
              <textarea placeholder="Message" rows={5} className="p-2 rounded border border-gray-300 focus:outline-none"></textarea>
              <button type="submit" className="bg-gray-900 text-white py-2 rounded font-medium hover:bg-gray-800 flex items-center justify-center gap-2">
                Send
              </button>
            </form>
          </div>
          {/* Embedded Map */}
          <div className="flex-1 flex items-center justify-center">
            <iframe
              title="location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.098726898475!2d76.33451181451839!3d9.978537292877832!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080d577d9a9931%3A0xa998167e1b446a63!2sKakkanad%2C%20Kerala!5e0!3m2!1sen!2sin!4v1633709421461!5m2!1sen!2sin"
              width="100%"
              height="330"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              className="rounded-md shadow-md"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
      <DevConnectFooter/>
    </>
  )
}

export default Contact
