import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'react-hot-toast';
import CartService from '../../../service/Cart';

/**
 * Reusable Add To Cart button component
 * @param {Object} props
 * @param {Object} props.product - The product object to add to cart
 * @param {string} props.selectedSize - Selected size (optional)
 * @param {string} props.selectedColor - Selected color (optional)
 * @param {number} props.quantity - Quantity to add (default: 1)
 * @param {string} props.className - Additional CSS classes
 * @param {Function} props.onSuccess - Callback function after successful add to cart
 */
const AddToCart = ({ 
  product, 
  selectedSize = null, 
  selectedColor = null, 
  quantity = 1,
  className = '',
  onSuccess = () => {}
}) => {
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    if (!product || !product.id) {
      toast.error('Invalid product');
      return;
    }

    try {
      setLoading(true);
      await CartService.addToCart(
        product.id,
        quantity,
        selectedSize,
        selectedColor
      );
      
      toast.success('Added to cart successfully!');
      onSuccess();
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add to cart. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button 
      onClick={handleAddToCart}
      disabled={loading}
      className={`bg-yellow-500 hover:bg-yellow-600 text-black font-semibold ${className}`}
    >
      <ShoppingCart className="mr-2 h-4 w-4" />
      {loading ? 'Adding...' : 'Add to Cart'}
    </Button>
  );
};

export default AddToCart;