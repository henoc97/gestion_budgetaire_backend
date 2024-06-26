const router = require('express').Router();


const {createUser, userauth} = require('../controller/users')

const {createBudgets, userBudgets, deletebudget} = require("../controller/budget")

const {create_saving, userGoals, update_allsavings, user_savingdbank, deletesaving} = require('../controller/savings')

const {create_transac, budgettransacs, deletetransac} = require('../controller/spends')

const {user_account, transfer_to_sold, account_savingsbank, user_transfers } = require('../controller/account')

const {convertamount} = require('../controller/amountconversion');

const {upload_file} = require('../controller/upload_file');

router.post("/createUser", createUser);

router.post("/userauth", userauth)

router.post("/createBudgets", createBudgets)

router.get("/userBudgets", userBudgets)

router.post("/create_saving", create_saving)

router.route("/update_allsavings").post(update_allsavings)

router.route("/user_savingdbank").get(user_savingdbank)

router.get("/userGoals", userGoals)

router.post("/create_transac", create_transac)

router.post("/budgettransacs", budgettransacs)

router.post("/convertamount", convertamount)

router.route("/user_account").get(user_account)

router.route("/transfer_to_sold").post(transfer_to_sold)

router.route("/account_savingsbank").post(account_savingsbank)

router.route("/user_transfers").get(user_transfers)

router.post('/upload_file', upload_file)



module.exports = router;