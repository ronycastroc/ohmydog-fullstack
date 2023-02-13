import { useEffect, useState } from "react";
import styled from "styled-components";
import { getDogFact, getDogPic } from "../../services";
import { ColorRing } from "react-loader-spinner";


export const CardFacts = () => {
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
      {dogPic === undefined ? (
        <div>
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={[]}
          />
        </div>) 
        :
        (<img src={dogPic} alt="dog-picture" />)}
      <h1>Did you know?</h1>
      <p>{dogFact}</p>
    </Wrapper>
  );
};


const Wrapper = styled.div`
  background-color: var(--button-color);
  width: 25vw;
  max-height: 100%;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  right: 50px;
  box-shadow: 0px 2px 10px 5px rgba(0, 0, 0, 0.2);
  padding-bottom: 10px;
  
  div {
    width: 22vw;
    height: 45vh;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
  }

  @media (max-width: 600px) {
    display: none;
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
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px grey; 
      border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb {
      background: var(--black-color);  
      border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: #333333; 
    }
  }

  img {
    width: 22vw;
    height: 45vh;
    object-fit: cover;
    border-radius: 10px;
    margin: 0 auto;
    margin-top: 20px;

    @media (max-width: 600px) {
      width: 90% ;
    }    
  }
`;
