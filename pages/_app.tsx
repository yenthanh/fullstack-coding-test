import firebase from "firebase/app";
import "firebase/auth";
import { FirebaseAuthProvider } from "@react-firebase/auth";
import { ChakraProvider } from "@chakra-ui/react";
import "../styles/globals.css";
import { ProvideAuth } from "contexts/useAuth";

const firebaseConfig = {
  apiKey: "AIzaSyAXetOdZc7P6AueSEUlWqd--TwOlZJjtEI",
  authDomain: "fir-firebase-ac576.firebaseapp.com",
  databaseURL: "https://fir-firebase-ac576-default-rtdb.firebaseio.com",
  projectId: "fir-firebase-ac576",
  storageBucket: "fir-firebase-ac576.appspot.com",
  messagingSenderId: "527145003053",
  appId: "1:527145003053:web:d7ee2c692770df0d9db0a4",
};

const MyApp = ({ Component, pageProps }) => {
  return (
    <FirebaseAuthProvider {...firebaseConfig} firebase={firebase}>
      <ProvideAuth>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </ProvideAuth>
    </FirebaseAuthProvider>
  );
};

export default MyApp;
