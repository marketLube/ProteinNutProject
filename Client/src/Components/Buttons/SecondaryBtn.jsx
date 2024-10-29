function SecondaryBtn({ children, style, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={style}
      className="btn secondary-btn"
    >
      {children}
    </button>
  );
}

export default SecondaryBtn;
