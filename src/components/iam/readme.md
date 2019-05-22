# Identity and Access Management

## Declarative vs Imperative

How to Spport Both?

Declarative

- Get me to the airport

Imperative

- Head East out the neighborhood via Lombard St, then Hang a Left on to ... arive at the airport

Mixed Mode:

- Head to the airport, but take the tollroad so we can shave some time, and stop at Startbucks first.

## How to support both?

As you construct infrastructure objects, you can add data elemtns of who - given there is a resoruceARN and action context. Then before export, the data elements can be culled together to construct the IAM policy documents.

## Other Notes:

Learning custom template keys sucks. Can intellisense provide a real discovery of paramters, an use JS to mix in conditionals? use a js condition function

Condition functions are passed in args from #5 and allowed to mix them together with logic - output is a Condition statement?

### Example

input: `if( aws.UserAgent === "Example Corp Java Client")`

output" `"Condition": {"StringEquals": {"aws:UserAgent": "Example Corp Java Client"}}`

### Supported Condition Syntaxes:

1. `let cond = ()=>{ return aws.UserAgent !== "Example Corp Java Client" }` `-> StringEquals`
2. `let cond = ()=>{ return aws.UserAgent !== "Example Corp Java Client")` `-> StringNotEquals`
3. `let cond = ()=>{ return aws.UserAgent.toLowerCase() == "example corp java client")` `-> StringEqualsIgnoreCase` === or == not sure yet
4. `let cond = ()=>{ return aws.UserAgent.toUpperCase() == "example corp java client")` `-> StringEqualsIgnoreCase` === or == not sure yet
5. `let cond = ()=>{ return aws.UserAgent.includes('searchForThisSubstring'))` stringLike
6. `let cond = ()=>{ return !( aws:UserAgent.includes('searchForThisSubstring') ))` stringLike
7. `let cond = ()=>{ return aws.UserAgent.match(/someRegex/g))` stringLike
8. `let cond = ()=>{ return !( aws.UserAgent.match(/someRegex/g) ))` stringNotLike
9. `let cond = ()=>{ return aws.TokenIssueTime === null )` null condition
10. `let cond = ()=>{ return ["t1.*","t2.*","m3.*"].includes("ec2:InstanceType") )` IfExists condition -> triggered by comparing membership condition on ec2 variable
11. `let cond = ()=>{ return aws.SourceIp === '203.0.113.0/24' )` IP Adderess Condition -> triggered by equality comparison on SourceIP
12. `let cond = ()=>{ return aws.CurrentTime === new Date(YYYY, MM ,DD) )` Date Condition -> triggered by equality or ordinatlity comparision on aws. date element 13.
13. `const myCondition = ()=>{return ec2.instanceType === 'someType.*'}`
14. `const myCondition = ()=>{return ec2.instanceType === 'someType.*'}`
15. `const myCondition = ()=>{return ['ID','Messages','Tags'].every( v=> dynamo.attributes.includes(v) )}`

or what if we did a staged approach - where there is some level of js execution...

meaning a 2arity function partial.

const f = (my, Own, Data)=> ( aws , ec2, dyanmo, )=> Functionally generated Comparator-`Data` === aws.userId f(Data:'myData')

allows for user defined API using standard  `search`, `replace`, `concat`, `trim`, `toUpper` to run before we get to the AST trnasform

if the condition operand is not prefixed with as in `aws.< property >` then strongly consder adding `StringLikeIfExists` see <https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_condition_operators.html#Conditions_IfExists>

```javascript
TLO.except() // -> throws error - can not be called first

TLO.allow(users, actions, condition?(), except?() )
TLO.deny(users, actions, condition?(), except?() )

ƒ.except()-> {actions, otherResources}
```

## Reference

1. <https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html>

2. <https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_identifiers.html>

3. <https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/AWS_IAM.html>

4. <https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-role.html>

5. <https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_variables.html>

6. <https://stackoverflow.com/questions/32144428/aws-iam-policy-grammar-error-with-multiple-conditions>

7. <https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_statement.html>
