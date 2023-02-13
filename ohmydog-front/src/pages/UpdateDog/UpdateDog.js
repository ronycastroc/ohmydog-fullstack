import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Logo } from "../../components";
import { getDogById, updateDog } from "../../services";
import { Form, Wrapper } from "../Auth/style";

export const UpdateDog = () => {
  const [urlImage, setUrlImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [age, setAge] = useState("");
  const [genre, setGenre] = useState("");

  const { dogId } = useParams();

  const navigate = useNavigate();

  const getDogByIdFunc = async () => {
    try {
      const dog = await getDogById(dogId);

      setUrlImage(dog.urlImage);
      setName(dog.name);
      setDescription(dog.description);
      setAge(dog.age);
      setGenre(dog.genre);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDogByIdFunc();
  }, []);

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
      await updateDog({ dogId, body });
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
            Update Dog
          </Button>
        </Form>
      </Wrapper>
    </>
  );
};