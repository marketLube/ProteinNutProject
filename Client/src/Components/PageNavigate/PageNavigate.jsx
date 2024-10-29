import { useEffect, useState } from "react";
import PagesNumbers from "./PagesNumbers";
import { TbPlayerTrackNextFilled, TbPlayerTrackPrev } from "react-icons/tb";
import "./Pagination.css"; // Import the external CSS file

function PageNavigate({
  style,
  btnStyle,
  currentPage = 1,
  setCurrentPage = () => {},
  btnDisable = false,
  length = 4,
  pageSize = 6,
}) {
  const [startPage, setStartPage] = useState(1);
  const [endPage, setEndPage] = useState(4);
  console.log(currentPage);

  useEffect(() => {
    const pageRange = 4;
    const newStartPage =
      Math.floor((currentPage - 1) / pageRange) * pageRange + 1;
    const newEndPage = newStartPage + pageRange - 1;

    setStartPage(newStartPage);
    setEndPage(newEndPage);
  }, [currentPage]);

  const handlePrevious = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);

      if (newPage < startPage) {
        setStartPage(newPage - 3);
        setEndPage(newPage);
      }
    }
  };

  const handleNext = () => {
    if (currentPage <= endPage) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);

      if (newPage > endPage) {
        setStartPage(newPage);
        setEndPage(newPage + 3);
      }
    }
  };

  const totalPages = Math.ceil(length / pageSize);

  return (
    <div style={style} className="pagination">
      <button
        className={`button ${currentPage === 1 ? "disabled" : ""}`}
        onClick={handlePrevious}
        disabled={currentPage === 1}
        style={btnStyle}
      >
        <span className="prev-icon-span">
          <TbPlayerTrackPrev className="icons" />
        </span>
      </button>
      <PagesNumbers
        currentPage={currentPage}
        startPage={startPage}
        endPage={endPage}
        onSetCurrentPage={setCurrentPage}
        btnDisable={btnDisable}
        totalPages={totalPages}
      />
      <button
        className={`button ${btnDisable ? "disabled" : ""}`}
        onClick={handleNext}
        disabled={btnDisable}
        style={btnStyle}
      >
        <span className="next-icon-span">
          <TbPlayerTrackNextFilled className="icons" />
        </span>
      </button>
    </div>
  );
}

export default PageNavigate;
