import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import { authSchema } from '../json-schema/auth-schema'

const ajv = new Ajv({ allErrors: true, removeAdditional: 'all' })

addFormats(ajv)

ajv.addSchema(authSchema, 'authSchema')

export { ajv }
