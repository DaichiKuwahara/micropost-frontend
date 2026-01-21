import { useState, useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../providers/UserProvider"; 
import { PostListContext } from "../providers/PostListProvider";
import type { PostType } from "../providers/PostListProvider";
import { post, getList} from "../api/Post";

export default function SideBar() {
  const [msg, setMsg] = useState("");
	const { userInfo } = useContext(UserContext);
	const { setPostList } = useContext(PostListContext);
  const { start, setStart } = useContext(PostListContext);
  const { setTotalCount } = useContext(PostListContext);

	const getPostList = async () => {
    const posts = await getList(userInfo.token, start);
    console.log(posts);
    let postList: Array<PostType> = [];
    if (posts && posts.records) {
      console.log(posts);
      posts.records.forEach((p: PostType) => {
        postList.push({
          id: p.id,
          user_id: p.user_id,
          user_name: p.user_name,
          content: p.content,
          created_at: new Date(p.created_at),
        });
      });
    }
    setPostList(postList);
    setTotalCount(posts.totalCount)
  };

	const onSendClick = async() => {
		await post(String(userInfo.id), userInfo.token, msg)
		setMsg("");
    setStart(0);
    await getPostList();
	}

  return (
    <SSideBar>
      <SSideBarRow>
        <SUserIcon 
          src={userInfo.icon_url || "/default-icon.png"} 
          alt="my-icon"
        />
    </SSideBarRow>
      <SSideBarRow>{userInfo.name}</SSideBarRow>
      <SSideBarRow>{userInfo.email}</SSideBarRow>
      <SSideBarRow>
        <SSideBarTextArea
          rows={4}
          value={msg}
          onChange={(evt) => setMsg(evt.target.value)}
        ></SSideBarTextArea>
      </SSideBarRow>
      <SSideBarRow>
        <SSideBarButton onClick={onSendClick}>送信</SSideBarButton>
      </SSideBarRow>
    </SSideBar>
  );
}

const SSideBar = styled.div`
  padding: 0.5rem;
`

const SSideBarRow = styled.div`
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
  text-align: left;
`

const SSideBarTextArea = styled.textarea`
  border-radius: 0.25rem;
  box-shadow: inset 0 0.125rem 0.25rem #CCCCCC;
`

const SSideBarButton = styled.button`
  background-color: #222222;
  padding: 0.25rem;
  border-radius: 0.5rem;
  color: #FAFAFA;
  width: 100%;
  cursor: pointer;
`

const SUserIcon = styled.img`
  height: 2.5rem;
  width: 2.5rem;
  border-radius: 50%;
  object-fit: cover;
  border: 0.0625rem solid #ddd;
`
