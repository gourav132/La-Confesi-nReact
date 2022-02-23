import { useState, useEffect } from "react"
import { firestore } from "../Firebase/config";

const useShareLink = (user) => {

    const [shareLink, setShareLink] = useState("");

    useEffect(()=>{
        if(user.user != null){
            const uid = user.user.uid;
            const getShareLink = async () => {
                const response = await firestore.collection("users").where("uid", "==", uid).get();
                const docs = response.docs;
                const url = docs.map((e) => {
                    const data = e.data();
                    setShareLink(String(data.url));
                    return(
                        data.url
                    )
                })
            } 
            getShareLink()
        }
    },[user])

    return {shareLink}
}

export default useShareLink;