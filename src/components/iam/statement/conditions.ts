// #region TypedConditionalFuncSets
export const DateFuncs = (dataField: string): ((svc: string) => { [dfield: string]: IDateConditions }) => {
  return (svcName: string) => {
    return {
      [dataField]: {
        equals: (d: Date | string) => {
          if (d instanceof Date) {
            return { DateEquals: { [`${svcName}:${dataField}`]: d.toJSON().toString() } }
          } else {
            return { DateEquals: { [`${svcName}:${dataField}`]: d } }
          }
        },
        notEquals: (d: Date | string) => {
          if (d instanceof Date) {
            return { DateNotEquals: { [`${svcName}:${dataField}`]: d.toJSON().toString() } }
          } else {
            return { DateNotEquals: { [`${svcName}:${dataField}`]: d } }
          }
        },
        greaterThan: (d: Date) => {
          return { DateGreaterThan: { [`${svcName}:${dataField}`]: d.toJSON().toString() } }
        },
        lessThan: (d: Date) => {
          return { DateLessThan: { [`${svcName}:${dataField}`]: d.toJSON().toString() } }
        },
        greaterOrEqualto: (d: Date) => {
          return { DateGreaterThanEquals: { [`${svcName}:${dataField}`]: d.toJSON().toString() } }
        },
        lesserOrEqualto: (d: Date) => {
          return { DateLessThanEquals: { [`${svcName}:${dataField}`]: d.toJSON().toString() } }
        }
      } as IDateConditions
    }
  }
}
export const NumberFuncs = (
  dataField: string
): ((svc: string) => { [dfield: string]: INumericConditions }) => {
  return (svcName: string) => {
    return {
      [dataField]: {
        equals: (n: number) => ({ NumericEquals: { [`${svcName}:${dataField}`]: n } }),
        notEquals: (n: number) => ({ NumericNotEquals: { [`${svcName}:${dataField}`]: n } }),
        greaterThan: (n: number) => ({ NumericGreaterThan: { [`${svcName}:${dataField}`]: n } }),
        lessThan: (n: number) => ({ NumericLessThan: { [`${svcName}:${dataField}`]: n } }),
        greaterOrEqualto: (n: number) => ({
          NumericGreaterThanEquals: { [`${svcName}:${dataField}`]: n }
        }),
        lesserOrEqualto: (n: number) => ({
          NumericLessThanEquals: { [`${svcName}:${dataField}`]: n }
        })
      } as INumericConditions
    }
  }
}

export const StringFuncs_plural = (
  // basically the same thing as singular
  // but all the added functions accept variadic string inputs
  svcName: string,
  dataField: string,
  o: {
  isCaseIgnored?: boolean
  ifExists?: boolean
  enums?: string[]
  } = { isCaseIgnored: false, ifExists: false, enums: undefined },
  multi: {
  isAny?: boolean
  isAll?: boolean
  } = { isAny: false, isAll: false }
): IStringFuncConditions => {
  if (multi.isAny && multi.isAll) {
    throw new Error(
      'Can not setup an IAM condition on one data field using both ANY and ALL conditional operators - use only one.'
    )
  }

  let prefix: string = ''
  if (multi.isAny) prefix += 'ForAnyValue:'
  if (multi.isAll) prefix += 'ForAllValues:'

  let suffix: string = ''
  if (o.isCaseIgnored) suffix += 'IgnoreCase'
  if (o.ifExists) suffix += 'IfExists'

  const setDiff = (setA: Set<string>, setB: Set<string>) => {
    const _difference = new Set(setA)
    for (var elem of setB) {
      _difference.delete(elem)
    }
    return _difference
  }

  return ({
    equals: (...s: string[]) => {
      const enumSet = new Set(o.enums)
      const inputStrSet = new Set(s)
      // all inputs must be valid - any that hang out v the enums is a problem
      if (o.enums && setDiff(inputStrSet, enumSet).size > 0) {
        throw new Error(`invalid option given: ${s} when was expecting: ${o.enums}`)
      }
      return {
        [`${prefix}StringEquals${suffix}`]: {
          [`${svcName}:${dataField}`]: s
        }
      }
      // return {svcName, dataField, isCaseIgnored, ifExists, enums}
    },
    notEquals: (...s: string[]) => {
      const enumSet = new Set(o.enums)
      const inputStrSet = new Set(s)
      // all inputs must be valid - any that hang out v the enums is a problem
      if (o.enums && setDiff(inputStrSet, enumSet).size > 0) {
        throw new Error(`invalid option given: ${s} when was expecting: ${o.enums}`)
      }
      return {
        [`${prefix}StringNotEquals${suffix}`]: {
          [`${svcName}:${dataField}`]: s
        }
      }
    },
    like: (...s: string[]) => {
      const enumSet = new Set(o.enums)
      const inputStrSet = new Set(s)
      // all inputs must be valid - any that hang out v the enums is a problem
      if (o.enums && setDiff(inputStrSet, enumSet).size > 0) {
        throw new Error(`invalid options given: ${s};  was expecting: ${o.enums}`)
      }
      return {
        [`${prefix}StringLike${suffix}`]: {
          [`${svcName}:${dataField}`]: s
        }
      }
    },
    notLike: (...s: string[]) => {
      const enumSet = new Set(o.enums)
      const inputStrSet = new Set(s)
      // all inputs must be valid - any that hang out v the enums is a problem
      if (o.enums && setDiff(inputStrSet, enumSet).size > 0) {
        throw new Error(`invalid option given: ${s} when was expecting: ${o.enums}`)
      }
      return {
        [`${prefix}StringNotLike${suffix}`]: {
          [`${svcName}:${dataField}`]: s
        }
      }
    }
  } as unknown) as IStringFuncConditions
}
export const StringFuncs = (
  dataField: string,
  enums?: string[]
): ((svc: string) => { [dfield: string]: IStringConditions_singular }) => {
  return (((svcName: string) => {
    return {
      [dataField]: {
        ...StringFuncs_plural(svcName, dataField, { enums }),
        ifExists: {
          ...StringFuncs_plural(svcName, dataField, { enums, ifExists: true })
        },
        ignoringCase: {
          ...StringFuncs_plural(svcName, dataField, { enums, isCaseIgnored: true })
        },
        ignoreCaseIfExists: {
          ...StringFuncs_plural(svcName, dataField, {
            enums,
            isCaseIgnored: true,
            ifExists: true
          })
        },
        ...StringArrFuncs(dataField, enums)(svcName)[dataField]
      }
    }
  }) as unknown) as ((svc: string) => { [dfield: string]: IStringConditions_singular })
}
export const StringArrFuncs = (
  dataField: string,
  enums?: string[]
): ((svc: string) => { [dataField: string]: IStringConditions_plural }) => {
  return (svcName: string) => {
    return {
      [dataField]: {
        all: {
          ...StringFuncs_plural(svcName, dataField, { enums }),
          ifExists: {
            ...StringFuncs_plural(svcName, dataField, { enums, ifExists: true }, { isAll: true })
          },
          ignoringCase: {
            ...StringFuncs_plural(
              svcName,
              dataField,
              { enums, isCaseIgnored: true },
              { isAll: true }
            )
          },
          ignoreCaseIfExists: {
            ...StringFuncs_plural(
              svcName,
              dataField,
              {
                enums,
                isCaseIgnored: true,
                ifExists: true
              },
              { isAll: true }
            )
          }
        },
        any: {
          ...StringFuncs_plural(svcName, dataField, { enums }, { isAny: true }),
          ifExists: {
            ...StringFuncs_plural(svcName, dataField, { enums, ifExists: true }, { isAny: true })
          },
          ignoringCase: {
            ...StringFuncs_plural(svcName, dataField, { enums, isCaseIgnored: true })
          },
          ignoreCaseIfExists: {
            ...StringFuncs_plural(
              svcName,
              dataField,
              {
                enums,
                isCaseIgnored: true,
                ifExists: true
              },
              { isAny: true }
            )
          }
        }
      }
    }
  }
}
export const TagFuncs_singular = (
  svcName: string,
  dataField: string,
  o: {
  isCaseIgnored?: boolean
  ifExists?: boolean
  enums?: string[]
  } = { isCaseIgnored: false, ifExists: false, enums: undefined },
  multi: {
  isAny?: boolean
  isAll?: boolean
  } = { isAny: false, isAll: false }
): ITagConditions_singularFuncs => {
  if (multi.isAny && multi.isAll) {
    throw new Error(
      'Can not setup an IAM condition on one data field using both ANY and ALL conditional operators - use only one.'
    )
  }

  const setDiff = (setA: Set<string>, setB: Set<string>) => {
    const _difference = new Set(setA)
    for (var elem of setB) {
      _difference.delete(elem)
    }
    return _difference
  }

  let prefix: string = ''
  if (multi.isAny) prefix += 'ForAnyValue:'
  if (multi.isAll) prefix += 'ForAllValues:'

  let suffix: string = ''
  if (o.isCaseIgnored) suffix += 'IgnoreCase'
  if (o.ifExists) suffix += 'IfExists'

  return ({
    equals: (tagKey: string, value: string) => {
      if (o.enums && !o.enums.includes(value)) {
        throw new Error(`invalid option given: ${value} when was expecting: ${o.enums}`)
      }
      return {
        [`${prefix}StringEquals${suffix}`]: {
          [`${svcName}:${dataField}/${tagKey}`]: value
        }
      }
    },
    notEquals: (tagKey: string, value: string) => {
      if (o.enums && !o.enums.includes(value)) {
        throw new Error(`invalid option given: ${value} when was expecting: ${o.enums}`)
      }
      return {
        [`${prefix}StringNotEquals${suffix}`]: {
          [`${svcName}:${dataField}/${tagKey}`]: value
        }
      }
    },
    like: (tagKey: string, ...value: string[]) => {
      const enumSet = new Set(o.enums)
      const inputStrSet = new Set(value)
      // all inputs must be valid - any that hang out vs the enums is a problem
      if (o.enums && setDiff(inputStrSet, enumSet).size > 0) {
        throw new Error(`invalid option given: ${value} when was expecting: ${o.enums}`)
      }
      return {
        [`${prefix}StringLike${suffix}`]: {
          [`${svcName}:${dataField}/${tagKey}`]: value
        }
      }
    },
    notLike: (tagKey: string, ...value: string[]) => {
      const enumSet = new Set(o.enums)
      const inputStrSet = new Set(value)
      // all inputs must be valid - any that hang out vs the enums is a problem
      if (o.enums && setDiff(inputStrSet, enumSet).size > 0) {
        throw new Error(`invalid option given: ${value} when was expecting: ${o.enums}`)
      }
      return {
        [`${prefix}StringNotLike${suffix}`]: {
          [`${svcName}:${dataField}/${tagKey}`]: value
        }
      }
    }
  } as unknown) as ITagConditions_singularFuncs
}
export const TagFuncs_plural = (
  svcName: string,
  dataField: string,
  o: {
  isCaseIgnored?: boolean
  ifExists?: boolean
  enums?: string[]
  } = { isCaseIgnored: false, ifExists: false, enums: undefined },
  multi: {
  isAny?: boolean
  isAll?: boolean
  } = { isAny: false, isAll: false }
): ITagConditions_pluralFuncs => {
  if (multi.isAny && multi.isAll) {
    throw new Error(
      'Can not setup an IAM condition on one data field using both ANY and ALL conditional operators - use only one.'
    )
  }

  const setDiff = (setA: Set<string>, setB: Set<string>) => {
    const _difference = new Set(setA)
    for (var elem of setB) {
      _difference.delete(elem)
    }
    return _difference
  }

  let prefix: string = ''
  if (multi.isAny) prefix += 'ForAnyValue:'
  if (multi.isAll) prefix += 'ForAllValues:'

  let suffix: string = ''
  if (o.isCaseIgnored) suffix += 'IgnoreCase'
  if (o.ifExists) suffix += 'IfExists'

  return ({
    equals: (tagKey: string, ...value: string[]) => {
      const enumSet = new Set(o.enums)
      const inputStrSet = new Set(value)
      // all inputs must be valid - any that hang out vs the enums is a problem
      if (o.enums && setDiff(inputStrSet, enumSet).size > 0) {
        throw new Error(`invalid option given: ${value} when was expecting: ${o.enums}`)
      }
      return {
        [`${prefix}StringEquals${suffix}`]: {
          [`${svcName}:${dataField}/${tagKey}`]: value
        }
      }
    },
    notEquals: (tagKey: string, ...value: string[]) => {
      const enumSet = new Set(o.enums)
      const inputStrSet = new Set(value)
      // all inputs must be valid - any that hang out vs the enums is a problem
      if (o.enums && setDiff(inputStrSet, enumSet).size > 0) {
        throw new Error(`invalid option given: ${value} when was expecting: ${o.enums}`)
      }
      return {
        [`${prefix}StringNotEquals${suffix}`]: {
          [`${svcName}:${dataField}/${tagKey}`]: value
        }
      }
    },
    like: (tagKey: string, ...value: string[]) => {
      const enumSet = new Set(o.enums)
      const inputStrSet = new Set(value)
      // all inputs must be valid - any that hang out vs the enums is a problem
      if (o.enums && setDiff(inputStrSet, enumSet).size > 0) {
        throw new Error(`invalid option given: ${value} when was expecting: ${o.enums}`)
      }
      return {
        [`${prefix}StringLike${suffix}`]: {
          [`${svcName}:${dataField}/${tagKey}`]: value
        }
      }
    },
    notLike: (tagKey: string, ...value: string[]) => {
      const enumSet = new Set(o.enums)
      const inputStrSet = new Set(value)
      // all inputs must be valid - any that hang out vs the enums is a problem
      /* istanbul ignore next */
      if (o.enums && setDiff(inputStrSet, enumSet).size > 0) {
        throw new Error(`invalid option given: ${value} when was expecting: ${o.enums}`)
      }
      return {
        [`${prefix}StringNotLike${suffix}`]: {
          [`${svcName}:${dataField}/${tagKey}`]: value
        }
      }
    }
  } as unknown) as ITagConditions_pluralFuncs
}
export const TagFuncs = (
  dataField: string,
  enums?: string[]
): ((svc: string) => { [dfield: string]: ITagConditions }) => {
  return (((svcName: string) => {
    return {
      [dataField]: {
        ...TagFuncs_singular(svcName, dataField, { enums }),
        ifExists: {
          ...TagFuncs_singular(svcName, dataField, { enums, ifExists: true })
        },
        ignoringCase: {
          ...TagFuncs_singular(svcName, dataField, { enums, isCaseIgnored: true })
        },
        ignoreCaseIfExists: {
          ...TagFuncs_singular(svcName, dataField, { enums, isCaseIgnored: true, ifExists: true })
        },
        ...TagArrFuncs(dataField, enums)(svcName)[dataField]
      }
    }
  }) as unknown) as ((svc: string) => { [dfield: string]: ITagConditions })
}
export const TagArrFuncs = (
  dataField: string,
  enums?: string[]
): ((svc: string) => { [dataField: string]: ITagConditions_plural }) => {
  return (svcName: string) => {
    return {
      [dataField]: {
        all: {
          ...TagFuncs_plural(svcName, dataField, { enums }, { isAll: true }),
          ifExists: {
            ...TagFuncs_plural(svcName, dataField, { enums, ifExists: true }, { isAll: true })
          },
          ignoringCase: {
            ...TagFuncs_plural(svcName, dataField, { enums, isCaseIgnored: true }, { isAll: true })
          },
          ignoreCaseIfExists: {
            ...TagFuncs_plural(
              svcName,
              dataField,
              {
                enums,
                isCaseIgnored: true,
                ifExists: true
              },
              { isAll: true }
            )
          }
        },
        any: {
          ...TagFuncs_plural(svcName, dataField, { enums }, { isAny: true }),
          ifExists: {
            ...TagFuncs_plural(svcName, dataField, { enums, ifExists: true }, { isAny: true })
          },
          ignoringCase: {
            ...TagFuncs_plural(svcName, dataField, { enums, isCaseIgnored: true }, { isAny: true })
          },
          ignoreCaseIfExists: {
            ...TagFuncs_plural(
              svcName,
              dataField,
              {
                enums,
                isCaseIgnored: true,
                ifExists: true
              },
              { isAny: true }
            )
          }
        }
      }
    }
  }
}
export const ArnFuncs = (dataField: string): ConditionFunction => {
  return (svcName: string) => {
    return {
      [dataField]: ({
        is: (arn: string) => ({ ArnEquals: { [`${svcName}:${dataField}`]: arn } }),
        isNot: (arn: string) => ({ ArnNotEquals: { [`${svcName}:${dataField}`]: arn } }),
        isLike: (...arn: string[]) => ({ ArnLike: { [`${svcName}:${dataField}`]: arn } }),
        isNotLike: (...arn: string[]) => ({ ArnNotLike: { [`${svcName}:${dataField}`]: arn } })
      } as unknown) as IArnConditions
    }
  }
}
export const IPAddressFuncs = (dataField: string): ConditionFunction => {
  return (svcName: string) => {
    return {
      [dataField]: {
        is: (ip: string) => ({
          IpAddress: { [`${svcName}:${dataField}`]: ip }
        }),
        isNot: (ip: string) => ({
          NotIpAddress: { [`${svcName}:${dataField}`]: ip }
        })
      } as IIPAddressConditions
    }
  }
}
export const BoolFuncs = (dataField: string): ConditionFunction => {
  return (svcName: string) => {
    return {
      [dataField]: {
        is: (b: boolean) => ({ Bool: { [`${svcName}:${dataField}`]: b } })
      } as IBoolConditions
    }
  }
}
const buildSvcWithDataTypes = (svcName: string) => {
  return (...dataFieldArr: ConditionFunction[]) => {
    return {
      [svcName]: dataFieldArr.reduce((p, c) => ({ ...p, ...c(svcName) }), {})
    } as IIamSvcMappings
  }
}

// #endregion TypedConditionalFuncSets

export const conditions = (): IPolicyConditions => {
  return ({
    ...((buildSvcWithDataTypes('aws')(
      ArnFuncs('PrincipalArn'),
      ArnFuncs('SourceArn'),
      NumberFuncs('EpochTime'),
      NumberFuncs('MultiFactorAuthAge'),
      StringFuncs('userid'),
      StringFuncs('username'),
      StringFuncs('PrincipalOrgID'),
      StringFuncs('PrincipalType'),
      StringFuncs('Referer'),
      StringFuncs('RequestedRegion'),
      StringFuncs('UserAgent'),
      StringFuncs('SourceAccount'),
      StringFuncs('SourceVpc'),
      StringFuncs('SourceVpce'),

      DateFuncs('CurrentTime'),
      DateFuncs('TokenIssueTime'),
      BoolFuncs('MultiFactorAuthPresent'),
      BoolFuncs('SecureTransport'),

      TagFuncs('TagKeys'),
      TagFuncs('ResourceTag'),
      TagFuncs('PrincipalTag'),
      TagFuncs('RequestTag'),

      IPAddressFuncs('SourceIp'),
      IPAddressFuncs('VpcSourceIp')
    ) as unknown) as IPolicyConditions_aws),
    ...((buildSvcWithDataTypes('s3')(
      NumberFuncs('max-keys'),
      NumberFuncs('signatureage'),
      StringFuncs('prefix'),
      StringFuncs('authtype'),
      StringFuncs('delimiter'),
      StringFuncs('signatureversion'),
      StringFuncs('locationconstraint'),
      StringFuncs('LocationConstraint'),
      StringFuncs('versionid'),
      StringFuncs('VersionId'),
      StringFuncs('RequestObjectTagKeys'),
      StringFuncs('TagKeys'),
      StringFuncs('ExistingObjectTag/<key>'),
      StringFuncs('x-amz-acl'),
      StringFuncs('x-amz-content-sha256'),
      StringFuncs('x-amz-copy-source'),
      StringFuncs('x-amz-grant-full-control'),
      StringFuncs('x-amz-grant-read'),
      StringFuncs('x-amz-grant-read-acp'),
      StringFuncs('x-amz-grant-write'),
      StringFuncs('x-amz-grant-write-acp'),
      StringFuncs('x-amz-metadata-directive'),
      StringFuncs('x-amz-server-side-encryption'),
      StringFuncs('x-amz-server-side-encryption-aws-kms-key-id'),
      StringFuncs('x-amz-storage-class'),
      StringFuncs('x-amz-website-redirect-location'),
      StringFuncs('object-lock-legal-hold'),
      StringFuncs('object-lock-mode'),
      StringFuncs('object-lock-remaining-retention-days'),
      StringFuncs('object-lock-retain-until-date'),
      StringFuncs('RequestObjectTagKeys'),
      StringFuncs('ExistingJobOperation'),
      StringFuncs('JobSuspendedCause'),
      StringFuncs('RequestJobOperation'),
      TagFuncs('ExistingObjectTag'),
      TagFuncs('RequestObjectTag'),
      NumberFuncs('RequestJobPriority'),
      NumberFuncs('ExistingJobPriority')
    ) as unknown) as IPolicyConditions_s3),
    ...((buildSvcWithDataTypes('dynamodb')(
      StringFuncs('Attributes'),
      StringFuncs('EnclosingOperation'),
      StringFuncs('Select', [
        'ALL_ATTRIBUTES',
        'ALL_PROJECTED_ATTRIBUTES',
        'SPECIFIC_ATTRIBUTES',
        'COUNT'
      ]),
      StringFuncs('ReturnConsumedCapacity', ['TOTAL', 'NONE']),
      StringFuncs('ReturnValues', ['ALL_OLD', 'UPDATED_OLD', 'ALL_NEW', 'UPDATED_NEW', 'NONE']),
      StringArrFuncs('LeadingKeys')
    ) as unknown) as IPolicyConditions_dynamodb),
    ...((buildSvcWithDataTypes('codecommit')(
      StringFuncs('References')
    ) as unknown) as IPolicyConditions_codecommit),
    ...((buildSvcWithDataTypes('cloudformation')(
      StringFuncs('ChangeSetName'),
      StringFuncs('ResourceTypes'),
      StringFuncs('StackPolicyUrl'),
      StringFuncs('TemplateUrl'),
      ArnFuncs('RoleArn')
    ) as unknown) as IPolicyConditions_cloudformation),
    ...((buildSvcWithDataTypes('lambda')(
      StringFuncs('Layer'),
      StringFuncs('Principal'),
      ArnFuncs('FunctionArn')
    ) as unknown) as IPolicyConditions_lambda),
    ...((buildSvcWithDataTypes('elasticbeanstalk')(
      ArnFuncs('FromApplication'),
      ArnFuncs('FromApplicationVersion'),
      ArnFuncs('FromConfigurationTemplate'),
      ArnFuncs('FromEnvironment'),
      ArnFuncs('FromPlatform'),
      ArnFuncs('FromSolutionStack'),
      ArnFuncs('InApplication')
    ) as unknown) as IPolicyConditions_eb),
    ...((buildSvcWithDataTypes('ecr')(
      StringFuncs('ResourceTag')
    ) as unknown) as IPolicyConditions_ecr),
    ...((buildSvcWithDataTypes('ses')(
      StringFuncs('FeedbackAddres'),
      StringFuncs('FromAddress'),
      StringFuncs('FromDisplayName'),
      StringFuncs('Recipients')
    ) as unknown) as IPolicyConditions_ses),
    ...((buildSvcWithDataTypes('sns')(
      StringFuncs('Endpoint'),
      StringFuncs('Protocol')
    ) as unknown) as IPolicyConditions_sns),
    ...((buildSvcWithDataTypes('sts')(
      StringFuncs('ExternalId')
    ) as unknown) as IPolicyConditions_sts)
  } as unknown) as IPolicyConditions // #shakey
}

// const StringFuncs_singular = (
//   svcName: string,
//   dataField: string,
//   o: {
//   isCaseIgnored?: boolean
//   ifExists?: boolean
//   enums?: string[]
//   } = { isCaseIgnored: false, ifExists: false, enums: undefined },
//   multi: {
//   isAny?: boolean
//   isAll?: boolean
//   } = { isAny: false, isAll: false }
// ): IStringFuncConditions => {
//   /* istanbul ignore next */
//   if (multi.isAny && multi.isAll) {
//     throw new Error(
//       'Can not setup an IAM condition on one data field using both ANY and ALL conditional operators - use only one.'
//     )
//   }

//   let prefix: string = ''
//   if (multi.isAny) prefix += 'ForAnyValue:'
//   if (multi.isAll) prefix += 'ForAllValues:'

//   let suffix: string = ''
//   if (o.isCaseIgnored) suffix += 'IgnoreCase'
//   if (o.ifExists) suffix += 'IfExists'

//   const setDiff = (setA: Set<string>, setB: Set<string>) => {
//     const _difference = new Set(setA)
//     for (var elem of setB) {
//       _difference.delete(elem)
//     }
//     return _difference
//   }

//   return ({
//     equals: (...s: string[]) => {
//       const enumSet = new Set(o.enums)
//       const inputStrSet = new Set(s)
//       // all inputs must be valid - any that hang out v the enums is a problem
//       if (o.enums && setDiff(inputStrSet, enumSet).size > 0) {
//         throw new Error(`invalid option given: ${s} when was expecting: ${o.enums}`)
//       }
//       return {
//         [`${prefix}StringEquals${suffix}`]: {
//           [`${svcName}:${dataField}`]: s
//         }
//       }
//     },
//     notEquals: (...s: string[]) => {
//       const enumSet = new Set(o.enums)
//       const inputStrSet = new Set(s)
//       // all inputs must be valid - any that hang out v the enums is a problem
//       if (o.enums && setDiff(inputStrSet, enumSet).size > 0) {
//         throw new Error(`invalid option given: ${s} when was expecting: ${o.enums}`)
//       }
//       return {
//         [`${prefix}StringNotEquals${suffix}`]: {
//           [`${svcName}:${dataField}`]: s
//         }
//       }
//     },
//     like: (...s: string[]) => {
//       if (o.enums) {
//         if (Array.isArray(s)) {
//           if (!s.every(v => (o.enums as string[]).includes(v))) {
//             throw new Error(`invalid option given: ${s} when was expecting: ${o.enums}`)
//           }
//         } else {
//           if (!o.enums.includes(s)) {
//             throw new Error(`invalid option given: ${s} when was expecting: ${o.enums}`)
//           }
//         }
//       }
//       return {
//         [`${prefix}StringLike${suffix}`]: {
//           [`${svcName}:${dataField}`]: s
//         }
//       }
//     },
//     notLike: (s: string) => {
//       if (o.enums && !o.enums.includes(s)) {
//         throw new Error(`invalid option given: ${s} when was expecting: ${o.enums}`)
//       }
//       return {
//         [`${prefix}StringNotLike${suffix}`]: {
//           [`${svcName}:${dataField}`]: s
//         }
//       }
//     }
//   } as unknown) as IStringFuncConditions
// }

// debugging...
// const cond = init()
//
// const printJSON = (data: unknown) => {
//   console.log(JSON.stringify(data, null, 2))
// }
//
// printJSON(cond.aws.CurrentTime.equals('someString'))

// #region Interfaces

type IPolicyConditions = IPolicyConditions_aws &
  IPolicyConditions_s3 &
  IPolicyConditions_dynamodb &
  IPolicyConditions_codecommit &
  IPolicyConditions_cloudformation &
  IPolicyConditions_lambda &
  IPolicyConditions_eb &
  IPolicyConditions_ecr &
  IPolicyConditions_ses &
  IPolicyConditions_sns &
  IPolicyConditions_sts

/*

@howto: Add Another Service:
1. Define the service interface (exampled by s3, dynamo, lambda, etc)
2. Integrate the service interface into the PolicyCondition Master interface
3. Setup the `TypedFunc` func calls that are used with `buildSvcWithDataTypes`

*/

export interface IPolicyConditions_aws {
  aws: {
    CurrentTime: IDateConditions
    TokenIssueTime: IDateConditions

    EpochTime: INumericConditions
    FederatedProvider: IStringConditions_singular
    RequestObjectTag: IStringConditions_singular

    PrincipalArn: IArnConditions
    SourceArn: IArnConditions
    MultiFactorAuthAge: INumericConditions

    userid: IStringConditions_singular
    username: IStringConditions_singular
    PrincipalOrgID: IStringConditions_singular
    PrincipalType: IStringConditions_singular
    Referer: IStringConditions_singular
    RequestedRegion: IStringConditions_singular
    UserAgent: IStringConditions_singular
    SourceAccount: IStringConditions_singular
    SourceVpc: IStringConditions_singular
    SourceVpce: IStringConditions_singular

    MultiFactorAuthPresent: IBoolConditions
    SecureTransport: IBoolConditions

    SourceIp: IIPAddressConditions
    VpcSourceIp: IIPAddressConditions

    PrincipalTag: ITagConditions
    RequestTag: ITagConditions
    ResourceTag: ITagConditions
    TagKeys: ITagConditions
  }
}
export interface IPolicyConditions_iam {
  iam: {
    AWSServiceName: IStringConditions_singular
    PassedToService: IStringConditions_singular
    OrganizationsPolicyId: IStringConditions_singular
    PermissionsBoundary: IStringConditions_singular
    PolicyARN: IArnConditions
    ResourceTag: ITagConditions
  }
  saml: {
    aud: IStringConditions_singular
    cn: IStringConditions_singular
    doc: IStringConditions_singular
    edupersonaffiliation: IStringConditions_plural
    edupersonassurance: IStringConditions_plural
    edupersonentitlement: string
    edupersonnickname: IStringConditions_plural
    edupersonorgdn: IStringConditions_singular
    edupersonorgunitdn: IStringConditions_plural
    edupersonprimaryaffiliation: IStringConditions_singular
    edupersonprimaryorgunitdn: IStringConditions_plural
    edupersonprincipalname: IStringConditions_plural
    edupersonscopedaffiliation: IStringConditions_plural
    edupersontargetedid: IStringConditions_plural
    eduorghomepageuri: IStringConditions_plural
    eduorgidentityauthnpolicyuri: IStringConditions_plural
    eduorglegalname: IStringConditions_plural
    eduorgsuperioruri: IStringConditions_plural
    eduorgwhitepagesuri: IStringConditions_plural
    namequalifier: IStringConditions_singular
    iss: IStringConditions_singular
    sub: IStringConditions_singular
    sub_type: IStringConditions_singular
  }
}

export interface IPolicyConditions_s3 {
  s3: {
    authtype: IStringConditions_singular
    delimiter: IStringConditions_singular
    signatureage: INumericConditions
    signatureversion: IStringConditions_singular
    prefix: IStringConditions_singular
    TagKeys: IStringConditions_singular
    // available in Both Capitalization  Options
    locationconstraint: IStringConditions_singular
    LocationConstraint: IStringConditions_singular
    // available in Both Capitalization  Options
    versionid: IStringConditions_singular
    VersionId: IStringConditions_singular
    'max-keys': INumericConditions
    'x-amz-acl': IStringConditions_singular
    'x-amz-content-sha256': IStringConditions_singular
    'x-amz-copy-source': IStringConditions_singular
    'x-amz-grant-full-control': IStringConditions_singular
    'x-amz-grant-read': IStringConditions_singular
    'x-amz-grant-read-acp': IStringConditions_singular
    'x-amz-grant-write': IStringConditions_singular
    'x-amz-grant-write-acp': IStringConditions_singular
    'x-amz-metadata-directive': IStringConditions_singular
    'x-amz-server-side-encryption': IStringConditions_singular
    'x-amz-server-side-encryption-aws-kms-key-id': IStringConditions_singular
    'x-amz-storage-class': IStringConditions_singular
    'x-amz-website-redirect-location': IStringConditions_singular
    'object-lock-legal-hold': IStringConditions_singular
    'object-lock-mode': IStringConditions_singular
    'object-lock-remaining-retention-days': IStringConditions_singular
    'object-lock-retain-until-date': IStringConditions_singular
    ExistingObjectTag: ITagConditions
    RequestObjectTag: ITagConditions
    RequestObjectTagKeys: IStringConditions_singular
    ExistingJobOperation: IStringConditions_singular
    ExistingJobPriority: INumericConditions
    JobSuspendedCause: IStringConditions_singular
    RequestJobOperation: IStringConditions_singular
    RequestJobPriority: INumericConditions
  }
}
export interface IPolicyConditions_dynamodb {
  dynamodb: {
    Attributes: IStringConditions_singular
    EnclosingOperation: IStringConditions_singular
    LeadingKeys: IStringConditions_plural
    Select: IStringConditions_singular
    ReturnConsumedCapacity: IStringConditions_singular
    ReturnValues: IStringConditions_singular
  }
}
export interface IPolicyConditions_cloudformation {
  cloudformation: {
    ChangeSetName: IStringConditions_singular
    ResourceTypes: IStringConditions_singular
    RoleArnL: IArnConditions
    StackPolicyUrl: IStringConditions_singular
    TemplateUrl: IStringConditions_singular
  }
}
export interface IPolicyConditions_codecommit {
  codecommit: { References: IStringConditions_singular }
}
export interface IPolicyConditions_lambda {
  lambda: {
    FunctionArn: IArnConditions
    Layer: IStringConditions_singular
    Principal: IStringConditions_singular
  }
}
export interface IPolicyConditions_eb {
  elasticbeanstalk: {
    FromApplication: IArnConditions
    FromApplicationVersion: IArnConditions
    FromConfigurationTemplate: IArnConditions
    FromEnvironment: IArnConditions
    FromPlatform: IArnConditions
    FromSolutionStack: IArnConditions
    InApplication: IArnConditions
  }
}
export interface IPolicyConditions_ecr {
  ecr: {
    ResourceTag: ITagConditions
  }
}
export interface IPolicyConditions_ses {
  ses: {
    FeedbackAddres: IStringConditions_singular
    FromAddress: IStringConditions_singular
    FromDisplayName: IStringConditions_singular
    Recipients: IStringConditions_singular
  }
}
export interface IPolicyConditions_sns {
  sns: {
    Endpoint: IStringConditions_singular
    Protocol: IStringConditions_singular
  }
}
export interface IPolicyConditions_sts {
  sts: { ExternalId: IStringConditions_singular }
}

interface IDateConditions {
  equals(d: Date | string): { DateEquals: { [Attr: string]: string } }
  notEquals(d: Date | string): { DateNotEquals: { [Attr: string]: string } }
  greaterThan(d: Date): { DateGreaterThan: { [Attr: string]: string } }
  lessThan(d: Date): { DateLessThan: { [Attr: string]: string } }
  greaterOrEqualto(d: Date): { DateGreaterThanEquals: { [Attr: string]: string } }
  lesserOrEqualto(d: Date): { DateLessThanEquals: { [Attr: string]: string } }
}
interface INumericConditions {
  equals(n: number): { NumericEquals: { [Attr: string]: number } }
  notEquals(n: number): { NumericNotEquals: { [Attr: string]: number } }
  greaterThan(n: number): { NumericGreaterThan: { [Attr: string]: number } }
  lessThan(n: number): { NumericLessThan: { [Attr: string]: number } }
  greaterOrEqualto(n: number): { NumericGreaterThanEquals: { [Attr: string]: number } }
  lesserOrEqualto(n: number): { NumericLessThanEquals: { [Attr: string]: number } }
}

interface IStringFuncConditions {
  equals(...s: string[]): { [StringEquals: string]: { [Attr: string]: string[] } }
  notEquals(...s: string[]): { [StringEquals: string]: { [Attr: string]: string[] } }
  like(...s: string[]): { [StringEquals: string]: { [Attr: string]: string[] } }
  notLike(...s: string[]): { [StringEquals: string]: { [Attr: string]: string[] } }
}
interface IStringFuncConditions_withConditions {
  ifExists: IStringFuncConditions
  ignoringCase: IStringFuncConditions
  ignoreCaseIfExists: IStringFuncConditions
}

interface IStringConditions_plural {
  any: IStringFuncConditions_withConditions & IStringFuncConditions
  all: IStringFuncConditions_withConditions & IStringFuncConditions
}

// mix these two togther ^^
type IStringConditions_singular = IStringFuncConditions &
  IStringFuncConditions_withConditions &
  IStringConditions_plural

interface ITagConditions_singularFuncs {
  equals(tagKey: string, value: string): { [StringEquals: string]: { [Attr: string]: string } }
  notEquals(tagKey: string, value: string): { [StringEquals: string]: { [Attr: string]: string } }
  like(tagKey: string, ...value: string[]): { [StringEquals: string]: { [Attr: string]: string[] } }
  notLike(
    tagKey: string,
    ...value: string[]
  ): { [StringEquals: string]: { [Attr: string]: string } }
}
interface ITagConditions_pluralFuncs {
  equals(
    tagKey: string,
    ...value: string[]
  ): { [StringEquals: string]: { [Attr: string]: string[] } }
  notEquals(
    tagKey: string,
    ...value: string[]
  ): { [StringEquals: string]: { [Attr: string]: string[] } }
  like(tagKey: string, ...value: string[]): { [StringEquals: string]: { [Attr: string]: string[] } }
  notLike(
    tagKey: string,
    ...value: string[]
  ): { [StringEquals: string]: { [Attr: string]: string[] } }
}
interface ITagConditions_singular_withConditions {
  ifExists: ITagConditions_singularFuncs
  ignoringCase: ITagConditions_singularFuncs
  ignoreCaseIfExists: ITagConditions_singularFuncs
}
interface ITagConditions_plural_withConditions {
  ifExists: ITagConditions_pluralFuncs
  ignoringCase: ITagConditions_pluralFuncs
  ignoreCaseIfExists: ITagConditions_pluralFuncs
}

type ITagConditions_singular = ITagConditions_singularFuncs & ITagConditions_singular_withConditions
interface ITagConditions_plural {
  any: ITagConditions_pluralFuncs & ITagConditions_plural_withConditions
  all: ITagConditions_pluralFuncs & ITagConditions_plural_withConditions
}

type ITagConditions = ITagConditions_singular & ITagConditions_plural

interface IBoolConditions {
  is(b: boolean): { Bool: { [keysPath: string]: boolean } }
}
interface IIPAddressConditions {
  is(ip: string): { IpAddress: { [keysPath: string]: string } }
  isNot(ip: string): { NotIpAddress: { [keysPath: string]: string } }
}
interface IArnConditions {
  is(arn: string): { ArnEquals: { [resource: string]: string } }
  isNot(arn: string): { ArnNotEquals: { [resource: string]: string } }
  isLike(...arn: string[]): { ArnLike: { [resource: string]: string } }
  isNotLike(...arn: string[]): { ArnNotLike: { [resource: string]: string } }
}

interface IIamSvcMappings {
  [svcKey: string]: {
    [reskey: string]: IIamPolicyConditions
  }
}
type ConditionFunction = (svc: string) => { [dataField: string]: IIamPolicyConditions }

type IIamPolicyConditions =
  | IDateConditions
  | INumericConditions
  | IStringConditions_singular
  | IStringConditions_plural
  | IBoolConditions
  | IIPAddressConditions
  | IArnConditions
  | ITagConditions
  | ITagConditions_plural

// #endregion Interfaces

// #region Graveyard
