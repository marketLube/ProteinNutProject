import { useEffect, useState } from "react";
import { getStockStatusClass } from "../../helpers/productHelpers";
import moment from "moment";

function ProductTableItems({
  product,
  onItemSelect,
  onEditProduct,
  selectedItems,
}) {
  const [checked, setChecked] = useState(selectedItems.includes(product?._id));
  const handleCheckboxChange = () => {
    setChecked((prevChecked) => !prevChecked);
  };

  const discountedPrice = product?.price - (product?.price * (product?.offer / 100));

  useEffect(() => {
    if (checked) {
      onItemSelect((products) => [...products, product]);
    } else {
      onItemSelect((products) =>
        products?.filter((val) => val._id !== product?._id)
      );
    }
  }, [checked, product, onItemSelect]);

  return (
    <tr key={product?.id}>
      <td className="checkbox-column">
        <input
          type="checkbox"
          checked={checked}
          onChange={handleCheckboxChange}
        />
      </td>
      <td>
        {product?.image ? (
          <div className="product_image">
            <img src={product.image[0]} alt={product?.name} />
          </div>
        ) : (
          <div className="product_image">
            <img src="/path/to/fallback-image.jpg" alt="No image available" />
          </div>
        )}
      </td>
      <td>{product?.name}</td>

      <td
        className={`stock-status ${getStockStatusClass(product?.stockStatus)}`}
      >
        {product?.stock}
      </td>
      <td><div >
        <p>${discountedPrice}</p>
        <p style={{color:"#035ECF",fontWeight:"bold"}}>{product?.offer}% OFF</p>
      </div></td>
      <td>{product?.category}</td>
      <td>{product?.statistic}</td>
      <td>{moment(product?.updatedAt).format("YYYY-MM-DD")}</td>
      <td>
        <span
          className="material-symbols-outlined"
          onClick={() => onEditProduct(product)}
          style={{ cursor: "pointer" }}
        >
          edit_square
        </span>
      </td>
    </tr>
  );
}

export default ProductTableItems;
