import { useEffect, useState } from "react";
import styled from "styled-components";
import { getDogFact, getDogPic } from "../../services";


export const CardFacts = () => {
  const [dogPic, setDogPic] = useState();
  const [dogFact, setDogFact] = useState();
  
  useEffect(() => {
    const fetchData = async () => {
      try {      
        const pictures = await getDogPic();
        const facts = await getDogFact();
  
        setDogPic(pictures.message);
        setDogFact(facts.facts[0]);        
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();    
  }, []);
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      const fetchData = async () => {
        try {      
          const pictures = await getDogPic();
          const facts = await getDogFact();
  
          setDogPic(pictures.message);
          setDogFact(facts.facts[0]);   
        } catch (error) {
          console.log(error.message);
        }
      };
      fetchData();    
    }, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <Wrapper>
      <img src={dogPic} alt="" />
      <h1>Did you know?</h1>
      <p>{dogFact}</p>
    </Wrapper>
  );
};


const Wrapper = styled.div`
  background-color: var(--white-color);
  width: 25vw;
  min-height: 50vh;
  border-radius: 40px;
  display: flex;
  flex-direction: column;

  h1 {
    font-weight: 700;
    font-size: 1.2rem;
    padding-top: 20px;
    padding-left: 20px;
    color: var(--dark-color);
  }

  p {
    padding: 15px 20px;
    color: var(--dark-color);
    font-size: 1.1rem;
  }

  img {
    width: 80%;
    height: 50%;
    object-fit: cover;
    border-radius: 40px;
    margin: 0 auto;
    margin-top: 20px;    
  }
`;
