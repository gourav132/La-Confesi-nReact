import { useState, useEffect, useContext } from "react";
import { firestore } from "../Firebase/config";
import { AuthContext } from "../Auth/AuthContext";

const useFetchConfession = () => {
    const [confessionData, setConfessionData] = useState("null");
    const [confessionLoading, setConfessionLoading] = useState(true);
    const [name, setName] = useState("");
    const [user, authLoading] = useContext(AuthContext);
    useEffect(() => {
        if(authLoading === false){
            if(user.user != null){
                const uid = user.user.uid;
                setName(user.user.displayName);
                const fetchData = async (uid) => {
                    const response = await firestore.collection("confessions").where("to", "==", uid).get();
                    const docs = response.docs;
                    const doc = docs.map((doc) => doc.data());
                    setConfessionData(doc);
                    setConfessionLoading(false);
                }
                fetchData(uid);
            }
        }
    }, [authLoading, user])

    return { confessionData, confessionLoading, name, user, authLoading };
}

export default useFetchConfession;