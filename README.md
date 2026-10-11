<div align="center">

# 🛒 বাজার দর (BazarDor)

### প্রয়োজনীয় পণ্যের দাম এক নজরে।

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

🔗 **[Live Demo](https://bazar-dor-9ej1.vercel.app)**

</div>

---

## 📖 Description

**বাজার দর (BazarDor)** is a Bangla web app that helps people check the daily market prices of everyday essentials such as rice, vegetables, fish, eggs and oil. It shows each product's current price, how much it changed today, and a market-by-market price comparison, so shoppers can see at a glance what is getting cheaper or more expensive.

---

## ✨ Key Features

| # | Feature | Details |
|---|---|---|
| 1 | **Live price ticker** | An infinitely scrolling marquee below the navbar showing each product's emoji, price and ▲/▼ change. |
| 2 | **Price risers and fallers** | The home page highlights the top 6 products whose prices rose and the top 6 whose prices fell, plus a responsive grid of all products. |
| 3 | **Category pages with smart sorting** | Browse products by category and sort by default, price low to high, or price high to low. Sorting uses numeric values, so Bengali digits sort correctly. |
| 4 | **Protected product details** | Logged-in users can view minimum, maximum and average prices and a market-wise price breakdown for each product. |
| 5 | **Secure authentication and profile** | Email/password and Google sign-in with BetterAuth, toast notifications, protected routes, and a profile page where users can update their name. |

---

## 🛠️ Technologies Used

| Purpose | Technology |
|---|---|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS, DaisyUI |
| Authentication | BetterAuth |
| Database | MongoDB Atlas |
| Notifications | react-hot-toast |
| Icons | lucide-react |
| Deployment | Vercel |

---

## 🚀 Getting Started

```bash
git clone https://github.com/monira953/BazarDor.git
cd BazarDor
npm install
npm run dev
```

Create a `.env.local` file in the project root:

```env
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_random_secret
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

Then open [http://localhost:3000](http://localhost:3000).

---

## 📡 Data Source

Product and price data is fetched from `https://openapi.programming-hero.com/api/bazardor`.

---

<div align="center">

Made with 💚 by **Monira Sulltana**

</div>