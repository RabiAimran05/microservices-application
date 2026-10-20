import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AUTH_URL = import.meta.env.VITE_AUTH_URL;

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      // ===== TODO: auth-service =====
      const res = await axios.post(`${AUTH_URL}/login`, { email, password });
     const token = res.data.token;
     const user = { email, role: res.data.role }; // user = { name, email, role: "admin" | "user" }

      // --- تجريبي (احذفه بعد الربط): أي بريد يبدأ بـ admin يدخل كمدير ---
  
      // ----------------------------------------------------------------

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      navigate(user.role === "admin" ? "/admin" : "/");
    } catch (err) {
      setError("البريد أو كلمة المرور غير صحيحة");
    }
  };

  return (
    <div className="mx-auto mt-16 max-w-sm rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <h1 className="mb-6 text-center text-2xl font-bold">تسجيل الدخول</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="email" required placeholder="البريد الإلكتروني" value={email} onChange={(e) => setEmail(e.target.value)} className="input" dir="ltr" />
        <input type="password" required placeholder="كلمة المرور" value={password} onChange={(e) => setPassword(e.target.value)} className="input" dir="ltr" />
        {error && <p className="text-sm text-rose-600">{error}</p>}
        <button className="btn w-full">دخول</button>
      </form>

      <p className="mt-5 text-center text-sm text-slate-500">
        ليس لديك حساب؟{" "}
        <Link to="/register" className="text-indigo-600 hover:underline">إنشاء حساب</Link>
      </p>
    </div>
  );
}
