import { useState, useEffect } from "react";
import MainTitle from "../../Components/smallcomponents/MainTitle";
import ProductsFooter from "./components/ProductsFooter";
import ProductsHeader from "./components/ProductsHeader";
import ProductsTable from "./components/ProductTable/ProductsTable";
import ProductModal from "../../Components/ProductModal/ProductModal";
import { useQuery } from "@tanstack/react-query";
import api from "../../services/api";

function Products() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsChunks, setProductsChunks] = useState([]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const {
    data: products,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () => api.get("/products").then((res) => res?.data.docs),
  });

  useEffect(() => {
    if (products) {
      const splitIntoChunks = (data, chunkSize) => {
        const chunks = [];
        for (let i = 0; i < data.length; i += chunkSize) {
          chunks.push(data.slice(i, i + chunkSize));
        }
        return chunks;
      };

      // Split products into chunks of 6 (or however many you want per page)
      const chunks = splitIntoChunks(products, 6);
      setProductsChunks(chunks);
    }
  }, [products]);

  return (
    <main className="products">
      <MainTitle>Products</MainTitle>

      <div className="main-body products__body">
        <ProductsHeader openModal={openModal} />
        <ProductsTable
          selectedItems={selectedItems}
          onItemSelect={setSelectedItems}
          products={productsChunks[currentPage - 1] || []} // Use the current page chunk
          isLoading={isLoading}
          error={error}
          refetchProducts={refetch}
        />
        <ProductsFooter
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={productsChunks.length} // Pass total pages for navigation
          selectedItems={selectedItems}
          onSetSelectedItems={setSelectedItems}
        />
        <ProductModal
          isOpen={isModalOpen}
          onClose={closeModal}
          refetchProducts={refetch}
        />
      </div>
    </main>
  );
}

export default Products;
