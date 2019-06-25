// import { IIamStatement, IamPolicy, IamStatement } from '../../src/components/iam/index'

// describe('IAM Statememt Objects', () => {
//   test('Defaults', () => {
//     const policy1 = new IamStatement('id1243').allows()
//     const policy2 = new IamStatement('id1243')
//     const expected = {
//       Sid: 'id1243',
//       Effect: 'Allow',
//       Action: '*',
//       Resource: '*'
//     }
//     expect(policy1).toEqual(expected)
//     expect(policy2).toEqual(expected)
//   })
//   test('Default Deny', () => {
//     const policy = new IamStatement('id123').denies()
//     const expected = {
//       Sid: 'id123',
//       Effect: 'Deny',
//       Action: '*',
//       Resource: '*'
//     }
//     expect(policy).toEqual(expected)
//   })
//   test(' Unaided User Created Verbose Example : user Knows how to type elements', () => {
//     const a = new IamStatement()
//       .allows()
//       .actions('s3.*', 'lambda.*')
//       .resources('resource1', 'resouce2')
//       .when(
//         { StringLike: { 's3:key': ['myKey', 'otherOptions'] } },
//         { StringLike: { 's3:funkyStuff': ['got', 'the', 'funk'] } },
//         { StringEquals: { 's3:prefix': 'myPrefix' } }
//       )

//     const e = {
//       Effect: 'Allow',
//       Action: ['s3.*', 'lambda.*'],
//       Resource: ['resource1', 'resouce2'],
//       Condition: {
//         StringEquals: { 's3:prefix': 'myPrefix' },
//         StringLike: [
//           { 's3:key': ['myKey', 'otherOptions'] },
//           { 's3:funkyStuff': ['got', 'the', 'funk'] }
//         ]
//       }
//     }
//     expect(a).toEqual(e)
//   })
// })

// describe('IAM Policy Objects', () => {
//   test('Defaults', () => {
//     const name = 'name'
//     const a = new IamPolicy(name).statements(new IamStatement())
//     const e = {
//       PolicyName: 'name',
//       PolicyDocument: {
//         Version: '2012-10-17',
//         Id: 'name',
//         Statement: [{ Effect: 'Allow', Resource: '*', Action: '*' }]
//       }
//     }

//     expect(a).toHaveProperty('name')
//     expect(a.Type).toEqual('AWS::IAM::Policy')
//     expect(a.Properties).toEqual(e)
//   })

//   test('Basic Deny', () => {
//     const name = 'name2'
//     const a = new IamPolicy(name).statements(new IamStatement().denies())
//     const e = {
//       PolicyName: 'name2',
//       PolicyDocument: {
//         Version: '2012-10-17',
//         Id: 'name2',
//         Statement: [{ Effect: 'Deny', Resource: '*', Action: '*' }]
//       }
//     }

//     expect(a).toHaveProperty('name')
//     expect(a.Type).toEqual('AWS::IAM::Policy')
//     expect(a.Properties).toEqual(e)
//   })

//   test('More Advanced Statement', () => {
//     // much of this may be non-sensible cloudformation
//     // the grammar has not been tightend up yet
//     const name = 'name2'
//     const a = new IamPolicy(name).statements(
//       new IamStatement()
//         .id('All_s3and_ec2')
//         .allows()
//         .actions('s3.*', 'ec2.*')
//         .resources('someResourceString')
//         .when(
//           { StringEquals: { 's3:prefix': 'myPreifx' } },
//           { StringEquals: { 's3:key': 'myKey' } },
//           { SourceIPequals: { 'aws:sourceIp': '11.11.11.11' } }
//         ),
//       new IamStatement()
//         .id('no containers - yes to dynamo')
//         .denies()
//         .actions('ecs.*', 'ecr.*')
//         .resources('*')
//         .omittedActions('dynamo.*')
//         .omittedResources('dynamo:west*', 'dynamo:east*')
//     )

//     let Statement: IIamStatement[]
//     Statement = [
//       {
//         Sid: 'All_s3and_ec2',
//         Effect: 'Allow',
//         Action: ['s3.*', 'ec2.*'],
//         Resource: 'someResourceString',
//         Condition: {
//           StringEquals: [{ 's3:prefix': 'myPrefix' }, { 's3:key': 'myKey' }],
//           SourceIPequals: { 'aws:sourceIp': '11.11.11.11' }
//         }
//       },
//       {
//         Sid: 'no containers - yes to dynamo',
//         Effect: 'Deny',
//         Action: ['ecs.*', 'ecr.*'],
//         Resource: '*',
//         NotAction: 'dynamo.*',
//         NotResource: ['dynamo:west*', 'dynamo:east*']
//       }
//     ]

//     const e = {
//       PolicyName: name,
//       PolicyDocument: {
//         Version: '2012-10-17',
//         Id: name,
//         Statement
//       }
//     }

//     console.log(JSON.stringify(a, null, 2))
//     console.log(JSON.stringify(e, null, 2))

//     expect(a).toHaveProperty(name)
//     expect(a.Type).toEqual('AWS::IAM::Policy')
//     expect(a.Properties).toEqual(e)
//   })
// })

// // Note: should the module attempt to incorporate some of the limits?
// // @see: <https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_iam-limits.html>
// // @ref: <https://policysim.aws.amazon.com/> perhaps that can be used to verify? available in the `AWS-JS-SDK`
// //
