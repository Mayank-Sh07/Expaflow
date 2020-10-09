import React, { useEffect, useState, useContext } from "react";
import { FirebaseContext } from "./FirebaseConfig";

export const UserContext = React.createContext(null);

const UserContextProvider = ({ children }) => {
  const Firebase = useContext(FirebaseContext);
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    const unSubscribe = Firebase.auth.onAuthStateChanged((user) => {
      if (user != null) {
        const userDetails = {
          uid: user.uid,
          phoneNumber: user.phoneNumber,
          photoURL: user.photoURL,
          email: user.email,
          name: user.displayName,

          userDoc: Firebase.firestore().collection("users").doc(user.uid),
        };
        setCurrentUser(userDetails);
        setPending(false);
      } else {
        setCurrentUser(null);
        setPending(false);
      }
    });

    return () => {
      unSubscribe();
    };
  }, [Firebase]);

  if (pending) {
    return <>Loading...</>;
  } else
    return (
      <UserContext.Provider value={{ currentUser }}>
        {children}
      </UserContext.Provider>
    );
};

export default UserContextProvider;
