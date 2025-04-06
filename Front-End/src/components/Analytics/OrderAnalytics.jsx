import { useEffect, useState } from "react";
import StatCard from "./StatCard";
import { Truck, RefreshCw, Clock, CheckCircle } from "lucide-react";
import Order from "../../../service/Order";
import { Loading } from "../ui/loading";

const OrderAnalytics = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    delivered: 0,
    returned: 0,
    waiting: 0,
    totalAmount: 0,
  });

  useEffect(() => {
    fetchOrderAnalytics();
  }, []);

  const fetchOrderAnalytics = async () => {
    try {
      const ordersRes = await Order.getAll();
      const orders = ordersRes.data;

      const orderStats = orders.reduce((acc, order) => {
        // Count orders by status
        acc[order.status] = (acc[order.status] || 0) + 1;
        
        // Calculate total amount for delivered orders
        if (order.status === 'delivered') {
          acc.totalAmount += order.total_amount || 0;
        }
        
        return acc;
      }, {
        delivered: 0,
        returned: 0,
        waiting: 0,
        totalAmount: 0,
      });

      setStats(orderStats);
    } catch (error) {
      console.error("Failed to fetch order analytics:", error);
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
        title="Delivered Orders"
        value={stats.delivered}
        icon={Truck}
        description="Successfully delivered"
      />
      <StatCard
        title="Returned Orders"
        value={stats.returned}
        icon={RefreshCw}
        description="Orders returned by customers"
      />
      <StatCard
        title="Waiting Orders"
        value={stats.waiting}
        icon={Clock}
        description="Orders in processing"
      />
      <StatCard
        title="Total Revenue"
        value={stats.totalAmount}
        // value={`${stats.totalAmount.toFixed(2)} FCFA`}
        icon={CheckCircle}
        description="From delivered orders"
      />
    </div>
  );
};

export default OrderAnalytics; 