import styled from "styled-components";
import { AdoptCard, Logo } from "../../components";

export const AdoptDog = () => {
  return (
    <>
      <Logo />
      <Wrapper>
        <AdoptCard />        
        <Dogs>
          <Dog>

          </Dog>
          <Dog>

          </Dog>
          <Dog>

          </Dog>
          <Dog>

          </Dog>
          <Dog>

          </Dog>
          <Dog>

          </Dog>
          <Dog>

          </Dog>
        </Dogs>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
display: flex;
justify-content: space-around;
`;

const Dogs = styled.div`
  width: 60vw;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  column-gap: 20px;
`;

const Dog = styled.div`
  background-color: var(--white-color);
  min-width: 270px;
  height: 45vh;
  margin-bottom: 30px;
  border-radius: 40px;
`;
