const router = require('express').Router();

const {createUser, userauth} = require('../controller/users')

const {createBudgets, userBudgets, deletebudget} = require("../controller/budget")

const {create_saving, userGoals, update_allsavings, user_savingdbank, deletesaving} = require('../controller/savings')

const {create_transac, budgettransacs, deletetransac} = require('../controller/spends')

const {user_account, transfer_to_sold, account_savingsbank, user_transfers } = require('../controller/account')

const {convertamount} = require('../controller/amountconversion');

router.post("/createUser", createUser);

// router.post("/createUser", (req, res)=>{
//     console.log(req.body);
//     res.send("ca marche")
// })
//router.route("/").get((res)=>{json({messge : "yes"})})
router.post("/userauth", userauth)

router.route("/benie").get((req, res)=>{
    res.send("ca marche !")
})

router.post("/createBudgets", createBudgets)

router.get("/userBudgets", userBudgets)

router.route("/deletebudget").post(deletebudget)

router.post("/create_saving", create_saving)

router.route("/update_allsavings").post(update_allsavings)

router.route("/user_savingdbank").get(user_savingdbank)

router.route("/deletesaving").post(deletesaving)

router.get("/userGoals", userGoals)

router.post("/create_transac", create_transac)

router.post("/budgettransacs", budgettransacs)

router.post("/convertamount", convertamount)

router.route("/deletetransac").post(deletetransac)

router.route("/user_account").get(user_account)

router.route("/transfer_to_sold").post(transfer_to_sold)

router.route("/account_savingsbank").post(account_savingsbank)

router.route("/user_transfers").get(user_transfers)

router.route("/updatesold").post(updatesold)


module.exports = router;