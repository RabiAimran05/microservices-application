import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

const PRODUCTS_URL = import.meta.env.VITE_PRODUCTS_URL;

export default function Admin() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [form, setForm] = useState({ name: "", price: "", quantity: "", image: "" });
  const [message, setMessage] = useState("");

  if (!user || user.role !== "admin") return <Navigate to="/login" />;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const product = {
        name: form.name,
        price: Number(form.price),
        quantity: Number(form.quantity),
        image: form.image,
      };

      // ===== TODO: products-service =====
      const token = localStorage.getItem("token");
      await axios.post(`${PRODUCTS_URL}/products`, product, { headers: { Authorization: `Bearer ${token}` } });
      console.log("product:", product);

      setForm({ name: "", price: "", quantity: "", image: "" });
      setMessage("تمت إضافة المنتج ✅");
    } catch (err) {
      setMessage("فشلت الإضافة");
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="mx-auto mt-10 max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">إضافة منتج</h1>
        <button onClick={logout} className="btn-light">خروج</button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" required placeholder="اسم المنتج" value={form.name} onChange={handleChange} className="input" />
        <input name="price" type="number" required min="0" placeholder="السعر" value={form.price} onChange={handleChange} className="input" dir="ltr" />
        <input name="quantity" type="number" required min="0" placeholder="الكمية" value={form.quantity} onChange={handleChange} className="input" dir="ltr" />
        <input name="image" required placeholder="رابط الصورة" value={form.image} onChange={handleChange} className="input" dir="ltr" />
        {message && <p className="text-sm text-slate-600">{message}</p>}
        <button className="btn w-full">إضافة</button>
      </form>
    </div>
  );
}
