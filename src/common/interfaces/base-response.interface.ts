import { HttpStatus } from "@nestjs/common";
import { HttpMessages } from "../enums/http-messages.enum";

export interface IBaseResponse<T> {
  statusCode: HttpStatus;
  message: HttpMessages;
  data: T;
}