import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Logo } from "../../components";
import { postSignIn } from "../../services";
import { Form, Wrapper } from "./style";

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleForm = useCallback(async (e) => {
    e.preventDefault();

    const body = {
      email,
      password
    };

    try {
      const user = await postSignIn(body);

      localStorage.setItem("token", JSON.stringify(user.token));
      localStorage.setItem("user", JSON.stringify(user.user));
      resetForm();
      navigate("/");
    } catch (error) {
      if (error.response.status === 401) {
        resetForm();
        return toast.error("Your email or password is incorrect, please try again.");
      }
      resetForm();
      return toast.error("Something went wrong, please try again later.");
    }
  }, [email, password]);

  const resetForm = () => {
    setEmail("");
    setPassword("");
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
            <p>Do not have an account? <span onClick={() => navigate("/auth/sign-up")}>Register</span> here.</p>
          </div>


          <Button>
            Sign-In
          </Button>

        </Form>
      </Wrapper>
    </>
  );
};