import { CustomError } from './CustomError'
import { ErrorObject } from 'ajv'

export class RequestValidationError extends CustomError {
  statusCode = 400
  constructor(public errors: ErrorObject[]) {
    super('Invalid request parameters')

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype)
  }

  serializeErrors() {
    return this.errors.map(err => {
      return {
        message: err.message || 'Request validation error',
        field: err.schemaPath
      }
    })
  }
}
