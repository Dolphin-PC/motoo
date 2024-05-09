// 사용자 알림
export class Notice {
  id: number;
  accountNumber: number;

  message: String;
  type: String;
  deleteYn: Boolean;
  createdAt: Date;

  constructor(data: any) {
    this.id = data.id;
    this.accountNumber = data.account_number;

    this.message = data?.message;
    this.type = data.type;
    this.deleteYn = data.delete_yn;
    this.createdAt = data.created_at;
  }
}
