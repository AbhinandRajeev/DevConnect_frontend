import React from "react";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { Link } from "react-router-dom";
import { HiUserCircle } from "react-icons/hi";

function AdminHeader() {
  return (
    <div className="fixed top-0 left-0 w-full z-50 shadow-lg">
      {/* Modern Gradient Header Background */}
      <div className="absolute inset-0 bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 opacity-95 backdrop-blur-xl"></div>

      <Navbar fluid rounded className="relative z-10 px-6 py-4">
        {/* Brand */}
        <NavbarBrand href="#">
          <span className="self-center whitespace-nowrap text-2xl font-extrabold tracking-wide text-white">
            DevConnect
          </span>
        </NavbarBrand>

        {/* Right Section */}
        <div className="flex md:order-2 items-center gap-3">
          {/* Logout Button */}
          <Link to={"/login"}>
            <Button
              color="blue"
              className="bg-blue-600 hover:bg-blue-700 border-none shadow-md px-4 py-2"
            >
              <HiUserCircle className="me-2 h-5 w-5" />
              Log Out
            </Button>
          </Link>

          <NavbarToggle className="text-white" />
        </div>

        
      </Navbar>
    </div>
  );
}

export default AdminHeader;
