const router = require('express').Router();

const {createUser, userauth} = require('../controller/users')

const {createBudgets, userBudgets, deletebudget} = require("../controller/budget")

const {create_saving, userGoals, addsaving, deletesaving} = require('../controller/savings')

const {create_transac, budgettransacs, deletetransac} = require('../controller/spends')

const {create_account, updatesold} = require('../controller/account')

const convertamount = require('../controller/amountconversion');

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

router.route("/addsaving").post(addsaving)

router.route("/deletesaving").post(deletesaving)

router.get("/userGoals", userGoals)

router.post("/create_transac", create_transac)

router.post("/budgettransacs", budgettransacs)

router.post("/amountconversion", convertamount)

router.route("/deletetransac").post(deletetransac)

router.route("/create_account").post(create_account)

router.route("/updatesold").post(updatesold)


module.exports = router;