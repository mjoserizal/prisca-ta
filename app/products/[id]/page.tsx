"use client";
import Cookies from "js-cookie";
import "@/app/data-tables-css.css";
import "@/app/satoshi.css";
import "@/app/globals.css";
import { useState, useEffect } from "react";
import Loader from "@/components/common/Loader";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Image from "next/image";
import { Catalogue } from "@/types/catalogue";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Link from "next/link";
const DetailProduct = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const apiUrl = "http://192.168.1.48:8000/api/allProduct/{$id}";
  //       const token = localStorage.getItem("authToken");

  //       const response = await fetch(apiUrl, {
  //         method: "GET",
  //         headers: {
  //           Accept: "application/json",
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`, // Fix: Use backticks for template literals
  //         },
  //         credentials: "include",
  //       });

  //       if (response.ok) {
  //         const contentType = response.headers.get("content-type");
  //         if (contentType && contentType.includes("application/json")) {
  //           const data = await response.json();
  //           setProducts(data.products);
  //           setLoading(false); // Set loading to false once data is fetched
  //         } else {
  //           console.error("Response is not in JSON format");
  //           setLoading(false); // Set loading to false if the response is not in JSON format
  //         }
  //       } else {
  //         console.error("Gagal mengambil data produk:", response.statusText);
  //         setLoading(false); // Set loading to false if the response status is not ok
  //         setError("Failed to fetch products"); // Set an error message
  //       }
  //     } catch (error) {
  //       console.error("Terjadi kesalahan:", error);
  //       setLoading(false); // Set loading to false in case of an error
  //       setError("An error occurred while fetching products"); // Set an error message
  //     }
  //   };

  //   fetchProducts();
  // }, []);

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <div className="flex h-screen overflow-hidden">
        {/* <!-- ===== Sidebar Start ===== --> */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* <!-- ===== Header Start ===== --> */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className="p-5">
              <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="py-6 px-4 md:px-6 xl:px-7.5 relative">
                  <Breadcrumb pageName="Product" />
                  <div className="absolute top-2 right-0 mt-4 mr-4">
                    {/* Add search input here if needed */}
                  </div>
                  <div className="grid grid-cols-4 gap-4 mt-4 pt-6 pl-10">
                    <img
                      src="https://source.unsplash.com/1200x1200/?nature" // Replace with your desired image URL
                      alt="Nature"
                      className=""
                      style={{
                        width: "500px",
                        height: "500px",
                        objectFit: "cover",
                      }}
                    />
                    <h1>Razor Office/Gaming Chair with Reclyne</h1>
                  </div>
                </div>
              </div>
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
    </div>
  );
};
export default DetailProduct;
