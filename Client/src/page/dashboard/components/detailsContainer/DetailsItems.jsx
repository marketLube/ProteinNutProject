import { FiShoppingCart } from "react-icons/fi";
const DetailsItems = () => {
  return (
    <div className="detailsContainer__griid_items">
      <div className="product_item"></div>

      <div className="detailsContainer2__item_details">
        {/* <div className="detailsContainer2__item_details__content1">
          <p>Item title here</p>
          <p className="price hidden-price" >100USD</p>
        </div>
        <div  className="detailsContainer2__item_details_content2">
          <div>
          <p className="detailsContainer2__item_details_content2__p" >12</p>
          <p className="detailsContainer2__order">Orders</p>
          </div>
          <p>7</p>
        </div> */}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
            marginTop: "10px",
          }}
        >
          <h1>Item title here</h1>
          <p>100USD</p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0",
              marginTop: "10px",
              padding: "0",
            }}
          >
            <h1 style={{ fontWeight: "bold", fontSize: "1.7rem" }}>12</h1>
            <p style={{ fontSize: "1rem", color: "gray" }}>Orders</p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <FiShoppingCart />
            <h1>18</h1>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DetailsItems;
