import React from 'react';
import { useState } from 'react';
import { CgProfile } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';
import { GoogleloginAPI, loginAPI, registerAPI } from '../services/allAPIs';
import { ToastContainer, toast } from 'react-toastify';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import Prism from '../user/components/Prism';

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
        
        // Ensure profile is correctly assigned if available from Google
        if (!account.profile && decoded.picture) {
           account.profile = decoded.picture;
        }

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
      <div className="min-h-screen bg-white flex">

        {/* Left Side - Visual/Branding (Hidden on mobile) */}
        <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between items-start p-12 overflow-hidden bg-black">
          
          {/* Prism Background */}
          <div className="absolute inset-0 z-0">
              <Prism
                  animationType="hover"
                  timeScale={0.5}
                  height={3.5}
                  baseWidth={5.5}
                  scale={3.6}
                  hueShift={0}
                  colorFrequency={1}
                  noise={0}
                  glow={1}
              />
          </div>
          
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/40 to-black/80 pointer-events-none z-0" />

          {/* Logo or Brand */}
          <div className="relative z-10 flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
             <span className="text-white text-3xl font-black tracking-tight drop-shadow-md">
                Dev<span className="text-[#0A66C2]">Connect</span>
             </span>
          </div>

          <div className="relative z-10 w-full max-w-md mt-auto mb-10">
             <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-tight text-white drop-shadow-xl mb-6">
                {register ? "Join the developer network." : "Welcome back, developer."}
             </h1>
             <p className="text-white/80 text-lg leading-relaxed">
                {register 
                  ? "Create an account to showcase your projects, sell your applications, and connect with top companies."
                  : "Sign in to manage your portfolio, explore the marketplace, and discover new opportunities."}
             </p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 md:p-16 lg:p-20 bg-[#F3F2EF] lg:bg-white relative">
          
          {/* Mobile Back to Home - Only visible on small screens */}
          <button 
             onClick={() => navigate('/')}
             className="absolute top-6 left-6 lg:hidden flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors font-medium text-sm z-10"
          >
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
             Back to Home
          </button>

          <div className="w-full max-w-md bg-white lg:bg-transparent rounded-3xl lg:rounded-none p-8 lg:p-0 shadow-2xl lg:shadow-none border border-gray-100 lg:border-none relative z-10">
            
            {/* Header */}
            <div className="mb-10 text-center lg:text-left">
              <div className="inline-flex lg:hidden justify-center mb-6">
                 <div className="w-16 h-16 rounded-2xl bg-[#E8F4F8] flex items-center justify-center border border-[#CEE7F0] shadow-sm">
                    <CgProfile size={32} className="text-[#0A66C2]" />
                 </div>
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {register ? "Create an account" : "Log in to your account"}
              </h2>
              <p className="mt-3 text-slate-600 text-sm font-medium">
                {register ? "Enter your details to get started." : "Welcome back! Please enter your details."}
              </p>
            </div>

            {/* Form */}
            <form className="space-y-5">
              
              {register && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Username */}
                  <div className="col-span-1">
                    <label className="block mb-2 text-sm font-semibold text-slate-700">Username</label>
                    <input
                      onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                      type="text"
                      placeholder="e.g. johndoe"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 
                    focus:ring-2 focus:ring-[#0A66C2]/20 focus:border-[#0A66C2] focus:bg-white outline-none transition-all placeholder:text-slate-400 text-slate-900"
                    />
                  </div>

                  {/* Role */}
                  <div className="col-span-1">
                    <label className="block mb-2 text-sm font-semibold text-slate-700">I am a</label>
                    <select
                      onChange={(e) => setUserData({ ...userData, role: e.target.value })}
                      defaultValue=""
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 
                    focus:ring-2 focus:ring-[#0A66C2]/20 focus:border-[#0A66C2] focus:bg-white outline-none transition-all text-slate-900 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M5%208l5%205%205-5%22%20stroke%3D%22%2364748b%22%20stroke-width%3D%222%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:right_1rem_center]"
                    >
                      <option value="" disabled>Select role</option>
                      <option value="user">Developer</option>
                      <option value="company">Company</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Email */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-slate-700">Email Address</label>
                <input
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  type="email"
                  placeholder="name@company.com"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 
                focus:ring-2 focus:ring-[#0A66C2]/20 focus:border-[#0A66C2] focus:bg-white outline-none transition-all placeholder:text-slate-400 text-slate-900"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-slate-700">Password</label>
                <div className="relative">
                   <input
                     onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                     type="password"
                     placeholder="••••••••"
                     className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 
                   focus:ring-2 focus:ring-[#0A66C2]/20 focus:border-[#0A66C2] focus:bg-white outline-none transition-all placeholder:text-slate-400 text-slate-900"
                   />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                 <button
                   onClick={register ? handleRegister : handleLogin}
                   type="button"
                   className="w-full bg-[#0A66C2] hover:bg-[#004182] active:scale-[0.99] text-white py-3.5 rounded-xl 
                 font-semibold text-base shadow-[0_4px_10px_rgba(10,102,194,0.3)] hover:shadow-[0_6px_15px_rgba(10,102,194,0.4)] transition-all flex justify-center items-center gap-2"
                 >
                   {register ? "Create Account" : "Sign In"}
                 </button>
              </div>

              {/* Divider */}
              <div className="flex items-center my-6">
                 <div className="flex-1 border-t border-slate-200"></div>
                 <span className="px-4 text-sm text-slate-400 font-medium bg-transparent">Or continue with</span>
                 <div className="flex-1 border-t border-slate-200"></div>
              </div>
              
              {/* GOOGLE ROLE SELECTION */}
              
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 mb-4 transition-all hover:bg-slate-100/50">
                  <label className="block mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">Select Role for Google Auth</label>
                  <select
                    onChange={(e) => setGoogleRole(e.target.value)}
                    defaultValue=""
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 
                  focus:ring-2 focus:ring-[#0A66C2]/20 focus:border-[#0A66C2] outline-none transition-all text-slate-900 text-sm appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M4%206l4%204%204-4%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:right_0.75rem_center]"
                  >
                    <option value="" disabled>Select an account type</option>
                    <option value="user">Developer</option>
                    <option value="company">Company</option>
                  </select>
                  
                  <div className="mt-4 flex justify-center w-full">
                    <GoogleLogin 
                      onSuccess={credentialResponse => {
                        console.log(credentialResponse);
                        handleGoogleLogin(credentialResponse)
                      }}
                      onError={() => {
                        console.log('Login Failed');
                      }}
                      shape="pill"
                      theme="filled_blue"
                    />
                  </div>
                </div>

            </form>

            <div className="mt-8 text-center text-slate-600 text-sm font-medium">
              {register ? (
                <p>
                  Already have an account?{" "}
                  <button
                    onClick={() => navigate("/login")}
                    className="text-[#0A66C2] font-semibold hover:text-[#004182] transition-colors ml-1"
                  >
                    Log in
                  </button>
                </p>
              ) : (
                <p>
                  Don't have an account?{" "}
                  <button
                    onClick={() => navigate("/register")}
                    className="text-[#0A66C2] font-semibold hover:text-[#004182] transition-colors ml-1"
                  >
                    Sign up
                  </button>
                </p>
              )}
            </div>

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
