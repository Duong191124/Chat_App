# Project Structure

```js
chat-backend/
├── src/
│   ├── config/             # Configuration files (DB, env, CORS, etc.)
│   ├── controllers/        # Route logic (calls services)
│   ├── middlewares/        # Custom middleware (auth, error handler)
│   ├── models/             # DB models (Sequelize/TypeORM/Mongoose)
│   ├── routes/             # Route declarations
│   ├── services/           # Business logic
│   ├── sockets/            # Socket.IO event handlers
│   ├── utils/              # Utility functions (e.g., validators, file upload)
│   ├── index.js            # App entry point
│   ├── app.js              # Express app setup
├── .env                    # Environment variables
├── .gitignore
├── package.json
└── README.md
```
