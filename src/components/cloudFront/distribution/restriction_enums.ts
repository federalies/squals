/**
 * @module CloudFrontCDN
 */

// source: https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2

// Geo-political lines are often contested and "blurry ideas" that vary based on the source.
// This list and the groupings provided is merely intended as a helper, and not a delcaraion of fact.
// Furthermore for purposes of convenience, some member countries are included in more than one SubContinent function.
//
// Thus if you are composing your own sets of countries, you should determine if your inputs can tollerate duplciates
// otherwise you should use the dedupe funciton or dedupe the list your self based on your use case.

export const dedupe = (input: string[]): string[] => {
  return Array.from(new Set(input))
}

// example of composing a new region from sub-regions
export const Americas = (): CountryCodes_ISO3166[] => {
  return Array.from(new Set([...NorthAmericas(), ...CentralAmericas(), ...SouthAmericas()]))
}

export const CanadaPlusUSA = (): CountryCodes_ISO3166[] => {
  return [CountryCodes_ISO3166.United_States, CountryCodes_ISO3166.Canada]
}

// source: https://en.wikipedia.org/wiki/North_America
export const NorthAmericas = (): CountryCodes_ISO3166[] => {
  return [
    CountryCodes_ISO3166.Anguilla,
    CountryCodes_ISO3166.Antigua,
    CountryCodes_ISO3166.Aruba,
    CountryCodes_ISO3166.Bahamas,
    CountryCodes_ISO3166.Belize,
    CountryCodes_ISO3166.Cayman,
    CountryCodes_ISO3166.French_Polynesia,
    CountryCodes_ISO3166.CostaRica,
    CountryCodes_ISO3166.Curaçao,
    CountryCodes_ISO3166.Cuba,
    CountryCodes_ISO3166.Dominica,
    CountryCodes_ISO3166.Dominican_Republic,
    CountryCodes_ISO3166.ElSalvador,
    CountryCodes_ISO3166.Venezuela,
    CountryCodes_ISO3166.Greenland,
    CountryCodes_ISO3166.Grenada,
    CountryCodes_ISO3166.Guadeloupe,
    CountryCodes_ISO3166.Guatemala,
    CountryCodes_ISO3166.Haiti,
    CountryCodes_ISO3166.Honduras,
    CountryCodes_ISO3166.Jamaica,
    CountryCodes_ISO3166.Martinique,
    CountryCodes_ISO3166.Mexico,
    CountryCodes_ISO3166.Montserrat,
    CountryCodes_ISO3166.Panama,
    CountryCodes_ISO3166.PuertoRico,
    CountryCodes_ISO3166.Nicaragua,
    CountryCodes_ISO3166.Saint_Kitts_and_Nevis,
    CountryCodes_ISO3166.Saint_Lucia,
    CountryCodes_ISO3166.Saint_Vincent_and_the_Grenadines,
    CountryCodes_ISO3166.Turks_and_Caicos_Islands,
    CountryCodes_ISO3166.Trinidad_and_Tobago,
    CountryCodes_ISO3166.British_Antarctic_Territory,
    CountryCodes_ISO3166.Virgin_Islands_US,
    CountryCodes_ISO3166.Sint_Maarten_Dutch,
    CountryCodes_ISO3166.Saint_Martin_FR,
    CountryCodes_ISO3166.Saint_Pierre_and_Miquelon,
    CountryCodes_ISO3166.United_States,
    CountryCodes_ISO3166.United_States_Minor_Outlying_Islands
    // cant find 'Archipelago of San Andrés',(Colombia)
  ]
}

// soruce: https://en.wikipedia.org/wiki/Central_America
export const CentralAmericas = (): CountryCodes_ISO3166[] => {
  return [
    CountryCodes_ISO3166.Belize,
    CountryCodes_ISO3166.CostaRica,
    CountryCodes_ISO3166.ElSalvador,
    CountryCodes_ISO3166.Guatemala,
    CountryCodes_ISO3166.Honduras,
    CountryCodes_ISO3166.Nicaragua,
    CountryCodes_ISO3166.Panama
  ]
}

// soruce: https://en.wikipedia.org/wiki/South_America
export const SouthAmericas = (): CountryCodes_ISO3166[] => {
  return [
    CountryCodes_ISO3166.Argentina,
    CountryCodes_ISO3166.Bolivia,
    CountryCodes_ISO3166.Brazil,
    CountryCodes_ISO3166.Chile,
    CountryCodes_ISO3166.Colombia,
    CountryCodes_ISO3166.Ecuador,
    CountryCodes_ISO3166.French_Guiana,
    CountryCodes_ISO3166.Guyana,
    CountryCodes_ISO3166.Paraguay,
    CountryCodes_ISO3166.Peru,
    CountryCodes_ISO3166.Suriname,
    CountryCodes_ISO3166.Uruguay,
    CountryCodes_ISO3166.Venezuela
  ]
}

export const EUMembers = (): CountryCodes_ISO3166[] => {
  return [
    CountryCodes_ISO3166.Austria,
    CountryCodes_ISO3166.Belgium,
    CountryCodes_ISO3166.Bulgaria,
    CountryCodes_ISO3166.Croatia,
    CountryCodes_ISO3166.Cyprus,
    CountryCodes_ISO3166.Czechia,
    CountryCodes_ISO3166.Denmark,
    CountryCodes_ISO3166.Estonia,
    CountryCodes_ISO3166.Finland,
    CountryCodes_ISO3166.Sweden,
    CountryCodes_ISO3166.France,
    CountryCodes_ISO3166.Germany,
    CountryCodes_ISO3166.Greece,
    CountryCodes_ISO3166.Hungary,
    CountryCodes_ISO3166.Ireland,
    CountryCodes_ISO3166.Italy,
    CountryCodes_ISO3166.Latvia,
    CountryCodes_ISO3166.Lithuania,
    CountryCodes_ISO3166.Luxembourg,
    CountryCodes_ISO3166.Malta,
    CountryCodes_ISO3166.Netherlands,
    CountryCodes_ISO3166.Poland,
    CountryCodes_ISO3166.Portugal,
    CountryCodes_ISO3166.Romania,
    CountryCodes_ISO3166.Slovakia,
    CountryCodes_ISO3166.Slovenia,
    CountryCodes_ISO3166.Spain,
    CountryCodes_ISO3166.Sweden,
    CountryCodes_ISO3166.UnitedKingdom
  ]
}

export const Europe = (): CountryCodes_ISO3166[] => {
  return Array.from(
    new Set([
      ...EUMembers(),
      CountryCodes_ISO3166.Norway,
      CountryCodes_ISO3166.Iceland,
      CountryCodes_ISO3166.Liechtenstein,
      CountryCodes_ISO3166.Albania,
      CountryCodes_ISO3166.Switzerland,
      CountryCodes_ISO3166.North_Macedonia,
      CountryCodes_ISO3166.Montenegro,
      CountryCodes_ISO3166.Turkey,
      CountryCodes_ISO3166.Russia
    ])
  )
}

export const Asia = (): CountryCodes_ISO3166[] => {
  throw new Error('Not Implemented Yet')
}

// source: https://en.wikipedia.org/wiki/South_Asia
export const SouthAsia = (): CountryCodes_ISO3166[] => {
  throw new Error('Not Implemented Yet')
}

// source: https://en.wikipedia.org/wiki/Western_Asia
export const WesternAsia = (): CountryCodes_ISO3166[] => {
  throw new Error('Not Implemented Yet')
}

// source: https://en.wikipedia.org/wiki/Central_Asia
export const CentralAsia = (): CountryCodes_ISO3166[] => {
  throw new Error('Not Implemented Yet')
}

// source: https://en.wikipedia.org/wiki/East_Asia
export const EastAsia = (): CountryCodes_ISO3166[] => {
  throw new Error('Not Implemented Yet')
}

// source https://en.wikipedia.org/wiki/Southeast_Asia
export const SoutheastAsia = (): CountryCodes_ISO3166[] => {
  throw new Error('Not Implemented Yet')
}

// source: https://en.wikipedia.org/wiki/Oceania
export const Oceania = (): CountryCodes_ISO3166[] => {
  return [
    CountryCodes_ISO3166.Australia,
    CountryCodes_ISO3166.Fiji,
    CountryCodes_ISO3166.Indonesia,
    CountryCodes_ISO3166.Kiribati,
    CountryCodes_ISO3166.Marshall_Islands,
    CountryCodes_ISO3166.Micronesia,
    CountryCodes_ISO3166.Nauru,
    CountryCodes_ISO3166.New_Zealand,
    CountryCodes_ISO3166.Palau,
    CountryCodes_ISO3166.PapuaNewGuinea,
    CountryCodes_ISO3166.Samoa,
    CountryCodes_ISO3166.Solomon_Islands,
    CountryCodes_ISO3166.Tonga,
    CountryCodes_ISO3166.Tuvalu,
    CountryCodes_ISO3166.Vanuatu
  ]
}

export enum CountryCodes_ISO3166 {
  Andorra = 'AD',
  United_Arab_Emirates = 'AE',
  Afghanistan = 'AF',
  Antigua = 'AG',
  Anguilla = 'AI',
  Albania = 'AL',
  Armenia = 'AM',
  Angola = 'AO',
  Antarctica = 'AQ',
  Argentina = 'AR',
  American_Samoa = 'AS',
  Austria = 'AT',
  Australia = 'AU',
  Aruba = 'AW',
  Åland = 'AX',
  Azerbaijan = 'AZ',
  Bosnia = 'BA',
  Barbados = 'BB',
  Bangladesh = 'BD',
  Belgium = 'BE',
  Burkina = 'BF',
  Bulgaria = 'BG',
  Bahrain = 'BH',
  Burundi = 'BI',
  Benin = 'BJ',
  Saint_Barthélemy = 'BL',
  Bermuda = 'BM',
  Brunei = 'BN',
  Bolivia = 'BO',
  Bonaire = 'BQ',
  British_Antarctic_Territory = 'BQ',
  Brazil = 'BR',
  Bahamas = 'BS',
  Bhutan = 'BT',
  Bouvet = 'BV',
  Botswana = 'BW',
  Belarus = 'BY',
  Belize = 'BZ',
  Canada = 'CA',
  Cocos = 'CC',
  Congo_Democratic_Republic = 'CD',
  Central = 'CF',
  Congo = 'CG',
  Switzerland = 'CH',
  Côte = 'CI',
  Cook = 'CK',
  Chile = 'CL',
  Cameroon = 'CM',
  China = 'CN',
  Colombia = 'CO',
  CostaRica = 'CR',
  Cuba = 'CU',
  Cabo = 'CV',
  Curaçao = 'CW',
  Christmas_Island = 'CX',
  Cyprus = 'CY',
  Czechia = 'CZ',
  Germany = 'DE',
  Djibouti = 'DJ',
  Denmark = 'DK',
  Dominica = 'DM',
  Dominican_Republic = 'DO',
  Algeria = 'DZ',
  Ecuador = 'EC',
  Estonia = 'EE',
  Egypt = 'EG',
  Western_Sahara = 'EH',
  Eritrea = 'ER',
  Spain = 'ES',
  Ethiopia = 'ET',
  Finland = 'FI',
  Fiji = 'FJ',
  Falkland_Islands = 'FK',
  Micronesia = 'FM',
  Faroe = 'FO',
  France = 'FR',
  Gabon = 'GA',
  UnitedKingdom = 'GB',
  Grenada = 'GD',
  Georgia = 'GE',
  French_Guiana = 'GF',
  Guernsey = 'GG',
  Ghana = 'GH',
  Gibraltar = 'GI',
  Greenland = 'GL',
  Gambia = 'GM',
  Guinea = 'GN',
  Guadeloupe = 'GP',
  Equatorial = 'GQ',
  Greece = 'GR',
  South = 'GS',
  Guatemala = 'GT',
  Guam = 'GU',
  Guinea_Bissau = 'GW',
  Guyana = 'GY',
  Hong_Kong = 'HK',
  Heard = 'HM',
  Honduras = 'HN',
  Croatia = 'HR',
  Haiti = 'HT',
  Hungary = 'HU',
  Indonesia = 'ID',
  Ireland = 'IE',
  Israel = 'IL',
  Isle_Of_Man = 'IM',
  India = 'IN',
  British = 'IO',
  Iraq = 'IQ',
  Iran = 'IR',
  Iceland = 'IS',
  Italy = 'IT',
  Jersey = 'JE',
  Jamaica = 'JM',
  Jordan = 'JO',
  Japan = 'JP',
  Kenya = 'KE',
  Kyrgyzstan = 'KG',
  Cambodia = 'KH',
  Kiribati = 'KI',
  Comoros = 'KM',
  Saint_Kitts_and_Nevis = 'KN',
  Korea_Peoples_Republic_North = 'KP',
  Korea_South = 'KR',
  Kuwait = 'KW',
  Cayman = 'KY',
  Kazakhstan = 'KZ',
  Laos = 'LA',
  Lebanon = 'LB',
  Saint_Lucia = 'LC',
  Liechtenstein = 'LI',
  Sri_Lanka = 'LK',
  Liberia = 'LR',
  Lesotho = 'LS',
  Lithuania = 'LT',
  Luxembourg = 'LU',
  Latvia = 'LV',
  Libya = 'LY',
  Morocco = 'MA',
  Monaco = 'MC',
  Moldova = 'MD',
  Montenegro = 'ME',
  Saint_Martin_FR = 'MF',
  Madagascar = 'MG',
  Marshall_Islands = 'MH',
  North_Macedonia = 'MK',
  Mali = 'ML',
  Myanmar = 'MM',
  Mongolia = 'MN',
  Macao = 'MO',
  Northern = 'MP',
  Martinique = 'MQ',
  Mauritania = 'MR',
  Montserrat = 'MS',
  Malta = 'MT',
  Mauritius = 'MU',
  Maldives = 'MV',
  Malawi = 'MW',
  Mexico = 'MX',
  Malaysia = 'MY',
  Mozambique = 'MZ',
  Namibia = 'NA',
  New_Caledonia = 'NC',
  Niger = 'NE',
  Norfolk = 'NF',
  Nigeria = 'NG',
  Nicaragua = 'NI',
  Netherlands = 'NL',
  Norway = 'NO',
  Nepal = 'NP',
  Nauru = 'NR',
  Niue = 'NU',
  New_Zealand = 'NZ',
  Oman = 'OM',
  Panama = 'PA',
  Peru = 'PE',
  French_Polynesia = 'PF',
  PapuaNewGuinea = 'PG',
  Philippines = 'PH',
  Pakistan = 'PK',
  Poland = 'PL',
  Saint_Pierre_and_Miquelon = 'PM',
  Pitcairn = 'PN',
  PuertoRico = 'PR',
  Palestine = 'PS',
  Portugal = 'PT',
  Palau = 'PW',
  Paraguay = 'PY',
  Qatar = 'QA',
  Réunion = 'RE',
  Romania = 'RO',
  Serbia = 'RS',
  Russia = 'RU',
  Rwanda = 'RW',
  Saudi = 'SA',
  Solomon_Islands = 'SB',
  Seychelles = 'C,',
  Sudan = 'SD',
  Sweden = 'SE',
  Singapore = 'SG',
  Saint_Helena_Ascension_and_Tristan_da_Cunha = 'SH',
  Slovenia = 'SI',
  Svalbard = 'SJ',
  Slovakia = 'SK',
  Sierra = 'SL',
  San = 'SM',
  Senegal = 'SN',
  Somalia = 'SO',
  Suriname = 'SR',
  South_Sudan = 'SS',
  Sao_Tome_and_Principe = 'ST',
  ElSalvador = 'SV',
  Sint_Maarten_Dutch = 'SX',
  Syrian = 'SY',
  Eswatini = 'SZ',
  Turks_and_Caicos_Islands = 'TC',
  Chad = 'TD',
  French_Southern_Territories = 'TF',
  Togo = 'TG',
  Thailand = 'TH',
  Tajikistan = 'J,',
  Tokelau = 'TK',
  Timor = 'TL',
  Turkmenistan = 'M,',
  Tunisia = 'TN',
  Tonga = 'TO',
  Turkey = 'TR',
  Trinidad_and_Tobago = 'TT',
  Tuvalu = 'TV',
  Taiwan = 'TW',
  Tanzania = 'TZ',
  Ukraine = 'UA',
  Uganda = 'UG',
  United_States_Minor_Outlying_Islands = 'UM',
  United_States = 'US',
  Uruguay = 'UY',
  Uzbekistan = 'Z,',
  Holy = 'VA',
  Saint_Vincent_and_the_Grenadines = 'VC',
  Venezuela = 'VE',
  Virgin_Islands_GB = 'VG',
  Virgin_Islands_US = 'VI',
  Viet_Nam = 'VN',
  Vanuatu = 'VU',
  Wallis = 'WF',
  Samoa = 'WS',
  Yemen = 'YE',
  Mayotte = 'YT',
  South_Africa = 'ZA',
  Zambia = 'ZM',
  Zimbabwe = 'ZW'
}
