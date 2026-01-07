import { useState, createContext } from "react";
import type { Dispatch, SetStateAction } from "react";

// ポストを保持する型を定義
export type PostType = {
  id: number;
  user_id: number;
  user_name: string;
  content: string;
  created_at: Date;
};

export const PostListContext = createContext(
  {} as {
    postList: PostType[]; // ポストの配列を保持
    setPostList: Dispatch<SetStateAction<PostType[]>>;
    start: number;
    setStart: Dispatch<SetStateAction<number>>;
    totalCount: number;
    setTotalCount: Dispatch<SetStateAction<number>>;
  },
);

export const PostListProvider = (props: any) => {
  const { children } = props;
  const [postList, setPostList] = useState<PostType[]>([]);
  const [start, setStart] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  return (
    <PostListContext.Provider value={{ postList, setPostList, start, setStart, totalCount, setTotalCount }}>
      {children}
    </PostListContext.Provider>
  );
};