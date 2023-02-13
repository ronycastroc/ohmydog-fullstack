import styled from "styled-components";
import { CardFacts, CardFactsMobile, Logo, MainCard } from "../../components";


export const Home = () => {  
  return (
    <>
      <Logo />
      <Cards>
        <CardFactsMobile />
        <MainCard />
        <CardFacts />        
      </Cards>       
    </>
  );
};

const Cards = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  
  @media (max-width: 600px) {      
    flex-direction: column;
    }
`;




