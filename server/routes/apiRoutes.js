const mongoose = require("mongoose");
require("../models/formModel");
const requireLogin = require("../middlewares/requireLogin");

module.exports = (app) => {
  const Transaction = mongoose.model("transactions");

  //submit a transaction
  app.post("/api/submit", requireLogin, async (req, res) => {
    const data = new Transaction({ ...req.body, userId: req.user._id });
    await data.save();
    res.status(200).send({ success: true, message: "Data saved successfully" });
  });
  //get a transaction by id

  app.get("/api/statement", requireLogin, async (req, res) => {
    const statement = await Transaction.find({ userId: req.user._id }).sort({
      date: -1,
    });

    res.status(200).send(statement);
  });

  //get a single transaction by transaction id

  app.get("/api/currenttransaction/:id", requireLogin, async (req, res) => {
    const currenttransaction = await Transaction.findById({
      _id: req.params.id,
    });
    res.status(200).send(currenttransaction);
  });

  //delete a data

  app.delete("/api/delete/:id", requireLogin, async (req, res) => {
    const deleteEntry = await Transaction.findByIdAndDelete({
      _id: req.params.id,
      googleId: req.user._id,
    });
    res.status(200).send("Deleted Successfully");
  });

  //update transaction
  app.put("/api/update/:id", requireLogin, async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    const updateEntry = await Transaction.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    res.status(200).send({
      success: true,
      message: "Updated successfully",
      data: updateEntry,
    });
  });

  //Day wise summary

  app.get("/api/dailysummary", requireLogin, async (req, res) => {
    const date = new Date().toLocaleDateString();
    const daySummary = await Transaction.find({ userId: req.user._id });
    const todaySummary = daySummary.map((entry) => {
      const objSummary = entry.toObject();
      objSummary.date = new Date(objSummary.date).toLocaleDateString();
      return objSummary;
    });

    const filteredTodaySummary = todaySummary.filter((item) => {
      return item.date === date;
    });

    res.status(200).send(filteredTodaySummary);
  });

  //week wise summary

  app.get("/api/weeklySummary", requireLogin, async (req, res) => {
    const today = new Date();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(today.getDate() - 6);

    const data = await Transaction.find({
      userId: req.user._id,
      date: {
        $gte: oneWeekAgo,
        $lte: today,
      },
    });

    const formattedData = data.map((item) => {
      const object = item.toObject();
      object.date = new Date(item.date).toLocaleDateString("en-US");
      return object;
    });

    res.status(200).send(formattedData);
  });

  //mtd summary

  app.get("/api/mtdsummary", requireLogin, async (req, res) => {
    const date = new Date();
    const today = date.getDate();
    const daysPassed = today - 1;
    const mtd = new Date(date);
    mtd.setDate(date.getDate() - daysPassed);

    const mtdData = await Transaction.find({
      userId: req.user._id,
      date: {
        $gte: mtd,
        $lte: date,
      },
    });
    res.send(mtdData);
  });

  //get data by category

  app.get("/api/top-categories", requireLogin, async (req, res) => {
    const date = new Date();
    const today = date.getDate();
    const daysPassed = today - 1;
    const mtd = new Date(date);
    mtd.setDate(date.getDate() - daysPassed);
    try {
      const topCategories = await Transaction.aggregate([
        {
          $match: {
            userId: req.user._id,
            date: {
              $gte: mtd,
              $lte: date,
            },
          },
        },
        {
          $group: {
            _id: "$category",
            totalSpent: { $sum: "$amount" },
          },
        },
        { $sort: { totalSpent: -1 } },
        { $limit: 5 },
      ]);

      res.status(200).send(topCategories);
    } catch (err) {
      res.status(500).send({ error: "Failed to fetch top categories" });
    }
  });
};
