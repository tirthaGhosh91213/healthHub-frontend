import React, { useState } from 'react';
import { motion } from 'framer-motion';

const GenerateMeal = () => {
  const [mealPlan, setMealPlan] = useState(null); 
  const [formData, setFormData] = useState({
    dietaryRestrictions: '',
    ingredients: '',
    healthGoal: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeDay, setActiveDay] = useState(null); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const toggleDay = (day) => {
    setActiveDay((prev) => (prev === day ? null : day));
  };

  const generateMealPlan = async () => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      setError('Access token is missing. Please log in.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const query = new URLSearchParams({
        dietaryRestriction: formData.dietaryRestrictions || 'none',
        ingredients: formData.ingredients || 'any',
        healthGoal: formData.healthGoal || 'N/A',
      }).toString();

      const response = await fetch(`http://localhost:7000/api/mealplan?${query}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      if (result.data?.mealPlan) {
        setMealPlan(result.data.mealPlan);
      } else {
        setError('Failed to generate a meal plan.');
      }
    } catch (err) {
      setError(err.message || 'An error occurred while generating the meal plan.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-blue-200 to-white text-gray-900">
      <main className="container mx-auto px-6 py-12 space-y-12">
       
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-10 transition-shadow duration-300 hover:shadow-2xl border-4 border-blue-400"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">
            Generate Your Personalized Meal Plan
          </h2>
          <div className="space-y-6">
            <div>
              <label className="block text-blue-700 font-medium mb-2">Dietary Restrictions:</label>
              <input
                type="text"
                name="dietaryRestrictions"
                placeholder="e.g., vegetarian"
                value={formData.dietaryRestrictions}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border rounded-lg shadow focus:outline-none focus:ring-4 focus:ring-blue-300"
              />
            </div>
            <div>
              <label className="block text-blue-700 font-medium mb-2">Available Ingredients:</label>
              <input
                type="text"
                name="ingredients"
                placeholder="e.g., broccoli, tomato, cheese"
                value={formData.ingredients}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border rounded-lg shadow focus:outline-none focus:ring-4 focus:ring-blue-300"
              />
            </div>
            <div>
              <label className="block text-blue-700 font-medium mb-2">Health Goal:</label>
              <input
                type="text"
                name="healthGoal"
                placeholder="e.g., weight loss"
                value={formData.healthGoal}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border rounded-lg shadow focus:outline-none focus:ring-4 focus:ring-blue-300"
              />
            </div>
            <button
              onClick={generateMealPlan}
              className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-all"
              disabled={loading}
            >
              {loading ? 'Generating...' : 'Generate Meal Plan'}
            </button>
          </div>
          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        </motion.div>

        
        {mealPlan && (
          <motion.div
            className="bg-blue-50 rounded-2xl shadow-lg p-10 mt-6 border-4 border-blue-300"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold text-blue-600 mb-6 text-center">Your Meal Plan</h3>
            {Object.entries(mealPlan).map(([day, meals]) => (
              <div key={day} className="mb-4">
                <motion.button
                  onClick={() => toggleDay(day)}
                  className="w-full bg-blue-400 text-white text-lg font-semibold py-3 px-6 rounded-lg shadow hover:bg-blue-600 transition"
                >
                  {day}
                </motion.button>
                {activeDay === day && (
                  <motion.div
                    className="mt-4 bg-white rounded-lg shadow-inner p-6"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {Object.entries(meals).map(([mealType, details]) => (
                      <div key={mealType} className="mb-4">
                        <h5 className="text-lg font-medium text-blue-500 mb-2">{mealType}:</h5>
                        <ul className="list-disc list-inside text-blue-800 space-y-1">
                          {details.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
          </motion.div>
        )}

        <motion.div
          className="bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-2xl shadow-lg p-6 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold mb-3">Stay Healthy, Stay Strong!</h3>
          <p className="text-white/90">
            Your journey to a healthier life starts here with tailored meal plans.
          </p>
        </motion.div>
      </main>
    </div>
  );
};

export default GenerateMeal;
