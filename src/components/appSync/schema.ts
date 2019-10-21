/**
 * @module AppSync
 */

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
  Properties: ISAppSyncSchema_props

  constructor(i: IAppSyncSchema_min) {
    this.name = i.name || genComponentName()
    this.Properties = { ApiId: i.apiId || '' }
    if ('def' in i && typeof i.def === 'string') {
      this.Properties.Definition = i.def
    }
    if ('loc' in i && typeof i.loc === 'string') {
      // load up the schema and validate
      i
    }
    if (i.apiId) {
      this.Properties.ApiId = i.apiId
    }
  }
  static fromString(i: string): AppSyncSchema {
    return AppSyncSchema.validate(i)
  }
  static fromJSON(o: object): AppSyncSchema {
    if (typeof o === 'string') o = JSON.parse(o)
    return AppSyncSchema.validate(o as IAppSyncSchema_min)
  }
  static fromJS(i: object): AppSyncSchema {
    return AppSyncSchema.validate(i)
  }
  static from(i: string | object | AppSyncSchema): AppSyncSchema {
    return AppSyncSchema.validate(i)
  }
  static validateJS(i: IAppSyncSchema_min): AppSyncSchema {
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
  static validateJSON(i: IAppSyncSchema_json): AppSyncSchema {
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
    const { ApiId, Definition, DefinitionS3Location } = verifyInterDeps<ISAppSyncSchema_props>(
      i[name].Properties
    )

    // start an instnace with stubbed data, ready to be over-written
    const ret = Definition
      ? new AppSyncSchema({
          name,
          apiId: ApiId,
          def: Definition
        })
      : new AppSyncSchema({
          name,
          apiId: ApiId,
          loc: DefinitionS3Location
        } as IAppSyncSchema_min_loc)

    ret.name = name
    ret.Properties = i[name].Properties
    return ret
  }
  static validate(i: string | object): AppSyncSchema {
    return validatorGeneric<AppSyncSchema>(i as squals, AppSyncSchema)
  }
  _name(n: string) {
    this.name = n
    return this
  }

  toJSON(): IAppSyncSchema_json {
    return {
      [this.name]: {
        Type: 'AWS::AppSync::GraphQLSchema',
        Properties: this.Properties
      }
    }
  }
  Ref(): IRef {
    return { Ref: this.name }
  }
}

export type IAppSyncSchema_min = IAppSyncSchema_min_def | IAppSyncSchema_min_loc
export interface IAppSyncSchema_min_def {
  name?: string
  def: string | IRef | IGetAtt
  apiId?: string | IRef | IGetAtt
}
export interface IAppSyncSchema_min_loc {
  name?: string
  loc: string | IRef | IGetAtt
  apiId?: string | IRef | IGetAtt
}

interface IAppSyncSchema_json {
  [name: string]: {
    Type: 'AWS::AppSync::GraphQLSchema'
    Properties: ISAppSyncSchema_props
  }
}

interface ISAppSyncSchema_props {
  ApiId: string | IRef | IGetAtt
  Definition?: string | IRef | IGetAtt
  DefinitionS3Location?: string | IRef | IGetAtt
}
