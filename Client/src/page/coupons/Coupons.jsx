import React, { useState } from "react";
import MainTitle from "../../Components/smallcomponents/MainTitle";
import CoupnsFooter from "./components/CoupnsFooter";
import CouponsTable from "./components/CouponsTable";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";
import api from "../../services/api";

function Coupons() {
  const [isAdding, setIsAdding] = useState(false);

  const {
    data: coupons,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["coupons"],
    queryFn: () =>
      api.get("/coupons?sort=expireDate").then((res) => res.data.docs),
  });
  console.log(coupons, "coupons");
  console.log(error, "error");
  //

  const formatDate = (date, time) => {
    return moment(`${date} ${time}`, "YYYY-MM-DD HH:mm").format(
      "YYYY-MM-DDTHH:mm:00.000Z"
    );
  };

  const [newCoupon, setNewCoupon] = useState({
    name: "",
    discountPercent: "",
    code: "",
    expireDate: "",
  });

  // format the date and time in new coupon to YYYY-MM-DDTHH:mm:ss.SSSZ using moment

  const formattedCoupon = {
    ...newCoupon,
    expireDate: moment(
      `${newCoupon.date} ${newCoupon.time}`,
      "YYYY-MM-DD HH:mm"
    ).format("YYYY-MM-DDTHH:mm:00.000Z"),
  };

  const [selectedCoupons, setSelectedCoupons] = useState([]);

  const handleAddClick = () => {
    setIsAdding(true);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setNewCoupon({ name: "", discountPercent: "", code: "", expireDate: "" });
  };

  const handleSave = async () => {
    const couponToSave = {
      id: Date.now(),
      ...newCoupon,
    };
    // setCoupons(prev => [couponToSave, ...prev]);
    setIsAdding(false);
    try {
      await api.post("/coupons", couponToSave, {
        withCredentials: true,
      });
      refetch();
    } catch (error) {
      console.log(error);
    }
  };
  console.log(newCoupon, "new coupon");

  const handleInputChange = (name, value) => {
    setNewCoupon((prev) => ({
      ...prev,
      [name]: name === "title" ? value.toUpperCase() : value,
    }));
  };

  const handleSelectCoupon = (id) => {
    setSelectedCoupons((prev) =>
      prev.includes(id)
        ? prev.filter((couponId) => couponId !== id)
        : [...prev, id]
    );
  };

  const handleDeleteSelected = async () => {
    try {
      await api.delete(`/coupons/${selectedCoupons}`, {
        withCredentials: true,
      });
      refetch();
    } catch (error) {
      console.log(error);
    }
    setSelectedCoupons([]);
  };

  return (
    <main className="coupons">
      <MainTitle>Coupons</MainTitle>
      <div className="main-body coupons__body">
        <CouponsTable
          isAdding={isAdding}
          coupons={coupons}
          newCoupon={newCoupon}
          onAddClick={handleAddClick}
          onInputChange={handleInputChange}
          selectedCoupons={selectedCoupons}
          onSelectCoupon={handleSelectCoupon}
          isLoading={isLoading}
        />
        <CoupnsFooter
          onCancel={handleCancel}
          onSave={handleSave}
          onDelete={handleDeleteSelected}
          isAdding={isAdding}
          selectedCount={selectedCoupons.length}
        />
      </div>
    </main>
  );
}

export default Coupons;
