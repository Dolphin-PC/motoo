import { User } from "./User";

// 사용자 알림
class Notice {
  user: User;
  type: String;
  message: String;
  deleteYn: Boolean;
  createdAt: Date;

  constructor(data: any) {
    this.user = data.user;
    this.type = data.type;
    this.message = data?.message;
    this.deleteYn = data.deleteYn;
    this.createdAt = data.createdAt;
  }

  fromFirebase(data: any): Notice {
    return new Notice(data);
  }
}
