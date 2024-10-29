const DetailHeaderContent = ({ color }) => {
  return (
    <div className="header_item">
      <div style={{ backgroundColor: color }} className="header_item-logo">
        <h2>Logo</h2>
      </div>
      <div className="headers_item-content">
        <h1 style={{ fontWeight: "bold", fontSize: "25px" }}>6784</h1>
        <h4 style={{ fontWeight: "bold" }}>Total Deliveries</h4>
      </div>
    </div>
  );
};
export default DetailHeaderContent;
