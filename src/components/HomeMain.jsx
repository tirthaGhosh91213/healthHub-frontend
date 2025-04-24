import { useState, useEffect } from 'react';

export default function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [faqItems, setFaqItems] = useState([
    {
      question: "What is this site about?",
      answer: "It's a converted single-page React app using Tailwind CSS.",
      open: false,
    },
    {
      question: "How does the FAQ work?",
      answer: "Click to toggle each item open or closed.",
      open: false,
    },
    {
      question: "Does the page refresh automatically?",
      answer: "Yes, every 60 seconds using setInterval.",
      open: false,
    },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      window.location.reload();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const toggleFaq = (index) => {
    setFaqItems((prev) =>
      prev.map((item, i) => ({
        ...item,
        open: i === index ? !item.open : item.open,
      }))
    );
  };

  return (
    <div className="font-sans min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 text-gray-800">
   
      <section className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our App</h1>
        <p className="text-lg mb-6">
          This is a fully converted single-page React application using Tailwind CSS.
        </p>
        <button
          onClick={() => setShowLogin(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg shadow-md transition"
        >
          Get Started
        </button>
      </section>

      
      {showLogin && (
        <section className="flex items-center justify-center min-h-screen px-4 bg-white">
          <div className="bg-gray-100 p-8 rounded-xl shadow-xl max-w-md w-full">
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Username"
                className="w-full border border-gray-300 p-2 rounded-md"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full border border-gray-300 p-2 rounded-md"
              />
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md"
              >
                Login
              </button>
            </form>
          </div>
        </section>
      )}

     
      <section className="py-12 px-4 bg-white">
        <h2 className="text-3xl font-bold text-center mb-6">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className={`border rounded-lg p-4 shadow transition cursor-pointer ${
                item.open ? 'bg-indigo-100' : 'bg-white'
              }`}
              onClick={() => toggleFaq(index)}
            >
              <h3 className="text-lg font-semibold">{item.question}</h3>
              {item.open && <p className="mt-2 text-gray-700">{item.answer}</p>}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
