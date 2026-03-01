import React from "react";
import { Link, useLocation } from "react-router-dom";
import { MdDashboard, MdArticle, MdWork, MdSettings } from "react-icons/md";

function AdminSideBar() {
  const location = useLocation();

  return (
    <div className="fixed left-0 top-10 h-screen w-64 bg-linear-to-b from-gray-900 to-gray-800 shadow-xl flex flex-col text-white">

      {/* Logo Section */}
      <div className="flex flex-col items-center py-10 border-b border-gray-700">
        {/* <img
          src="/images/adminlogo.webp"
          alt="Admin"
          className="w-28 h-28 object-cover rounded-full shadow-lg"
        /> */}
        <h1 className="text-2xl font-extrabold mt-4 tracking-wide">Admin Panel</h1>
      </div>

      {/* Menu */}
      <div className="flex flex-col mt-6 px-5 space-y-2">

        {/* Dashboard */}
        <Link to="/admin-home">
          <div
            className={`flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-all ${
              location.pathname === "/admin-home"
                ? "bg-gray-700 text-white shadow-lg"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            }`}
          >
            <MdDashboard size={22} />
            <span className="font-medium tracking-wide">Dashboard</span>
          </div>
        </Link>

        {/* All Posts */}
        <Link to="/admin-posts">
          <div
            className={`flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-all ${
              location.pathname === "/admin-posts"
                ? "bg-gray-700 text-white shadow-lg"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            }`}
          >
            <MdArticle size={22} />
            <span className="font-medium tracking-wide">All Posts</span>
          </div>
        </Link>

        {/* All Jobs */}
        <Link to="/admin-jobs">
          <div
            className={`flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-all ${
              location.pathname === "/admin-jobs"
                ? "bg-gray-700 text-white shadow-lg"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            }`}
          >
            <MdWork size={22} />
            <span className="font-medium tracking-wide">All Jobs</span>
          </div>
        </Link>

        {/* Settings */}
        <Link to="/admin-settings">
          <div
            className={`flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-all ${
              location.pathname === "/admin-settings"
                ? "bg-gray-700 text-white shadow-lg"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            }`}
          >
            <MdSettings size={22} />
            <span className="font-medium tracking-wide">Settings</span>
          </div>
        </Link>

      </div>
    </div>
  );
}

export default AdminSideBar;
