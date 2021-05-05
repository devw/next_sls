import { createAlfredAPI, getCookie } from '@utils/Global.utils'
const instance = createAlfredAPI();

/* *********************************************** */
/*              Alfred API Controller              */
/* *********************************************** */

/**
 * Sessions controller
 */

const refreshSession = async () => {
  try {
    const refreshToken = getCookie('X-Alfred-Session')
    if (!refreshToken) throw 'X-Alfred-Session not found';

    const { data, error } = await instance.get(`/refresh_session/tmp/${refreshToken}`)

    if (error) throw error;

    return data.body;

  } catch (error) {
    console.log('[API ERROR]', error);
    return false;
  }
}

const confirmSession = async (sessionToken) => {
  try {
    const { data, error } = await instance.get(`/confirm_session/tmp/${sessionToken}`);

    if (error) throw error;

    return data.body;

  } catch (error) {
    console.log('[API ERROR]', error);
    return false;
  }
}

const newServiceSession = async () => {

}


/**
 * Subscriptions controller
 */

const updateSubscription = async (contractLevel) => {
  try {
    const { data, error } = await instance.get('/update_contract/tmp', {
      params: {
        contract_level: contractLevel
      }
    });

    if (error) throw error;

    return data.body;

  } catch (error) {
    console.log('[API ERROR]', error);
    return false;
  }
}

const applyDiscount = async (discountCode) => {
  try {
    const { data, error } = await instance.get(`/apply_discount/tmp/${discountCode}`);

    if (error) throw error;

    return data.body;

  } catch (error) {
    console.log('[API ERROR]', error);
    return false;
  }
}


// Export the API
export default {
  refreshSession,
  confirmSession,
  newServiceSession,
  updateSubscription,
  applyDiscount
}