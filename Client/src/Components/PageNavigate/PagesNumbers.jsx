import "./Pagination.css"; // Import the external CSS file

function PagesNumbers({
  currentPage,
  startPage,
  endPage,
  onSetCurrentPage,
  btnDisable,
}) {
  const handleOnclick = (val) => {
    console.log("button clicked");

    // Call this directly when clicked
    if (btnDisable && val > currentPage) return;
    onSetCurrentPage(val);
  };

  return (
    <ul className="page-numbers">
      {Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => i + startPage
      ).map((val) => (
        <li
          key={val}
          className={val === currentPage ? "current" : ""}
          onClick={() => handleOnclick(val)} // Use an arrow function here
        >
          {val}
        </li>
      ))}
    </ul>
  );
}

export default PagesNumbers;
