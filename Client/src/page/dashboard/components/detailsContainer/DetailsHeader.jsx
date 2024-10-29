import DetailHeaderContent from "./DetailHeaderContent";

function DetailsHeader() {
  return (
    <div className="detailsContainer__header">
      <div className="headerlogo">
        <img src="./images/Logo.svg" className="imageheader" alt="" />
      </div>
      <div className="header-contents">
        <div>
          <h1 style={{ fontWeight: "bold", fontSize: "20px" }}>
            September 2024
          </h1>
        </div>
        <div className="header-contents__items">
          <DetailHeaderContent color={"#00ba9d"} />
          <DetailHeaderContent color={"#ff5470"} />
          <DetailHeaderContent color={"#035ECF"} />
        </div>
      </div>
    </div>
  );
}

export default DetailsHeader;
