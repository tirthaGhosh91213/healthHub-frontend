import React, { useState } from 'react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [popupMessage, setPopupMessage] = useState('');
  const [popupColor, setPopupColor] = useState('bg-green-500');
  const [popupVisible, setPopupVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:7000/support/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setPopupMessage(data.data || 'Message sent successfully!');
        setPopupColor('bg-green-500');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setPopupMessage('Something went wrong. Please try again.');
        setPopupColor('bg-red-500');
      }
    } catch (error) {
      console.error('Error:', error);
      setPopupMessage('Network error. Please try again later.');
      setPopupColor('bg-red-500');
    }

    setPopupVisible(true);
    setTimeout(() => setPopupVisible(false), 3000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white rounded-xl shadow-xl p-8 max-w-xl w-full">
        <h2 className="text-3xl font-bold text-center mb-6 text-indigo-600">Contact Us</h2>

        {popupVisible && (
  <div className={`fixed top-5 right-5 p-4 rounded shadow-md text-white ${popupColor} z-50`}>
    {popupMessage}
  </div>
)}


        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-semibold mb-1" htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full border-2 border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1" htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full border-2 border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1" htmlFor="subject">Subject</label>
            <input
              type="text"
              name="subject"
              id="subject"
              required
              value={formData.subject}
              onChange={handleChange}
              className="w-full border-2 border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1" htmlFor="message">Message</label>
            <textarea
              name="message"
              id="message"
              rows="5"
              required
              value={formData.message}
              onChange={handleChange}
              className="w-full border-2 border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
