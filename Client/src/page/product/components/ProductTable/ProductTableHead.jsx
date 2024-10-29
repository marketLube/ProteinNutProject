import React from 'react';

function ProductTableHead() {
  return (
    <thead className="table_head">
      <tr>
        <th className="checkbox-column"></th>
        <th className="product-icon">Image</th>
        <th>PRODUCT NAME</th>
        <th>STOCK</th>
        <th>PRICE</th>
        <th>CATEGORIE</th>
        <th>STATISTIC</th>
        <th>DATE</th>
        <th>ACTIONS</th>
      </tr>
    </thead>
  );
}

export default ProductTableHead;