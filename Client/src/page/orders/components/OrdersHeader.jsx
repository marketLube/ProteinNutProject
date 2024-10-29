import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import OrderStats from "./orderStats/OrderStats";
import styles from "./OrdersHeader.module.css";
import { FaCalendarAlt } from "react-icons/fa";

function OrdersHeader({ orderStats, refetch }) {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [category, setCategory] = useState("");

  // Sample categories, replace with your actual categories
  const categories = ["All", "Peanut"];

  return (
    <div className="orders__header">
      <div className={styles.headerControls}>
        <div className={styles.dateRangePickerWrapper}>
          <FaCalendarAlt className={styles.calendarIcon} />
          <DatePicker
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={(update) => {
              setDateRange(update);
            }}
            isClearable={true}
            placeholderText="Select date range"
            className={styles.datePicker}
          />
        </div>

        <div className={styles.categoryDropdownWrapper}>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={styles.categoryDropdown}
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="orders__headeritems-container">
        <OrderStats orderStats={orderStats} refetch={refetch} />
      </div>
    </div>
  );
}

export default OrdersHeader;
