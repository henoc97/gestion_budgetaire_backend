

class BudgetModel{

    constructor(id, userid, categoryname, budgetamount, periods, begindate, budgetamountfix){
        this.id = id;
        this.userid = userid;
        this.categoryname = categoryname;
        this.budgetamount = budgetamount;
        this.periods = periods;
        this.begindate = begindate;
        this.budgetamountfix = budgetamountfix;
    
    }


    randomNotifText(state, categoryname){
        const randomNotifTexts = [
            "Vous avez atteint "+state+"% de votre budget pour la catégorie : "+state+ ". Pensez à contrôler vos dépenses pour maintenir votre budget en ligne avec vos objectifs financiers.",

            "Vous avez déjà utilisé "+state+"% de votre budget pour la catégorie : "+state+ ". Nous vous recommandons de surveiller vos dépenses restantes pour éviter les surprises à la période définie pour ce budget.",

            "Vous avez dépensé les "+state+"% de votre budget pour la catégorie : "+state+ ". Il pourrait être judicieux de réévaluer vos priorités de dépenses pour le reste de la période définie pour ce budget.",

            "À ce stade, vous avez utilisé "+state+"% de votre budget pour la catégorie : "+state+ ". Prenez le temps de réfléchir à vos futurs achats et à l'impact sur votre budget global.",

            "Votre budget pour la catégorie : "+categoryname+ " est à "+ state +"%. Assurez-vous de maintenir un équilibre entre vos dépenses actuelles et vos besoins futurs.",

            "Vous avez déjà dépensé les "+state+ "% de votre budget pour la catégorie : "+categoryname+ ". Gardez un œil sur vos dépenses pour éviter de dépasser votre budget prévu.",

            state+"% de votre budget pour la catégorie : "+ categoryname+" a été utilisé. Continuez à suivre vos dépenses et à ajuster vos priorités en conséquence.",

            "Votre budget pour la catégorie : "+categoryname+ " est à "+state+ "%. Assurez-vous de gérer judicieusement vos dépenses pour couvrir les frais restants de la période du budget.",

            "Vous avez atteint "+state+"% de votre budget pour la catégorie : "+categoryname+ ". Pensez à revoir vos dépenses actuelles pour optimiser vos dépenses.",

            "À ce stade, vous avez utilisé les "+state+ " de votre budget pour la catégorie : "+categoryname+ ". Prenez le temps de réfléchir à vos dépenses discrétionnaires et à l'impact sur votre budget global.",
        ]

        const randomIndex = Math.floor(Math.random() * randomNotifTexts.length);
        return randomNotifTexts[randomIndex];
    }

    static checkBudgetstatement(budgetlist){
        var budgetNotifs = []
        for(var element in budgetlist){
            console.log("budgetlist[element], ", budgetlist);
            if (budgetlist[element].budgetamount <= budgetlist[element].budgetamountfix*.5) {
                budgetNotifs.push({"element" : budgetlist[element], "state" : "50"})
            }
            if (budgetlist[element].budgetamount <= budgetlist[element].budgetamountfix*.2) {
                budgetNotifs.push({"element" : budgetlist[element], "state" : "80"})
            }
            if (budgetlist[element].budgetamount <= budgetlist[element].budgetamountfix*.05) {
                budgetNotifs.push({"element" : budgetlist[element], "state" : "95"})
            }
        }
        return budgetNotifs;
    }

    




    toJson(){
        return {
            "id" : this.id,
            "userid" : this.userid,
            "categoryname" : this.categoryname,
            "budgetamount" : this.budgetamount,
            "periods" : this.periods,
            "begindate" : this.begindate,
            "budgetamountfix" : this.budgetamountfix
        }
    }

    static JsonToNewBudget(budgetJson){
        return new BudgetModel(
            budgetJson.id,
            budgetJson.userid,
            budgetJson.categoryname,
            budgetJson.budgetamount,
            budgetJson.periods,
            budgetJson.begindate,
            budgetJson.budgetamountfix
        )
    }
}


module.exports = {BudgetModel};