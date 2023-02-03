import styled from "styled-components";
import ohmydog from "../../assets/images/ohmydog.png";

export const Logo = () => {
  return (
    <Image>
      <img src={ohmydog} alt="" />
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
  margin-top: 80px;
  margin-bottom: 20px;
  
  img {
    width: 200px;
  }
`;
