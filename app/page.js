/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useState, useEffect, useRef } from 'react';
import AlertForm from './components/AlertForm';
import AlertList from './components/AlertList';
import { motion, useAnimation } from 'framer-motion';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';

// Three.js animation component
const Particles = () => {
  const mesh = useRef(null);

  useFrame(() => {
    mesh.current.rotation.x += 0.01;
    mesh.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={mesh} position={[0, 0, 0]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="green" emissive="#00ff00" />
    </mesh>
  );
};

export default function Home() {
  const [cryptoPrice, setCryptoPrice] = useState(40000); // Initial hardcoded value
  const [alerts, setAlerts] = useState([]); // State to hold alerts
  const [completedTasks, setCompletedTasks] = useState(new Set()); // State to hold completed tasks
  const [completedTaskNotification, setCompletedTaskNotification] = useState(null); // State to hold completed task notification
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      y: [0, 10, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: 'reverse',
      },
    });
  }, [controls]);

  // Function to add a new alert
  const addAlert = (alert) => {
    setAlerts([...alerts, alert]);
  };

  // Function to remove an alert by ID
  const removeAlert = (id) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  // Function to mark a task as completed
  const completeAlert = (id) => {
    setAlerts(alerts.map(alert => {
      if (alert.id === id) {
        return { ...alert, status: 'completed' };
      }
      return alert;
    }));
  };

  useEffect(() => {
    // Check cryptocurrency price against each alert value and direction
    alerts.forEach(alert => {
      if (
        (alert.direction === 'UP' && cryptoPrice > alert.value) ||
        (alert.direction === 'DOWN' && cryptoPrice < alert.value)
      ) {
        // Check if the task has already been completed
        if (!completedTasks.has(alert.id)) {
          setCompletedTasks(new Set(completedTasks.add(alert.id))); // Add completed task to the set
          setCompletedTaskNotification(alert); // Set completed task notification
          setTimeout(() => {
            setCompletedTaskNotification(null); // Clear completed task notification after a few seconds
          }, 3000); // Hide notification after 3 seconds
          completeAlert(alert.id); // Mark the task as completed
        }
      }
    });
  }, [cryptoPrice, alerts]); // Include cryptoPrice and alerts in the dependency array

  // Update cryptocurrency price
  useEffect(() => {
    const interval = setInterval(() => {
      // Update cryptocurrency price with a new hardcoded value
      const newPrice = Math.round(cryptoPrice + Math.random() * 100 - 50);
      setCryptoPrice(newPrice);
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [cryptoPrice]); // Include cryptoPrice in the dependency array

  return (
    <motion.div
      className="container mx-auto min-h-screen flex flex-col justify-center items-center bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="text-2xl font-semibold text-center mb-6 text-green-400"
        animate={controls}
      >
        Cryptocurrency Price Alerts
      </motion.h1>
      <div className="flex flex-col justify-center items-center mb-6 w-full max-w-md">
        {completedTaskNotification && (
          <motion.div
            className="bg-green-800 text-green-200 p-4 rounded-md mb-4 w-full"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            Task &quot;{completedTaskNotification.value}&quot; with direction &quot;{completedTaskNotification.direction}&quot; has been completed!
          </motion.div>
        )}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <AlertForm addAlert={addAlert} />
        </motion.div>
      </div>
      <div className="flex-1 w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <AlertList alerts={alerts} removeAlert={removeAlert} />
        </motion.div>
      </div>
      <motion.p
        className="text-center text-lg font-semibold mb-4 text-green-400"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        Current Cryptocurrency Price: ${cryptoPrice}
      </motion.p>
      <Canvas>
        <Particles />
      </Canvas>
    </motion.div>
  );
}





