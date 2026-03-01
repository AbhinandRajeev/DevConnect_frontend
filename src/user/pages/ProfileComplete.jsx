import React from "react";

function ProfileComplete() {
  const skillsList = [
    "JavaScript",
    "React",
    "Node.js",
    "UI/UX Design",
    "Python",
    "MongoDB",
  ];

  return (
    <div className="min-h-screen bg-gray-100">

      
      <div className="w-full h-40 bg-linear-to-r from-gray-800 to-gray-900 rounded-b-3xl shadow-lg"></div>

     
      <div className="max-w-5xl mx-auto -mt-20 p-6 relative z-10">
        <div className="bg-white rounded-3xl shadow-xl p-10 border border-gray-200">

          
          <h1 className="text-4xl font-bold text-gray-900 text-center mb-12">
            Complete Your Profile
          </h1>

          
          <div className="flex flex-col items-center mb-14">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl">
              <img
                src="/images/profilepic.jpg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>

            <label className="mt-5 cursor-pointer bg-blue-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-blue-700 transition shadow-lg">
              Upload Photo
              <input type="file" className="hidden" />
            </label>
          </div>

          {/* Form */}
          <form className="grid grid-cols-1 md:grid-cols-2 gap-10">

            {/* Full Name */}
            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:outline-none"
                placeholder="John Doe"
              />
            </div>

           
            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Location
              </label>
              <input
                type="text"
                className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:outline-none"
                placeholder="Kochi, India"
              />
            </div>

            {/* Bio */}
            <div className="md:col-span-2">
              <label className="block mb-2 font-semibold text-gray-700">
                Bio
              </label>
              <textarea
                rows="4"
                className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:outline-none resize-none"
                placeholder="Tell us about yourself..."
              ></textarea>
            </div>

           
            <div className="md:col-span-2">
              <label className="block mb-2 font-semibold text-gray-700">
                Skills
              </label>

              <div className="flex flex-wrap gap-3">
                {skillsList.map((skill) => (
                  <span
                    key={skill}
                    className="px-5 py-2 rounded-xl bg-blue-100 text-blue-700 font-medium shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <p className="text-xs text-gray-500 mt-1">
                
              </p>
            </div>

            
            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Portfolio / Website
              </label>
              <input
                type="url"
                className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:outline-none"
                placeholder="https://yourwebsite.com"
              />
            </div>

            
            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                GitHub
              </label>
              <input
                type="url"
                className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:outline-none"
                placeholder="https://github.com/username"
              />
            </div>

            
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full bg-green-500 text-white py-4 rounded-xl text-xl font-bold hover:bg-green-600 transition shadow-lg"
              >
                Save Profile
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfileComplete;
