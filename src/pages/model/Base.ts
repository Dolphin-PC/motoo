import { convertObjectPropertiesSnakeCaseToCamelCase } from "@/lib/util/util";

export class BaseModel {
  constructor(data: any) {
    return convertObjectPropertiesSnakeCaseToCamelCase(data);
  }
}
