"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Mendapatkan token dari cookie
        const token = Cookies.get("authToken");

        // Pastikan token ada sebelum membuat permintaan
        if (!token) {
          setError("Token tidak ditemukan dalam cookie");
          setLoading(false);
          return;
        }

        const apiUrl =
          "https://0746-103-75-53-93.ngrok-free.app/api/allProduct";
        console.log("API URL:", apiUrl);
        console.log("Token:", token);

        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Raw Response:", response);

        // Check if the response is successful
        if (!response.ok) {
          if (response.status === 401) {
            setError("Unauthorized: Please log in again.");
          } else {
            const errorMessage = await response.text();
            setError(
              `Response error: ${response.status} - ${response.statusText}\n${errorMessage}`
            );
          }
        } else {
          // Parse the response as JSON
          const data = await response.json();
          console.log("Data fetched successfully:", data);
          setProducts(data);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setError("An unexpected error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Product Page</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {error ? (
            <p>Error: {error}</p>
          ) : (
            <>
              {products.length > 0 ? (
                <ul>
                  {products.map((product, index) => (
                    <li key={index}>
                      <h2>{product.name}</h2>
                      <p>{product.description}</p>
                      <p>Price: ${product.price}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No products available.</p>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ProductPage;
