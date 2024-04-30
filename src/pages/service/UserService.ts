import { doc, setDoc } from "firebase/firestore";
import { TUser, User } from "../model/User";
import { auth, db } from "@/setting/firebase";
import { Collections } from "@/lib/firebase";
import { deleteUser, getAuth } from "firebase/auth";

export const createUser = async (data: TUser) => {
  console.log("currentUser", getAuth().currentUser);
  try {
    const user: User = new User({
      uid: data.uid,
      email: data.email,
    });

    await setDoc(doc(db, Collections.USER, user.uid), user.toFirebase());
  } catch (err) {
    const user = getAuth().currentUser;
    if (user) {
      await deleteUser(user);
    }
    throw err;
  }
};
