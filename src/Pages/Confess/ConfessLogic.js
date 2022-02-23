import { firestore } from "../../Firebase/config";
import { v1 } from "uuid";

const formatDate = () => {
    const date = new Date();
    const breakUp = date.toString().split(" ")
    const newDate = breakUp[1] + " " + breakUp[2] + ", " + breakUp[3]
    return(newDate);
}

export const handleConfession = async (user, setFromId, confession, fromId, toUid, reply, setErrorMessage) => {
    if(user.isLogged === true){ 
        console.log(user.user.uid);
        setFromId(user.user.uid) 
    } 
    if(confession !== ""){
        const confessData = {
            confession: confession,
            confessionId: v1(),
            date: formatDate(),
            from: fromId,
            reply: reply,
            to: toUid
        }
        // -------------use try and catch statement to catch error----------------
        const response = await firestore.collection("confessions").add(confessData)
        console.log(response);
        console.log(confessData);
        document.getElementById("toggleSuccessMessage").click();
    }
    else{
        setErrorMessage("Please write confession")
    }
}

export const toggleModal = () => {
    document.getElementById("toggleSignIn").click();
}