'use client';
import { motion } from 'framer-motion';

const AlertList = ({ alerts, removeAlert, completeTask }) => {
  return (
    <motion.div
      className="mt-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2
        className="text-xl font-semibold mb-4 text-green-400"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        Current Alerts
      </motion.h2>
      <ul className="space-y-4">
        {alerts.map(alert => (
          <motion.li
            key={alert.id}
            className={`bg-green-900 p-4 rounded-lg shadow-md flex justify-between items-center ${
              alert.status === 'completed' ? 'bg-green-800' : ''
            }`}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-green-400">{alert.value} - {alert.direction} - {alert.status}</span>
            <div>
              {alert.status === 'pending' && (
                <motion.button
                  onClick={() => completeTask(alert.id)}
                  className="bg-green-500 text-white py-1 px-3 rounded-md mr-2 hover:bg-green-600 transition duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  Complete
                </motion.button>
              )}
              <motion.button
                onClick={() => removeAlert(alert.id)}
                className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 transition duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Remove
              </motion.button>
            </div>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export default AlertList;



