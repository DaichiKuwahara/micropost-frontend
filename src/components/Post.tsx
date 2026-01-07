import React, { useState } from 'react';
import type { ReactNode } from 'react';
import styled from "styled-components";
import { UserContext } from "../providers/UserProvider";
import { deletePost, updatePost } from "../api/Post";
import { Link } from "react-router-dom";

export default function Post(props: any) {
  const { post, onReload } = props;
  const { userInfo } = React.useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(post.content);

  const getDateStr = () => {
    const year = post.created_at.getFullYear();
    const month = post.created_at.getMonth() + 1;
    const date = post.created_at.getDate();
    const hour = post.created_at.getHours();
    const min = post.created_at.getMinutes();
    const sec = post.created_at.getSeconds();
    return `${year}年${month}月${date}日 ${hour}時${min}分${sec}秒`;
  };

  const getLines = (src: string):ReactNode => {
    return src.split('\n').map((line, index) => {
      return (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      )
    });
  }

  const onClickSave = async() => {
    await updatePost(post.id, editContent, userInfo.token);
    setIsEditing(false);
      if (onReload) {
          onReload();
        }
  }

  const onClickDelete = async() => {
    if (window.confirm("本当に削除しますか？")) {
      await deletePost(post.id, userInfo.token);
      if (onReload) {
          onReload();
        }
    }
  };

  return (
    <SPost>

      <div>
        <Link to={`/profile/${post.user_id}`}>
          <SName>{post.user_name}</SName>
        </Link>
        <SDate>{getDateStr()}</SDate>
      </div>
      
      {isEditing ?(
        <div>
          <textarea value={editContent} onChange={(e) => setEditContent(e.target.value)} rows={3} />
          <div>
          <SButton onClick={onClickSave}>保存</SButton>
          <SButton onClick={() => setIsEditing(false)}>キャンセル</SButton>
          </div>
        </div>
      ) : (
        <>
          <div>{getLines(post.content)}</div>
          {userInfo.id === post.user_id && (
            <SEditButton onClick={() => setIsEditing(true)}>編集</SEditButton>
          )}
          {userInfo.id === post.user_id && (
            <SDeleteButton onClick={()=> onClickDelete()}>削除</SDeleteButton>
          )}
        </>
      )
      }
    </SPost>
  );
}

const SPost = styled.div`
  margin: 8px 0px;
  border-bottom: 1px solid #AAAAAA;
  text-align: left;
  padding-left: 8px;
`
const SName = styled.span`
  font-size: small;
  color: #000044;
`
const SDate = styled.span`
  margin-left: 8px;
  font-size: small;
  color: #000044;
`

const SEditButton = styled.button`
  outline: none;
  padding: 2px 10px;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  margin-top: 2px;
  margin-right: 4px;
  margin-bottom: 2px;
  background-color: #39c65aff;
`;

const SDeleteButton = styled.button`
  outline: none;
  padding: 2px 10px;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  margin-top: 2px;
  margin-bottom: 2px;
  background-color: #f03f51ff;
`;

const SButton = styled.button`
  background-color: #222222;
  padding: 4px;
  border-radius: 8px;
  margin-right: 2px;
  color: #FAFAFA;
  cursor: pointer;
`