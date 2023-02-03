import styled from "styled-components";

export const Header = () => {
  return (
    <Wrapper>
      <div>
        <h2>AdoteDog</h2>
      </div>
      <div>
        <h2>PostsMyDog</h2>
      </div>
      <div>
        <h2>Seja um Apoiador</h2>
      </div>
      <div>
        <h2>Histórias</h2>
      </div>
      <div>
        <h2>Login</h2>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  height: 60px;
  background-color: var(--dark-color);
  border-bottom-left-radius: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;

  div {
    
  }

  h2 {
    color: var(--white-color);
    font-size: 1.1rem;
    font-weight: 500;
  }
`;