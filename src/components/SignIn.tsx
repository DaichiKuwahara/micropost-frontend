import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../providers/UserProvider";
import { sign_in } from "../api/Auth";

export default function SignIn() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [pass, setPass] = useState("");
  const { setUserInfo } = useContext(UserContext);

  const onSignInClick = async () => {
    try {
      const ret = await sign_in(userId, pass);
      if (ret && ret.token) {
        console.log(`Sign in success. ${ret.user_id}, ${ret.token}`);
        setUserInfo({
          id: ret.user_id,
          token: ret.token,
          name: ret.name,
          email: ret.umail,
          icon_url: ret.icon_url || ""
        });
        navigate("/main");
      }
    } catch (err: any) {
      console.log(err.response)
      const message = 'IDまたはパスワードが正しくありません'
      alert(message)
    }
  };

  const onClickSignUp = () => navigate("/signup");
  return (
    <SSignInFrame>
      <SSignInRow>
        <SSignInLabel>
          <label htmlFor="id">ID</label>
        </SSignInLabel>
        <SSignInInput>
          <input
            id="id"
            value={userId}
            type="text"
            onChange={(evt) => setUserId(evt.target.value)}
          />
        </SSignInInput>
      </SSignInRow>
      <SSignInRow>
        <SSignInLabel>
          <label htmlFor="password">Password</label>
        </SSignInLabel>
        <SSignInInput>
          <input
            id="password"
            value={pass}
            type="password"
            onChange={(evt) => setPass(evt.target.value)}
          />
        </SSignInInput>
      </SSignInRow>
      <SSignInRow>
        <SLoginButton type="button" onClick={onSignInClick}>
          Login
        </SLoginButton>
      </SSignInRow>
      <SSignUp onClick={onClickSignUp}>新規登録はこちらから</SSignUp>
    </SSignInFrame>
  );
}

const SSignInFrame = styled.div`
  background-color: #f8f8f8;
  margin: 80px;
  padding-top: 8px;
  padding-bottom: 8px;
  border-radius: 8px;
  box-shadow: 0 8px 8px #aaaaaa;
  text-align: center
`;

const SSignInRow = styled.div`
  display: inline-block;
  width: 100%;
  margin-top: 4px;
  margin-bottom: 4px;
`;

const SSignInLabel = styled.span`
  display: inline-block;
  width: 25%;
  vertical-align: top;
  text-align: right;
  margin-right: 4px;
`;

const SSignInInput = styled.span`
  display: inline-block;
  width: auto;
  vertical-align: top;
  margin-left: 4px;
`;

const SLoginButton = styled.button`
  background-color: #444444;
  color: #f0f0f0;
  padding: 4px 16px;
  border-radius: 8px;
  cursor: pointer;
`;

const SSignUp = styled.div`
  cursor: pointer;
  color: #0000ee;
  text-decoration: underline;
  font-size: 0.8rem;
  &:hover {
    color: #0000aa;
  }
`