import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Button, Logo } from "../../components";
import { getDogById } from "../../services";

export const DogPage = () => {
  const [dog, setDog] = useState({});
  const { dogId } = useParams();

  const getDogByIdFunc = async () => {
    try {
      const dogById = await getDogById(dogId);

      setDog(dogById);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDogByIdFunc();
  }, []);

  return (
    <>
      <Logo />
      <Wrapper>
        <DogForm>
          <h1>Adoption Form</h1>
          <img src={dog.urlImage} alt="" />
          <div><span className="title">Name: </span><span>{dog.name}</span></div>
          <div><span className="title">Age: </span><span>{dog.age}</span></div> 
          <div><span className="title">Genre: </span><span>{dog.genre}</span></div>

          <Form>
            <input type="text" name="name" placeholder="Full Name" required/>
            <input type="text" name="bithday" placeholder="Birthday" onChange={(e) => console.log(e.target.value)}
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => (e.target.type = "text")} required/>
            <input type="number" name="cell phone" placeholder="Phone Number" required/>
            <input type="text" name="profession" placeholder="Profession" required/>

            <h1>Why do you want to adopt an dog?</h1>
            <textarea type="text" name="why" className="why-adopt" required/>

            <h1>In case of travel, where will you leave the adopted dog?</h1>
            <textarea type="text" name="why" className="why-adopt" required/>

            <div>
              <Button>
                Send Form
              </Button>
            </div>
          </Form>         
        </DogForm>
      </Wrapper>
      
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

const DogForm = styled.div`
  background-color: var(--white-color);
  width: 50vw;
  border-radius: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  h1 {
    font-weight: 700;
    font-size: 1.2rem;
    padding-top: 20px;
    padding-bottom: 20px;
    color: var(--dark-color);
  }

  img {
    width: 30vw;
    height: 250px;
    object-fit: cover;
    border-radius: 40px;
  }

  div {
    margin-top: 5px;
  }

  .title {
    font-weight: 500;
  }
`;

const Form = styled.div`
  width: 100%;
  padding-top: 10px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  input {
    width: 90%;
    height: 30px;
    border-radius: 10px;
    margin-bottom: 10px;
    padding-left: 5px;
  }

  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  .why-adopt {
    width: 90%;
    height: 100px;
    border-radius: 10px;
    margin-bottom: 10px;
    padding-left: 5px;
    padding-top: 5px;
  }
`;