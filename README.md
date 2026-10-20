<div dir="rtl">

# 🛒 Microservice Shop

متجر إلكتروني مبني بمعمارية **Microservices**: ثلاث خدمات خلفية (Node.js + Express + MongoDB) وواجهة أمامية (React + Vite + Tailwind).

## 🧩 البنية

```
Microservice/
├── Backend/
│   ├── auth-service/      # تسجيل الدخول والتسجيل (JWT + bcrypt)   :5000
│   ├── product-service/   # إدارة المنتجات                          :5001
│   └── orders-service/    # الطلبات (يستدعي product-service)       :5002
└── frontend/
    └── shop-frontend/     # الواجهة الأمامية (Vite)
```

| الخدمة | قاعدة البيانات | Endpoints |
|---|---|---|
| auth-service | `auth_db` | `POST /login` · `POST /register` |
| product-service | `products_db` | `GET /products/` · `POST /products/` 🔒 |
| orders-service | `orders` | `GET /orders/` · `POST /orders/` 🔒 |

🔒 = يتطلب الترويسة `Authorization: Bearer <token>`.

## 📋 المتطلبات

- Node.js 18 أو أحدث
- MongoDB يعمل محلياً أو على السحابة (Atlas)

## ⚙️ إعداد متغيرات البيئة

لكل خدمة ملف `.env.example`. انسخه إلى `.env` في نفس المجلد وعدّل القيم:

```bash
cp Backend/auth-service/.env.example     Backend/auth-service/.env
cp Backend/product-service/.env.example  Backend/product-service/.env
cp Backend/orders-service/.env.example   Backend/orders-service/.env
cp frontend/shop-frontend/.env.example   frontend/shop-frontend/.env
```

| المتغير | الخدمة | الوصف |
|---|---|---|
| `PORT` | الخدمات الثلاث | منفذ التشغيل (5000 / 5001 / 5002) |
| `MONGO_URI` | الخدمات الثلاث | رابط الاتصال بـ MongoDB |
| `JWT_SECRET` | الخدمات الثلاث | مفتاح توقيع JWT، **يجب أن يكون نفسه في الثلاث** |
| `PRODUCTS_SERVICE_URL` | orders-service | عنوان product-service |
| `VITE_AUTH_URL` · `VITE_PRODUCTS_URL` · `VITE_ORDERS_URL` | الواجهة | عناوين الخدمات |

لتوليد `JWT_SECRET` قوي:

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

> ⚠️ ملفات `.env` مستثناة من Git عبر `.gitignore`، والمرفوع هو `.env.example` فقط.
> متغيرات `VITE_*` تظهر في كود المتصفح فلا تضع فيها أسراراً.
> إن كان `JWT_SECRET` القديم قد رُفع سابقاً إلى GitHub فاعتبره مكشوفاً وغيّره.

## 🚀 التشغيل

شغّل كل خدمة في نافذة طرفية مستقلة:

```bash
# 1) auth-service
cd Backend/auth-service && npm install && npm start

# 2) product-service
cd Backend/product-service && npm install && npm start

# 3) orders-service
cd Backend/orders-service && npm install && npm start

# 4) الواجهة
cd frontend/shop-frontend && npm install && npm run dev
```

إن لم تُضبط متغيرات `.env` المطلوبة تتوقف الخدمة برسالة واضحة.

## 👤 الأدوار

قيمة `role` الافتراضية `user`. لإنشاء أدمن غيّر `role` إلى `admin` للمستخدم مباشرة في قاعدة بيانات `auth_db`.

## 🧰 التقنيات

**Backend:** Express 5 · Mongoose · JWT · bcrypt · dotenv · Axios
**Frontend:** React 18 · React Router 6 · Axios · Tailwind CSS 4 · Vite 5

</div>
