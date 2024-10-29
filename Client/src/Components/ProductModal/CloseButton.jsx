export const CloseButton = ({ onClick }) => (
    <button
      onClick={onClick}
      type="button"
      style={{
        position: 'absolute',
        top: '5px',
        right: '5px',
        background: 'red',
        color: 'white',
        border: 'none',
        borderRadius: '50%',
        width: '20px',
        height: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
      }}
    >
      ×
    </button>
  );