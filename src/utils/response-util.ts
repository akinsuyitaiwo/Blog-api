import { Response } from "express-serve-static-core";

const response = (
  res: Response,
  status: number,
  message?: any,
  info?: string
) => {
  return res.status(status).send({ message, info });
};
export function createdResponse(
  res: Response,
  message?: string,
  data?: object
) {
  return res.status(201).send({
    message: message ? message : "Resource Created",
    data: data || null,
  });
}

export function successResponse(
  res: Response,
  message?: string,
  data?: object
) {
  return res.status(201).send({
    message: message ? message : "Resource Created",
    data: data || null,
  });
}

export function errorResponse(res: Response, message?: string) {
  return res
    .status(500)
    .send({ error: message ? message : "Internal Server Error" });
}

export function badReqResponse(res: Response, message?: string) {
  return res.status(400).send({ error: message ? message : "Bad request" });
}

export function notFoundResponse(res: Response, message?: string) {
  return res.status(404).send({ error: message ? message : "Not Found" });
}

export function devResponse(res: Response, data: any) {
  return res.status(200).send({ ...data, success: true });
}

export default response;
