import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../services/service.config";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Input,
  Card,
  CardBody,
} from "@nextui-org/react";

export default function Profile() {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState();
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (userProfile && userProfile.email) {
        setEmail(userProfile.email);
    }
  }, [userProfile]);

  const getData = async () => {
    try {
      const response = await service.get("/account/profile");
      console.log(response.data);
      setUserProfile(response.data);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  const handleEmailForm = async (e) => {
    e.preventDefault();
    try {
      await service.patch("/account/profile/edit-email", {
        email
      });
      setUserProfile(prevUserProfile => ({ ...prevUserProfile, email }));
      navigate("/account/profile");
    } catch (error) {
      console.log(error);
      if(error.response && error.response.status === 400){
        setErrorMessage(error.response.data.errorMessage)
      } else {
        console.log(error)
        navigate("/error")
      }
    }
  };

  if (userProfile === undefined) {
    return <h3>BUSCANDO</h3>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen"> 
    <Card>
      <CardBody>
      <h1>Perfil de {userProfile.username} </h1>
      <h3>Email: {userProfile.email}</h3>

      <Popover placement="bottom" showArrow offset={10}>
        <PopoverTrigger>
          <Button color="primary">Change your Email</Button>
        </PopoverTrigger>
        <PopoverContent className="w-[240px]">
          {() => (
            <div className="px-1 py-2 w-full">
              <form className="mt-2 flex flex-col gap-2 w-full">
                <Input
                  defaultValue={userProfile.email}
                  label="email"
                  size="sm"
                  variant="bordered"
                  name="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value) }}
                />
                <Button className="hidden" type="submit" onClick={handleEmailForm}/>
                {errorMessage ? <p> {errorMessage}</p> : null}
              </form>
            </div>
          )}
        </PopoverContent>
      </Popover>

      <img src={userProfile.profilePic} alt="Profile Pic" />
      </CardBody>
    </Card>
    </div>
  );
}
