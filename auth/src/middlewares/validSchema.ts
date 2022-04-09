import { Request, Response, NextFunction } from 'express'
import { RequestValidationError } from '../errors/RequestValidationError'
import { ajv } from '../config/ajv'

export const validateSchema = (schemaName: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    let valid = ajv.validate(schemaName, req.body)
    if (!valid) {
      throw new RequestValidationError(ajv.errors || [])
    }
    next()
  }
}
