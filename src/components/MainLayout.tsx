import styled from "styled-components";
import Header from "./Header";
import SideBar from "./SideBar";
import Contents from "./Contents";

export default function MainLayout() {
  return (
    <>
      <SHeader>
        <Header></Header>
      </SHeader>
      <SBody>
        <SSideBar>
          <SideBar></SideBar>
        </SSideBar>
        <SContents>
          <Contents></Contents>
        </SContents>
      </SBody>
    </>
  );
}

const SHeader = styled.div`
  width: 100%;
  height: 2rem;
  box-shadow: 0rem 0.25rem 0.25rem #AAAAAA;
`;

const SBody = styled.div`
  width: 100%;
  height: calc(100vh - 2rem);
  display: flex;
  flex-direction: row;
`;

const SSideBar = styled.div`
  border-right: 0.0625rem solid #222222;
  width: 30%;
  height: 100%;
`;

const SContents = styled.div`
  width: 100%;
  height: 100%;
`;