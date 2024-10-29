import PrimaryBtn from "../../../Components/Buttons/PrimaryBtn";
import SecondaryBtn from "../../../Components/Buttons/SecondaryBtn";

function CoupnsFooter({ onCancel, onSave, onDelete, isAdding, selectedCount }) {
  return (
    <div className="coupons__footer">
      <span>{selectedCount > 0 && `${selectedCount} selected`}</span>
      <div className="coupons__footerBtns">
        {isAdding ? (
          <>
            <SecondaryBtn style={{ marginRight: ".5rem" }} onClick={onCancel}>
              Cancel
            </SecondaryBtn>
            <PrimaryBtn onClick={onSave}>Save</PrimaryBtn>
          </>
        ) : (
          selectedCount > 0 && (
            <SecondaryBtn onClick={onDelete}>Delete</SecondaryBtn>
          )
        )}
      </div>
    </div>
  );
}

export default CoupnsFooter;
