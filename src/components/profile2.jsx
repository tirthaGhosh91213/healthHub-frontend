import React, { useState } from "react";
import { motion } from "framer-motion";

const UserProfile = () => {
  const [user, setUser] = useState({
    name: "Tirtha Ghosh",
    email: "ghoshtirtha1234@gmail.com",
    totalFriends: 150,
    studies: "Computer Science at XYZ University",
    locality: "Kolkata, India",
    livePlace: "Bangalore, India",
    gender: "Male",
    dob: "1998-05-20",
    profilePicture: null,
    backgroundImage: null,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...user });
  const [fullImage, setFullImage] = useState(null);

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

  const handleSaveChanges = () => {
    setUser(formData);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-purple-700 to-indigo-900">
      <motion.div
        className="w-full max-w-lg bg-white shadow-2xl rounded-3xl overflow-hidden"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative w-full h-44 bg-gray-300">
          {user.backgroundImage ? (
            <motion.img
              src={user.backgroundImage}
              alt="Background"
              className="w-full h-full object-cover cursor-pointer"
              onClick={() => setFullImage(user.backgroundImage)}
            />
          ) : (
            <p className="text-gray-500 flex justify-center items-center h-full">
              No Background Image
            </p>
          )}
          <div className="absolute bottom-[-40px] left-1/2 transform -translate-x-1/2 w-24 h-24">
            <motion.div
              className="w-24 h-24 rounded-full shadow-lg border-4 border-white bg-gray-300 overflow-hidden hover:scale-110 transition-transform cursor-pointer"
              whileHover={{ scale: 1.1 }}
              onClick={() => user.profilePicture && setFullImage(user.profilePicture)}
            >
              {user.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <p className="text-gray-500 flex items-center justify-center h-full text-xs">
                  No Profile Picture
                </p>
              )}
            </motion.div>
          </div>
        </div>

        <div className="p-6 mt-12 text-center">
          <motion.h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-700 drop-shadow-lg">
            {user.name}
          </motion.h1>

          <motion.p className="text-lg text-gray-600 mt-2 hover:text-indigo-500 transition-colors">
            {user.email}
          </motion.p>

          <motion.button
            onClick={() => setIsEditing(true)}
            className="mt-6 w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-lg hover:shadow-xl transition-transform transform hover:scale-110"
          >
            Edit Profile
          </motion.button>
        </div>
      </motion.div>

      {isEditing && (
        <motion.div className=" inset-0 bg-blue-600 pt-32 bg-opacity-50 flex items-center justify-center">
          <motion.div className="bg-white p-6 rounded-2xl shadow-lg w-96">
            <h2 className="text-2xl font-bold text-center mb-4">Edit Profile</h2>
            <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, "profilePicture")} className="w-full p-2 border rounded mb-2" />
            <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, "backgroundImage")} className="w-full p-2 border rounded mb-2" />
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full p-2 border rounded mb-2" placeholder="Name" />
            <div className="flex justify-between mt-4">
              <button onClick={() => setIsEditing(false)} className="bg-gray-400 text-white px-4 py-2 rounded-lg">Cancel</button>
              <button onClick={handleSaveChanges} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Save</button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {fullImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <img src={fullImage} alt="Full Size" className="max-w-full max-h-full rounded-lg" />
          <button className="absolute top-5 right-5 bg-white p-2 rounded-full shadow-lg" onClick={() => setFullImage(null)}>X</button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
