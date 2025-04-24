import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const UserProfile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    address: "",
    profileImage: null,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...user });
  const [fullImage, setFullImage] = useState(null);
  const [popupMessage, setPopupMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        console.log("Access token not found");
        return;
      }

      try {
        const response = await fetch("http://localhost:7000/api/user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = await response.json();

        if (data?.data) {
          const { name, email, address, profileImage } = data.data;
          setUser({
            name,
            email,
            address: address || "No address provided", 
            profileImage,
          });
          setFormData({
            name,
            email,
            address: address || "No address provided",
            profileImage,
          });
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, [type]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      console.log("Access token not found");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:7000/api/user/change-details", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          name: formData.name,
          address: formData.address,
        }),
      });
      const data = await response.json();

      if (data?.data) {
        setPopupMessage(data.data);
        setUser({ ...formData }); 
        setIsEditing(false); 
      } else {
        setPopupMessage("Failed to update details.");
      }
    } catch (error) {
      console.error("Error updating details:", error);
      setPopupMessage("An error occurred while saving changes.");
    } finally {
      setLoading(false);
    }
  };

  const handleChangeProfileImage = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      console.log("Access token not found");
      return;
    }

    const formData = new FormData();
    formData.append("profileImage", user.profileImage); 

    setLoading(true); 

    try {
      const response = await fetch("http://localhost:7000/api/user/change-profileImage", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });
      const data = await response.json();

      if (data?.data) {
        setPopupMessage(data.data); 
        setUser((prev) => ({
          ...prev,
          profileImage: user.profileImage, 
        }));
      } else {
        setPopupMessage("Failed to update profile picture.");
      }
    } catch (error) {
      console.error("Error updating profile picture:", error);
      setPopupMessage("An error occurred while changing the profile picture.");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-purple-700 to-indigo-900 pb-20">
      <motion.div
        className="w-full max-w-lg bg-white shadow-2xl rounded-3xl overflow-hidden"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        
        <div className="relative w-full h-44 bg-gray-300 cursor-pointer">
          {user.profileImage ? (
            <motion.img
              src={user.profileImage}
              alt="Profile"
              className="w-full h-full object-cover"
              onClick={() => setFullImage(user.profileImage)}
            />
          ) : (
            <p className="text-gray-500 flex justify-center items-center h-full cursor-pointer">
              No Profile Picture
            </p>
          )}

         
          <div className="absolute bottom-[-40px] left-1/2 transform -translate-x-1/2 w-24 h-24">
            <motion.div
              className="w-24 h-24 rounded-full shadow-lg border-4 border-white bg-gray-300 overflow-hidden hover:scale-110 transition-transform"
              whileHover={{ scale: 1.1 }}
              onClick={() => user.profileImage && setFullImage(user.profileImage)}
            >
              {user.profileImage ? (
                <img
                  src={user.profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <p className="text-gray-500 flex items-center justify-center h-full text-xs cursor-pointer">
                  No Profile Picture
                </p>
              )}
            </motion.div>
          </div>
        </div>

        
        <div className="p-6 mt-12 text-center">
          <motion.h1
            className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-700 drop-shadow-lg"
            whileHover={{ scale: 1.1 }}
          >
            {user.name}
          </motion.h1>

          <motion.p
            className="text-lg text-gray-600 mt-2 hover:text-indigo-500 transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            {user.email}
          </motion.p>

         
          <motion.p className="text-md text-gray-600 mt-2">
            Address: {user.address}
          </motion.p>

        
          <motion.button
            onClick={() => setIsEditing(true)}
            className="mt-6 w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-lg hover:shadow-xl transition-transform transform hover:scale-110 cursor-pointer"
            whileHover={{ scale: 0.8 }}
          >
            Edit Profile
          </motion.button>
        </div>
      </motion.div>

    
      {isEditing && (
        <motion.div className="absolute bg-gradient-to-r from-blue-500 to-purple-600 pt-44 pl-28 pr-28 pb-7 flex items-center justify-center">
          <motion.div className="bg-white p-6 rounded-2xl shadow-lg w-96">
            <h2 className="text-2xl font-bold text-center mb-4">Edit Profile</h2>

            
            <label className="block text-sm font-semibold">Profile Picture</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "profileImage")}
              className="w-full p-2 border rounded mb-2"
            />

            
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded mb-2"
              placeholder="Name"
            />
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border rounded mb-2"
              placeholder="Email"
            />

         
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full p-2 border rounded mb-2"
              placeholder="Address"
            />

          
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>

            <div className="mt-4">
              <button
                onClick={handleChangeProfileImage}
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
              >
                Change Profile Image
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      
      {popupMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p>{popupMessage}</p>
            <button
              onClick={() => setPopupMessage("")}
              className="mt-4 bg-blue-500 text-white py-2 px-6 rounded-lg"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}

      {fullImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <img src={fullImage} alt="Full Size" className="max-w-full max-h-full rounded-lg" />
          <button
            className="absolute top-5 right-5 bg-white p-2 rounded-full shadow-lg cursor-pointer"
            onClick={() => setFullImage(null)}
          >
            X
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
//main