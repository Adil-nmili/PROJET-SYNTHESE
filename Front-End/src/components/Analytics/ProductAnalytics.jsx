import { useEffect, useState } from "react";
import StatCard from "./StatCard";
import { Package, TrendingUp, AlertTriangle, BarChart } from "lucide-react";
import Product from "../../../service/Product";
import Order from "../../../service/Order";
import { Loading } from "../ui/loading";

const ProductAnalytics = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProducts: 0,
    lowStock: 0,
    topSeller: { name: "", sales: 0 },
    totalOrders: 0,
  });

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const [productsRes, ordersRes] = await Promise.all([
        Product.getAll(),
        Order.getAll(),
      ]);

      const products = productsRes.data;
      const orders = ordersRes.data;

      // Calculate product statistics
      const lowStockThreshold = 10;
      const lowStockCount = products.filter(p => p.stock < lowStockThreshold).length;

      // Calculate top seller
      const productSales = {};
      orders.forEach(order => {
        order.items.forEach(item => {
          productSales[item.product_id] = (productSales[item.product_id] || 0) + item.quantity;
        });
      });

      const topSeller = Object.entries(productSales)
        .map(([id, sales]) => ({
          name: products.find(p => p.id === parseInt(id))?.name || "Unknown",
          sales
        }))
        .sort((a, b) => b.sales - a.sales)[0] || { name: "No sales yet", sales: 0 };

      setStats({
        totalProducts: products.length,
        lowStock: lowStockCount,
        topSeller,
        totalOrders: orders.length,
      });
    } catch (error) {
      console.error("Failed to fetch analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Products"
        value={stats.totalProducts}
        icon={Package}
        description="Active products in inventory"
      />
      <StatCard
        title="Low Stock Items"
        value={stats.lowStock}
        icon={AlertTriangle}
        description="Products below threshold"
      />
      <StatCard
        title="Top Seller"
        value={stats.topSeller.name}
        icon={TrendingUp}
        description={`${stats.topSeller.sales} units sold`}
      />
      <StatCard
        title="Total Orders"
        value={stats.totalOrders}
        icon={BarChart}
        description="All time orders"
      />
    </div>
  );
};

export default ProductAnalytics; 