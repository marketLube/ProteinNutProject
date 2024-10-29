// OrderItems.jsx
import {
  formatAddress,
  formatProductName,
  getStatusClass,
} from "../helpers/helpers";

const OrderItems = ({
  order,
  activeDropdown,
  setActiveDropdown,
  changeOrderStatus,
  statusOptions,
}) => {
  const toggleDropdown = () => {
    setActiveDropdown(activeDropdown === order?._id ? null : order?._id);
  };

  return (
    <tr key={order._id}>
      <td className="order-column">
        <div className="cell-content">#{order?.orderId}</div>
      </td>
      <td className="product-column">
        <div className="cell-content">
          <div className="product-name">
            {formatProductName(order?.product?.name)}
          </div>
          <div className="price-info">
            Price: {order?.price}
            <br />
            Qty: {order?.qty}
          </div>
        </div>
      </td>
      <td className="address-column">
        <div className="cell-content">
          <div className="formatted-address">
            {formatAddress(order.address)}
          </div>
          <div className="phone-number">{order.phone}</div>
        </div>
      </td>
      <td className="category-column">
        <div className="cell-content">{order?.product?.category}</div>
      </td>
      <td className="payment-column">
        <div className="cell-content">
          <div>{order.payment}</div>
          <div className="payment-status">{order.paymentStatus}</div>
        </div>
      </td>
      <td className="status-column">
        <div className="cell-content">
          <div className="status-dropdown">
            <button
              className={getStatusClass(order.orderStatus)}
              onClick={toggleDropdown}
            >
              {order.orderStatus}
            </button>
            {activeDropdown === order._id && (
              <ul className="dropdown-menu">
                {statusOptions.map((status) => (
                  <li
                    key={status}
                    onClick={() => changeOrderStatus(order._id, status)}
                    className={status === order.orderStatus ? 'active' : ''}
                  >
                    {status}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </td>
    </tr>
  );
};

export default OrderItems;