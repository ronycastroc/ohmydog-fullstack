import { useEffect, useState } from "react";
import styled from "styled-components";
import { getDogFact, getDogPic } from "../../services";


export const CardFactsMobile = () => {
  const [dogPic, setDogPic] = useState();
  const [dogFact, setDogFact] = useState();

  const getPicsFacts = async () => {
    try {      
      const pictures = await getDogPic();
      const facts = await getDogFact();

      setDogPic(pictures.message);
      setDogFact(facts.facts[0]);        
    } catch (error) {
      console.log(error.message);
    }
  };
    
  useEffect(() => {
    getPicsFacts();
    const intervalId = setInterval(() => {
      getPicsFacts();
    }, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <Wrapper>
      <img src={dogPic} alt="dog-picture" />
      <h1>Did you know?</h1>
      <p>{dogFact}</p>
    </Wrapper>
  );
};


const Wrapper = styled.div`
  background-color: var(--button-color);
  width: 90%;
  max-height: 100%;
  border-radius: 10px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 2px 10px 5px rgba(0, 0, 0, 0.2);
  display: none;

  @media (max-width: 600px) {
    display: initial;
  }

  h1 {
    font-weight: 700;
    font-size: 1.2rem;
    padding-top: 20px;
    padding-left: 20px;
    color: var(--back-color);
  }

  p {
    padding: 15px 20px;
    color: var(--black-color);
    font-size: 1.1rem;
  }

  img {
    width: 90%;
    height: 45vh;
    object-fit: cover;
    border-radius: 10px;
    margin: 0 auto;
    margin-top: 20px;
    display: flex;
  }
`;
