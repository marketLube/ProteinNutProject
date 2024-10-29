import "@fortawesome/fontawesome-free/css/all.min.css";
import ProductTableHead from "./ProductTableHead";
import ProductTableItems from "./ProductTableItems";
import styles from "./ProductsTable.module.css";
import { useState } from "react";
import ProductModal from "../../../../Components/ProductModal/ProductModal";

const ProductsTable = ({
  onItemSelect,
  selectedItems,
  products,
  isLoading,
  refetchProducts,
  error,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <div className="products__table table">
      <table className="main_table">
        <ProductTableHead />
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
          ) : products.length === 0 ? (
            <tr>
              <td colSpan="100%" style={{ textAlign: "center" }}>
                No products available
              </td>
            </tr>
          ) : error ? (
            <tr>
              <td
                colSpan="100%"
                style={{ textAlign: "center", padding: "20px" }}
              >
                <h1>{error}</h1>
              </td>
            </tr>
          ) : (
            products?.map((product, i) => (
              <ProductTableItems
                selectedItems={selectedItems}
                key={i}
                product={product}
                onItemSelect={onItemSelect}
                onEditProduct={handleEditProduct}
                isLoading={isLoading}
              />
            ))
          )}
        </tbody>
      </table>
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct}
        refetchProducts={refetchProducts}
      />
    </div>
  );
};

export default ProductsTable;
