import { useQuery } from "@tanstack/react-query";
import MainTitle from "../../Components/smallcomponents/MainTitle";
import OrdersFooter from "./components/OrdersFooter";
import OrdersHeader from "./components/OrdersHeader";
import OrdersTable from "./components/Table/OrdersTable";
import api from "../../services/api";
import { useState, useEffect } from "react";

function Orders() {
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersChunks, setOrdersChunks] = useState([]);

  const {
    data: orders,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: () => api.get("/orders").then((res) => res.data.docs),
  });

  const {
    data: orderstats,
    isStatusLoading,
    isStatusError,
    refetch,
  } = useQuery({
    queryKey: ["orderstats"],
    queryFn: () => api.get("/orders/order-stats").then((res) => res.data.data),
  });

  useEffect(() => {
    if (orders) {
      const splitOrdersIntoChunks = (orders, chunkSize) => {
        const chunks = [];
        for (let i = 0; i < orders.length; i += chunkSize) {
          chunks.push(orders.slice(i, i + chunkSize));
        }
        return chunks;
      };

      // Split orders into chunks of 4
      const chunks = splitOrdersIntoChunks(orders, 4);
      setOrdersChunks(chunks);
    }
  }, [orders]);

  return (
    <main className="orders">
      <MainTitle>Orders</MainTitle>
      <div className="main-body orders-body">
        <OrdersHeader orderStats={orderstats} refetch={refetch} />
        <OrdersTable
          ordersChunks={ordersChunks}
          currentPage={currentPage}
          isLoading={isLoading}
          error={error}
          refetch={refetch}
        />
        <OrdersFooter
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </main>
  );
}

export default Orders;
