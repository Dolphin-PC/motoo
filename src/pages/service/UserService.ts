import { TUser, User } from "../model/User";

export const createUser = async (data: TUser) => {
  try {
    const user: User = new User({
      uid: data.uid,
      email: data.email,
    });
  } catch (err) {
    throw err;
  }
};
