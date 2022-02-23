import React from 'react'
import { Modal } from './Components'
import { ReplyStatus } from './Components/ConfessionBlock/ReplyStatus';

export default function Test() {
  const handleModal = (btnId) => {
    document.getElementById(btnId).click();
  }
  
  const handleReply = async () => {
    const replyStatus = await ReplyStatus("9a5563e0-ece7-11eb-850e-d94616782079");
    if(replyStatus){
      console.log(replyStatus)
    }
    else{
      console.log("There is no reply")
    }
  }

  return (
      <div>

        {/* <Modal signin = "true" id = "signIn" btnId = "toggleSignIn" />
        <Modal successmessage = "true"  id = "successMessage"  btnId = "toggleSuccessMessage" />
        <Modal deletewarning = "true"  id = "deleteWarning"  btnId = "toggleDeleteWarning" />
        <Modal shareconfesion = "true"  id = "shareconfession" btnId = "toggleShareConfession" modalDate = "26 Sept, 2021" modalConfession = "Hello how are you" reply = "true" /> */}

        <Modal  
          replyconfession = "true"  
          id = "replyConfession" 
          btnId = "toggleReplyConfession" 
          modalDate = "26 Sept, 2021" 
          modalConfession = "how are youhow are youhow are youhow are youhow are youhow are youhow are youhow are youhow are youhow are youhow are youhow are youhow are youhow are you" 
          from = "abcdefghijklmnopqrstuvwxyz"
        />

        {/* +++++ Forgot password modal +++++ */}
        {/* +++++ Signup modal +++++ */}

        <h1 className = "text-center text-gray-300 text-4xl font-thin mt-5">This is a testing page</h1>

        {/* <button onClick = {() => handleModal("toggleSuccessMessage")} className = "uk-button rounded-lg bg-gray-700 text-gray-300 uk-align-center">Toggle Success Message Modal</button>
        <button onClick = {() => handleModal("toggleDeleteWarning")} className = "uk-button rounded-lg bg-gray-700 text-gray-300 uk-align-center">Toggle Delete Warning Modal</button>
        <button onClick = {() => handleModal("toggleSignIn")} className = "uk-button rounded-lg bg-gray-700 text-gray-300 uk-align-center">Toggle SignIn modal</button>
        <button onClick = {() => handleModal("toggleShareConfession")} className = "uk-button rounded-lg bg-gray-700 text-gray-300 uk-align-center">Toggle Share Confession modal</button> */}
        <button onClick = {() => handleModal("toggleReplyConfession")} className = "uk-button rounded-lg bg-gray-700 text-gray-300 uk-align-center">Toggle Reply Confession modal</button>

        {/* +++++ Checking ReplyStatus function +++++ */}
        <button onClick = {() => handleReply()} className = "uk-button rounded-lg bg-gray-700 text-gray-300 uk-align-center">Check Reply Status Function</button>

      </div>
  )
}
