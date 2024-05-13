import { AccountInfo } from "./AccountInfo";
import { Notice } from "./Notice";
import { BaseModel } from "./Base";
import { IsEmail, MinLength } from "class-validator";

// 사용자
export class User extends BaseModel {
  id: number;

  @MinLength(6)
  password?: string;
  @IsEmail()
  email: string;
  name?: string;
  lastLoginAt: Date;
  createdAt: Date;
  deleteYn: boolean;

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
    this.deleteYn = data.deleteYn ?? false;
  }
}
