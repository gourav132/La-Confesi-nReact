import { useState, useEffect } from "react"
import { firestore } from "../Firebase/config";

const useReplyStatusCheck = (confessionId) => {
    const[ loadingStatus, setLoadingStaus ] = useState(true);
    const[ replyStatus, setReplyStatus ] = useState(false);
    const[ reply, setReply ] = useState(null);

    useEffect(() => {
        ( async () => {
            const response = await firestore.collection("reply").where("confessionId", "==", confessionId).get()
            const docs = response.docs;
            if(docs.length !== 0){
                setReplyStatus(true);
            }
            setLoadingStaus(false);
        })()
    }, [confessionId])

    return {loadingStatus, replyStatus, reply}
}

export default useReplyStatusCheck
