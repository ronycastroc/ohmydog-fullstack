import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { Button, Logo } from "../../components";
import { postSignIn } from "../../services";

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleForm = async (e) => {
    e.preventDefault();

    const body = {
      email,
      password
    };

    try {
      const user = await postSignIn(body);

      localStorage.setItem("token", JSON.stringify(user.token));
      navigate("/");
    } catch (error) {
      if (error.response.status === 401) {
        return toast.error("Your email or password is incorrect, please try again.");
      }
      return toast.error("Something went wrong, please try again later.");
    }
  };

  return (
    <>
      <Wrapper>
        <Logo />
        <Form onSubmit={handleForm}>
          <input 
            type="email" 
            name="email" 
            placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required />
          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required />

          <div className="div-link">
            <p>Do not have an account? <span onClick={() => { navigate("/auth/sign-up"); }}>Register</span> here.</p>
          </div>  

          <div>
            <Button>
              Sign-In
            </Button>
          </div>
        </Form>

      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  background-color: var(--white-color);
  max-width: 30vw;
  height: 70vh;
  margin: 0 auto;
  margin-top: 100px;
  border-radius: 10px;
  position: relative;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  input {
    width: 80%;
    height: 40px;
    border-radius: 10px;
    font-size: 0.9rem;
    padding-left: 5px;
    margin-bottom: 20px;
    font-weight: 500;
  }

  span {
    color: var(--buttom-color);
  }

  button {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translate(-50%, 0);
  }

  .div-link {
    margin-top: -10px;
  }
`;