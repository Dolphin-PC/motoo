// ** NOT USED ** //

import { FirebaseError } from "firebase/app";
export const Collections = {
  USER: "user",
  NOTICE: "notice",
  STOCK_INFO: "stock_info",
  TOKEN_INFO: "token_info",
  AMOUNT_MONEY: "amount_money",
  AMOUNT_STOCK: "amount_stock",
  LIKE_STOCK: "like_stock",
};
export class CFirebaseError {
  code: string;
  message: string;
  name: string;

  constructor(error: FirebaseError) {
    this.message = error.message;
    this.code = error.code;
    this.name = error.name;
  }

  static isCFirebaseError(error: any) {
    return error.code && error.message && error.name;
  }
}

// export const getServerToken = async () =>{
//     await getAuth().
// }
