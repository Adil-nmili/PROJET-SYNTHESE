import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const DialogProductOrder = ({ products = [] }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          {products.length > 0 ? `View ${products.length} Products` : 'No Products'}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Products</DialogTitle>
          <DialogDescription>
            {products.length} products in this order
          </DialogDescription>
        </DialogHeader>
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto max-h-[500px] scrollbar-hide">
            {products.map((product) => (
              <div key={product.id} className="bg-white dark:bg-slate-600 p-4 rounded-md">
                <h2 className="text-lg font-bold dark:text-slate-50">{product.name}</h2>
                <p className="text-sm text-gray-500 dark:text-slate-800">Quantity: {product.pivot?.quantity || 1}</p>
                <p className="text-sm text-gray-500 dark:text-slate-800">Price: {product.pivot?.price || product.price} €</p>
                {product.image && (
                  <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-md mt-2" />
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-gray-500">No products found in this order.</p>
          </div>
        )}
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogProductOrder;
