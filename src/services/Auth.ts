import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_DATABASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

class Auth {
  constructor() {
    firebase.initializeApp(firebaseConfig);
  }
  public async signIn(email: string, password: string): Promise<boolean> {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        localStorage.setItem("email", email);
        return true;
      })
      .catch((err: any) => {
        console.log(err);
        return false;
      });
  }

  public async signOut(): Promise<boolean> {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        return true;
      })
      .catch(err => {
        return false;
      });
  }
}

export default new Auth();
