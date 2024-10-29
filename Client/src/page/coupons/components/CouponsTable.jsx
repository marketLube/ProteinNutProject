import { FaPlus } from "react-icons/fa";
import moment from "moment";

import Spinner from "../../../Components/Spinner/Spinner";

const CouponsTable = ({
  isAdding,
  coupons,
  newCoupon,
  onAddClick,
  onInputChange,
  selectedCoupons,
  onSelectCoupon,
  isLoading,
}) => {
  const formatDescription = (description) => {
    const words = description?.split(" ");
    const firstLine = words?.slice(0, 10)?.join(" ");
    const secondLine = words?.slice(10, 20)?.join(" ");
    return (
      <>
        <div>{firstLine}</div>
        <div>
          {secondLine}
          {words?.length > 20 ? "..." : ""}
        </div>
      </>
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onInputChange(name, value);
  };

  return (
    <div className="coupons">
      <div className="coupons__table">
        <table>
          <colgroup>
            <col style={{ width: "5%" }} />
            <col style={{ width: "20%" }} />
            <col style={{ width: "40%" }} />
            <col style={{ width: "20%" }} />
          </colgroup>
          <thead>
            <tr>
              <th colSpan="4">
                <div className="coupons__header">
                  <div className="coupons__header-left">
                    {/* <input type="checkbox" /> */}
                  </div>
                  <div className="coupons__header-right">
                    <button className="coupons__add-btn" onClick={onAddClick}>
                      <FaPlus />
                    </button>
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {isAdding && (
              <tr key="new-coupon-row">
                <td>
                  <input type="checkbox" disabled />
                </td>
                <td>
                  <div className="coupon_code_discount">
                    <input
                      type="text"
                      name="name"
                      value={newCoupon.name}
                      onChange={handleInputChange}
                      placeholder="Coupon Code"
                    />
                    <input
                      type="number"
                      name="discountPercent"
                      value={newCoupon.discountPercent}
                      onChange={handleInputChange}
                      placeholder="Discount %"
                    />
                  </div>
                </td>
                <td>
                  <input
                    type="text"
                    name="code"
                    value={newCoupon.code}
                    onChange={handleInputChange}
                    placeholder="Description"
                  />
                </td>
                <td>
                  <input
                    type="datetime-local"
                    name="expireDate"
                    value={newCoupon.expireDate}
                    onChange={handleInputChange}
                  />
                </td>
              </tr>
            )}
            {isLoading ? (
              <tr>
                <td
                  colSpan="4"
                  style={{ textAlign: "center", padding: "20px" }}
                >
                  <Spinner />
                </td>
              </tr>
            ) : coupons.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No coupons available
                </td>
              </tr>
            ) : (
              coupons?.map((coupon) => (
                <tr key={coupon.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedCoupons.includes(coupon._id)}
                      onChange={() => onSelectCoupon(coupon._id)}
                    />
                  </td>
                  <td>
                    <div className="coupon-code-discount">
                      <span className="coupon-code">{coupon.name}</span>
                      <span className="coupon-discount">
                        {coupon.discountPercent}
                      </span>
                    </div>
                  </td>
                  <td>
                    <span className="coupon-description">
                      {formatDescription(coupon.code)}
                    </span>
                  </td>
                  <td>
                    <div className="coupon-date">
                      <div>
                        {moment(coupon.expireDate).format("YYYY-MM-DD")}
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CouponsTable;
