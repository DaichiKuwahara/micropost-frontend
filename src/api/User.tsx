import axios from "axios";
const API_BASE = import.meta.env.VITE_API_BASE_URL;

const getUser = async (user_id: number, token: string) => {
  const url = `${API_BASE}/user/${user_id}?token=${token}`;
  const res = await axios.get(url);
  return res.data;
};

const registerUser = async (name: string, email: string, password: string) => {
  const url = `${API_BASE}/user/signup`;
  const res = await axios.post(url, {
    name: name,
    email: email,
    password: password,
  });
  return res.data;
}

const getProfile = async (id: number) => {
  const url = `${API_BASE}/user/${id}/profile`;
  const res = await axios.get(url);
  return res.data;
}

const updateProfile = async (id: number, name: string, token: string, iconUrl: string) => {
  const url = `${API_BASE}/user/${id}/profile?token=${token}`;
  const res = await axios.patch(url, {
    name: name,
    icon_url: iconUrl
  });
  return res.data;
}

export { getUser, registerUser, getProfile, updateProfile };