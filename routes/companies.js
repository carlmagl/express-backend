const express = require("express");
const Company = require("../models/Company");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    let company = new Company(req.body);
    company = await company.save();
    res.status(200).json({
      status: 200,
      data: company,
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

router.get("/companies", async (req, res) => {
  try {
    let companies = await Company.find();
    res.status(200).json({
      status: 200,
      data: companies,
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

router.get("/:companyId", async (req, res) => {
  try {
    let company = await Company.findOne({
      _id: req.params.companyId,
    });
    if (company) {
      res.status(200).json({
        status: 200,
        data: company,
      });
    }
    res.status(400).json({
      status: 400,
      message: "No company found",
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

router.put("/:companyId", async (req, res) => {
  try {
    let company = await Company.findByIdAndUpdate(
      req.params.companyId,
      req.body,
      {
        new: true,
      }
    );
    if (company) {
      res.status(200).json({
        status: 200,
        data: company,
      });
    }
    res.status(400).json({
      status: 400,
      message: "No company found",
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

//TODO: Add user protection, should not be able to delete others company
router.delete("/:companyId", async (req, res) => {
  try {
    let company = await Company.findByIdAndRemove(req.params.companyId);
    if (company) {
      res.status(200).json({
        status: 200,
        message: "Company deleted successfully",
      });
    } else {
      res.status(400).json({
        status: 400,
        message: "No company found",
      });
    }
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

module.exports = router;
