const express = require("express");
const Event = require("../models/Event");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    let event = new Event(req.body);
    event = await event.save();
    res.status(200).json({
      status: 200,
      data: event,
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

router.get("/events", async (req, res) => {
  try {
    let events = await Event.find();
    res.status(200).json({
      status: 200,
      data: events,
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

router.get("/:eventId", async (req, res) => {
  try {
    let company = await Event.findOne({
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
    let company = await Event.findByIdAndUpdate(
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
    let company = await Event.findByIdAndRemove(req.params.companyId);
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
