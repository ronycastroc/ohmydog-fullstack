import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import UserContext from "../../contexts/UserContext";
import { ImExit } from "react-icons/im";

export const MenuMobile = () => {
  const { showLogout, setShowLogout } = useContext(UserContext);

  const auth = JSON.parse(localStorage.getItem("token"));
  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();

  const logout = () => {
    setShowLogout(false);
    localStorage.clear();
    navigate("/");
  };

  const login = () => {
    setShowLogout(false);
    navigate("/auth/sign-in");
  };


  return (
    <Wrapper showLogout={showLogout}>
      <div className="div-user" >
        {auth ?
          (<>
            <h1 onClick={logout}>Hello, {user?.name}</h1>
            <ImExit className="icon" />
          </>) :
          (<p onClick={login}>
            Login
          </p>)}
      </div>
      <div>
        <p onClick={() => {
          setShowLogout(false);
          navigate("/adopt-dog");
        }}>
          AdoptDog
        </p>
      </div>
      <div>
        <p onClick={() => {
          setShowLogout(false);
          navigate("/posts-mydog");
        }}>
          PostsMyDog
        </p>
      </div>
      <div>
        <p onClick={() => {
          setShowLogout(false);
          navigate("/be-a-supporter");
        }}>
          Be a Supporter
        </p>
      </div>
      <div>
        <p onClick={() => {
          setShowLogout(false);
          navigate("/stories");
        }}>
          Stories
        </p>
      </div>
    </Wrapper >
  );
};

const Wrapper = styled.div`
  width: 60%;
  height: 50vh;
  background-color: var(--black-color);
  position: fixed;
  top: 45px;
  right: 0;
  z-index: 3;
  opacity: 0.9;
  border-bottom-left-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding-top: 10px;
  transition: all ease .5s;
  transform: ${(props) => (props.showLogout ? "translateX(0)" : "translateX(400px)")};
  display: none ;

  @media (max-width: 600px) {
      display: initial;
    }

  .div-user {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  h1 {
    color: var(--button-color);
    font-size: 1rem;
    font-weight: 500;
    transition: all linear .2s;

    &:hover {
      text-shadow: 0px 0px 20px #C7B2F4;
    }
  }

  .icon {
    color: var(--button-color);
    font-size: 1.2rem;
    margin-left: 10px;
  }

  p {
    color: var(--white-color);
    font-size: 1rem;
    font-weight: 700;
    text-decoration: none;
    transition: all linear .2s;

    &:hover {
      text-shadow: 0px 0px 20px #C7B2F4;
    }
  }  

  div {
    display: flex;
    justify-content: center;
    line-height: 3;
  }
`;