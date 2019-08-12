import firebase from "firebase/app";
import "firebase/auth";

class Auth {
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
