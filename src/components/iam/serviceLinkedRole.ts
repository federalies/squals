import randomWord from 'random-word'
import Randoma from 'randoma'

export class IamServiceLinkedRole {
  name: string
  Type = 'AWS::IAM::ServiceLinkedRole'
  Properties: {
    AWSServiceName: string
    CustomSuffix?: string
    Description?: string
  }

  constructor (props: IlinkedService | IlinkedService_min) {
    const { svcName } = props
    if (this.isLinkedServiceJSON(props)) {
      this.name = Object.keys(props)[0]
      this.Type = 'AWS::IAM::ServiceLinkedRole'
      this.Properties = props[this.name].Properties
    } else {
      this.Properties = {
        AWSServiceName: props.svcName,
        Description: props.desc,
        CustomSuffix: props.customSuffix
      }
      this.name =
        props.name ||
        `${randomWord()}${new Randoma({
          seed: new Date().getTime()
        }).integer()}`
    }
  }

  private isLinkedServiceJSON (i: IlinkedService | IlinkedService_min): i is IlinkedService {
    const topKeys = Object.keys(i)
    return !('svcName' in (i as IlinkedService_min))
  }

  toJSON (): IlinkedService {
    return {
      [this.name]: {
        Type: 'AWS::IAM::ServiceLinkedRole',
        Properties: this.Properties
      }
    }
  }
}

interface IlinkedService {
  [name: string]: {
    Type: 'AWS::IAM::ServiceLinkedRole'
    Properties: {
      AWSServiceName: string
      CustomSuffix?: string
      Description?: string
    }
  }
}

interface IlinkedService_min {
  svcName: string
  desc?: string
  customSuffix?: string
  name?: string
}
