import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { Button, Logo } from "../../components";
import { getDogById } from "../../services";
import { postAdoption } from "../../services/adoptionApi";
import { toast } from "react-toastify";

export const DogPage = () => {
  const [dog, setDog] = useState({});
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profession, setProfession] = useState("");
  const [textAdoption, setTextAdoption] = useState("");
  const [textTravel, setTextTravel] = useState("");

  const { dogId } = useParams();
  const navigate = useNavigate();

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

  const handleForm = async (e) => {
    e.preventDefault();

    try {
      await postAdoption(dogId);

      toast.success("The form was sent successfully, check your email for more details.", {
        autoClose: 10000
      });
      resetForm();
      navigate("/");
    } catch (error) {
      if (error.response.status === 401) {
        return toast.error("You are already in a review, please check your email.");
      }
      return toast.error("Something went wrong, please try again later.");
    }
  };

  const resetForm = () => {
    setDog("");
    setName("");
    setBirthday("");
    setPhoneNumber("");
    setProfession("");
    setTextAdoption("");
    setTextTravel("");
  };

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

          <Form onSubmit={handleForm}>
            <input 
              type="text" 
              name="name" 
              placeholder="Full Name" 
              value={name}
              onChange={(e) => setName(e.target.value)}  
              required/>
            <input 
              type="text" 
              name="bithday" 
              placeholder="Birthday"
              value={birthday} 
              onChange={(e) => setBirthday(e.target.value)}
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => (e.target.type = "text")} 
              required/>
            <input 
              type="number" 
              name="cell phone" 
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)} 
              required/>
            <input 
              type="text" 
              name="profession" 
              placeholder="Profession"
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
              required/>

            <h1>Why do you want to adopt an dog?</h1>
            <textarea 
              type="text" 
              name="why" 
              className="why-adopt"
              value={textAdoption}
              onChange={(e) => setTextAdoption(e.target.value)} 
              required/>

            <h1>In case of travel, where will you leave the adopted dog?</h1>
            <textarea 
              type="text" 
              name="why" 
              className="why-adopt"
              value={textTravel}
              onChange={(e) => setTextTravel(e.target.value)} 
              required/>

            <Button>
              Send Form
            </Button>          
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
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  @media (max-width: 600px) {
   width: 90%;
  }

  h1 {
    font-weight: 700;
    font-size: 1.2rem;
    padding-top: 20px;
    padding-bottom: 20px;
    color: var(--dark-color);
    margin-left: 20px;
    margin-right: 20px;
    text-align: center;
  }

  img {
    width: 30vw;
    height: 250px;
    object-fit: cover;
    border-radius: 10px;

    @media (max-width: 600px) {
     width: 80%;
   }
  }

  div {
    margin-top: 5px;
  }

  .title {
    font-weight: 500;
  }
`;

const Form = styled.form`
  width: 100%;
  padding-top: 10px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  input {
    width: 90%;
    height: 40px;
    border-radius: 10px;
    margin-bottom: 10px;
    padding-left: 5px;
    border: 1px solid var(--black-color);
  }

  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  .why-adopt {
    width: 90%;
    height: 100px;
    border-radius: 10px;
    margin-bottom: 30px;
    padding-left: 5px;
    padding-top: 5px;
    border: 1px solid var(--black-color);
  }
`;