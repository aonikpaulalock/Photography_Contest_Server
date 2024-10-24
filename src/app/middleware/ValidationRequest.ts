import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

export const ValidationRequestSchema = (Schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await Schema.parseAsync({
        body: req.body,
        cookies: req.cookies,
      })
      next()
    } catch (error) {
      next(error)
    }
  }
}