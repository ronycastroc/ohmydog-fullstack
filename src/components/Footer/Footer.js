import styled from "styled-components";
import omdLogo from "../../assets/images/ohmydog-underline.png";
import { BsInstagram, BsFacebook, BsTwitter, BsYoutube } from "react-icons/bs";
import { IconContext } from "react-icons";
import { useNavigate } from "react-router-dom";

export const Footer = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <SocialMedia>
        <img src={omdLogo} alt="" onClick={() => { navigate("/"); }}/>
        <IconContext.Provider value={{
          color: "var(--white-color)",
          className: "global-class-name",
          size: "1.6vw",
        }}>
          <div>
            <BsInstagram style={{cursor:"pointer"}}/>
            <BsFacebook style={{cursor:"pointer"}}/>
            <BsTwitter style={{cursor:"pointer"}}/>
            <BsYoutube style={{cursor:"pointer"}}/>
          </div>
        </IconContext.Provider>
        
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
`;

const SocialMedia = styled.div`
  width: 13%;
  height: 75%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  img {
    width: 12.5vw;
    color: var(--white-color);
    cursor: pointer;
  }

  div {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
  }
`;
