import { useQuery } from "@tanstack/react-query";
import MainTitle from "../../Components/smallcomponents/MainTitle";
import CustomerFooter from "./components/CustomerFooter";
import CustomerTable from "./components/CustomerTable";
import api from "../../services/api";
import { useEffect, useState } from "react";

function Customers() {
  const [currentPage, setCurrentPage] = useState(1);
  const [customersChunks, setCustomersChunks] = useState([]);

  const {
    data: customers,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["customers"],
    queryFn: () => api.get("/users?=-createdAt").then((data) => data.data.docs),
  });

  useEffect(() => {
    if (customers) {
      const splitIntoChunks = (data, chunkSize) => {
        const chunks = [];
        for (let i = 0; i < data.length; i += chunkSize) {
          chunks.push(data.slice(i, i + chunkSize));
        }
        return chunks;
      };

      // Split customers into chunks of 6 (or however many you want per page)
      const chunks = splitIntoChunks(customers, 4);
      setCustomersChunks(chunks);
    }
  }, [customers]);

  console.log(customers, "customers");

  return (
    <main className="customers">
      <MainTitle>Customers</MainTitle>

      <div className="main-body">
        <CustomerTable
          customers={customersChunks[currentPage - 1] || []}
          isLoading={isLoading}
          error={error}
          refetchProducts={refetch}
        />
        <CustomerFooter
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={customersChunks.length}
        />
      </div>
    </main>
  );
}

export default Customers;
