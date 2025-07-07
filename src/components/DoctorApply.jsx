import React, { useState } from 'react';

const DoctorApply = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    education: '',
    experiences: '',
    registrationNumber: '',
    licenseDocument: null,
    hospitalIdImage: null,
  });

  const [popupMessage, setPopupMessage] = useState('');
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupColor, setPopupColor] = useState('bg-green-500'); 

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === 'file') {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0], 
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('education', formData.education);
    formDataToSend.append('experiences', formData.experiences);
    formDataToSend.append('registrationNumber', formData.registrationNumber);
    formDataToSend.append('licenseDocument', formData.licenseDocument);
    formDataToSend.append('hospitalIdImage', formData.hospitalIdImage);

    try {
      const response = await fetch('http://localhost:7000/api/doctor/apply', {
        method: 'POST',
        body: formDataToSend, 
      });

      if (response.ok) {
        const data = await response.json();
        setPopupMessage('Application submitted successfully!');
        setPopupColor('bg-green-500');
        setPopupVisible(true);
        setTimeout(() => setPopupVisible(false), 3000);

        setFormData({
          name: '',
          email: '',
          education: '',
          experiences: '',
          registrationNumber: '',
          licenseDocument: null,
          hospitalIdImage: null,
        });
      } else {
        setPopupMessage('Something went wrong. Please try again.');
        setPopupColor('bg-red-500');
        setPopupVisible(true);
        setTimeout(() => setPopupVisible(false), 3000);
      }
    } catch (error) {
      console.error('Error:', error);
      setPopupMessage('Network error. Please try again later.');
      setPopupColor('bg-red-500');
      setPopupVisible(true);
      setTimeout(() => setPopupVisible(false), 3000);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-300">
      <div className="bg-white p-10 rounded-xl shadow-xl max-w-lg w-full transform transition-all duration-700 scale-95 hover:scale-100">
        <h2 className="text-4xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-600">
          Doctor Application 
        </h2>

      
        {popupVisible && (
          <div className={`fixed top-10 right-10 p-4 ${popupColor} text-white rounded-lg shadow-lg transition-opacity duration-500 opacity-100`}>
            {popupMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="group relative">
            <label htmlFor="name" className="text-lg font-semibold text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-105"
              required
            />
          </div>

          <div className="group relative">
            <label htmlFor="email" className="text-lg font-semibold text-gray-700">Email Address</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-105"
              required
            />
          </div>

          <div className="group relative">
            <label htmlFor="education" className="text-lg font-semibold text-gray-700">Education</label>
            <input
              type="text"
              name="education"
              id="education"
              value={formData.education}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-105"
              required
            />
          </div>

          <div className="group relative">
            <label htmlFor="experiences" className="text-lg font-semibold text-gray-700">Experiences</label>
            <textarea
              name="experiences"
              id="experiences"
              value={formData.experiences}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-105"
              rows="4"
              required
            />
          </div>

          <div className="group relative">
            <label htmlFor="registrationNumber" className="text-lg font-semibold text-gray-700">Registration Number</label>
            <input
              type="text"
              name="registrationNumber"
              id="registrationNumber"
              value={formData.registrationNumber}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-105"
              required
            />
          </div>

          <div className="group relative">
            <label htmlFor="licenseDocument" className="text-lg font-semibold text-gray-700">License Document</label>
            <input
              type="file"
              name="licenseDocument"
              id="licenseDocument"
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-105"
              required
            />
          </div>

          <div className="group relative">
            <label htmlFor="hospitalIdImage" className="text-lg font-semibold text-gray-700">Hospital ID Image</label>
            <input
              type="file"
              name="hospitalIdImage"
              id="hospitalIdImage"
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-105"
              required
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="w-full px-6 py-3 cursor-pointer bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300 transform hover:scale-105"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DoctorApply;
