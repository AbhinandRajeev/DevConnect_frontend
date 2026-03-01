import React, { useState } from "react";
import {
  Button,
  Drawer,
  DrawerHeader,
  DrawerItems,
  Label,
  Textarea,
  TextInput,
} from "flowbite-react";
import { FaUserEdit } from "react-icons/fa";

function CompanyProfileEdit() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  return (
    <>
      <Button color="blue" onClick={() => setIsOpen(true)}>
        Edit Profile
      </Button>

      <Drawer open={isOpen} onClose={handleClose}>
        <DrawerHeader title="Edit Company Profile" />
        <DrawerItems>
          <form>
            {/* Company Logo */}
            <div className="relative inline-block mb-6">
              <img
                src="/images/company.jpg"
                alt="Company Logo"
                className="rounded-full w-40 h-40 object-cover bg-gray-200 ms-15"
              />
              <label className="absolute bottom-2 right-0 cursor-pointer bg-blue-600 p-2 rounded-full shadow">
                <FaUserEdit className="text-white" />
                <input type="file" className="hidden" />
              </label>
            </div>

            {/* Company Name */}
            <div className="mb-6">
              <Label htmlFor="companyName" className="mb-2 block">
                Company Name
              </Label>
              <TextInput
                id="companyName"
                placeholder="Ex: TechWave Solutions Pvt Ltd"
              />
            </div>

            
            {/* Description */}
            <div className="mb-6">
              <Label htmlFor="description" className="mb-2 block">
                Company Description
              </Label>
              <Textarea
                id="description"
                rows={4}
                placeholder="Tell us about your company — mission, vision, services..."
              />
            </div>

            {/* Headquarters */}
            <div className="mb-6">
              <Label htmlFor="location" className="mb-2 block">
                Headquarters Location
              </Label>
              <TextInput
                id="location"
                placeholder="Ex: Bangalore, India"
              />
            </div>

            {/* Website */}
            <div className="mb-6">
              <Label htmlFor="website" className="mb-2 block">
                Company Website
              </Label>
              <TextInput id="website" placeholder="https://company.com" />
            </div>

            {/* Contact Email */}
            <div className="mb-6">
              <Label htmlFor="email" className="mb-2 block">
                Contact Email
              </Label>
              <TextInput
                id="email"
                placeholder="contact@company.com"
                type="email"
              />
            </div>

            
            {/* Buttons */}
            <div className="flex justify-evenly">
              <Button color="gray" type="button">
                Reset
              </Button>
              <Button color="blue" type="submit">
                Update
              </Button>
            </div>
          </form>
        </DrawerItems>
      </Drawer>
    </>
  );
}

export default CompanyProfileEdit;
