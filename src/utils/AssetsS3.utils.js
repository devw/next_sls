import axios from 'axios';

let instanceParams = {
  baseURL: process.env.CDN,
  headers: {}
}

const instance = axios.create(instanceParams);

const getGlobalAnnouncements = async () => {
  try {
    const { data, error } = await instance.get(`/announcements/global.json`);

    if (error) throw error;

    return data || [];

  } catch (error) {
    console.log('[API ERROR]', error);
    return false;
  }
}

const getLocalAnnouncements = async () => {
  try {
    const { data, error } = await instance.get(`/announcements/${process.env.APP_ID}.json`);

    if (error) throw error;

    return data || [];

  } catch (error) {
    console.log('[API ERROR]', error);
    return false;
  }
}

const getRecommendations = async () => {
  try {
    const { data, error } = await instance.get(`/recommendations.json`);

    if (error) throw error;

    return data || [];

  } catch (error) {
    console.log('[API ERROR]', error);
    return false;
  }
}

export default {
  getGlobalAnnouncements,
  getLocalAnnouncements,
  getRecommendations
}