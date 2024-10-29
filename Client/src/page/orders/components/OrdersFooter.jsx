import PageNavigate from "../../../Components/PageNavigate/PageNavigate";

function OrdersFooter({ currentPage, setCurrentPage, totalPages }) {
  return (
    <div className="orders__footer">
      <PageNavigate
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        length={totalPages}
      />
    </div>
  );
}

export default OrdersFooter;
