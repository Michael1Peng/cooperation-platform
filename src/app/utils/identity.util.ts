import {GB2260} from './identity.data';

/**
 * @fileOverview some methods to handle id's data
 */

/**
 * @description extract the location's information age birthday's information from id no.
 * @param id id no string
 * @return obj {
 *          addrCode string record location's information
 *          birthdayCode string record birthday's information
 *        }
 */
export const extractIdNoInfo = (id: string) => {
  const addrCode = id.substring(0, 6);
  const birthdayCode = id.substring(6, 14);
  return {
    addrCode,
    birthdayCode
  };
};
