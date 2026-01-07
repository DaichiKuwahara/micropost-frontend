import { useContext } from 'react';
import { Navigate } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import { PostListProvider } from "../providers/PostListProvider";
import { UserContext } from "../providers/UserProvider";

export default function Main() {
	const { userInfo } = useContext(UserContext);
  const loggedIn = (userInfo.token !== '');

	return (
	<PostListProvider>
		{
      loggedIn ? <MainLayout />:<Navigate replace to="/" />
    }
	</PostListProvider>
);
}