"use client";
import "@/app/data-tables-css.css";
import "@/app/satoshi.css";
import "@/app/globals.css";
import { useState } from "react";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Cart } from "@/types/cart";

const ProductTable = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [products, setProducts] = useState<Cart[]>([
    {
      image: "/images/product/product-02.png",
      name: "Macbook Air",
      price: 18000000,
      quantity: 1,
      total: 18000000,
    },
    {
      image: "/images/product/product-01.png",
      name: "Office Goods",
      price: 90000,
      quantity: 1,
      total: 90000,
    },
    {
      image: "/images/product/product-03.png",
      name: "Lenovo Thinkpad",
      price: 7000000,
      quantity: 1,
      total: 7000000,
    },
    // ... add other initial cart data as needed
  ]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const changeQuantity = (value: number, cart: Cart) => {
    const newQuantity = Math.max(0, value);
    const newTotal = newQuantity * cart.price;
    return { ...cart, quantity: newQuantity, total: newTotal };
  };

  const onQuantityPlus = (cart: Cart) => {
    const updatedProducts = products.map((p) =>
      p === cart ? changeQuantity(p.quantity + 1, p) : p
    );
    setProducts(updatedProducts);
  };

  const onQuantityMinus = (cart: Cart) => {
    const updatedProducts = products.map((p) =>
      p === cart ? changeQuantity(p.quantity - 1, p) : p
    );
    setProducts(updatedProducts);
  };

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <div className="flex h-screen overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main>
            <div className="p-5">
              <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="py-6 px-4 md:px-6 xl:px-7.5 relative">
                  <Breadcrumb pageName="Purchase Cart" />
                  <div className="flex flex-col">
                    <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-4">
                      <div className="p-2.5 xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                          Products
                        </h5>
                      </div>
                      <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                          Price
                        </h5>
                      </div>
                      <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                          Quantity
                        </h5>
                      </div>
                      <div className="hidden p-2.5 text-center sm:block xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                          Total
                        </h5>
                      </div>
                    </div>

                    {products.map((cart, key) => (
                      <div
                        className={`grid grid-cols-3 sm:grid-cols-4 ${
                          key === products.length - 1
                            ? ""
                            : "border-b border-stroke dark:border-strokedark"
                        }`}
                        key={key}>
                        <div className="flex items-center gap-3 p-2.5 xl:p-5">
                          <div className="flex-shrink-0">
                            <Image
                              src={cart.image}
                              alt="Brand"
                              width={48}
                              height={48}
                            />
                          </div>
                          <p className="hidden text-black dark:text-white sm:block">
                            {cart.name}
                          </p>
                        </div>

                        <div className="flex items-center justify-center p-2.5 xl:p-5">
                          <p className="text-black dark:text-white">
                            {formatCurrency(cart.price)}
                          </p>
                        </div>

                        <div className="flex items-center justify-center p-2.5 xl:p-5">
                          <button
                            onClick={() => onQuantityMinus(cart)}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-600 font-semibold py-2 px-4 rounded-l">
                            -
                          </button>
                          <p className="text-meta-3">{cart.quantity}</p>
                          <button
                            onClick={() => onQuantityPlus(cart)}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-600 font-semibold py-2 px-4 rounded-r">
                            +
                          </button>
                        </div>

                        <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                          <p className="text-black dark:text-white">
                            {formatCurrency(cart.total)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProductTable;
