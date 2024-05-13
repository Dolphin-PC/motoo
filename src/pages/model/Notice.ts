import { MinLength } from "class-validator";
import { BaseModel } from "./Base";

// 사용자 알림
export class Notice extends BaseModel {
  userId: number;
  @MinLength(10)
  accountNumber: number;

  message: String;
  type: String;
  deleteYn: Boolean;
  createdAt: Date;

  constructor(data: any) {
    data = super(data);
    this.userId = data.user_id;
    this.accountNumber = data.account_number;

    this.message = data?.message;
    this.type = data.type;
    this.deleteYn = data.delete_yn;
    this.createdAt = data.created_at;
  }
}
