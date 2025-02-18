const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "assets")));

const products = [
  { id: 1, name: "Laptop", price: 1200 },
  { id: 2, name: "Phone", price: 800 },
  { id: 3, name: "Tablet", price: 600 },
];

const users = [
  { id: 1, name: "Alice", age: 25 },
  { id: 2, name: "Bob", age: 30 },
  { id: 3, name: "Charlie", age: 35 },
];

app.get("/products", (req, res) => {
  res.json(products);
});
app.get("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return res.status(404).json({ message: "מוצר לא נמצא" });
  } else {
    res.json(product);
  }
});

app.get("/users", (req, res) => {
  const { age } = req.query;

  if (age) {
    const filteredUsers = users.filter((user) => user.age >= age);
    if (!filteredUsers) {
      res.status(404).send("No users found");
    } else {
      res.json(filteredUsers);
    }
  } else {
    res.json(users);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
