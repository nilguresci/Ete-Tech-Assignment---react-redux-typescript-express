const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const cors = require("cors");

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/companies", require("./routes/companyRoutes"));

//Serve frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "client", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => res.send("Please set to production"));
}

app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT);
});
