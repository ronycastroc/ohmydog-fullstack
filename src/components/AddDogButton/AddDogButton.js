import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "../Buttton/Button";

export const AddDogButton = () => {
  const auth = JSON.parse(localStorage.getItem("token"));
  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();

  const addDogPage = () => {
    if (!auth || user.accountType !== "Supporter") return toast.warning("You're not logged in or your account type is not authorized.");

    navigate("/add-dog-adoption");
  };

  
  return (
    <div onClick={addDogPage}>
      <Button>
        Are you a supporter? Add a dog for adoption here
      </Button>
    </div>
  );
};