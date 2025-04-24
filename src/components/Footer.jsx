import { motion } from 'framer-motion';
import React from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
const Footer =()=>{
  return (

    <footer className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-12">
            <div className="container mx-auto px-6 space-y-10 text-center md:text-left">
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
             
                <div>
                  <h4 className="text-lg font-semibold mb-4">About HealthHub</h4>
                  <p className="text-sm">
                    Your personalized health and meal plan companion. Plan smarter, eat better, and live healthier with HealthHub.
                  </p>
                </div>
    

                <div>
                  <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                  <div className="flex flex-col space-y-2">
                    <a href="#about" className="hover:text-yellow-300 transition">About Us</a>
                    <a href="#services" className="hover:text-yellow-300 transition">Services</a>
                    <a href="#contact" className="hover:text-yellow-300 transition">Contact</a>
                    <a href="#privacy" className="hover:text-yellow-300 transition">Privacy Policy</a>
                  </div>
                </div>
    
                
                <div>
                  <h4 className="text-lg font-semibold mb-4">Subscribe to Our Newsletter</h4>
                  <p className="text-sm mb-4">Get the latest updates and meal tips directly in your inbox.</p>
                  <form className="flex flex-col  md:flex-row items-center md:items-stretch space-y-2 md:space-y-0 md:space-x-2">
                    <input 
                      type="email" 
                      placeholder="Enter your email" 
                      className="w-full px-4 py-2 rounded-md text-white border-4 border-indigo-500/100  focus:ring-2 focus:ring-yellow-300"
                    />
                    <motion.button 
                      className="bg-yellow-400 text-gray-900 cursor-pointer px-4 py-2 rounded-md hover:bg-yellow-500 transition"
                      whileHover={{ scale: 1.1 }}
                    >
                      Subscribe
                    </motion.button>
                  </form>
                </div>
              </motion.div>
    
              <motion.div 
                className="flex justify-center md:justify-start space-x-6 text-xl mt-8"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <a href="https://www.facebook.com/" target='_blank' className="hover:text-yellow-300 transition"><i className="fab fa-facebook"></i></a>
                <a href="https://www.twitter.com/" className="hover:text-yellow-300 transition"><i className="fab fa-twitter"></i></a>
                <a href="https://www.instagram.com/" className="hover:text-yellow-300 transition"><i className="fab fa-instagram"></i></a>
                <a href="https://www.linkdin.com/" className="hover:text-yellow-300 transition"><i className="fab fa-linkedin"></i></a>
              </motion.div>
    
              <motion.div 
                className="border-t border-gray-400 pt-6 text-center text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <p>© 2025 HealthHub | Empowering healthier lifestyles</p>
              </motion.div>
            </div>
          </footer>

  )
}
export default Footer;