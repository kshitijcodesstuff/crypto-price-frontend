'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

const AlertForm = ({ addAlert }) => {
  const [value, setValue] = useState('');
  const [direction, setDirection] = useState('UP');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAlert = {
      id: Date.now(),
      value,
      direction,
      status: 'pending'
    };
    addAlert(newAlert);
    setValue('');
    setDirection('UP');
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="bg-green-900 p-6 rounded-lg shadow-md w-full max-w-sm"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-4">
        <label className="block text-green-400">Value:</label>
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-green-600"
        />
      </div>
      <div className="mb-4">
        <label className="block text-green-400">Direction:</label>
        <select
          value={direction}
          onChange={(e) => setDirection(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-green-600"
        >
          <option value="UP">UP</option>
          <option value="DOWN">DOWN</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300"
      >
        Add Alert
      </button>
    </motion.form>
  );
};

export default AlertForm;





