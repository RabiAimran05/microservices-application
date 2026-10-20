# shop-frontend

React + Tailwind (Vite). ست صفحات فقط في `src/pages`، وكل صفحة مستقلة.

```bash
npm install
npm run dev
```

## أين استدعاءات axios؟

ابحث عن `TODO` في كل صفحة: كود axios جاهز (معلّق)، فكّ التعليق واحذف السطور التجريبية.

| الصفحة | الخدمة | الاستدعاء |
|---|---|---|
| Login.jsx | auth-service | `POST /login` → `{ token, user: { name, email, role } }` |
| Register.jsx | auth-service | `POST /register` |
| Home.jsx | products-service | `GET /products` → `{ products: [...] }` |
| Admin.jsx | products-service | `POST /products` |
| Checkout.jsx | order-service | `POST /orders` |

- حقول المنتج: `_id` (من MongoDB) و`name` و`price` و`quantity` و`image`.
- `role` يجب أن تكون `"admin"` أو `"user"`.
- التوكن والمستخدم والسلة في `localStorage`: `token` و`user` و`cart`.
