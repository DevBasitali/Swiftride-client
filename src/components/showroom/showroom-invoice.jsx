import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiDownload, FiEye, FiSearch, FiFilter } from "react-icons/fi";
import ShowroomNavbar from "./showroomNavbar";
import Footer from "../Footer";

const Base_Url = import.meta.env.VITE_API_URL;

// Dummy invoice data for testing
const dummyInvoices = [
  {
    bookingId: "INV-1001",
    carName: "Toyota Corolla",
    createdAt: "2023-05-15T10:30:00Z",
    isCompleted: true,
    balance: 25000,
    invoiceUrl: "https://example.com/invoice1.pdf",
  },
  {
    bookingId: "INV-1002",
    carName: "Honda Civic",
    createdAt: "2023-06-20T14:45:00Z",
    isCompleted: false,
    balance: 30000,
    invoiceUrl: "https://example.com/invoice2.pdf",
  },
  {
    bookingId: "INV-1003",
    carName: "Suzuki Cultus",
    createdAt: "2023-07-10T09:15:00Z",
    isCompleted: true,
    balance: 18000,
    invoiceUrl: "https://example.com/invoice3.pdf",
  },
  {
    bookingId: "INV-1004",
    carName: "Toyota Fortuner",
    createdAt: "2023-08-05T16:20:00Z",
    isCompleted: false,
    balance: 45000,
    invoiceUrl: "https://example.com/invoice4.pdf",
  },
];

const ShowroomInvoiceDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // 'all', 'paid', 'unpaid'
  const [useDummyData, setUseDummyData] = useState(false);

  const fetchInvoices = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${Base_Url}/api/get-showroom-invoice`, {
        withCredentials: true,
      });
      setInvoices(response?.data?.data || []);
      setUseDummyData(false);
    } catch (error) {
      console.error("Error fetching invoices:", error);
      setError(
        error.response?.data?.message ||
          "Failed to fetch invoices. Using dummy data instead."
      );
      setInvoices(dummyInvoices);
      setUseDummyData(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const openPDF = (url) => {
    if (url) {
      window.open(url, "_blank");
    } else {
      alert("Invoice PDF not available for this record");
    }
  };

  const handleDownload = (url) => {
    if (url) {
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "invoice.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert("Invoice PDF not available for download");
    }
  };

  const filteredData = invoices.filter((item) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      item?.bookingId?.toLowerCase().includes(searchLower) ||
      item?.carName?.toLowerCase().includes(searchLower) ||
      (sessionStorage.getItem("name") || "")
        .toLowerCase()
        .includes(searchLower) ||
      item?.createdAt?.toLowerCase().includes(searchLower) ||
      (item?.isCompleted ? "paid" : "unpaid").includes(searchLower);

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "paid" && item?.isCompleted) ||
      (statusFilter === "unpaid" && !item?.isCompleted);

    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-PK", options);
  };

  return (
    <>
      <ShowroomNavbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 sm:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 text-center sm:text-left">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Invoice Dashboard
            </h1>
            <p className="text-gray-600">
              Manage and view all your invoices in one place
            </p>
            {useDummyData && (
              <div className="mt-2 bg-yellow-100 text-yellow-800 p-2 rounded-md inline-block">
                Using dummy data for demonstration
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8">
            <div className="relative w-full sm:w-96">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                placeholder="Search by ID, car, client, date or status..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <FiFilter className="text-gray-500" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="block w-full sm:w-40 pl-3 pr-10 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
              >
                <option value="all">All Statuses</option>
                <option value="paid">Paid</option>
                <option value="unpaid">Unpaid</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-pulse flex flex-col items-center">
                <div className="h-12 w-12 bg-blue-400 rounded-full mb-4"></div>
                <span className="text-lg text-gray-600">
                  Loading invoices...
                </span>
              </div>
            </div>
          ) : error && !useDummyData ? (
            <div className="bg-red-50 rounded-xl p-6 text-center">
              <p className="text-red-600 font-medium mb-4">{error}</p>
              <button
                onClick={fetchInvoices}
                className="px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
              >
                Retry
              </button>
            </div>
          ) : (
            <div className="bg-white shadow-lg rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      {[
                        "Date",
                        "Status",
                        "Invoice ID",
                        "Client",
                        "Car Name",
                        "Rental Amount (PKR)",
                        "Actions",
                      ].map((header) => (
                        <th
                          key={header}
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredData.length > 0 ? (
                      filteredData.map((invoice) => (
                        <tr
                          key={invoice.bookingId}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {formatDate(invoice.createdAt)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                                ${invoice?.isCompleted ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                            >
                              {invoice?.isCompleted ? "Paid" : "Unpaid"}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {invoice.bookingId}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {invoice.user?.ownerName}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {invoice.carName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            PKR {invoice.balance?.toLocaleString() || "0"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-3">
                              <button
                                onClick={() => openPDF(invoice.invoiceUrl)}
                                className="text-blue-600 hover:text-blue-800 transition-colors p-1 rounded hover:bg-blue-50"
                                title="View Invoice"
                              >
                                <FiEye className="h-5 w-5" />
                              </button>
                              <button
                                onClick={() =>
                                  handleDownload(invoice.invoiceUrl)
                                }
                                className="text-gray-600 hover:text-gray-800 transition-colors p-1 rounded hover:bg-gray-50"
                                title="Download Invoice"
                              >
                                <FiDownload className="h-5 w-5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="px-6 py-12 text-center">
                          <div className="text-gray-500">
                            {invoices.length === 0
                              ? "No invoices found"
                              : `No invoices matching your search criteria`}
                          </div>
                          <button
                            onClick={() => {
                              setSearchTerm("");
                              setStatusFilter("all");
                            }}
                            className="mt-4 px-4 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors"
                          >
                            Reset Filters
                          </button>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ShowroomInvoiceDashboard;
