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
const ProductTable = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const apiUrl = "http://192.168.1.48:8000/api/allProduct";
        const token = localStorage.getItem("authToken");

        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Fix: Use backticks for template literals
          },
          credentials: "include",
        });

        if (response.ok) {
          const contentType = response.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            const data = await response.json();
            setProducts(data.products);
            setLoading(false); // Set loading to false once data is fetched
          } else {
            console.error("Response is not in JSON format");
            setLoading(false); // Set loading to false if the response is not in JSON format
          }
        } else {
          console.error("Gagal mengambil data produk:", response.statusText);
          setLoading(false); // Set loading to false if the response status is not ok
          setError("Failed to fetch products"); // Set an error message
        }
      } catch (error) {
        console.error("Terjadi kesalahan:", error);
        setLoading(false); // Set loading to false in case of an error
        setError("An error occurred while fetching products"); // Set an error message
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      {loading ? (
        <Loader />
      ) : (
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
                    <div className="grid grid-cols-6 gap-4 mt-4 pt-12">
                      {products.map((product, key) => (
                        <a
                          className="col-span-6 sm:col-span-3 md:col-span-2 lg:col-span-2 xl:col-span-1"
                          key={key}>
                          <div className="max-w-sm rounded overflow-hidden shadow-lg hover:shadow-xl transition duration-300">
                            {/* Image section */}
                            <div className="w-full h-48 overflow-hidden">
                              <Image
                                className="w-full h-full object-cover"
                                src={product.thumbnail}
                                width={100}
                                height={100}
                                alt="Product"
                              />
                            </div>
                            {/* Content section */}
                            <div className="px-6 py-4 flex flex-col justify-between items-center h-52">
                              <div className="font-bold text-xl mb-2 overflow-hidden overflow-ellipsis max-w-full text-center">
                                {product.name
                                  ? `${product.name}...`
                                  : product.name}
                              </div>
                              <div className="font-thin text-xl mb-2 text-center">
                                {product.category}
                              </div>
                              <div className="font-bold text-xl mb-2 overflow-hidden overflow-ellipsis">
                                ${product.price}
                              </div>
                              <Link
                                href={`/products/${product.id}`}
                                key={product.id}
                                className="flex items-center mt-4 px-3 py-2 transition-colors duration-700 transform bg-primary hover:bg-meta-5 text-white rounded-full">
                                <FontAwesomeIcon
                                  icon={faSearch}
                                  className="mr-2"
                                />
                                View Details
                              </Link>
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </main>
            {/* <!-- ===== Main Content End ===== --> */}
          </div>
          {/* <!-- ===== Content Area End ===== --> */}
        </div>
      )}
    </div>
  );
};
export default ProductTable;
