import React, { useEffect, useState } from "react";
import {
  Button,
  Label,
  TextInput,
  Textarea,
  Modal,
  ModalHeader,
  ModalBody
} from "flowbite-react";
import { AddPostAPI } from "../../services/allAPIs";

function AddProject() {
  const [openModal, setOpenModal] = useState(false);

  const [postDetails, setPostDetails] = useState({
    title: "",
    description: "",
    techStack: "",
    price: "",
    liveLink: "",
    image: [],
    video: []
  })

  const [imagePreview, setImagePreview] = useState([]);
  const [videoPreview, setVideoPreview] = useState(null);

  // To hold token
  const [token, setToken] = useState('')

  const { title, description, techStack, price, liveLink, image, video } = postDetails


  const handleImagePreview = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 3) {
      alert("You can upload a maximum of 3 images.");
      return;
    }

    setPostDetails({ ...postDetails, image: files });
    setImagePreview(files.map((file) => URL.createObjectURL(file)));
  }

  const handleVideoPreview = (e) => {
    const file = e.target.files[0];

    setPostDetails({ ...postDetails, video: file ? [file] : [] });
    setVideoPreview(file ? URL.createObjectURL(file) : null);
  }

  // add post
  const handleAddPost = async () => {
    console.log(postDetails)

    if (title == "" || description == "" || techStack == "" || price == "" || liveLink == "") {
      alert("Please fill all fields");
      return;
    }

    const hasImages = image.length > 0;
    const hasVideos = video.length > 0;

    if (!hasImages && !hasVideos) {
      alert("Please upload at least one image or one video.");
      return;
    }

    // get token
    const updatedToken = token.replace(/"/g, "")
    const reqHeader = {
      Authorization: `Bearer ${updatedToken}`
    }
    // define reqBody
    const reqBody = new FormData()
    // reqBody.append
    for (let key in postDetails) {
      if (key !== "image" && key !== "video") {
        reqBody.append(key, postDetails[key]);
      }
    }

    // Append images
    postDetails.image.forEach((file) => {
      reqBody.append("image", file);
    });

    // Append videos
    postDetails.video.forEach((file) => {
      reqBody.append("video", file);
    });

    const response = await AddPostAPI(reqBody, reqHeader)
    console.log(response)
    alert("Post Added")

    handleReset();
    setOpenModal(false);

  }

  const handleReset = () => {
    setPostDetails({
      title: "",
      description: "",
      techStack: "",
      price: "",
      liveLink: "",
      image: [],
      video: []
    });

    setImagePreview([]);
    setVideoPreview(null);
  };


  useEffect(() => {
    setToken(sessionStorage.getItem('token'))
  }, [])


  return (
    <>
      <Button color="blue" onClick={() => setOpenModal(true)}>
        Add Project
      </Button>

      <Modal show={openModal} size="lg" onClose={() => setOpenModal(false)} popup>
        <ModalHeader />
        <ModalBody className="bg-gray-900 text-white p-6 rounded-b-lg">

          <h3 className="text-2xl font-bold text-center mb-6">Add New Project</h3>

          <form className="space-y-4">

            {/* Title */}
            <div>
              <Label value="Project Title" />
              <TextInput value={postDetails.title} onChange={(e) => setPostDetails({ ...postDetails, title: e.target.value })} placeholder="Enter project title" />
            </div>

            {/* Description */}
            <div>
              <Label value="Project Description" />
              <Textarea value={postDetails.description} onChange={(e) => setPostDetails({ ...postDetails, description: e.target.value })} rows={4} placeholder="Describe your project..." />
            </div>

            {/* Tech Stack */}
            <div>
              <Label value="Technologies Used" />
              <TextInput value={postDetails.techStack} onChange={(e) => setPostDetails({ ...postDetails, techStack: e.target.value })} placeholder="React, Node, MongoDB..." />
            </div>

            <div>
              <Label value="Live Link" />
              <TextInput value={postDetails.liveLink} onChange={(e) => setPostDetails({ ...postDetails, liveLink: e.target.value })} placeholder="Live link" />
            </div>

            {/* Price */}
            <div>
              <Label value="Price ($)" />
              <TextInput value={postDetails.price} onChange={(e) => setPostDetails({ ...postDetails, price: e.target.value })} type="number" placeholder="Enter price" />
            </div>

            {/* MULTIPLE IMAGES */}
            <div>
              <Label value="Upload Images (max 3)" />
              <input

                type="file"
                multiple
                onChange={handleImagePreview}
                className="block w-full mt-1 bg-gray-800 text-white p-2 rounded"
              />

              {/* IMAGE PREVIEW */}
              {imagePreview.length > 0 && (
                <div className="flex gap-3 mt-3 flex-wrap">
                  {imagePreview.map((src, index) => (
                    <img
                      key={index}
                      src={src}
                      alt="Preview"
                      className="h-20 w-20 object-cover rounded border border-gray-600"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* VIDEO */}
            <div>
              <Label value="Upload Video" />
              <input

                type="file"
                accept="video/*"
                onChange={handleVideoPreview}
                className="block w-full mt-1 bg-gray-800 text-white p-2 rounded"
              />

              {/* VIDEO PREVIEW */}
              {videoPreview && (
                <video
                  src={videoPreview}
                  controls
                  className="mt-3 w-full max-h-60 rounded border border-gray-600"
                />
              )}
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-6">
              <Button color="gray" onClick={() => setOpenModal(false)}>
                Close
              </Button>
              <Button onClick={handleReset} color="red" type="button">
                Reset
              </Button>
              <Button onClick={handleAddPost} color="green" type="button">
                Add
              </Button>
            </div>

          </form>

        </ModalBody>
      </Modal>
    </>
  );
}

export default AddProject;
