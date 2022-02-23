import { useState, useEffect } from "react"
import { firestore } from "../Firebase/config"

export const useFetchCount = (user) => {
    const [confessionCount, setConfessionCount] = useState(0);
    const [replyCount, setReplyCount] = useState(0);
    useEffect(()=>{
        if(user.user != null){
            const fetchCount = async () => {
                console.log("Query starts")
                const confessionResponse = await firestore.collection("confessions").where("to", "==", user.user.uid).get()
                const replyResponse = await firestore.collection("reply").where("replyingTo", "==", user.user.uid).get()
                setConfessionCount(confessionResponse.docs.length);
                setReplyCount(replyResponse.docs.length);
                // console.log("Query ends", confessionCount)
                // const confessionCount = confessionResponse.docs.length;
                // const replyCount = replyResponse.docs.length;

            }
            fetchCount()
        }
        return { confessionCount, replyCount }
    }, [])
}