import React from 'react';
import { useState } from 'react';
import { CgProfile } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';
import { GoogleloginAPI, loginAPI, registerAPI } from '../services/allAPIs';
import { ToastContainer, toast } from 'react-toastify';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'

function Auth({ register }) {
  const navigate = useNavigate();

  const [googleRole, setGoogleRole] = useState("");

  const [userData, setUserData] = useState({ username: "", email: "", password: "", role: "" })

  const handleRegister = async () => {
    console.log(userData)

    if (!userData.username || !userData.email || !userData.password || !userData.role) {
      toast.warn('Please fill the form', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    else {
      try {
        const response = await registerAPI(userData);
        console.log(response)
        if (response.status === 201) {
          //alert("registration Successfull")
          toast.success('Resistration Successfull', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });

          setUserData({ username: '', email: '', password: '', role: '' })

          setTimeout(() => {
            navigate('/login')
          }, 4000)
        }
        else {
          toast.error('Account already exists...', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          console.log(response.response.data.message)
        }
      }
      catch (err) {
        console.log(err)
      }
    }

  }

  const handleLogin = async () => {

    if (!userData.email || !userData.password) {
      toast.warn('Please fill the form', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    else {
      try {
        const response = await loginAPI(userData)
        console.log(response)
        if (response.status === 200) {

          sessionStorage.setItem('token', JSON.stringify(response.data.token))

          if (response.data.user) {
            sessionStorage.setItem("UserDetails", JSON.stringify(response.data.user))
          }
          else if (response.data.company) {
            sessionStorage.setItem("UserDetails", JSON.stringify(response.data.company))
          }
          //alert("registration Successfull")
          toast.success('Login Successfull', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });

          if (response.data.user) {
            sessionStorage.setItem('userDetails', JSON.stringify(response.data.user));
          } else if (response.data.company) {
            sessionStorage.setItem('userDetails', JSON.stringify(response.data.company));
          }


          if (response.data.user?.role === "admin") {
            setTimeout(() => {
              navigate('/admin-home')
            }, 4000)
          }
          else if (response.data.company?.role === "company") {
            setTimeout(() => {
              navigate('/company-profile')
            }, 4000)
          }
          else if (response.data.user?.role === "user") {
            setTimeout(() => {
              navigate('/')
            }, 4000)
          }

          setUserData({ email: '', password: '' })
        }
        else {
          toast.error('Invalid details', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          console.log(response.response.data.message)
        }
      }
      catch (err) {
        console.log(err)
      }
    }

  }

  const handleGoogleLogin = async (credentialResponse) => {
    if (!googleRole) {
      toast.error("Please select account type before continuing!", {
        position: "top-center"
      })
      return;
    }

    const decoded = jwtDecode(credentialResponse.credential);
    console.log("Decoded Google Data:", decoded);

    const reqBody = {
      email: decoded.email,
      username: decoded.name,
      profile: decoded.picture,
      role: googleRole,
      password: "google-oauth"
    };

    try {
      const response = await GoogleloginAPI(reqBody);
      console.log("Google Auth Response:", response);

      if (response.status === 200 || response.status === 201) {

        toast.success('Login Successfull', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        sessionStorage.setItem("token", JSON.stringify(response.data.token));

        const account =
          response.data.user || response.data.company;

        sessionStorage.setItem("userDetails", JSON.stringify(account) )

        setTimeout(() => {
          if (googleRole === "company") {
            navigate("/company-profile");
          } else {
            navigate("/");
          }
        }, 4000);
      }
    } catch (err) {
      console.log(err);
      toast.error("Google Authentication Failed.");
    }
  }



  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">

        <div className="absolute top-0 left-0 w-full h-40 bg-linear-to-r from-gray-800 to-gray-900 rounded-b-3xl shadow-lg"></div>

        {/* Auth Card */}
        <div className="relative z-10 bg-white shadow-xl border border-gray-200 rounded-3xl px-8 py-8 w-full max-w-md">


          <div className="flex justify-center mb-2">
            <CgProfile size={55} className="text-black drop-shadow" />
          </div>


          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-4 tracking-wide">
            {register ? "Create Account" : "Welcome Back"}
          </h2>

          {/* Form */}
          <form className="space-y-4">

            {register && (
              <>
                {/* Username */}
                <div>
                  <label className="block mb-1 font-semibold text-gray-700">Username</label>
                  <input
                    onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                    type="text"
                    placeholder="Enter username"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 
                  focus:ring-2 focus:ring-gray-900 focus:outline-none"
                  />
                </div>


                <div>
                  <label className="block mb-1 font-semibold text-gray-700">Role</label>
                  <select
                    onChange={(e) => setUserData({ ...userData, role: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300
                  focus:ring-2 focus:ring-gray-900 focus:outline-none required:"
                  >
                    <option value="">Select a role</option>
                    <option value="user">user</option>
                    <option value="company">company</option>
                  </select>
                </div>
              </>
            )}

            {/* Email */}
            <div>
              <label className="block mb-1 font-semibold text-gray-700">Email</label>
              <input
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 
              focus:ring-2 focus:ring-gray-900 focus:outline-none"
              />
            </div>


            <div>
              <label className="block mb-1 font-semibold text-gray-700">Password</label>
              <input
                onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                type="password"
                placeholder="Enter password"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 
              focus:ring-2 focus:ring-gray-900 focus:outline-none"
              />
            </div>

            {/* Submit Button */}
            {register ?
              <button
                onClick={handleRegister}
                type="button"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl 
              font-bold text-lg shadow-md transition"
              >
                Register
              </button>
              :
              <button
                onClick={handleLogin}
                type="button"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl 
              font-bold text-lg shadow-md transition"
              >
                Login
              </button>
            }

            {/* GOOGLE ROLE SELECTION */}
            <div>
              <label className="block mb-1 font-semibold text-gray-700">Login as</label>

              <select
                onChange={(e) => setGoogleRole(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 
    focus:ring-2 focus:ring-gray-900 focus:outline-none"
              >
                <option value="">Select role</option>
                <option value="user">user</option>
                <option value="company">company</option>
              </select>
            </div>


            <div>
              <GoogleLogin onClick={() => handleGoogleLogin(credentialResponse)}
                onSuccess={credentialResponse => {
                  console.log(credentialResponse);
                  handleGoogleLogin(credentialResponse)
                }}
                onError={() => {
                  console.log('Login Failed');
                }}
              />
            </div>
          </form>


          <div className="mt-5 text-center text-gray-600 text-sm">
            {register ? (
              <p>
                Already have an account?{" "}
                <button
                  onClick={() => navigate("/login")}
                  className="text-blue-700 font-semibold hover:underline"
                >
                  Login
                </button>
              </p>
            ) : (
              <p>
                New here?{" "}
                <button
                  onClick={() => navigate("/register")}
                  className="text-blue-700 font-semibold hover:underline"
                >
                  Register
                </button>
              </p>
            )}
          </div>
        </div>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default Auth;
