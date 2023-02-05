import styled from "styled-components";
import { CardFacts, Logo, MainCard } from "../../components";


export const Home = () => {  
  return (
    <>
      <Logo />
      <Cards>
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
`;




