import { Link } from "react-router-dom";
import styled from "styled-components";

export const Header = () => {
  return (
    <Wrapper>
      <div>
        <Link to="/adopt-dog">
          AdoptDog
        </Link>
        <h2></h2>
      </div>
      <div>
        <Link to="/posts-mydog">
          PostsMyDog
        </Link>
      </div>
      <div>
        <Link to="/be-a-supporter">
          Be a Supporter
        </Link>
      </div>
      <div>
        <Link to="/stories">
          Stories
        </Link>
      </div>
      <div>
        <Link to="/sign-up">
          Login
        </Link>
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

  a {
    color: var(--white-color);
    font-size: 1.1rem;
    font-weight: 500;
    text-decoration: none;
  }
`;