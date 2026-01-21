import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/User";
import styled from "styled-components";

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleRegister= async () => {
    try {
      await registerUser(name, email, password);
      alert('ユーザー登録が完了しました')
      navigate('/');
    } catch (err: any) {
      const message = err.response?.data?.message || 'ユーザー登録に失敗しました';
      alert(message);
    }
  }

  const onClickBack = () => navigate('/');

  return (
    <div>
      <div>
        <SButton onClick={onClickBack}>ログイン画面へ戻る</SButton>
      </div>
      <input placeholder="名前" onChange={(e) => setName(e.target.value)} />
      <input placeholder="メール" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="パスワード" onChange={(e) => setPassword(e.target.value)} />
      <SButton onClick={handleRegister}>登録</SButton>
    </div>
  );

}


const SButton = styled.button`
  background-color: #222222ff;
  padding: 0.25rem;
  border-radius: 0.5rem;
  margin-right: 0.125rem;
  cursor: pointer;
  color: #FAFAFA;
`