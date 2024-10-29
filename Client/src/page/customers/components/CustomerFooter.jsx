import PrimaryBtn from "../../../Components/Buttons/PrimaryBtn";
import PageNavigate from "../../../Components/PageNavigate/PageNavigate";

function CustomerFooter({
  currentPage,
  setCurrentPage,
  totalPages,
  selectedItems,
  onSetSelectedItems,
}) {
  return (
    <div className="customer__footer">
      <PageNavigate
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        length={totalPages}
      />
    </div>
  );
}

export default CustomerFooter;
