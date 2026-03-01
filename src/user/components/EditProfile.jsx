import { Button, Drawer, DrawerHeader, DrawerItems, Label, Textarea, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { useEffect } from "react";
import { FaUserEdit } from "react-icons/fa";
import { updateUserAPI } from "../../services/allAPIs";

function EditProfile({ userData, setUserData }) {
  const [isOpen, setIsOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const handleClose = () => {
    setIsOpen(false);
    setPreviewImage(null);
  };

  const allSkills = ["JavaScript", "React", "Node.js", "MongoDB", "UI/UX", "Python", "Express.js", "Tailwind css", "Django", "Flask", "C++", "Java", "AWS", "Docker", "Kubernetes"];


  const [formData, setFormData] = useState({
    username: "",
    bio: "",
    skills: [],
    github: "",
    portfolio: "",
    linkedin: "",
    profile: null
  });

  const getProfileImageUrl = (profile) => {
    // Google login image
    if (profile && profile.startsWith("http")) {
      return profile;
    }
    // Uploaded image
    if (profile) {
      return `http://localhost:3000/uploads/${profile}`;
    }
    // Default fallback image
    return "/images/profilepic.jpg";
  };

  useEffect(() => {
    if (userData) {
      setFormData({
        username: userData.username || "",
        bio: userData.bio || "",
        skills: userData.skills || [],
        github: userData.github || "",
        portfolio: userData.portfolio || "",
        linkedin: userData.linkedin || "",
        profile: null
      });
      setPreviewImage(null);
    }
  }, [userData]);

  const toggleSkill = (skill) => {
    setFormData(prev => {
      const alreadySelected = prev.skills.includes(skill);

      return {
        ...prev,
        skills: alreadySelected
          ? prev.skills.filter(s => s !== skill) // remove
          : [...prev.skills, skill]              // add
      };
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, profile: file }));
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async () => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      alert("No token found");
      return;
    }

    const reqHeader = {
      Authorization: `Bearer ${token.replace(/"/g, "")}`,
      "Content-Type": "multipart/form-data"
    };

    const data = new FormData();
    data.append("username", formData.username);
    data.append("bio", formData.bio);
    data.append("github", formData.github);
    data.append("portfolio", formData.portfolio);
    data.append("linkedin", formData.linkedin);

    // skills must be stringified
    data.append("skills", JSON.stringify(formData.skills));

    if (formData.profile) {
      data.append("profile", formData.profile);
    }

    try {
      const response = await updateUserAPI(data, reqHeader);
      if (response && response.status === 200) {
        // Update parent component's userData
        if (setUserData) {
          setUserData(response.data);
        }
        alert("Profile updated successfully");
        setIsOpen(false);
        setPreviewImage(null);
      } else {
        alert("Update failed: " + (response?.data?.message || "Unknown error"));
      }
    } catch (err) {
      console.log(err);
      alert("Update failed: " + (err?.response?.data?.message || err?.message || "Unknown error"));
    }
  };



  return (
    <>
      <Button color="blue" onClick={() => setIsOpen(true)}>
        Edit Profile
      </Button>

      <Drawer open={isOpen} onClose={handleClose}>
        <DrawerHeader title="Edit Profile" />
        <DrawerItems>
          <form>
            {/* Profile Image */}
            <div className="relative inline-block mb-6">
              <img
                src={previewImage || getProfileImageUrl(userData?.profile)}
                alt="Profile Preview"
                className="rounded-full w-40 h-40 object-cover bg-gray-200 border-4 border-white shadow-lg"
              />
              <label htmlFor="profile-upload" className="absolute bottom-2 right-0 cursor-pointer bg-blue-500 hover:bg-blue-600 p-2 rounded-full shadow-lg transition">
                <FaUserEdit className="text-white" />
                <input
                  id="profile-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>

            {/* Name */}
            <div className="mb-6">
              <Label htmlFor="name" className="mb-2 block">
                Full Name
              </Label>
              <TextInput value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} id="name" name="name" placeholder="John Doe" />
            </div>

            {/* Bio */}
            <div className="mb-6">
              <Label htmlFor="bio" className="mb-2 block">
                Bio
              </Label>
              <Textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                id="bio"
                name="bio"
                rows={4}
                placeholder="Full Stack MERN Developer passionate about building apps."
              />
            </div>


            {/* Skills */}
            <div className="flex flex-wrap gap-2">
              {allSkills.map(skill => {
                const isSelected = formData.skills.includes(skill);

                return (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => toggleSkill(skill)}
                    className={`px-4 py-2 rounded-full font-medium transition
                     ${isSelected
                        ? "bg-blue-600 text-white"
                        : "bg-blue-100 text-blue-700 hover:bg-blue-200"}`}>
                    {skill}
                  </button>
                );
              })}</div>



            {/* GitHub & Portfolio */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <Label htmlFor="github" className="mb-2 block">
                  GitHub
                </Label>
                <TextInput value={formData.github} onChange={(e) => setFormData({ ...formData, github: e.target.value })} id="github" name="github" placeholder="https://github" />
              </div>
              <div>
                <Label htmlFor="portfolio" className="mb-2 block">
                  Portfolio
                </Label>
                <TextInput value={formData.portfolio} onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })} id="portfolio" name="portfolio" placeholder="" />
              </div>

              <div>
                <Label htmlFor="Linkedin" className="mb-2 block">
                  LinkedIn
                </Label>
                <TextInput value={formData.linkedin} onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })} id="linkedin" name="linkedin" placeholder="LinkedIn" />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-evenly">
              <Button color="gray" type="button">
                Reset
              </Button>
              <Button onClick={handleUpdate} color="blue" type="button">
                Update
              </Button>
            </div>
          </form>
        </DrawerItems>
      </Drawer>
    </>
  );
}

export default EditProfile;
