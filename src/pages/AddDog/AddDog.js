import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Logo } from "../../components";
import { postDog } from "../../services";
import { Form, Wrapper } from "../Auth/style";

export const AddDog = () => {
  const [urlImage, setUrlImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [age, setAge] = useState("Puppy");
  const [genre, setGenre] = useState("Male");

  const navigate = useNavigate();

  const handleForm = useCallback(async (e) => {
    e.preventDefault();

    const body = {
      urlImage,
      name,
      description,
      age,
      genre,
    };

    try {
      await postDog(body);
      resetForm();

      navigate("/adopt-dog");
    } catch (error) {
      if (error.response.status === 401) {
        resetForm();
        return toast.error("Your account type is not authorized.");
      }
      console.log(error.message);
      return toast.error("Something went wrong, please try again later.");
    }

  }, [name, urlImage, description, age, genre]);

  const resetForm = () => {
    setUrlImage("");
    setName("");
    setDescription("");
    setAge("");
    setGenre("");
  };

  return (
    <>
      <Wrapper>
        <Logo />

        <Form onSubmit={handleForm}>
          <input
            type="url"
            name="url-image"
            placeholder="URL Image"
            value={urlImage}
            onChange={(e) => setUrlImage(e.target.value)}
            required />

          <input
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required />

          <input
            type="text"
            name="description"
            placeholder="Little Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required />

          <div className="type">
            <h3>Select age: </h3>
            <select onChange={(e) => setAge(e.target.value)}>
              <option value="Puppy">Puppy</option>
              <option value="Adolescent">Adolescent</option>
              <option value="Adult">Adult</option>
              <option value="Elderly">Elderly</option>
            </select>
          </div>

          <div className="type">
            <h3>Select genre: </h3>
            <select onChange={(e) => setGenre(e.target.value)}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <Button>
            Send Dog
          </Button>
        </Form>
      </Wrapper>
    </>
  );
};