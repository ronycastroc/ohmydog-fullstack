import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import UserContext from "../../contexts/UserContext";
import omdhome from "../../assets/images/logo-home.png";
import { AiOutlineMenu } from "react-icons/ai";

export const Header = () => {
  const { showLogout, setShowLogout } = useContext(UserContext);

  const auth = JSON.parse(localStorage.getItem("token"));
  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();

  const logout = () => {
    setShowLogout(false);
    localStorage.clear();
    navigate("/");
  };

  return (
    <Wrapper>
      <LogoHome onClick={() => navigate("/")}>
        <img src={omdhome} alt="" />
      </LogoHome>
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
        {auth ?
          (<p onClick={() => setShowLogout(!showLogout)}>Hello, {user?.name} </p>) :
          (<Link to="/auth/sign-in">
            Login
          </Link>)}
      </div>

      <LogoutBar showLogout={showLogout} onClick={logout}>
        <p>Logout</p>
      </LogoutBar>
      
      <Icon>
        <AiOutlineMenu onClick={() => setShowLogout(!showLogout)} className="icon-menu"/>
      </Icon>      
    </Wrapper>
  );
};

const Icon = styled.div`
  position: absolute;
  right: 5px;
  display: none;
  
  @media (max-width: 600px) {
      display: initial;
    }

  .icon-menu {
    color: var(--white-color);
    font-size: 1.6rem;
  }
`;

const Wrapper = styled.div`
  padding-left: 40px;
  width: 100%;
  height: 45px;
  background-color: var(--dark-color);
  border-bottom-left-radius: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 4;
  opacity: 0.9;

  a {
    color: var(--white-color);
    font-size: 1.1rem;
    font-weight: 500;
    text-decoration: none;
    transition: all linear .2s;
    @media (max-width: 600px) {
      display: none;
    }

    &:hover {
      text-shadow: 0px 0px 20px #C7B2F4;
    }
  }

  p {
    color: var(--button-color);
    font-size: 1.1rem;
    font-weight: 500;
    cursor: pointer;
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translate(0, -50%);
    transition: all linear .2s;
    
    @media (max-width: 600px) {
      display: none;
    }

    &:hover {
      text-shadow: 0px 0px 20px #C7B2F4;
    }
  }
`;

const LogoHome = styled.div`
position: absolute;
left: 30px;
cursor: pointer;
  img {
    width: 45px;
  }
`;

const LogoutBar = styled.div`
  width: 120px;
  height: 45px;
  background-color: var(--dark-color);
  top: 45px;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom-left-radius: 50px;
  position: fixed;
  transition: all ease .5s;
  transform: ${(props) => (props.showLogout ? "translateX(0)" : "translateX(150px)")};    
  cursor: pointer;
  z-index: 3;

  @media (max-width: 600px) {
      display: none;
      z-index: -1;
    }

  p {
    color: var(--white-color);
  }
`;