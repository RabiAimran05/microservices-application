import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AUTH_URL = import.meta.env.VITE_AUTH_URL;

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      // ===== TODO: auth-service =====
      await axios.post(`${AUTH_URL}/register`, { name, email, password });

      navigate("/login");
    } catch (err) {
      setError("فشل إنشاء الحساب");
    }
  };

  return (
    <div className="mx-auto mt-16 max-w-sm rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <h1 className="mb-6 text-center text-2xl font-bold">إنشاء حساب</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input required placeholder="الاسم" value={name} onChange={(e) => setName(e.target.value)} className="input" />
        <input type="email" required placeholder="البريد الإلكتروني" value={email} onChange={(e) => setEmail(e.target.value)} className="input" dir="ltr" />
        <input type="password" required placeholder="كلمة المرور" value={password} onChange={(e) => setPassword(e.target.value)} className="input" dir="ltr" />
        {error && <p className="text-sm text-rose-600">{error}</p>}
        <button className="btn w-full">إنشاء الحساب</button>
      </form>

      <p className="mt-5 text-center text-sm text-slate-500">
        لديك حساب؟{" "}
        <Link to="/login" className="text-indigo-600 hover:underline">تسجيل الدخول</Link>
      </p>
    </div>
  );
}
