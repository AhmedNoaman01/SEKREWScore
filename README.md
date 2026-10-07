# 🏆 SEKREWScore

A scoreboard web app for tracking players and their scores, built with Node.js, Express, EJS, and MongoDB.

🔗 **Live demo:** [sekrew-score.vercel.app](https://sekrew-score.vercel.app)

---

## 🛠 Tech Stack

| Layer      | Technology                         |
| ---------- | ---------------------------------- |
| Runtime    | Node.js                            |
| Server     | Express 4                          |
| Views      | EJS (server-side rendering)        |
| Database   | MongoDB with Mongoose 7            |
| Deployment | Vercel (`@vercel/node`)            |

Other packages: `dotenv` (environment variables), `method-override` (PUT/DELETE from HTML forms), `express-async-handler` (async error handling).

---

## 📁 Project Structure

```
SEKREWScore/
├── config/        # App and database configuration
├── models/        # Mongoose schemas
├── public/        # Static assets (CSS, JS, images)
├── routes/        # Express route definitions
├── services/      # Business logic
├── views/         # EJS templates
├── index.js       # App entry point
├── vercel.json    # Vercel deployment config
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- A MongoDB database (local, or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/AhmedNoaman01/SEKREWScore.git
cd SEKREWScore

# 2. Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
MONGO_URI=your_mongodb_connection_string
PORT=3000
```

> ⚠️ The variable names above are examples. Use the exact names your code reads (check `config/` and `index.js`).

### Run the app

```bash
# Development (auto-restart on changes)
npm run dev

# Production
npm start
```

Then open [http://localhost:3000](http://localhost:3000).

---

## ☁️ Deployment

The project is configured for [Vercel](https://vercel.com) through `vercel.json`:

1. Push the repo to GitHub.
2. Import it in Vercel.
3. Add your environment variables (e.g. `MONGO_URI`) under **Project Settings → Environment Variables**.
4. Deploy.

---

## 🤝 Contributing

1. Fork the repository
2. Create a branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m "Add my feature"`
4. Push the branch: `git push origin feature/my-feature`
5. Open a Pull Request

---

## 📄 License

Distributed under the ISC License.

---

## 👤 Author

**Ahmed Noaman** — [@AhmedNoaman01](https://github.com/AhmedNoaman01)
