import { useQueryClient } from "@tanstack/react-query";
import SecondaryBtn from "../../../Components/Buttons/SecondaryBtn";
import api from "../../../services/api";
import PageNavigate from "../../../Components/PageNavigate/PageNavigate";

function ProductsFooter({
  currentPage,
  setCurrentPage,
  totalPages,
  selectedItems,
  onSetSelectedItems,
}) {
  const queryClient = useQueryClient();

  const handleDelete = async () => {
    try {
      const res = await api.delete(`/products/${selectedItems[0]._id}`);
      queryClient.invalidateQueries(["products"]); // Ensure this matches the query key
      onSetSelectedItems([]);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="products__footer">
      <PageNavigate
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        length={totalPages}
      />
      {selectedItems.length > 0 && (
        <SecondaryBtn onClick={handleDelete}>
          Delete ({selectedItems.length})
        </SecondaryBtn>
      )}
    </div>
  );
}

export default ProductsFooter;
