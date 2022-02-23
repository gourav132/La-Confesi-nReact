import {useState, useEffect} from 'react';
import { firestore } from '../Firebase/config';

const useUserValidate = (username) =>{
    const [isPresent, setIsPresent] = useState(false);
    const [loadingUser, setLoadingUser] = useState(true);
    const [toUser, setToUser] = useState("");
    const [toUid, setToUid] = useState("");

    useEffect( () => {
        ( async () => {
           const response = await firestore.collection("users").where("username", "==", username).get();
           const docs = response.docs;
           if(docs.length === 0){
               setIsPresent(false)
               setLoadingUser(false)
           } else{
               setIsPresent(true);
               docs.map( (doc) => {
                   setToUser(doc.data().name);
                   setToUid(doc.data().uid);
                   return(doc.data().name);
               })
               setLoadingUser(false);
           }
       })()
   }, [ username ])

   return {loadingUser, isPresent, toUser, toUid}
}

export default useUserValidate;