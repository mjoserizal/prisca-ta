"use client";
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
const catalogueData: Catalogue[] = [
  {
    image: "/images/product/product-01.png",
    name: "Office Goods",
    category: "Multibrand",
  },
  {
    image: "/images/product/product-01.png",
    name: "Office Goods",
    category: "Multibrand",
  },
  {
    image: "/images/product/product-01.png",
    name: "Office Goods",
    category: "Multibrand",
  },
  {
    image: "/images/product/product-01.png",
    name: "Office Goods",
    category: "Multibrand",
  },
  {
    image: "/images/product/product-01.png",
    name: "Office Goods",
    category: "Multibrand",
  },
  {
    image: "/images/product/product-01.png",
    name: "Office Goods",
    category: "Multibrand",
  },
];

export default function Dashboard({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
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
                    {/* <h4 className="text-xl font-semibold text-black dark:text-white">
                      Catalogue
                    </h4> */}
                    <Breadcrumb pageName="Catalogue" />
                    <div className="absolute top-2 right-0 mt-4 mr-4">
                      {/* <input
                        type="text"
                        placeholder="Cari..."
                        className="w-60 h-8 pl-4 rounded-md border border-stroke focus:border-blue-500 focus:outline-none focus:shadow-primary"
                      /> */}
                    </div>
                    <div className="grid grid-cols-6 gap-4 mt-4 pt-12">
                      {catalogueData.map((product) => (
                        <a
                          className="col-span-6 sm:col-span-3 md:col-span-2 lg:col-span-2 xl:col-span-1"
                          key={product.name}>
                          <div className="max-w-sm rounded overflow-hidden shadow-lg hover:shadow-xl transition duration-300">
                            <Image
                              className="w-full"
                              src={product.image}
                              width={60}
                              height={50}
                              alt="Product"
                            />
                            <div className="px-6 py-4 flex flex-col justify-center items-center">
                              <div className="font-bold text-xl mb-2">
                                {product.name}
                              </div>
                              <div className="font-thin text-xl mb-2">
                                {product.category}
                              </div>
                              <button className="flex items-center mt-4 px-3 py-2 transition-colors duration-700 transform bg-primary hover:bg-meta-5 text-white rounded-full">
                                <FontAwesomeIcon
                                  icon={faSearch}
                                  className="mr-2"
                                />
                                Search
                              </button>
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
}
