import { useContext, useEffect, useState } from "react";
import Post from './Post';
import { PostListContext } from "../providers/PostListProvider";
import { UserContext } from "../providers/UserProvider";
import { getList } from "../api/Post";
import type { PostType } from "../providers/PostListProvider";
import styled from "styled-components";


export default function PostList() {
	 // ポストリストコンテキスト、ユーザーコンテキストを使用する
  const { postList, setPostList } = useContext(PostListContext);
  const { userInfo } = useContext(UserContext);
  const { start, setStart } = useContext(PostListContext);
  const { totalCount, setTotalCount } = useContext(PostListContext);
  const [searchWord, setSearchWord] = useState("");

  // ポスト一覧を取得する関数
  const getPostList = async(keyword: string = "") => {
    const posts = await getList(userInfo.token, start, keyword);
    console.log(posts);

    // getListで取得したポスト配列をコンテキストに保存する
    let postList: Array<PostType> = [];
    if (posts && posts.records) {
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
    setTotalCount(posts.totalCount);
  }
	useEffect(() => {
    getPostList(searchWord);
  }, [start, searchWord]);


  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);
    setStart(0);
  };

	return (
    <div>
      <div>
        <span>検索</span>
        <input type="text" value={searchWord} onChange={onChangeSearch} placeholder="メッセージ検索..." />
      </div>
      <SPostList>  
        {postList.map((p) => (
          <Post key={p.id} post={p} onReload={() => getPostList(searchWord)} />
        ))}  
      </SPostList>
      <SButton disabled={start === 0} onClick={() => setStart(start - 10)}>＜</SButton>
      <span>{Math.floor(start / 10) + 1} / {Math.ceil(totalCount / 10) || 1}</span>
      <SButton disabled={start + 10 >= totalCount} onClick={() => setStart(start + 10)}>＞</SButton>
      <SButton onClick={() => getPostList(searchWord)}>更新</SButton>
    </div>
	)	
}

const SPostList = styled.div`
  margin-top: 16px;
  height: 100%;
  overflow-y: scroll;
`
const SButton = styled.button`
  background-color: #222222;
  padding: 4px;
  border-radius: 8px;
  margin-right: 2px;
  cursor: pointer;
  color: #FAFAFA;
`