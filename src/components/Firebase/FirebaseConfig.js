import React from "react";
import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const FirebaseContext = React.createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyBze9xjWzC-Y0s97SjuCo2Cr5PH7FXZrDo",
  authDomain: "expaflow.firebaseapp.com",
  databaseURL: "https://expaflow.firebaseio.com",
  projectId: "expaflow",
  storageBucket: "expaflow.appspot.com",
  messagingSenderId: "396029640787",
  appId: "1:396029640787:web:16ffce5524a45cc87dc6a6",
};

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);

    this.auth = app.auth();
    this.firestore = app.firestore;
    this.googleProvider = new app.auth.GoogleAuthProvider();
  }

  doSignInWithGoogle = () =>
    this.auth.signInWithPopup(this.googleProvider).then((authUser) => {
      console.log(authUser);
      if (!String(authUser.user.email).endsWith("@vitstudent.ac.in")) {
        this.auth.currentUser.delete().then(() => {});
      } else if (authUser.additionalUserInfo.isNewUser) {
        const userData = {
          createdAt: new Date(),
          userPosts: [],
          userBlogPosts: [],
        };
        this.firestore()
          .collection("users")
          .doc(authUser.user.uid)
          .set(userData);
      }
    });

  doSignOut = () => this.auth.signOut();
}

export default Firebase;
export { FirebaseContext };
