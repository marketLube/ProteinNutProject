export const getStatusClass = (status) => {
  const statusClasses = {
    "COMPLETED": "btn completed-btn",
    "CONFIRMED": "btn confirmed-btn",
    "CANCELLED": "btn canceled-btn",
    "ON REFUND": "btn on-refund-btn",
  };
  return statusClasses[status?.toUpperCase()] || "btn";
};


export const formatProductName = (name) => {
  const words = name?.split(" ");
  return words?.length <= 4 ? (
    name
  ) : (
    <>
      {words?.slice(0, 4).join(" ")}
      <br />
      {words?.slice(4).join(" ")}
    </>
  );
};

export const formatAddress = (address) => {
  const limitedAddress = address?.slice(0, 60);
  let line1 = "",
    line2 = "";
  const words = limitedAddress?.split(" ");

  words?.forEach((word) => {
    if (line1.length + word.length <= 30) {
      line1 += (line1 ? " " : "") + word;
    } else if (line2.length + word.length <= 30) {
      line2 += (line2 ? " " : "") + word;
    }
  });

  return (
    <>
      {line1}
      {line2 && <br />}
      {line2}
    </>
  );
};
