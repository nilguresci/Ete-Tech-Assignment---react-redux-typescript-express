const products = require("../../database/product.json");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
var fs = require("fs");
const fsp = require("fs/promises");

let fileExists = fs.existsSync(
  path.join(__dirname, "../../database/product.json")
);
console.log("product.json exists:", fileExists);

console.log(fileExists ? "Found" : "Not Found!");

// @desc Get products
// @route GET /api/products
const getProducts = (req, res) => {
  res.status(200).json(products);
};

const getOneProduct = (req, res) => {
  async function getOneProductF() {
    try {
      return await fsp
        .readFile(path.join(__dirname, "../../database/product.json"), {
          encoding: "utf8",
        })
        .then((body) => JSON.parse(body))
        .then((json) => {
          let products = json;

          let found = products.find((product) => product.id == req.params.id);

          res.status(200).json(found);
          return found;
        });
    } catch (err) {
      console.log(err);
    }
  }
  getOneProductF();
};
// @desc create product
// @route POST /api/products
const addProduct = (req, res) => {
  if (fileExists) {
    console.log("yes file exists");
    fs.readFile(
      path.join(__dirname, "../../database/product.json"),
      (err, data) => {
        if (err) {
          console.log(err);
        } else {
          const date = new Date();
          req.body.createdAt = date;
          req.body.id = uuidv4();
          console.log(req.body);
          let product = JSON.parse(data);
          product.push(req.body);

          let json = JSON.stringify(product);
          fs.writeFile(
            path.join(__dirname, "../../database/product.json"),
            json,
            (err, result) => {
              if (err) console.log("error", err);
            }
          );
        }
      }
    );
  } else {
    console.log("file not exists");

    const date = new Date();
    req.body.createdAt = date;
    req.body.id = uuidv4();

    let json = JSON.stringify(req.body);
    fs.writeFile(
      path.join(__dirname, "../../database/product.json"),
      json,
      (err, result) => {
        if (err) console.log("error", err);
      }
    );
  }

  res.status(200).json({ message: "create product" });
};

// @desc edit product
// @route PUT /api/products/:id
const updateProduct = (req, res) => {
  async function updateProductF() {
    try {
      const data = await fsp
        .readFile(path.join(__dirname, "../../database/product.json"), {
          encoding: "utf8",
        })
        .then((body) => JSON.parse(body))
        .then((json) => {
          //let products = JSON.parse(data);
          let products = json;
          const date = new Date();
          req.body.createdAt = date;
          req.body.id = req.params.id;
          let updated = products.map((product) => {
            if (product.id == req.params.id) {
              console.log("bul", req.body);
              product = req.body;
            }
            return product;
          });
          return updated;
        })
        .then((json) => JSON.stringify(json))
        .then((body) =>
          fsp.writeFile(
            path.join(__dirname, "../../database/product.json"),
            body
          )
        );
      return data.catch((error) => console.warn(error));
    } catch (err) {
      console.log(err);
    }
  }
  updateProductF();
  res.status(200).json({ message: `updte product ${req.params.id} ` });
};

// @desc delete products
// @route DELETE /api/products/:id
const deleteProduct = (req, res) => {
  async function deleteProductF() {
    try {
      const data = await fsp
        .readFile(path.join(__dirname, "../../database/product.json"), {
          encoding: "utf8",
        })
        .then((body) => JSON.parse(body))
        .then((json) => {
          //let products = JSON.parse(data);
          let products = json;
          let updated = products.filter(
            (product) => product.id !== req.params.id
          );

          console.log("silindi", updated);
          return updated;
        })
        .then((json) => JSON.stringify(json))
        .then((body) =>
          fsp.writeFile(
            path.join(__dirname, "../../database/product.json"),
            body
          )
        );
      return data.catch((error) => console.warn(error));
    } catch (err) {
      console.log(err);
    }
  }
  deleteProductF();
  res.status(200).json({ message: `delete product ${req.params.id}` });
};

module.exports = {
  getProducts,
  addProduct,
  deleteProduct,
  updateProduct,
  getOneProduct,
};
