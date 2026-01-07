import axios from 'axios';
const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const sign_in = async (user_id: string, pass: string) => {
  const url = `${API_BASE}/auth?user_id=${user_id}&pass=${pass}`;
  console.log(url);
  const res = await axios.get(url);
  console.log(res);
  return res.data;
};