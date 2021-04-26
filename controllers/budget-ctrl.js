const BudgetModel = require("../models/budget-model");

const addBudget = (req, res) => {
  const body = req.body;
  const newExpense = new BudgetModel(body);

  if (!newExpense) {
    return res.status(400).json({ success: false, error: err });
  }

  newExpense
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: newExpense._id,
        message: "Expense added successfully !",
      });
    })
    .catch((err) => {
      res.status(400).json({
        err,
        message: "Expense creation failed !",
      });
    });
};

const editBudget = (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update",
    });
  }

  BudgetModel.findOne({ _id: req.params.id }, (err, expense) => {
    if (err) {
      return res.status(404).json({
        err,
        message: "Expense not found!",
      });
    }

    expense.name = body.name;
    expense.amount = body.amount;
    expense.date = body.date;

    expense
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: expense._id,
        });
      })
      .catch((error) => {
        return res.status(400).json({
          success: false,
          error,
        });
      });
  });
};

const deleteBudget = async (req, res) => {
    await BudgetModel.findOneAndDelete({ _id: req.params.id }, (err, expense) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
  
      if (!expense) {
        return res.status(404).json({ success: false, error: `Expense not found` });
      }
  
      return res.status(200).json({ success: true});
    }).catch((err) => console.log(err));
  };



const getBudget = (req, res) => {
  BudgetModel.find({}, (err, expenses) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!expenses.length) {
      return res.status(404).json({ success: false, error: `Expense not found` });
    }
    return res.status(200).json({ success: true, expenses: expenses });
  }).catch((err) => console.log(err));
};

module.exports = {
  getBudget,
  addBudget,
  editBudget,
  deleteBudget
};
