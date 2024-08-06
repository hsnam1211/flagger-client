import axios from '@/services/axios';
import { defineStore } from 'pinia';
import { useAxios } from '@vueuse/integrations/useAxios';
// import { useUserStore } from './users'

export const useChannelStoreTest = defineStore('channelsTest', {
  state: () => ({
    userChannelList: [],
    selectedChannel: {},
    targetChannel: {},
  }),
  actions: {
    async getUserChannels(uid) {
      const config = {
        method: 'GET',
        // url: `/stylemates/users/${uid}/channels`
        url: 'https://qa-app-api-stylemate.mediance.co.kr/230901/channel',
      };
      const result = await useAxios(config.url, config, axios);
      this.userChannelList = result;
    },
    async setSelectedChannel(channel) {
      this.selectedChannel = channel;
    },
    async setTargetChannel(channel) {
      this.targetChannel = channel;
    },
    async approveRequest({ userId, channelId, state }) {
      const config = {
        method: 'PUT',
        // url: `/stylemates/users/${userId}/channels/${channelId}/approve-request`,
        url: `https://qa-app-api-stylemate.mediance.co.kr/230901/channel/${channelId}/status/request`,
        // data: {
        //   stylemateStatus: state
        // }
      };
      return await useAxios(config.url, config, axios);
    },
    async getLongToken(token) {
      const config = {
        method: 'GET',
        // url: '/commons/instagram-token',
        url: 'https://qa-app-api-stylemate.mediance.co.kr/230901/instagram/long-token',
        params: {
          token,
        },
      };
      const result = await useAxios(config.url, config, axios);
      return result.response.value;
    },
    async getPageIds(token) {
      const config = {
        method: 'GET',
        url: 'https://graph.facebook.com/v14.0/me/accounts',
        params: {
          access_token: token,
        },
      };
      const result = await useAxios(config.url, config, axios);
      return result.response.value;
    },
    async getInstagramBusinessIdCheck({ pageId, token }) {
      const config = {
        method: 'GET',
        url: `https://graph.facebook.com/v14.0/${pageId}`,
        params: {
          access_token: token,
          fields: 'instagram_business_account',
        },
      };
      const result = await useAxios(config.url, config, axios);
      return result.response.value;
    },
    async getInstagramInfo({ token, igUserId }) {
      const config = {
        method: 'GET',
        url: `https://graph.facebook.com/v14.0/${igUserId}`,
        params: {
          access_token: token,
          fields:
            'biography,id,ig_id,followers_count,follows_count,media_count,name,profile_picture_url,username,website',
        },
      };
      const result = await useAxios(config.url, config, axios);
      return result.response.value;
    },
    async getInstagramMedia({ token, fbId, limit, after }) {
      const config = {
        method: 'GET',
        url: `https://graph.facebook.com/v14.0/${fbId}/media`,
        params: {
          access_token: token,
          limit,
          after,
        },
      };
      const result = await useAxios(config.url, config, axios);
      return result;
    },
    async getInstagramMediaDetail({ token, mediaId }) {
      const config = {
        method: 'GET',
        url: `https://graph.facebook.com/v14.0/${mediaId}`,
        params: {
          fields:
            'caption,comments_count,id,ig_id,is_comment_enabled,like_count,media_product_type,media_type,media_url,owner,permalink,shortcode,thumbnail_url,timestamp,username,video_title',
          access_token: token,
        },
      };
      const result = await useAxios(config.url, config, axios);
      return result;
    },
    async getDebugToken(tokenData) {
      const config = {
        method: 'GET',
        url: 'https://graph.facebook.com/v14.0/me/accounts',
        params: tokenData,
      };
      const result = await useAxios(config.url, config, axios);
      return result;
    },
    async getMe(tokenData) {
      const config = {
        method: 'GET',
        url: 'https://graph.facebook.com/v14.0/me',
        params: {
          fields: 'id, name',
          access_token: tokenData,
        },
      };
      const result = await useAxios(config.url, config, axios);
      return result;
    },
    async setInstagramChannel({ data, channel }) {
      // const uid = useUserStore().uid
      // const addUrl = channel ? `/${channel}` : ''
      const config = {
        // method: channel ? 'PUT' : 'POST',
        method: 'POST',
        // url: `/users/${uid}/instagram-channel${addUrl}`,
        url: 'https://qa-app-api-stylemate.mediance.co.kr/230901/channel/instagram',
        data,
      };
      const result = await useAxios(config.url, config, axios);
      return result;
    },
    // 회원 채널 토큰 갱신
    async setChannelToken({ channelId, data, type }) {
      // const uid = useUserStore().uid
      const config = {
        // method: 'PATCH',
        // url: `/users/${uid}/channels/${channelId}/${type}-renewal-token`,
        method: 'PUT',
        url: `https://qa-app-api-stylemate.mediance.co.kr/230901/channel/${channelId}/instagram/token`,
        data,
      };
      const result = await useAxios(config.url, config, axios);
      return result;
    },
    async removeChannel(channel) {
      // const uid = useUserStore().uid
      const config = {
        method: 'DELETE',
        // url: `/stylemates/users/${uid}/channels/${channel}`
        url: `https://qa-app-api-stylemate.mediance.co.kr/230901/channel/${channel}`,
      };

      const result = await useAxios(config.url, config, axios);
      return result;
    },
    async getTiktokToken(data) {
      // const config = {
      //   method: 'POST',
      //   url: 'http://192.168.0.95:8000/api/v1/get_api',
      //   data
      // }
      // const result = await useAxios(config.url, config, axios)
      // return result
      const result = await axios({
        method: 'post',
        url: '//192.168.0.95:8080/api/v1/get_api',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:5173',
          'Access-Control-Allow-Credentials': 'true',
        },
        data,
      });
      return result;
    },
  },
});
