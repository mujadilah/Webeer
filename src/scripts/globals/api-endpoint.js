import CONFIG from './config';

const API_ENDPOINT = {
  DISCUSSION: `${CONFIG.BASE_URL}/discussions/`,
  DISCUSSION_SEARCH: (keyword) => `${CONFIG.BASE_URL}/discussions?${keyword}`,
  DISCUSSION_DETAIL: (id) => `${CONFIG.BASE_URL}/discussions/${id}`,
  DISCUSSION_USER: `${CONFIG.BASE_URL}/discussions/user`,
  DISCUSSION_REPLY: (id) => `${CONFIG.BASE_URL}/discussions/reply/${id}`,
  DISCUSSION_CATEGORY: `${CONFIG.BASE_URL}/discussionscategory`,
  DISCUSSION_DELETE: (id) => `${CONFIG.BASE_URL}/discussions/${id}`,
  DISCUSSION_REPLY_GET: `${CONFIG.BASE_URL}/discussionsreply`,
  JOB_ITEM: `${CONFIG.BASE_URL}/jobs/all`,
  JOB_DETAIL: (_id) => `${CONFIG.BASE_URL}/jobs/detail/${_id}`,
  JOB_SEARCH: (keyword) => `${CONFIG.BASE_URL}/jobs?profession=${keyword}`,
  GET_JOB: `${CONFIG.BASE_URL}/jobs/company`,
  JOB_DELETE: (id) => `${CONFIG.BASE_URL}/jobs/${id}`,
  JOB_ADD: `${CONFIG.BASE_URL}/jobs`,
  JOB_EDIT: (id) => `${CONFIG.BASE_URL}/jobs/${id}`,
  REGISTER: `${CONFIG.BASE_URL}/users/register`,
  LOGIN: `${CONFIG.BASE_URL}/users/login`,
  USER: `${CONFIG.BASE_URL}/users`,
  LOGOUT: `${CONFIG.BASE_URL}/users/logout`,
  VERIFICATION: `${CONFIG.BASE_URL}/users/verifikasiOTP`,
  RESEND: `${CONFIG.BASE_URL}/users/resendOTP`,
  EDIT: (_id) => `${CONFIG.BASE_URL}/users/edit/${_id}`,
  USER_DETAIL: (_id) => `${CONFIG.BASE_URL}/users/${_id}`,
  USER_DISCUSSION_DETAIL: (_id) => `${CONFIG.BASE_URL}/discussions/user/${_id}`,
  USER_CHANGEPWD: (_id) => `${CONFIG.BASE_URL}/users/changepwd/${_id}`,
};
export default API_ENDPOINT;