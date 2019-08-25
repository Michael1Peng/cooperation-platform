import {GB2260} from './identity.data';

/**
 * @fileOverview some methods to handle id's data
 */

/**
 * @description extract the location's information age birthday's information from id no.
 * @param idNo id no string
 * @return obj {
 *          addrCode string record location's information
 *          birthdayCode string record birthday's information
 *          gender a boolean record gender, true means he's a man
 *        }
 */
export function extractIdNoInfo(idNo: string) {
  const addrCode = idNo.substring(0, 6);
  const birthdayCode = idNo.substring(6, 14);
  const genderCode = parseInt(idNo.substring(14, 17), 10);
  return {
    addrCode,
    birthdayCode,
    gender: genderCode % 2 !== 0
  };
}

/**
 * @description validate the address
 * @param code code of the address on id card
 */
export function isValidAddr(code: string): boolean {
  return GB2260[code] !== undefined;
}

export function getAddrByCode(code: string) {
  const provinceStr = GB2260[code.substring(0, 2) + '0000'];
  const cityStr = GB2260[code.substring(0, 4) + '00'];
  const districtStr = GB2260[code];
  const city = cityStr.replace(provinceStr, '');
  const district = districtStr.replace(cityStr, '');
  return {
    province: provinceStr,
    city,
    district
  };
};

/**
 * @description transform the format of birthday string in "YYYYMMDD" to "YYYY-MM-DD"
 * @param code original format of birthday string
 */
export const getBirthdayByCode = (code: string) => {
  const result = code.substring(0, 4) + '-'
    + code.substring(4, 6) + '-'
    + code.substring(6, 8);
  return result;
};
