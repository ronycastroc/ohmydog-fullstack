import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Logo } from "../../components";
import { postSignUp } from "../../services";
import { Form, Wrapper } from "./style";

export const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [urlImage, setUrlImage] = useState("");
  const [accountType, setAccountType] = useState("Member");

  const navigate = useNavigate();

  const handleForm = useCallback(async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.warning("Passwords don't match");
      setPassword("");
      setConfirmPassword("");
      return;
    }

    if (password.length < 6) {
      toast.warning("Password must be at least 6 characters long");
      setPassword("");
      setConfirmPassword("");
      return;
    }

    const body = {
      name,
      email,
      password,
      urlImage,
      accountType
    };

    try {
      await postSignUp(body);
      resetForm();

      navigate("/auth/sign-in");
    } catch (error) {
      if (error.response.status === 409) {
        setEmail("");
        return toast.error("Email already registered, try another email");
      }
      return toast.error("Something went wrong, please try again later.");
    }

  },[name, email, password, urlImage, accountType]);

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setUrlImage("");
    setAccountType("");
  };

  return (
    <>
      <Wrapper>
        <Logo />

        <Form onSubmit={handleForm}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required />

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

          <input
            type="password"
            name="confirm-password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required />

          <input
            type="url"
            name="url-image"
            placeholder="URL Image"
            value={urlImage}
            onChange={(e) => setUrlImage(e.target.value)}
            required />

          <div className="type">
            <h3>Select account type: </h3>
            <select onChange={(e) => setAccountType(e.target.value)}>
              <option value="Member">Member</option>
              <option value="Veterinary">Veterinary</option>
            </select>
          </div>

          <div className="div-link">
            <p>Already have an account? <span onClick={() => navigate("/auth/sign-in")}>Login</span> here.</p>
          </div>

          <div>
            <Button>
              Sign-Up
            </Button>
          </div>
        </Form>
      </Wrapper>
    </>
  );
};