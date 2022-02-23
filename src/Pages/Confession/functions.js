import { firestore } from "../../Firebase/config";

const getReplyDetails = async (details) => {
    let replyDetails = {};
    const response = await firestore.collection("reply").where("confessionId", "==", details.confessionId).get()
    const docs = response.docs;
    if(docs.length === 0){
        replyDetails = { ...details, Reply: null };
    } else {
        const replyData = docs.map(doc => doc.data().reply)
        replyDetails = { ...details, Reply: replyData[0] }
    }
    return replyDetails
}

export default getReplyDetails