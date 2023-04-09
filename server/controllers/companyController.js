const companies = require("../../database/company.json");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
var fs = require("fs");
const fsp = require("fs/promises");

let fileExists = fs.existsSync(
  path.join(__dirname, "../../database/company.json")
);
console.log("company.json exists:", fileExists);

console.log(fileExists ? "Found" : "Not Found!");

// @desc Get companies
// @route GET /api/companies
const getCompanies = (req, res) => {
  res.status(200).json(companies);
};

const getOneCompany = (req, res) => {
  async function getOneCompanyF() {
    try {
      return await fsp
        .readFile(path.join(__dirname, "../../database/company.json"), {
          encoding: "utf8",
        })
        .then((body) => JSON.parse(body))
        .then((json) => {
          let companies = json;

          let found = companies.find((company) => company.id == req.params.id);

          res.status(200).json(found);
          return found;
        });
    } catch (err) {
      console.log(err);
    }
  }
  getOneCompanyF();
};

// @desc create company
// @route POST /api/companies
const addCompany = (req, res) => {
  if (fileExists) {
    console.log("yes file exists");
    fs.readFile(
      path.join(__dirname, "../../database/company.json"),
      (err, data) => {
        if (err) {
          console.log(err);
        } else {
          const date = new Date();
          req.body.createdAt = date;
          req.body.id = uuidv4();
          console.log(req.body);
          let company = JSON.parse(data);
          company.push(req.body);

          let json = JSON.stringify(company);
          fs.writeFile(
            path.join(__dirname, "../../database/company.json"),
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
      path.join(__dirname, "../../database/company.json"),
      json,
      (err, result) => {
        if (err) console.log("error", err);
      }
    );
  }

  res.status(200).json({ message: "create company" });
};

// @desc edit company
// @route PUT /api/companies/:id
const updateCompany = (req, res) => {
  async function updateCompanyF() {
    try {
      const data = await fsp
        .readFile(path.join(__dirname, "../../database/company.json"), {
          encoding: "utf8",
        })
        .then((body) => JSON.parse(body))
        .then((json) => {
          //let companies = JSON.parse(data);
          let companies = json;
          const date = new Date();
          req.body.createdAt = date;
          req.body.id = req.params.id;
          let updated = companies.map((company) => {
            if (company.id == req.params.id) {
              console.log("bul", req.body);
              company = req.body;
            }
            return company;
          });
          return updated;
        })
        .then((json) => JSON.stringify(json))
        .then((body) =>
          fsp.writeFile(
            path.join(__dirname, "../../database/company.json"),
            body
          )
        );
      return data.catch((error) => console.warn(error));
    } catch (err) {
      console.log(err);
    }
  }
  updateCompanyF();
  res.status(200).json({ message: `updte company ${req.params.id} ` });
};

// @desc delete companies
// @route DELETE /api/companies/:id
const deleteCompany = (req, res) => {
  async function deleteCompanyF() {
    try {
      const data = await fsp
        .readFile(path.join(__dirname, "../../database/company.json"), {
          encoding: "utf8",
        })
        .then((body) => JSON.parse(body))
        .then((json) => {
          //let companies = JSON.parse(data);
          let companies = json;
          let updated = companies.filter(
            (company) => company.id !== req.params.id
          );

          console.log("silindi", updated);
          return updated;
        })
        .then((json) => JSON.stringify(json))
        .then((body) =>
          fsp.writeFile(
            path.join(__dirname, "../../database/company.json"),
            body
          )
        );
      return data.catch((error) => console.warn(error));
    } catch (err) {
      console.log(err);
    }
  }
  deleteCompanyF();
  res.status(200).json({ message: `delete company ${req.params.id}` });
};

module.exports = {
  getCompanies,
  addCompany,
  deleteCompany,
  updateCompany,
  getOneCompany,
};
