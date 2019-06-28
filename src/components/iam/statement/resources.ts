export const resourceArn = (i: {
partition?: string
svc: string
region?: string
acct?: string | number
resource?: string
}): string => {
  const { partition, svc, region, acct, resource } = {
    partition: 'aws',
    svc: '*',
    region: '',
    acct: '',
    resource: '*',
    ...i
  }
  return `arn:${partition}:${svc}:${region}:${acct}:${resource}`
}
