import { convertObjectPropertiesSnakeCaseToCamelCase } from "@/lib/util/util";

export class BaseModel {
  constructor(data: any) {
    if (data === null || data === undefined) {
      // throw new Error("data must not be null or undefined");
    } else {
      Object.assign(this, convertObjectPropertiesSnakeCaseToCamelCase(data));
    }
  }
}
