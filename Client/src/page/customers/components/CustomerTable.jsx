import React from "react";
import Spinner from "../../../Components/Spinner/Spinner";

const CustomerTable = ({ customers, isLoading, error }) => {
  return (
    <div className="customers__table">
      <table className="main_table">
        <thead className="table_head">
          <tr>
            <th>CUSTOMER NAME</th>
            <th>EMAIL</th>
            <th>PHONE NUMBER</th>
            <th>ADDRESS</th>
            <th>PURCHASE VALUE</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
                {/* <div className={styles.spinnerContainer}>
                <div className={styles.spinner}></div>
              </div> */}
                <Spinner />
              </td>
            </tr>
          ) : customers.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                No customers available
              </td>
            </tr>
          ) : error ? (
            <tr>
              <td
                colSpan="100%"
                style={{ textAlign: "center", padding: "20px" }}
              >
                <h1>{error}</h1>
              </td>
            </tr>
          ) : (
            customers?.map((customer) => (
              <tr key={customer._id}>
                <td>{customer?.name}</td>
                <td>{customer?.email}</td>
                <td>{customer?.phone}</td>
                <td>{customer?.address || "Not Provided"}</td>
                <td>{customer?.purchaseValue || 0}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerTable;
