import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from 'react-router-dom';

const ToDayMeal = () => {
  const [mealPlan, setMealPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchMealPlan = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
          setError('Access token is required. Please log in.');
          return;
        }

        const response = await fetch('http://localhost:7000/api/mealplan/show-Todays-MealPlan', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch meal plan');
        }

        const data = await response.json();

        if (data.apiError && data.apiError.status === 'NOT_FOUND') {
          setMealPlan(null);
        } else {
          setMealPlan(data.data); 
        }
      } catch (err) {
        setError('An error occurred. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMealPlan();
  }, []);

  if (loading) {
    return (
      <div className="text-center p-10 text-lg font-medium text-gray-700">Loading today's meal plan...</div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-200 via-blue-200 to-purple-200 text-gray-900">
        <motion.div
          className="bg-white rounded-lg shadow-md p-8 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-4 text-gray-700">No Active Meal Plan</h2>
          <p className="text-gray-600 mb-4">
            It looks like you don’t have an active meal plan for today. Please check back later or create a new one or active a new  meal plan
          </p>
          <motion.button
            className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
             <Link to="/generateMeal" >
             Create a New Plan
              </Link>
            
          </motion.button>
          <motion.button
            className="bg-blue-500 text-white ml-3.5 py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
             <Link to="/allMeal" >
             Active a New Plan
              </Link>
            
          </motion.button>
        </motion.div>
        
        
      </div>
    );
  }

  
  const mealPlans = mealPlan?.mealPlans[0]; 

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-200 via-blue-200 to-purple-200 text-gray-900">
      <main className="container mx-auto px-6 py-12 space-y-12">
        <motion.div
          className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow duration-300"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-4">Active Meal Plan for Today</h2>
          <p className="text-gray-600 mb-4">Date: {mealPlan.date}</p>
          <p className="text-gray-600 mb-4">Day: {mealPlan.day}</p>
          <ul className="space-y-3">
            {Object.entries(mealPlans).map(([mealType, items], index) => (
              <li key={index} className="text-lg">
                <strong>{mealType}:</strong>
                <ul className="list-inside list-disc">
                  {items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          className="bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg shadow-md p-6 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-xl font-semibold mb-3">Stay Healthy with Personalized Plans!</h3>
          <p>Track your meals, plan your nutrition, and achieve your goals with HealthHub.</p>
        </motion.div>
      </main>
    </div>
  );
};

export default ToDayMeal;
