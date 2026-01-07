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
      posts.records.forEach((p: any) => {
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
  padding: 8px;
`

const SSideBarRow = styled.div`
  margin-top: 4px;
  margin-bottom: 4px;
  text-align: left;
`

const SSideBarTextArea = styled.textarea`
  border-radius: 4px;
  box-shadow: inset 0 2px 4px #CCCCCC;
`

const SSideBarButton = styled.button`
  background-color: #222222;
  padding: 4px;
  border-radius: 8px;
  color: #FAFAFA;
  width: 100%;
  cursor: pointer;
`

const SUserIcon = styled.img`
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid #ddd;
`
