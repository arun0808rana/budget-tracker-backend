const express = require("express");
const router = express.Router();

const BudgetCtrl = require("../controllers/budget-ctrl");

router.post("/add", BudgetCtrl.addBudget);
router.put("/edit/:id", BudgetCtrl.editBudget);
router.delete("/del/:id", BudgetCtrl.deleteBudget);
router.get("/get", BudgetCtrl.getBudget);

module.exports = router;
