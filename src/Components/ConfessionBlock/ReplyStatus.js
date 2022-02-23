// ------------ Objective of ReplyStatus function ------------
// Function will recieve confessionId and will return a promise
// 1. if there is a reply then the promise will have the the reply
// 2. if there is no reply then the promise will havr nothing in it

import { firestore } from "../../Firebase/config"

export const ReplyStatus = async (confessionId) => {
    var reply = "";
    // Trying using Try and Catch block for catching errors
    const response = await firestore.collection("reply").where("confessionId", "==", confessionId).get();
    const docs = response.docs;

    if(docs.length !== 0){

        reply = docs.map(doc => (doc.data().reply));
    }
    return ( reply )
} 