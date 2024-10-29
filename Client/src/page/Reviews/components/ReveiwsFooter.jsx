import SecondaryBtn from "../../../Components/Buttons/SecondaryBtn";
import PageNavigate from "../../../Components/PageNavigate/PageNavigate";

function ReveiwsFooter({
  currentPage,
  setCurrentPage,
  totalPages,
  selectedItems,
  btnDisable,
}) {
  return (
    <div className="reviews__footer">
      <div>
        <PageNavigate
          btnDisable={btnDisable}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          length={totalPages} // Pass total pages for pagination
          // btnDisable=
        />
      </div>
      {selectedItems.length > 0 && (
        <SecondaryBtn>Delete ({selectedItems.length})</SecondaryBtn>
      )}
    </div>
  );
}

export default ReveiwsFooter;
