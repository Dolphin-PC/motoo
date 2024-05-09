import { AccountInfo } from "./AccountInfo";
import { Notice } from "./Notice";

// 사용자
export class User {
  id: number;
  password?: string;
  email: string;
  name?: string;
  lastLoginAt: Date;
  createdAt: Date;

  noticeList?: Notice[];
  accountInfoList?: AccountInfo[];

  constructor(data: any) {
    this.id = data.id;

    this.email = data.email;
    this.name = data?.name;
    this.lastLoginAt = data.last_login_at ?? new Date();
    this.createdAt = data.created_at ?? new Date();

    this.noticeList = data?.notice;
    this.accountInfoList = data?.account_info;
  }
}
