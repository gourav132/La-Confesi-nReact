background color = #121212
secondary color = #1e1e1e
Accent color = #a29bfe

pages with button
    contact - submit button
    manage account - 1. submit button 
                     2. Delete button
    Sign in - submit button
    signUp - submit button
    confess - submit button

<!-- Delete User -->

const user = firebase.auth().currentUser;

user.delete().then(() => {
  // User deleted.
}).catch((error) => {
  // An error ocurred
  // ...
});