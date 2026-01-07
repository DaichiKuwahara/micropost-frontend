import axios from 'axios';
const API_BASE = import.meta.env.VITE_API_BASE_URL;

const post = async (user_id: string, token: string, msg: string) => {
  const data = {
    message: msg
  };
  const url = `${API_BASE}/post?user_id=${user_id}&token=${token}`;
  const res = await axios.post(url, data);
  console.log(res);
}

const getList = async (token: string, start: number, keyword: string = "") => {
  const url = `${API_BASE}/post?token=${token}&records=10&start=${start}&keyword=${keyword}`;
  const res = await axios.get(url);
  return res.data;
};

const deletePost = async (id: number, token: string) => {
  const url = `${API_BASE}/post/${id}?token=${token}`;
  const res = await axios.delete(url);
  return res.data;
}

const updatePost = async (id: number, msg: string, token: string,) => {
  const url = `${API_BASE}/post/${id}?token=${token}`;
  const data = {
    message: msg,
  };
  const res = await axios.patch(url, data);
  return res.data;
}

export { post, getList, deletePost, updatePost };