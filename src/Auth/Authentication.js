import { projectAuth, firestore } from '../Firebase/config'

export function signIn(email, password){
    let promise = new Promise( function(resolve, reject) {
        projectAuth.signInWithEmailAndPassword(email,password)
        .then((response) => {
            const uid = response.user.uid;
            firestore.collection("users").where("uid", "==", uid).get()
            .then((res => {
                const docs = res.docs;
                docs.map(doc => {
                    const userInfo = {
                        "name": doc.data().name,
                        "username": doc.data().username,
                        "email": doc.data().email,
                        "url": doc.data().url,
                        "uid": doc.data().uid
                    }
                    sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
                    return 0;
                })
            }))
            resolve(response);
        })
        .catch((error) => {
            reject(error);
        })
    })
    return promise;
}

export function signUp(email, password, name, url){
    let promise = new Promise( function (resolve, reject) {
        projectAuth.createUserWithEmailAndPassword(email, password)
        .then((response) => {
            response.user.updateProfile({
                displayName: name,
                photoURL: url
            });
            resolve(response);
        })
        .catch((error) => {
            reject(error)
        })
    })
    return promise;
}

export function resetPassword(email){
    let promise = new Promise(function(resolve, reject){
        projectAuth.sendPasswordResetEmail()
        .then(() => {
            resolve("Email for password rest is sent")
        })
        .catch((error) => {
            reject(error)
        })
    })
    return promise;
}