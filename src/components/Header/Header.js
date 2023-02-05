import styled from "styled-components";

export const Header = () => {
  return (
    <Wrapper>
      <div>
        <h2>AdoptDog</h2>
      </div>
      <div>
        <h2>PostsMyDog</h2>
      </div>
      <div>
        <h2>Be a Supporter</h2>
      </div>
      <div>
        <h2>Stories</h2>
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
  z-index: 1;
  opacity: 0.95;

  h2 {
    color: var(--white-color);
    font-size: 1.1rem;
    font-weight: 500;
  }
`;