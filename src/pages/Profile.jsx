import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../services/service.config";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Input,
  Image,
  Card,
  CardBody,
} from "@nextui-org/react";

export default function Profile() {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState();
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

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
        email,
      });
      setUserProfile((prevUserProfile) => ({ ...prevUserProfile, email }));
      setIsPopoverOpen(false);
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        console.log(error);
        navigate("/error");
      }
    }
  };

  const handlePopoverOpen = () => {
    setIsPopoverOpen(true);
  };

  const handlePopoverClose = () => {
    setIsPopoverOpen(false);
    setErrorMessage(""); // Restablecer el mensaje de error al cerrar el Popover
  };

  if (userProfile === undefined) {
    return <h3>BUSCANDO</h3>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Card>
        <CardBody className="flex flex-row">
          <div>
            <Image
              width={300}
              alt="NextUI hero Image"
              src={userProfile.profilePic}
            />
          </div>
          <div>
            <h1>Perfil de {userProfile.username} </h1>
            <h3>Email: {userProfile.email}</h3>

            <Popover
              placement="bottom"
              showArrow
              offset={10}
              isOpen={isPopoverOpen}
              onClose={handlePopoverClose}
            >
              <PopoverTrigger>
                <Button color="primary" onClick={handlePopoverOpen}>
                  Change your Email
                </Button>
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
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />
                      <Button
                        className="hidden"
                        type="submit"
                        onClick={handleEmailForm}
                      />
                      {errorMessage ? (
                        <p
                          className="flex justify-center"
                          style={{ color: "red" }}
                        >
                          {" "}
                          {errorMessage}
                        </p>
                      ) : null}
                    </form>
                  </div>
                )}
              </PopoverContent>
            </Popover>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
