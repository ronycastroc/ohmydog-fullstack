import styled from "styled-components";
import omdLogo from "../../assets/images/ohmydog-underline.png";
import { BsInstagram, BsFacebook, BsTwitter, BsYoutube, BsGeoAlt, BsTelephone, } from "react-icons/bs";
import { IoMailOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export const Footer = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <Contact>
        <div>
          <BsGeoAlt className="icon-info" />
          <span>Cardiff, West Grove, CF24 3AN</span>
        </div>
        <div>
          <BsTelephone className="icon-info" />
          <span>+44 (29) 555-5555</span>
        </div>
        <div>
          <IoMailOutline className="icon-info" />
          <span>ohmydog@email.com</span>
        </div>
      </Contact>
      <LogoFooter>
        <img src={omdLogo} alt="" onClick={() => navigate("/")} />
        <p>&copy; Since 2023 All Rights Reserved</p>
      </LogoFooter>
      <SocialMedia>
        <h1>SOCIAL MEDIA</h1>
        <div>
          <BsInstagram className="icon" />
          <BsFacebook className="icon" />
          <BsTwitter className="icon" />
          <BsYoutube className="icon" />
        </div>
      </SocialMedia>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 150px;
  background-color: var(--dark-color);
  border-top-right-radius: 100px;
  margin-top: 50px;
  position: relative;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0px 2px 10px 5px rgba(0, 0, 0, 0.2);
`;

const LogoFooter = styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  img {
    width: 12.5vw;
    color: var(--white-color);
    cursor: pointer;
  }

  p {
    text-align: center;
    color: var(--white-color)
  }
`;

const Contact = styled.div`
  width: 20%;
  line-height: 2.2;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  

  .icon-info {
    color: var(--white-color);
    font-size: 1.3rem;
  }
  
  div {
    display: flex;    
    align-items: center;
    cursor: pointer;
  }

  span {
    margin-left: 5px;
    color: var(--white-color);
    font-size: 0.9rem;
  }
`;

const SocialMedia = styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  h1 {
    text-align: center;
    font-size: 1.4rem;
    font-weight: 500;
    color: var(--white-color);
  }

  div {
    display: flex;
    justify-content: space-evenly;
  }

  .icon {
    color: var(--white-color);
    font-size: 1.6rem;
    cursor: pointer;
  }
`;
