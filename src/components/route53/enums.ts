export type validRecordSetTypes =
  | 'A'
  | 'AAAA'
  | 'CAA'
  | 'CNAME'
  | 'MX'
  | 'NAPTR'
  | 'NS'
  | 'PTR'
  | 'SOA'
  | 'SPF'
  | 'SRV'
  | 'TXT'

export type validRecordSetTypes_Multivalue =
  | 'A'
  | 'AAAA'
  | 'MX'
  | 'NAPTR'
  | 'PTR'
  | 'SPF'
  | 'SRV'
  | 'TXT'

export type validRecordSetTypes_Alias =
  | 'SOA'
  | 'A'
  | 'AAAA'
  | 'TXT'
  | 'NS'
  | 'CNAME'
  | 'MX'
  | 'NAPTR'
  | 'PTR'
  | 'SRV'
  | 'SPF'
  | 'CAA'

export type validRecordSetStrings =
  | 'A'
  | 'AAAA'
  | 'CAA'
  | 'CNAME'
  | 'MX'
  | 'NAPTR'
  | 'NS'
  | 'PTR'
  | 'SOA'
  | 'SPF'
  | 'SRV'
  | 'TXT'

export type validAbbrevUnitedStateStrings =
  | 'AL'
  | 'AK'
  | 'AZ'
  | 'AR'
  | 'CA'
  | 'CO'
  | 'CT'
  | 'DE'
  | 'FL'
  | 'GA'
  | 'HI'
  | 'ID'
  | 'IL'
  | 'IN'
  | 'IA'
  | 'KS'
  | 'KY'
  | 'LA'
  | 'ME'
  | 'MD'
  | 'MA'
  | 'MI'
  | 'MN'
  | 'MS'
  | 'MO'
  | 'MT'
  | 'NE'
  | 'NV'
  | 'NH'
  | 'NJ'
  | 'NM'
  | 'NY'
  | 'NC'
  | 'ND'
  | 'OH'
  | 'OK'
  | 'OR'
  | 'PA'
  | 'RI'
  | 'SC'
  | 'SD'
  | 'TN'
  | 'TX'
  | 'UT'
  | 'VT'
  | 'VA'
  | 'WA'
  | 'WV'
  | 'WI'
  | 'WY'

/**
 * @description - this nastiness is the kind of fun that AWS likes to have
 * a giant list of GUIDs that we hope is at least semi-permanant
 * @see https://docs.aws.amazon.com/general/latest/gr/rande.html
 *
 */
export enum validRoute53HostId {
  edge = 'Z2FDTNDATAQYW2',
  cloudfornt = 'Z2FDTNDATAQYW2',
  'apigateway.us-east-2.amazonaws.com' = 'ZOJJZC49E0EPZ',
  'apigateway.us-east-1.amazonaws.com' = 'Z1UJRXOUMOOFQ8',
  'apigateway.us-west-1.amazonaws.com' = 'Z2MUQ32089INYE',
  'apigateway.us-west-2.amazonaws.com' = 'Z2OJLYMUO9EFXC',
  'apigateway.ap-south-1.amazonaws.com' = 'Z3VO1THU9YC4UR',
  'apigateway.ap-northeast-3.amazonaws.com' = 'Z2YQB5RD63NC85',
  'apigateway.ap-northeast-2.amazonaws.com' = 'Z20JF4UZKIW1U8',
  'apigateway.ap-southeast-1.amazonaws.com' = 'ZL327KTPIQFUL',
  'apigateway.ap-southeast-2.amazonaws.com' = 'Z2RPCDW04V8134',
  'apigateway.ap-northeast-1.amazonaws.com' = 'Z1YSHQZHG15GKL',
  'apigateway.ca-central-1.amazonaws.com' = 'Z19DQILCV0OWEC',

  'apigateway.eu-central-1.amazonaws.com' = 'Z1U9ULNL0V5AJ3',
  'apigateway.eu-west-1.amazonaws.com' = 'ZLY8HYME6SFDD',
  'apigateway.eu-west-2.amazonaws.com' = 'ZJ5UAJN8Y3Z2Q',
  'apigateway.eu-west-3.amazonaws.com' = 'Z3KY65QIEKYHQQ',
  'apigateway.eu-north-1.amazonaws.com' = 'Z2YB950C88HT6D',
  'apigateway.sa-east-1.amazonaws.com' = 'ZCMLWB8V5SYIT',

  'elasticbeanstalk.us-east-2.amazonaws.com' = 'Z14LCN19Q5QHIC',
  'elasticbeanstalk.us-east-1.amazonaws.com' = 'Z117KPS5GTRQ2G',
  'elasticbeanstalk.us-west-1.amazonaws.com' = 'Z1LQECGX5PH1X',
  'elasticbeanstalk.us-west-2.amazonaws.com' = 'Z38NKT9BP95V3O',
  'elasticbeanstalk.ap-south-1.amazonaws.com' = 'Z18NTBI3Y7N9TZ',
  'elasticbeanstalk.ap-northeast-3.amazonaws.com' = 'ZNE5GEY1TIAGY',
  'elasticbeanstalk.ap-northeast-2.amazonaws.com' = 'Z3JE5OI70TWKCP',
  'elasticbeanstalk.ap-southeast-1.amazonaws.com' = 'Z16FZ9L249IFLT',
  'elasticbeanstalk.ap-southeast-2.amazonaws.com' = 'Z2PCDNR3VC2G1N',
  'elasticbeanstalk.ap-northeast-1.amazonaws.com' = 'Z1R25G3KIG2GBW',
  'elasticbeanstalk.ca-central-1.amazonaws.com' = 'ZJFCZL7SSZB5I',

  'elasticbeanstalk.eu-central-1.amazonaws.com' = 'Z1FRNW7UH4DEZJ',
  'elasticbeanstalk.eu-west-1.amazonaws.com' = 'Z2NYPWQ7DFZAZH',
  'elasticbeanstalk.eu-west-2.amazonaws.com' = 'Z1GKAAAUGATPF1',
  'elasticbeanstalk.eu-west-3.amazonaws.com' = 'Z5WN6GAYWG5OB',
  'elasticbeanstalk.eu-north-1.amazonaws.com' = 'Z23GO28BZ5AETM',
  'elasticbeanstalk.sa-east-1.amazonaws.com' = 'Z10X7K2B4QSOFV',
  'elasticbeanstalk.usgov-east-1.amazonaws.com' = 'Z35TSARG0EJ4VU',
  'elasticbeanstalk.usgov-west-1.amazonaws.com' = 'Z4KAURWC4UUUG',
  'elasticloadbalancing.us-east-2.amazonaws.com' = 'Z3AADJGX6KTTL2',
  'elasticloadbalancing.us-east-1.amazonaws.com' = 'Z35SXDOTRQ7X7K',
  'elasticloadbalancing.us-west-1.amazonaws.com' = 'Z368ELLRRE2KJ0',
  'elasticloadbalancing.us-west-2.amazonaws.com' = 'Z1H1FL5HABSF5',
  'elasticloadbalancing.ap-south-1.amazonaws.com' = 'ZP97RAFLXTNZK',
  'elasticloadbalancing.ap-northeast-3.amazonaws.com' = 'Z5LXEXXYW11ES',
  'elasticloadbalancing.ap-northeast-2.amazonaws.com' = 'ZWKZPGTI48KDX',
  'elasticloadbalancing.ap-southeast-1.amazonaws.com' = 'Z1LMS91P8CMLE5',
  'elasticloadbalancing.ap-southeast-2.amazonaws.com' = 'Z1GM3OXH4ZPM65',
  'elasticloadbalancing.ap-northeast-1.amazonaws.com' = 'Z14GRHDCWA56QT',
  'elasticloadbalancing.ca-central-1.amazonaws.com' = 'ZQSVJUPU6J1EY',
  'elasticloadbalancing.eu-central-1.amazonaws.com' = 'Z215JYRZR1TBD5',
  'elasticloadbalancing.eu-west-1.amazonaws.com' = 'Z32O12XQLNTSW2',
  'elasticloadbalancing.eu-west-2.amazonaws.com' = 'ZHURV8PSTC4K8',
  'elasticloadbalancing.eu-west-3.amazonaws.com' = 'Z3Q77PNBQS71R4',
  'elasticloadbalancing.eu-north-1.amazonaws.com' = 'Z23TAZ6LKFMNIO',
  'elasticloadbalancing.sa-east-1.amazonaws.com' = 'Z2P70J7HTTTPLU',

  'network_elasticloadbalancing.us-east-2.amazonaws.com' = 'ZLMOA37VPKANP',
  'network_elasticloadbalancing.us-east-1.amazonaws.com' = 'Z26RNL4JYFTOTI',
  'network_elasticloadbalancing.us-west-1.amazonaws.com' = 'Z24FKFUX50B4VW',
  'network_elasticloadbalancing.us-west-2.amazonaws.com' = 'Z18D5FSROUN65G',
  'network_elasticloadbalancing.ap-south-1.amazonaws.com' = 'ZVDDRBQ08TROA',
  'network_elasticloadbalancing.ap-northeast-3.amazonaws.com' = 'Z1GWIQ4HH19I5X',
  'network_elasticloadbalancing.ap-northeast-2.amazonaws.com' = 'ZIBE1TIR4HY56',
  'network_elasticloadbalancing.ap-southeast-1.amazonaws.com' = 'ZKVM4W9LS7TM',
  'network_elasticloadbalancing.ap-southeast-2.amazonaws.com' = 'ZCT6FZBF4DROD',
  'network_elasticloadbalancing.ap-northeast-1.amazonaws.com' = 'Z31USIVHYNEOWT',
  'network_elasticloadbalancing.ca-central-1.amazonaws.com' = 'Z2EPGBW3API2WT',
  'network_elasticloadbalancing.eu-central-1.amazonaws.com' = 'Z3F0SRJ5LGBH90',
  'network_elasticloadbalancing.eu-west-1.amazonaws.com' = 'Z2IFOLAFXWLO4F',
  'network_elasticloadbalancing.eu-west-2.amazonaws.com' = 'ZD4D7Y8KGAS4G',
  'network_elasticloadbalancing.eu-west-3.amazonaws.com' = 'Z1CMS0P5QUZ6D5',
  'network_elasticloadbalancing.eu-north-1.amazonaws.com' = 'Z1UDT6IFJ4EJM',
  'network_elasticloadbalancing.sa-east-1.amazonaws.com' = 'ZTK26PT1VY4CU',

  's3-website.us-east-2.amazonaws.com ' = 'Z2O1EMRO9K5GLX',
  's3-website.us-east-1.amazonaws.com' = 'Z3AQBSTGFYJSTF',
  's3-website.us-west-1.amazonaws.com' = 'Z2F56UZL2M1AC',
  's3-website.us-west-2.amazonaws.com' = 'Z3BJ6K6RIION7M',
  's3-website.ap-south-1.amazonaws.com' = 'Z11RGJOFQNVJUP',
  's3-website.ap-northeast-3.amazonaws.com' = 'Z2YQB5RD63NC85',
  's3-website.ap-northeast-2.amazonaws.com' = 'Z3W03O7B5YMIYP',
  's3-website.ap-southeast-1.amazonaws.com' = 'Z3O0J2DXBE1FTB',
  's3-website.ap-southeast-2.amazonaws.com' = 'Z1WCIGYICN2BYD',
  's3-website.ap-northeast-1.amazonaws.com' = 'Z2M4EHUR26P7ZW',
  's3-website.ca-central-1.amazonaws.com' = 'Z1QDHH18159H29',
  's3-website.eu-central-1.amazonaws.com' = 'Z21DNDUVLTQW6Q',
  's3-website.eu-west-1.amazonaws.com' = 'Z1BKCTXD74EZPE',
  's3-website.eu-west-2.amazonaws.com' = 'Z3GKZC51ZF0DB4',
  's3-website.eu-west-3.amazonaws.com' = 'Z3R1K369G5AVDG',
  's3-website.eu-north-1.amazonaws.com' = 'Z3BAZG2TWCNX0D',
  's3-website.sa-east-1.amazonaws.com' = 'Z7KQH4QJS55SO'
}

export const mappingAwsSvcToHostID = Object.freeze({
  edge: 'Z2FDTNDATAQYW2',
  cloudfornt: 'Z2FDTNDATAQYW2',
  'apigateway.us-east-2.amazonaws.com': 'ZOJJZC49E0EPZ',
  'apigateway.us-east-1.amazonaws.com': 'Z1UJRXOUMOOFQ8',
  'apigateway.us-west-1.amazonaws.com': 'Z2MUQ32089INYE',
  'apigateway.us-west-2.amazonaws.com': 'Z2OJLYMUO9EFXC',
  'apigateway.ap-south-1.amazonaws.com': 'Z3VO1THU9YC4UR',
  'apigateway.ap-northeast-3.amazonaws.com': 'Z2YQB5RD63NC85',
  'apigateway.ap-northeast-2.amazonaws.com': 'Z20JF4UZKIW1U8',
  'apigateway.ap-southeast-1.amazonaws.com': 'ZL327KTPIQFUL',
  'apigateway.ap-southeast-2.amazonaws.com': 'Z2RPCDW04V8134',
  'apigateway.ap-northeast-1.amazonaws.com': 'Z1YSHQZHG15GKL',
  'apigateway.ca-central-1.amazonaws.com': 'Z19DQILCV0OWEC',
  'apigateway.eu-central-1.amazonaws.com': 'Z1U9ULNL0V5AJ3',
  'apigateway.eu-west-1.amazonaws.com': 'ZLY8HYME6SFDD',
  'apigateway.eu-west-2.amazonaws.com': 'ZJ5UAJN8Y3Z2Q',
  'apigateway.eu-west-3.amazonaws.com': 'Z3KY65QIEKYHQQ',
  'apigateway.eu-north-1.amazonaws.com': 'Z2YB950C88HT6D',
  'apigateway.sa-east-1.amazonaws.com': 'ZCMLWB8V5SYIT',

  'elasticbeanstalk.us-east-2.amazonaws.com': 'Z14LCN19Q5QHIC',
  'elasticbeanstalk.us-east-1.amazonaws.com': 'Z117KPS5GTRQ2G',
  'elasticbeanstalk.us-west-1.amazonaws.com': 'Z1LQECGX5PH1X',
  'elasticbeanstalk.us-west-2.amazonaws.com': 'Z38NKT9BP95V3O',
  'elasticbeanstalk.ap-south-1.amazonaws.com': 'Z18NTBI3Y7N9TZ',
  'elasticbeanstalk.ap-northeast-3.amazonaws.com': 'ZNE5GEY1TIAGY',
  'elasticbeanstalk.ap-northeast-2.amazonaws.com': 'Z3JE5OI70TWKCP',
  'elasticbeanstalk.ap-southeast-1.amazonaws.com': 'Z16FZ9L249IFLT',
  'elasticbeanstalk.ap-southeast-2.amazonaws.com': 'Z2PCDNR3VC2G1N',
  'elasticbeanstalk.ap-northeast-1.amazonaws.com': 'Z1R25G3KIG2GBW',
  'elasticbeanstalk.ca-central-1.amazonaws.com': 'ZJFCZL7SSZB5I',

  'elasticbeanstalk.eu-central-1.amazonaws.com': 'Z1FRNW7UH4DEZJ',
  'elasticbeanstalk.eu-west-1.amazonaws.com': 'Z2NYPWQ7DFZAZH',
  'elasticbeanstalk.eu-west-2.amazonaws.com': 'Z1GKAAAUGATPF1',
  'elasticbeanstalk.eu-west-3.amazonaws.com': 'Z5WN6GAYWG5OB',
  'elasticbeanstalk.eu-north-1.amazonaws.com': 'Z23GO28BZ5AETM',
  'elasticbeanstalk.sa-east-1.amazonaws.com': 'Z10X7K2B4QSOFV',
  'elasticbeanstalk.usgov-east-1.amazonaws.com': 'Z35TSARG0EJ4VU',
  'elasticbeanstalk.usgov-west-1.amazonaws.com': 'Z4KAURWC4UUUG',
  'elasticloadbalancing.us-east-2.amazonaws.com': 'Z3AADJGX6KTTL2',
  'elasticloadbalancing.us-east-1.amazonaws.com': 'Z35SXDOTRQ7X7K',
  'elasticloadbalancing.us-west-1.amazonaws.com': 'Z368ELLRRE2KJ0',
  'elasticloadbalancing.us-west-2.amazonaws.com': 'Z1H1FL5HABSF5',
  'elasticloadbalancing.ap-south-1.amazonaws.com': 'ZP97RAFLXTNZK',
  'elasticloadbalancing.ap-northeast-3.amazonaws.com': 'Z5LXEXXYW11ES',
  'elasticloadbalancing.ap-northeast-2.amazonaws.com': 'ZWKZPGTI48KDX',
  'elasticloadbalancing.ap-southeast-1.amazonaws.com': 'Z1LMS91P8CMLE5',
  'elasticloadbalancing.ap-southeast-2.amazonaws.com': 'Z1GM3OXH4ZPM65',
  'elasticloadbalancing.ap-northeast-1.amazonaws.com': 'Z14GRHDCWA56QT',
  'elasticloadbalancing.ca-central-1.amazonaws.com': 'ZQSVJUPU6J1EY',
  'elasticloadbalancing.eu-central-1.amazonaws.com': 'Z215JYRZR1TBD5',
  'elasticloadbalancing.eu-west-1.amazonaws.com': 'Z32O12XQLNTSW2',
  'elasticloadbalancing.eu-west-2.amazonaws.com': 'ZHURV8PSTC4K8',
  'elasticloadbalancing.eu-west-3.amazonaws.com': 'Z3Q77PNBQS71R4',
  'elasticloadbalancing.eu-north-1.amazonaws.com': 'Z23TAZ6LKFMNIO',
  'elasticloadbalancing.sa-east-1.amazonaws.com': 'Z2P70J7HTTTPLU',

  'network_elasticloadbalancing.us-east-2.amazonaws.com': 'ZLMOA37VPKANP',
  'network_elasticloadbalancing.us-east-1.amazonaws.com': 'Z26RNL4JYFTOTI',
  'network_elasticloadbalancing.us-west-1.amazonaws.com': 'Z24FKFUX50B4VW',
  'network_elasticloadbalancing.us-west-2.amazonaws.com': 'Z18D5FSROUN65G',
  'network_elasticloadbalancing.ap-south-1.amazonaws.com': 'ZVDDRBQ08TROA',
  'network_elasticloadbalancing.ap-northeast-3.amazonaws.com': 'Z1GWIQ4HH19I5X',
  'network_elasticloadbalancing.ap-northeast-2.amazonaws.com': 'ZIBE1TIR4HY56',
  'network_elasticloadbalancing.ap-southeast-1.amazonaws.com': 'ZKVM4W9LS7TM',
  'network_elasticloadbalancing.ap-southeast-2.amazonaws.com': 'ZCT6FZBF4DROD',
  'network_elasticloadbalancing.ap-northeast-1.amazonaws.com': 'Z31USIVHYNEOWT',
  'network_elasticloadbalancing.ca-central-1.amazonaws.com': 'Z2EPGBW3API2WT',
  'network_elasticloadbalancing.eu-central-1.amazonaws.com': 'Z3F0SRJ5LGBH90',
  'network_elasticloadbalancing.eu-west-1.amazonaws.com': 'Z2IFOLAFXWLO4F',
  'network_elasticloadbalancing.eu-west-2.amazonaws.com': 'ZD4D7Y8KGAS4G',
  'network_elasticloadbalancing.eu-west-3.amazonaws.com': 'Z1CMS0P5QUZ6D5',
  'network_elasticloadbalancing.eu-north-1.amazonaws.com': 'Z1UDT6IFJ4EJM',
  'network_elasticloadbalancing.sa-east-1.amazonaws.com': 'ZTK26PT1VY4CU',

  's3-website.us-east-2.amazonaws.com ': 'Z2O1EMRO9K5GLX',
  's3-website.us-east-1.amazonaws.com': 'Z3AQBSTGFYJSTF',
  's3-website.us-west-1.amazonaws.com': 'Z2F56UZL2M1AC',
  's3-website.us-west-2.amazonaws.com': 'Z3BJ6K6RIION7M',
  's3-website.ap-south-1.amazonaws.com': 'Z11RGJOFQNVJUP',
  's3-website.ap-northeast-3.amazonaws.com': 'Z2YQB5RD63NC85',
  's3-website.ap-northeast-2.amazonaws.com': 'Z3W03O7B5YMIYP',
  's3-website.ap-southeast-1.amazonaws.com': 'Z3O0J2DXBE1FTB',
  's3-website.ap-southeast-2.amazonaws.com': 'Z1WCIGYICN2BYD',
  's3-website.ap-northeast-1.amazonaws.com': 'Z2M4EHUR26P7ZW',
  's3-website.ca-central-1.amazonaws.com': 'Z1QDHH18159H29',
  's3-website.eu-central-1.amazonaws.com': 'Z21DNDUVLTQW6Q',
  's3-website.eu-west-1.amazonaws.com': 'Z1BKCTXD74EZPE',
  's3-website.eu-west-2.amazonaws.com': 'Z3GKZC51ZF0DB4',
  's3-website.eu-west-3.amazonaws.com': 'Z3R1K369G5AVDG',
  's3-website.eu-north-1.amazonaws.com': 'Z3BAZG2TWCNX0D',
  's3-website.sa-east-1.amazonaws.com': 'Z7KQH4QJS55SO'
})
