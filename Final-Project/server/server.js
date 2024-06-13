const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./config/database");
const multer = require("multer");
const path = require("path");

const app = express();

// Configuration de multer pour l'upload de fichiers
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "uploads");
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const filename = Date.now() + path.extname(file.originalname);
    console.log("Saving file as", filename);
    cb(null, filename);
  },
});
const upload = multer({ storage: storage });

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const userRoutes = require("./routes/user.js");
const postRoutes = require("./routes/post.js");
const commentRoutes = require("./routes/comment.js");

app.use("/api/user", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use(express.static("client"));

const PORT = process.env.PORT || 5002;

sequelize
  .sync({ force: true }) // Utilisez `force: true` pour supprimer et recréer les tables
  .then(() => {
    console.log("Database synced");
    // Ajoutez des utilisateurs initiaux ici pour éviter les erreurs de contrainte de clé étrangère
    const User = require("./models/User");
    return User.bulkCreate([
      { name: "User1", email: "user1@example.com", password: "password1" },
      { name: "User2", email: "user2@example.com", password: "password2" },
    ]);
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Error syncing database:", err);
  });

app.get("/test-upload", (req, res) => {
  res.sendFile(path.join(__dirname, "uploads", "1718114949329.JPG"));
});