export const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }) => {
    if (!isOpen) return null;
  
    return (
      <div className="modal-overlay">
        <div className="modal-content confirmation-modal">
          <h3>{message}</h3>
          <div className="modal-actions">
            <button className="cancel-btn" onClick={onClose}>Cancel</button>
            <button className="confirm-btn" onClick={onConfirm}>Confirm</button>
          </div>
        </div>
      </div>
    );
  };