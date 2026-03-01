import React, { useState, useEffect } from "react";
import { Button } from "flowbite-react";
import { FaGlobe } from "react-icons/fa";
import Header from "../components/Header";
import DevConnectFooter from "../../components/DevConnectFooter";
import { useParams } from "react-router-dom";
import { getAPostAPI, makePaymentAPI } from "../../services/allAPIs";
import { loadStripe } from '@stripe/stripe-js';

function ProjectDetails() {

  const [token, setToken] = useState("");
  const [postData, setPostData] = useState({});
  const { id } = useParams();

  const getImageUrl = (img) => {
    if (!img) return "/images/person.jpg";
    if (img.startsWith("http")) return img;
    return `http://localhost:3000/uploads/${img}`;
  };

  const getProfileUrl = (profile) => {
    if (!profile) return "/images/profilepic.jpg";
    if (profile.startsWith("http")) return profile;
    return `http://localhost:3000/uploads/${profile}`;
  };


  const getAPost = async (id) => {
    const updatedToken = token?.replace(/"/g, "");
    const reqHeader = {
      Authorization: `Bearer ${updatedToken}`
    };
    try {
      const response = await getAPostAPI(id, reqHeader);
      console.log(response);
      setPostData(response.data);
    } catch (err) {
      console.log("Error" + err);
    }
  }

  // payment
  const makepayment = async () => {
    console.log(postData);

    const stripe = await loadStripe("pk_test_51Scf6Q86MoERQbcMpgsQXUeFxX1tz6H7d3dV8fXEssNbEkFxCSgfoGjSNffseJgmMaXOrD22OxndpCitH6ikf8y300X79yc0yU");
    console.log(stripe);

    const updatedToken = token?.replace(/"/g, "");
    const reqHeader = {
      Authorization: `Bearer ${updatedToken}`,
    };

    const reqBody = { postDetails: postData };

    try {
      const response = await makePaymentAPI(reqBody, reqHeader);

      const checkoutUrl = response.data.url;
      window.location.href = checkoutUrl;
    }
    catch (err) {
      console.log("Payment error:", err);
    }
  };



  useEffect(() => {
    const savedToken = sessionStorage.getItem("token");
    if (savedToken) setToken(savedToken);
  }, []);


  useEffect(() => {
    if (token) getAPost(id);
  }, [token]);

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gray-950 text-white p-8">
        <div className="max-w-5xl mx-auto">

          {/* MAIN PROJECT IMAGE */}
          <img
            src={getImageUrl(postData?.image?.[0])}
            alt="Project Banner"
            className="w-full h-72 object-cover rounded-xl shadow-lg mb-6"
          />

          {/* USER PROFILE */}
          <div className="flex items-center gap-4 mb-6">
            <img
              src={getProfileUrl(postData?.userId?.profile)}
              alt="User Avatar"
              className="w-14 h-14 rounded-full border border-gray-700 object-cover"
            />
            <div>
              <p className="text-xl font-semibold">{postData?.userId?.username}</p>
              <p className="text-gray-400 text-sm">Project Author</p>
            </div>
          </div>

          {/* TITLE + PRICE */}
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold">{postData.title}</h1>
            <span className="text-3xl font-bold bg-green-600 px-4 py-2 rounded-lg shadow">
              ₹{postData.price}
            </span>
          </div>

          {/* DESCRIPTION */}
          <p className="mt-6 text-gray-300 text-lg leading-relaxed">
            {postData.description}
          </p>

          {/* TECH STACK */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Technologies Used:</h2>

            <div className="flex gap-2 flex-wrap">
              {postData.techStack?.length > 0 ? (
                postData.techStack.map((tech, index) => (
                  <span
                    key={index}
                    className="bg-gray-800 px-3 py-1 rounded-full"
                  >
                    {tech}
                  </span>
                ))
              ) : (
                <span className="text-gray-400">No tech stack added</span>
              )}
            </div>
          </div>

          {/* LINKS */}
          <div className="mt-8 flex items-center gap-6">
            {postData.liveLink && (
              <a
                href={postData.liveLink}
                className="flex items-center gap-2 text-gray-300 hover:text-white"
                target="_blank"
              >
                <FaGlobe /> Live Demo
              </a>
            )}
          </div>

          {/* BUY BUTTON */}
          <div className="mt-12">
            <Button
              onClick={makepayment}
              color="green"
              className="w-full text-xl py-3 bg-green-600 hover:bg-green-700"
            >
              Buy Now
            </Button>
          </div>

        </div>
      </div>

      <DevConnectFooter />
    </>
  );
}

export default ProjectDetails;
