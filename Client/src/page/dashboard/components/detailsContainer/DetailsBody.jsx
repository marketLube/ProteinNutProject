import DetailsItems from "./DetailsItems";

function DetailsBody() {
  return (
    <div className="detailsContainer__body detailsContainer2 ">
      <p style={{ fontSize: "1.2rem", padding: "1rem" }}>Your top 4 items</p>
      <div className="detailsContainer__griid">
        <DetailsItems />
        <DetailsItems />
        <DetailsItems />
        <DetailsItems />
      </div>
    </div>
  );
}

export default DetailsBody;
