import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Package, Truck } from 'lucide-react';
import Confetti from 'react-confetti';
import { useWindowSize } from '@/hooks/useWindowSize';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { STORE } from '@/router/Router';

const OrderSuccess = ({ orderId }) => {
  const { width, height } = useWindowSize();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Confetti
        width={width}
        height={height}
        recycle={false}
        numberOfPieces={200}
        gravity={0.2}
      />
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 text-center"
      >
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex justify-center mb-6"
        >
          <CheckCircle2 className="w-20 h-20 text-green-500" />
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-3xl font-bold text-gray-900 mb-4"
        >
          Order Placed Successfully!
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-gray-600 mb-8"
        >
          Thank you for your purchase! Your order #{orderId} has been confirmed.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-col md:flex-row justify-center gap-4 mb-8"
        >
          <div className="flex items-center gap-2 text-gray-600">
            <Package className="w-5 h-5" />
            <span>Order Confirmed</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Truck className="w-5 h-5" />
            <span>Preparing for Shipping</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-sm text-gray-500 mb-8"
        >
          We'll send you an email with your order details and tracking information.
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <Button
            onClick={() => navigate(STORE)}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            Continue Shopping
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default OrderSuccess; 