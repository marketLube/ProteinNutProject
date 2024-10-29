function OrderItem({ item }) {
  return (
    <div className="order-item">
      <img src={item?.product?.image[0]} alt="" className="order-image" />

      <span>{item?.product?.name}</span>
      <button className="order-status-delivered">{item?.orderStatus}</button>
    </div>
  );
}

export default OrderItem;
