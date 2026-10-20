import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

const PRODUCTS_URL = import.meta.env.VITE_PRODUCTS_URL;

const getCart = () => JSON.parse(localStorage.getItem("cart")) || [];

export default function Home() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(getCart().length);

  useEffect(() => {
    // ===== TODO: products-service =====
    const token = localStorage.getItem("token");
    axios
      .get(`${PRODUCTS_URL}/products`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
  setProducts(res.data);
})

    
  }, []);

  if (!user) return <Navigate to="/login" />;

  const addToCart = (product) => {
    const cart = getCart();
    const item = cart.find((i) => i._id === product._id);
    if (item) item.qty += 1;
    else cart.push({ ...product, qty: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    setCartCount(cart.length);
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="mx-auto max-w-6xl p-4">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">المنتجات</h1>
        <div className="flex gap-3">
          <Link to="/cart" className="btn">السلة ({cartCount})</Link>
          <button onClick={logout} className="btn-light">خروج</button>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((p) => (
          <div key={p._id} className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <img src={p.image} alt={p.name} className="h-40 w-full object-cover" />
            <div className="flex flex-1 flex-col gap-2 p-4">
              <h3 className="font-semibold">{p.name}</h3>
              <p className="text-sm text-slate-500">
                <b className="text-lg text-indigo-600">{p.price} $</b> · متوفر: {p.quantity}
              </p>
              <button onClick={() => addToCart(p)} className="btn mt-auto">أضف إلى السلة</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
