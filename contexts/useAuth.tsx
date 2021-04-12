import React, { useState, useEffect, useContext, createContext } from "react";
import firebase from "firebase";


type AuthContext = ReturnType<typeof useProvideAuth>;

const authContext = createContext({} as AuthContext);
export const ProvideAuth: React.FC = ({ children }) => {
  const auth = useProvideAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => useContext(authContext);

function useProvideAuth() {
  const [user, setUser] = useState<firebase.User | boolean>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user ? user : false);

      if (user) {
        user.getIdTokenResult().then((idTokenResult) => {
          setIsAdmin(idTokenResult.claims.admin);
        });
      }
    });

    return () => unsubscribe();
  });

  return {
    user,
    async signin(email: string, password: string) {
      const response = await firebase.auth().signInWithEmailAndPassword(email, password);
      setUser(response.user);

      return response.user;
    },
    async signup(email: string, password: string) {
      const response = await firebase.auth().createUserWithEmailAndPassword(email, password);
      setUser(response.user);

      return response.user;
    },
    async signout() {
      await firebase.auth().signOut();
      setUser(false);
    },
  };
}