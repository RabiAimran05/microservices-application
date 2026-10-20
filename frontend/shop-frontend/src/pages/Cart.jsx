import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);

  if (!user) return <Navigate to="/login" />;

  const save = (newCart) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const changeQty = (id, delta) =>
    save(cart.map((i) => (i._id === id ? { ...i, qty: i.qty + delta } : i)).filter((i) => i.qty > 0));

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  if (cart.length === 0) {
    return (
      <div className="mt-20 text-center">
        <p className="mb-4 text-lg text-slate-500">السلة فارغة</p>
        <Link to="/" className="btn">العودة للمنتجات</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl p-4">
      <h1 className="mb-6 text-2xl font-bold">السلة</h1>

      <div className="divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
        {cart.map((i) => (
          <div key={i._id} className="flex items-center gap-4 p-4">
            <img src={i.image} alt={i.name} className="h-14 w-14 rounded-lg object-cover" />
            <div className="flex-1">
              <p className="font-semibold">{i.name}</p>
              <p className="text-sm text-slate-500">{i.price} $</p>
            </div>
            <button onClick={() => changeQty(i._id, -1)} className="btn-light">−</button>
            <span>{i.qty}</span>
            <button onClick={() => changeQty(i._id, 1)} className="btn-light">+</button>
            <span className="w-16 text-left font-semibold">{i.price * i.qty} $</span>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <p className="text-lg">المجموع: <b className="text-indigo-600">{total} $</b></p>
        <div className="flex gap-3">
          <Link to="/" className="btn-light">متابعة التسوّق</Link>
          <button onClick={() => navigate("/checkout")} className="btn">تأكيد السلة</button>
        </div>
      </div>
    </div>
  );
}
