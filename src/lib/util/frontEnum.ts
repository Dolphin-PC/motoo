export const EErrorMessage = {
  REQUIRED: "This is a required field.",
  MINIMUM: (num: number) => `Please enter at least ${num} characters.`,
  EMAIL: "Invalid email address",
};

export const FormPattern = {
  EMAIL: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: EErrorMessage.EMAIL,
  },
  ACCOUNT_NUMBER: {
    value: /^[0-9]{8}$/,
    message: "Invalid account number",
  },
};

// export const TableDisplayName: Record<string, string> = {
//   id: "ID",
//   stockId: "종목번호",
//   accountNumber: "계좌번호",
//   quantity: "수량",
//   price: "가격",
//   priceUpdateAt: "가격 업데이트 시간",
//   imgSrc: "이미지",
//   orderType: "주문 타입",
//   orderStatus: "주문 상태",
//   type: "구분",
//   name: "종목명",
// };

// export type TTableHeader = {
//   displayName: string;
//   key: string;
//   type: "string" | "img" | "number" | "Date";
// };

// export const getTableRowType = (key: string): TTableHeader["type"] => {
//   switch (key) {
//     case "id":
//     case "price":
//       return "number";

//     case "imgSrc":
//       return "img";

//     case "priceUpdateAt":
//       return "Date";

//     default:
//       return "string";
//   }
// };
