function PrimaryBtn({ children, style, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={style}
      className="btn primary-btn"
    >
      {children}
    </button>
  );
}

export default PrimaryBtn;
