import { AccountInfo } from "./AccountInfo";
import { Notice } from "./Notice";
import { BaseModel } from "./Base";

// 사용자
export class User extends BaseModel {
  id: number;
  password?: string;
  email: string;
  name?: string;
  lastLoginAt: Date;
  createdAt: Date;

  noticeList?: Notice[];
  accountInfoList?: AccountInfo[];

  currentAccountInfo?: AccountInfo;

  constructor(data: any) {
    data = super(data);

    this.id = data.id;

    this.email = data.email;
    this.name = data?.name;
    this.lastLoginAt = data.lastLoginAt ?? new Date();
    this.createdAt = data.createdAt ?? new Date();
  }
}
