import { useState, createContext } from "react";
import type { Dispatch, SetStateAction } from "react";

// 保持する情報の型
type UserInfo = {
  id: number;
  token: string;
  name: string;
  email: string;
  icon_url: string;
};

// UserContextの作成
// UserContextには ProviderとConsumerの二つのフィールドが含まれる
export const UserContext = createContext(
  {} as {
    userInfo: UserInfo;
    setUserInfo: Dispatch<SetStateAction<UserInfo>>;
  },
);

// UserProviderの定義
export const UserProvider = (props: any) => {
  const { children } = props;
  // UserInfoを保持する変数と更新関数の作成
  const [userInfo, setUserInfo] = useState<UserInfo>({ id: 0, token: "", name: "", email: "", icon_url: "" });
  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};