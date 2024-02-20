
class UserModel {
   
    constructor (id, fristName, lastName, mailAddress, favoriteCurrency){
        this.id = id;
        this.fristName = fristName;
        this.lastName = lastName;
        this.mailAddress = mailAddress;
        this.favoriteCurrency = favoriteCurrency;
    }

    

    static async getOneUserByMailAndPwd (email, password) {
        
            try {
                const myUser = await User.findOne({
                    where : {
                        mailAdress : encryptData(email),
                    }
                })
                
                if (myUser) {
                    console.log("object : ",await comparePasswords(password, myUser.password));
                    if (await comparePasswords(password, myUser.password)) {
                        console.log("User found : ", myUser.toJSON());
                        const decryptUser = UserModel.jsonToNewUser(myUser);
                        console.log("User found 1 : ", decryptUser.getFristName);
                        return decryptUser;
                    } else {
                        console.log("Password not valid ");
                    }
                } else {
                    console.log("No user found ");
                }
            } catch (error) {
                console.error('Error while finding user:', error);
            }

    }

    toJSON() {
        return {
            "id" : this.id, 
            "fstName" : this.fristName, 
            "lastName" : this.lastName,
            "mailAdress" : this.mailAddress,
            "favoriteCurrency" : this.favoriteCurrency,
        }
    }

    static jsonToNewUser (myUser) {
        const myFreshUser =  new UserModel (
            myUser.id, 
            myUser.fstname, 
            myUser.lastname,
            myUser.mailaddress,
            myUser.favoritecurrency,
        )
            return myFreshUser;
    }
        
    }

module.exports =  {UserModel};