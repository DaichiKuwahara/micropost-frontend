import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../providers/UserProvider";
import { getProfile, updateProfile } from "../api/User";
import axios from 'axios';
import styled from "styled-components";

export default function Profile() {
  const {id} = useParams<{id: string}>();
  const [user, setUser] = useState({id: 0, name: "", icon_url: ""});
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [editIconUrl, setEditIconUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const {userInfo, setUserInfo} = useContext(UserContext)
  

  useEffect(() => {
    if (id) {
      getProfile(Number(id))
        .then((data) => {
          setUser(data);
          setEditName(data.name);
          setEditIconUrl(data.icon_url || '');
        })
        .catch(() => alert('ユーザーが見つかりません'));
    }
  }, []);


  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    setEditIconUrl(URL.createObjectURL(file));
  };


  const handleSave = async () => {
    if (user.id === 0) return;
    try {
      let finalUrl = editIconUrl;

      if (selectedFile) {
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_PRESET);

        const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;  
        const res = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          formData
        );
        finalUrl = res.data.secure_url;
      }

      await updateProfile(Number(id), editName, userInfo.token, finalUrl);
      setUserInfo({
        ...userInfo,
        name: editName,
        icon_url: finalUrl
      });
      setUser({ ...user, name: editName, icon_url: finalUrl });
      setEditIconUrl(finalUrl)
      setIsEditing(false);
      setSelectedFile(null);
      alert('変更が完了しました');
    } catch (err) {
      alert('変更に失敗しました');
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditName(user.name);
    setEditIconUrl(user.icon_url || '');
    setSelectedFile(null);
  };


  return (
    <div>
      <Link to="/main">
        <SButton>← 投稿一覧（メイン）に戻る</SButton>
      </Link>
      <h1>プロフィール</h1>
      <SUserIcon 
        src={isEditing ? (editIconUrl || "/default-icon.png") : (user.icon_url || "/default-icon.png")} 
        alt="icon" 
      />
      {isEditing ? (
        <div>
          <div>
            <label>アイコンを変更：</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>
          <div>
            <label>名前を変更：</label>
            <input 
              value={editName} 
              onChange={(e) => setEditName(e.target.value)} 
            />
          </div>
          <SButton onClick={handleSave}>保存</SButton>
          <SButton onClick={handleCancel}>キャンセル</SButton>
        </div>
      ) : (
        <div>
          <p>名前: {user.name}</p>
          {userInfo.id === user.id && (
            <SButton onClick={() => setIsEditing(true)}>編集する</SButton>
          )}
        </div>
      )}
    </div>
  );
}


const SUserIcon = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid #ddd;
`
const SButton = styled.button`
  background-color: #222222;
  padding: 4px;
  border-radius: 8px;
  margin-right: 2px;
  cursor: pointer;
  color: #FAFAFA;
`