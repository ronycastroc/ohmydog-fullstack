import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ohmydog from "../../assets/images/ohmydog-logo.png";

export const Logo = () => {
  const navigate = useNavigate();

  return (
    <Image onClick={() => navigate("/")}>
      <img src={ohmydog} alt="logo" />
    </Image>  
  );
};

const Image = styled.div`
  width: 200px;
  height: 140px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  margin-top: 70px;
  margin-bottom: 35px;
  cursor: pointer;
    
  img {
    width: 250px;

  }
`;
