import { useEffect, useState } from "react";
import styled from "styled-components";
import { getDogPic } from "../../services/getDogPic";

export const CardFacts = () => {
  const [dogPic, setDogPic] = useState();
  
  useEffect(() => {
    const fetchData = async () => {
      try {      
        const response = await getDogPic();
  
        setDogPic(response.message);
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
          const response = await getDogPic();
    
          setDogPic(response.message);
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
      <h1>Você Sabia?</h1>
      <img src={dogPic} alt="" />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: var(--white-color);
  width: 40vw;
  min-height: 230px;
  border-radius: 40px;
  position: relative;

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
  }

  img {
    width: 300px;
    height: 330px;
    object-fit: cover;
    border-radius: 40px;
    position: absolute;
    top: 20px;
    right: 20px;
  }
`;
