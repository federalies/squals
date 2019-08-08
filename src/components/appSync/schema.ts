import {
  IRef,
  IGetAtt,
  squals,
  baseSchemas,
  genComponentName,
  validatorGeneric,
  struct
} from '../Template'
import {
  verifyHasAtLeastOne,
  verifySyntax,
  verifyIfThen,
  ifHas,
  ifPathType
} from '../../utils/validations/objectCheck'

import { buildSchema } from 'graphql'

export class AppSyncSchema implements squals {
  name: string
  Type = 'AWS::AppSync::GraphQLSchema'
  Properties: ISchema_out

  constructor (i: IAppSyncSchema_min) {
    this.name = i.name || genComponentName()
    this.Properties = { ApiId: i.apiId || '' }
    if (i.def && typeof i.def === 'string') {
      buildSchema(i.def)
    }
    if (i.loc && typeof i.def === 'string') {
      // load up the schema and validate
    }
  }
  static fromString (i: string): AppSyncSchema {
    return AppSyncSchema.validate(i)
  }
  static fromJSON (o: object): AppSyncSchema {
    if (typeof o === 'string') o = JSON.parse(o)
    return this.validate(o as IAppSyncSchema_min)
  }
  static fromJS (i: object): AppSyncSchema {
    return AppSyncSchema.validate(i)
  }
  static from (i: string | object | AppSyncSchema): AppSyncSchema {
    return AppSyncSchema.validate(i)
  }
  static validateJS (i: IAppSyncSchema_min): AppSyncSchema {
    struct({
      name: 'string?',
      apiId: struct.optional(baseSchemas.StrRef),
      def: struct.optional(baseSchemas.StrRefGetAtt),
      loc: struct.optional(baseSchemas.StrRefGetAtt)
    })(i)

    // add flowRight if needed
    const verifyInterDeps = verifyIfThen(
      ifHas('def'),
      verifySyntax('def', buildSchema),
      verifyHasAtLeastOne('def', 'loc')
    )

    return new AppSyncSchema(verifyInterDeps(i))
  }
  static validateJSON (i: ISchema_json): AppSyncSchema {
    struct(
      struct.dict([
        'string',
        struct({
          Type: struct.literal('AWS::AppSync::GraphQLSchema'),
          Properties: struct({
            ApiId: baseSchemas.StrRefGetAtt,
            Definition: struct.optional(baseSchemas.StrRefGetAtt),
            DefinitionS3Location: struct.optional(baseSchemas.StrRefGetAtt)
          })
        })
      ])
    )(i)

    const verifyInterDeps = verifyIfThen(
      ifPathType('Definition', 'string'),
      verifySyntax('def', buildSchema),
      verifyHasAtLeastOne('Definition', 'DefinitionS3Location')
    )
    const name = Object.keys(i)[0]
    const { ApiId, Definition, DefinitionS3Location } = verifyInterDeps<ISchema_out>(
      i[name].Properties
    )

    // start an instnace with stubbed data, ready to be over-written
    const ret = new AppSyncSchema({
      name,
      apiId: ApiId,
      def: Definition,
      loc: DefinitionS3Location
    })
    ret.name = name
    ret.Properties = i[name].Properties
    return ret
  }
  static validate (i: string | object): AppSyncSchema {
    return validatorGeneric<AppSyncSchema>(i as squals, AppSyncSchema)
  }
  toJSON (): object[] {
    AppSyncSchema.validate(this)
    return [
      ({
        [this.name]: {
          Type: 'AWS::AppSync::GraphQLSchema',
          Properties: this.Properties
        }
      } as unknown) as JSON
    ]
  }
  Ref (): IRef {
    return { Ref: this.name }
  }
}

export interface IAppSyncSchema_min {
  name?: string
  apiId?: string | IRef | IGetAtt
  def?: string | IRef | IGetAtt
  loc?: string | IRef | IGetAtt
}

interface ISchema_json {
  [name: string]: {
    Type: 'AWS::AppSync::GraphQLSchema'
    Properties: ISchema_out
  }
}

interface ISchema_out {
  ApiId: string | IRef | IGetAtt
  Definition?: string | IRef | IGetAtt
  DefinitionS3Location?: string | IRef | IGetAtt
}
