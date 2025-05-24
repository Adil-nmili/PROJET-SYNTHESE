import { useEffect, useRef, useState } from 'react';
import { axiosClient } from '../../api/axios';
import toast from 'react-hot-toast';
// import { toast } from 'react-toastify';

// Temporary debug - remove after fixing the issue
console.log('Environment variables:', {
  VITE_PAYPAL_CLIENT_ID: import.meta.env.VITE_PAYPAL_CLIENT_ID,
  VITE_BACKEND_URL: import.meta.env.VITE_BACKEND_URL,
  NODE_ENV: import.meta.env.MODE,
});

const PaypalCheckout = ({ amount, verifiedPaypalEmail, onSuccess }) => {
  const paypalRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Reset states when component mounts or dependencies change
    setError(null);
    setScriptLoaded(false);

    if (!verifiedPaypalEmail) {
      setError('PayPal email not verified');
      toast.error('PayPal email not verified. Please verify before continuing.');
      return;
    }

    if (!amount || amount <= 0) {
      setError('Invalid amount');
      toast.error('Invalid amount. Please provide a valid amount.');
      return;
    }

    // Check if PayPal client ID is configured
    const clientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;
    console.log('PayPal Client ID:', clientId ? 'Configured' : 'Not configured');
    
    if (!clientId) {
      setError('PayPal client ID not configured');
      toast.error('PayPal configuration error. Please contact support.');
      return;
    }

    // Remove any existing PayPal script
    const existingScript = document.querySelector('script[src*="paypal.com/sdk/js"]');
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    // Use sandbox URL for testing
    const scriptUrl = `https://www.sandbox.paypal.com/sdk/js?client-id=${clientId}&currency=USD&components=buttons&disable-funding=credit,card`;
    console.log('Loading PayPal script from:', scriptUrl);
    script.src = scriptUrl;
    script.async = true;

    script.onload = () => {
      console.log('PayPal script loaded successfully');
      setScriptLoaded(true);
      
      if (!window.paypal) {
        setError('PayPal SDK not available');
        toast.error('PayPal SDK failed to initialize. Please refresh the page.');
        return;
      }

      try {
        const button = window.paypal.Buttons({
          style: {
            layout: 'vertical',
            color: 'blue',
            shape: 'rect',
            label: 'pay',
            height: 45
          },
          fundingSource: window.paypal.FUNDING.PAYPAL,
          createOrder: async () => {
            try {
              setIsLoading(true);
              const { data } = await axiosClient.post('/api/paypal/create-order', {
                amount,
                email: verifiedPaypalEmail,
              });
              console.log('Order created:', data);
              return data.id;
            } catch (error) {
              console.error('Error creating order:', error);
              const errorMessage = error.response?.data?.message || 'Failed to create PayPal order. Please try again.';
              toast.error(errorMessage);
              throw new Error('Order creation failed');
            } finally {
              setIsLoading(false);
            }
          },
          onApprove: async (data) => {
            try {
              setIsLoading(true);
              console.log('Payment approved:', data);
              const { data: details } = await axiosClient.post('/api/paypal/capture-order', {
                orderID: data.orderID,
                email: verifiedPaypalEmail,
              });

              console.log('Payment captured:', details);
              toast.success(`Payment successful! Transaction ID: ${details.id}`);
              if (onSuccess) {
                onSuccess(details);
              }
            } catch (error) {
              console.error('Error capturing order:', error);
              const errorMessage = error.response?.data?.message || 'Payment failed during capture. Please try again.';
              toast.error(errorMessage);
            } finally {
              setIsLoading(false);
            }
          },
          onError: (err) => {
            console.error('PayPal Button error:', err);
            setError('PayPal button error');
            toast.error('Payment error. Please try again.');
            setIsLoading(false);
          },
          onCancel: () => {
            console.log('Payment cancelled by user');
            toast.error('Payment cancelled');
            setIsLoading(false);
          },
        });

        if (!paypalRef.current) {
          console.error('PayPal button container not found');
          setError('PayPal button container not found');
          return;
        }

        button.render(paypalRef.current)
          .then(() => {
            console.log('PayPal button rendered successfully');
          })
          .catch((error) => {
            console.error('Error rendering PayPal button:', error);
            setError('Failed to render PayPal button');
            toast.error('Failed to load PayPal button. Please refresh the page.');
          });
      } catch (error) {
        console.error('Error initializing PayPal:', error);
        setError('Failed to initialize PayPal');
        toast.error('Failed to initialize PayPal. Please refresh the page.');
      }
    };

    script.onerror = (error) => {
      console.error('Failed to load PayPal script:', error);
      setError('Failed to load PayPal script');
      toast.error('Failed to load PayPal. Please check your internet connection and try again.');
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup
      if (script.parentNode) {
        document.body.removeChild(script);
      }
      setScriptLoaded(false);
      setError(null);
    };
  }, [amount, verifiedPaypalEmail, onSuccess]);

  return (
    <div className="mt-4">
      {error && (
        <div className="text-center mb-4 text-red-500">
          <p>{error}</p>
        </div>
      )}
      {isLoading && (
        <div className="text-center mb-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-2 text-sm text-gray-600">Processing payment...</p>
        </div>
      )}
      {!scriptLoaded && !isLoading && !error && (
        <div className="text-center mb-4">
          <div className="animate-pulse h-10 bg-gray-200 rounded"></div>
        </div>
      )}
      <div ref={paypalRef}></div>
    </div>
  );
};

export default PaypalCheckout;
