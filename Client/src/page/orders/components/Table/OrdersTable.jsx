// OrdersTable.jsx
import { useEffect, useState } from "react";
import OrdersTableHead from "./OrdersTableHead";
import OrderItems from "./OrderItems";
import styles from "../../../../Components/Spinner/Spinner.module.css";
import api from "../../../../services/api";

const OrdersTable = ({
  ordersChunks,
  currentPage,
  isLoading,
  error,
  refetch,
}) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [localOrders, setLocalOrders] = useState([]);
  // Updated status options to match backend case
  const statusOptions = ["Completed", "Confirmed", "Cancelled", "On Refund"];

  useEffect(() => {
    // Initialize localOrders when ordersChunks or currentPage changes
    setLocalOrders(ordersChunks[currentPage - 1] || []);
  }, [ordersChunks, currentPage]);

  const changeOrderStatus = async (orderId, newStatus) => {
    // Update local state
    setLocalOrders((prevOrders) =>
      prevOrders.map((order) =>
        order._id === orderId ? { ...order, orderStatus: newStatus } : order
      )
    );

    // Log the change
    console.log(`Order ${orderId} status changed to ${newStatus}`);

    try {
      await api.patch(`/orders/${orderId}`, {
        orderStatus: newStatus,
      });
      console.log("order status changed");
      refetch();
    } catch (error) {
      console.log(error);
    }
    // Close dropdown
    setActiveDropdown(null);
  };

  return (
    <div className="orders__table">
      <table className="main_table">
        <OrdersTableHead />
        <tbody>
          {isLoading ? (
            <tr>
              <td
                colSpan="100%"
                style={{ textAlign: "center", padding: "20px" }}
              >
                <div className={styles.spinnerContainer}>
                  <div className={styles.spinner}></div>
                </div>
              </td>
            </tr>
          ) : localOrders.length === 0 ? (
            <tr>
              <td
                colSpan="6"
                style={{
                  textAlign: "center",
                  height: "3rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                No orders available
              </td>
            </tr>
          ) : error ? (
            <div></div>
          ) : (
            localOrders.map((order) => (
              <OrderItems
                key={order._id}
                order={order}
                activeDropdown={activeDropdown}
                setActiveDropdown={setActiveDropdown}
                changeOrderStatus={changeOrderStatus}
                statusOptions={statusOptions}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;
