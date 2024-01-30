import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Catalogue } from "@/types/catalogue";
import { Product } from "@/types/product";

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

const CatalogueList = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Fungsi untuk mengambil data dari API
    const fetchData = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();

        // Assuming the actual array of products is inside a property named 'products'
        const productsData = data.products || [];

        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Panggil fungsi fetchData ketika komponen ini pertama kali dirender
    fetchData();
  }, []);

  return (
    <>
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
              <div className="font-bold text-xl mb-2">{product.name}</div>
              <div className="font-thin text-xl mb-2">{product.category}</div>
              <button className="flex items-center mt-4 px-3 py-2 transition-colors duration-700 transform bg-primary hover:bg-meta-5 text-white rounded-full">
                <FontAwesomeIcon icon={faSearch} className="mr-2" />
                Search
              </button>
            </div>
          </div>
        </a>
      ))}
    </>
  );
};

export default CatalogueList;
