import styled from "styled-components";
import { Logo } from "..";
import { ColorRing } from "react-loader-spinner";

export const ComingSoon = () => {
  return (
    <>
      <Logo />

      <Wrapper>
        <h1>Coming Soon...</h1>
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={[]}
        />
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  margin: 0 auto;
  width: 50%;
  height: 35vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;

  h1 {
    font-size: 2.5rem;
    font-weight: 500;
    text-align: center;
  }
`;