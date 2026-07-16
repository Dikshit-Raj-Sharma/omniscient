import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios.js";
import { PriceChart } from "../components/PriceChart.jsx";

const Dashboard = () => {
  const navigate = useNavigate();

  const [productName, setProductName] = useState("");
  const [productUrl, setProductUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products/dashboard");
      setProducts(response.data.data);
    } catch (error) {
      console.log("Failed to load products :/", error);
      setErr("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await api.post("/products/add", {
        name: productName,
        url: productUrl,
      });

      setProductName("");
      setProductUrl("");
      fetchProducts();
    } catch (error) {
      console.error("Failed to Add Product :/", error);
      setErr("Failed to add product");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#282A36]">
        <h1 className="text-xl font-semibold text-[#F8F8F2]">
          Loading Dashboard...
        </h1>
      </div>
    );
  }

  if (err && products.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#282A36] px-4">
        <p className="rounded-md border border-[#FF5555]/40 bg-[#FF5555]/10 px-4 py-3 text-[#FF5555]">
          {err}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#282A36] via-[#2F3142] to-[#282A36] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-center text-3xl font-bold text-[#F8F8F2] sm:text-4xl">
          My Watchlist
        </h1>

        <div className="mb-10 rounded-xl border border-[#44475A] bg-[#44475A] p-6 shadow-2xl">
          <h2 className="mb-6 text-xl font-semibold text-[#8BE9FD]">
            Add Product
          </h2>

          <form className="space-y-5" onSubmit={handleAddProduct}>
            <div>
              <label className="mb-2 block text-sm font-medium text-[#8BE9FD]">
                Product Name
              </label>

              <input
                type="text"
                required
                placeholder="Add Product Name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full rounded-md border border-[#6272A4] bg-[#282A36] px-3 py-3 text-base text-[#F8F8F2] placeholder-[#6272A4] focus:border-[#BD93F9] focus:outline-none focus:ring-2 focus:ring-[#BD93F9]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#8BE9FD]">
                Product URL
              </label>

              <input
                type="text"
                required
                placeholder="Add Product Link"
                value={productUrl}
                onChange={(e) => setProductUrl(e.target.value)}
                className="w-full rounded-md border border-[#6272A4] bg-[#282A36] px-3 py-3 text-base text-[#F8F8F2] placeholder-[#6272A4] focus:border-[#BD93F9] focus:outline-none focus:ring-2 focus:ring-[#BD93F9]"
              />
            </div>

            {err && (
              <div className="rounded-md border border-[#FF5555]/40 bg-[#FF5555]/10 p-3">
                <p className="text-sm font-medium text-[#FF5555]">{err}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-md bg-[#BD93F9] px-4 py-3 text-sm font-semibold text-[#282A36] transition-all duration-200 hover:bg-[#FF79C6] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Adding to Watchlist..." : "Track Product"}
            </button>
          </form>
        </div>

        <div className="space-y-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="overflow-hidden rounded-xl border border-[#44475A] bg-[#44475A] p-4 shadow-xl sm:p-6"
            >
              <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-lg font-semibold text-[#F8F8F2] sm:text-xl">
                  {product.name}
                </h2>
              </div>

              <div className="rounded-lg bg-[#282A36] p-3 sm:p-4">
                <PriceChart history={product.history} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { Dashboard };