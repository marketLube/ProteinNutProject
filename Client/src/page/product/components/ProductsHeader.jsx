import PrimaryBtn from "../../../Components/Buttons/PrimaryBtn";

function ProductsHeader({ openModal }) {
  return (
    <div className="products__header">
      <PrimaryBtn style={{ fontWeight: "700" }} onClick={openModal}>
        Add new Product
      </PrimaryBtn>
    </div>
  );
}

export default ProductsHeader;
