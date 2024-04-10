

class SavingGoal{

    constructor(id, userid, goal, targetamount, allsaving, reachgoaldate){
        this.id = id;
        this.userid = userid;
        this.targetamount = targetamount;
        this.allsaving = allsaving;
        this.reachgoaldate = reachgoaldate;
    }

    static checkAllsavingsState(savingList){
        let savingNotif = []

        for (var element in savingList) {
            if (savingList[element].allsaving >= savingList[element].targetamount*.25) {
                savingNotif.push({"element" : savingList[element], "state" : "25" })
            }
            if (savingList[element].allsaving >= savingList[element].targetamount*.5) {
                savingNotif.push({"element" : savingList[element], "state" : "50" })
            }
            if (savingList[element].allsaving >= savingList[element].targetamount*.75) {
                savingNotif.push({"element" : savingList[element], "state" : "75" })
            }
            if (savingList[element].allsaving >= savingList[element].targetamount) {
                savingNotif.push({"element" : savingList[element], "state" : "100" })
            }
        }

        return savingNotif;

    }

    static checkperiodState(savingList){
        
        let savingNotif = []

        for (var element in savingList) {
            const reachgoaldate = new Date(savingList[element]);

            const datenow = new Date();

            const differenceInMillisecondes = reachgoaldate - datenow;

            const differenceInDays = Math.round(differenceInMillisecondes / (1000 * 3600 * 24));


            if (5==5) {
                savingNotif.push({"element" : savingList[element], "state" : "25" })
            }

            if (savingList[element].allsaving >= savingList[element].targetamount*.5) {
                savingNotif.push({"element" : savingList[element], "state" : "50" })
            }

            if (savingList[element].allsaving >= savingList[element].targetamount*.75) {
                savingNotif.push({"element" : savingList[element], "state" : "75" })
            }

            if (savingList[element].allsaving >= savingList[element].targetamount) {
                savingNotif.push({"element" : savingList[element], "state" : "100" })
            }
        }

        return savingNotif;

    }

    toJson(){
        return {
            "id": this.id,
            "userid": this.userid,
            "goal": this.goal,
            "targetamount" : this.targetamount,
            "allsaving": this.allsaving,
            "reachgoaldate": this.reachgoaldate
        }
    }

    static jsonToNewSavingGoal(mysaving){
        return new SavingGoal(
            mysaving.id,
            mysaving.userid,
            mysaving.goal,
            mysaving.targetamount,
            mysaving.reachgoaldate
        )
    }


}

module.exports = {SavingGoal}