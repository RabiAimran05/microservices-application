import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

const ORDERS_URL = import.meta.env.VITE_ORDERS_URL;

export default function Checkout() {
  const user = JSON.parse(localStorage.getItem("user"));
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  if (!user) return <Navigate to="/login" />;

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const products_ids=[]
      cart.map(item=>{
        products_ids.push(item._id)
      })
      console.log(products_ids)
        
      

      // ===== TODO: order-service =====
      const token = localStorage.getItem("token");
      await axios.post(`${ORDERS_URL}/orders`, products_ids, { headers: { Authorization: `Bearer ${token}` } });
      console.log(products_ids);

      localStorage.removeItem("cart");
      setDone(true);
    } catch (err) {
      setError("فشل إتمام الطلب");
    }
  };

  if (done) {
    return (
      <div className="mx-auto mt-20 max-w-sm rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <div className="mb-3 text-5xl">✅</div>
        <h1 className="mb-6 text-2xl font-bold">تمّ الدفع بنجاح</h1>
        <Link to="/" className="btn inline-block">العودة للمتجر</Link>
      </div>
    );
  }

  if (cart.length === 0) return <Navigate to="/cart" />;

  return (
    <div className="mx-auto mt-10 max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <h1 className="mb-2 text-2xl font-bold">الدفع</h1>
      <p className="mb-6 text-slate-500">المجموع: <b className="text-indigo-600">{total} $</b></p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input required placeholder="العنوان" value={address} onChange={(e) => setAddress(e.target.value)} className="input" />
        <input required placeholder="رقم الهاتف" value={phone} onChange={(e) => setPhone(e.target.value)} className="input" dir="ltr" />
        {error && <p className="text-sm text-rose-600">{error}</p>}
        <div className="flex gap-3">
          <button className="btn flex-1">ادفع</button>
          <Link to="/cart" className="btn-light">رجوع</Link>
        </div>
      </form>
    </div>
  );
}
