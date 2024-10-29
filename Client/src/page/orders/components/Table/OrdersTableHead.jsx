function OrdersTableHead() {
  return (
    <thead className="table_head">
      <tr>
        <th className="order-column"># ORDER</th>
        <th className="product-column">PRODUCT</th>
        <th className="address-column">ADDRESS</th>
        <th className="category-column">CATEGORY</th>
        <th className="payment-column">PAYMENT</th>
        <th className="status-column">ORDER STATUS</th>
      </tr>
    </thead>
  );
}

export default OrdersTableHead;
