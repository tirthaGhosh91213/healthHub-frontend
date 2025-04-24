import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const NotificationPopup = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 2000); 
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`fixed top-4 right-4 p-4 rounded-lg shadow-md z-50 ${
        type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
      }`}
    >
      {message}
    </motion.div>
  );
};

const MealPlans = () => {
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeHealthGoal, setActiveHealthGoal] = useState(null);
  const [activeDay, setActiveDay] = useState({});
  const [processing, setProcessing] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const fetchMealPlans = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) throw new Error('Access token not found. Please log in.');
  
        const response = await fetch('http://localhost:7000/api/mealplan/myMealPlans', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        });
  
        if (!response.ok) throw new Error(`Fetch failed: ${response.statusText}`);
  
        const data = await response.json();
  
        if (data.apiError) throw new Error(data.apiError);
  
        setMeals(data.data);
      } catch (err) {
        setError(err.message || 'Failed to fetch meal plans');
      } finally {
        setLoading(false);
      }
    };
  
    fetchMealPlans();
  }, []);
  

  const toggleHealthGoal = (goal) => {
    setActiveHealthGoal((prev) => (prev === goal ? null : goal));
  };

  const toggleDay = (goalIndex, day) => {
    setActiveDay((prev) => ({
      ...prev,
      [goalIndex]: prev[goalIndex] === day ? null : day,
    }));
  };

  const handleNotification = (message, type) => {
    setNotification({ message, type });
  };

  const handleDelete = async (id) => {
    if (processing) return;

    setProcessing(true);
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await fetch(`http://localhost:7000/api/mealplan/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) throw new Error('Failed to delete meal plan');

      setMeals((prev) => prev.filter((meal) => meal.id !== id));
      handleNotification('Meal plan deleted successfully!', 'success');
    } catch (error) {
      handleNotification(error.message || 'Failed to delete meal plan', 'error');
    } finally {
      setProcessing(false);
    }
  };

  const handleActivation = async (id, active) => {
    if (processing) return;
  
    setProcessing(true);
    try {
      const accessToken = localStorage.getItem('accessToken');
      const url = `http://localhost:7000/api/mealplan/${id}/${active ? 'deactivate' : 'activate'}`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      if (!response.ok) throw new Error('Failed to update meal plan status');

      setMeals((prev) =>
        prev.map((meal) =>
          meal.id === id ? { ...meal, active: !active } : meal
        )
      );
  
      handleNotification(
        `Meal plan ${active ? 'deactivated' : 'activated'} successfully!`,
        'success'
      );
    } catch (error) {
      handleNotification(error.message || 'Failed to update meal plan status', 'error');
    } finally {
      setProcessing(false);
    }
  };
  
  if (loading) {
    return <div className="text-center p-10 text-lg font-medium">Loading your meal plans...</div>;
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
       </motion.div>
      
      
    </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow duration-300 mt-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Your Meal Plans</h2>

      {notification && (
        <NotificationPopup
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      {meals.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-10 pt-20 pb-20 bg-gradient-to-r from-green-200 via-blue-200 to-purple-200 text-gray-900">
        <motion.div
          className="bg-white rounded-lg shadow-md p-8 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-4 text-gray-700">No Active Meal Plan</h2>
          <p className="text-gray-600 mb-4">
            It looks like you don’t have an active meal plan for <br />
            Please check back later or create a new one and active a new  meal plan
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
          
        </motion.div>
        
        
      </div>
      ) : (
        meals.map((meal, index) => (
          <motion.div
            key={meal.id}
            className="mb-6 border bg-slate-200 rounded-xl p-6 shadow-md"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <div className="flex justify-between items-center mb-4 ">
              <h3
                className="text-2xl font-semibold cursor-pointer bg-blue-600 p-3 rounded hover:bg-blue-800 hover:text-gray-100 text-gray-200"
                onClick={() => toggleHealthGoal(meal.healthGoal)}
              >
                Health Goal: {meal.healthGoal}
              </h3>
              <div className="flex gap-2">
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  onClick={() => handleDelete(meal.id)}
                  disabled={processing}
                >
                  Delete
                </button>
                <button
                  className={`px-4 py-2 rounded ${
                    meal.active
                      ? 'bg-gray-400 text-white hover:bg-gray-500'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                  onClick={() => handleActivation(meal.id, meal.active)}
                  disabled={processing}
                >
                  {meal.active ? 'Deactivate' : 'Activate'}
                </button>
              </div>
            </div>

            {activeHealthGoal === meal.healthGoal && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                {Object.entries(meal.mealPlanContent).map(([day, meals], i) => (
                  <div key={i} className="mb-4">
                    <h4
                      className="text-xl  bg-blue-400 p-3 rounded hover:bg-blue-500 hover:text-gray-100 text-gray-200 cursor-pointer mb-2"
                      onClick={() => toggleDay(index, day)}
                    >
                      {day}
                    </h4>

                    {activeDay[index] === day && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-gray-50 rounded-lg p-4 shadow-inner"
                      >
                        {Object.entries(meals).map(([mealType, items], j) => (
                          <div key={j} className="mb-4">
                            <h5 className="text-lg font-semibold text-gray-800">{mealType}</h5>
                            <ul className="list-disc list-inside ml-4 text-gray-700 space-y-1">
                              {items.map((item, idx) => (
                                <li key={idx}>{item}</li>
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
          </motion.div>
        ))
      )}
    </div>
  );
};

export default MealPlans;
