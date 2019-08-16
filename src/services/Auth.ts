import firebase from "firebase/app";
import "firebase/auth";

class Auth {
  public async createUser(
    email: string,
    password: string
  ): Promise<string | undefined> {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        return undefined;
      })
      .catch((err: any) => {
        return err.message;
      });
  }

  public async signIn(
    email: string,
    password: string
  ): Promise<string | undefined> {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        return undefined;
      })
      .catch((err: any) => {
        return err.message;
      });
  }

  public async signOut(): Promise<string | undefined> {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        return undefined;
      })
      .catch(err => {
        return err.message;
      });
  }

  public getSignedInUser(): firebase.User | null {
    return firebase.auth().currentUser;
  }
}

export default new Auth();
