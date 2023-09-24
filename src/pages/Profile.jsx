import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../services/service.config";
import { uploadImageService } from "../services/upload.services";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Input,
  Image,
  Card,
  Spinner,
  CardBody,
} from "@nextui-org/react";
import defaultPic from "../assets/defaultPic.webp";
import { isMobile } from "react-device-detect";

// Muestra el perfil del usuario y permite cambiar su email y su imagen de perfil
export default function Profile(props) {

  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState();
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (userProfile && userProfile.email) {
      setEmail(userProfile.email);
    }
  }, [userProfile]);

  const handleFileUpload = async (event) => {
    if (!event.target.files[0]) {
      // to prevent accidentally clicking the choose file button and not selecting a file
      return;
    }

    setIsUploading(true);

    const uploadData = new FormData(); // images and other files need to be sent to the backend in a FormData
    uploadData.append("image", event.target.files[0]);

    try {
      const response = await uploadImageService(uploadData);
      props.setNewData(true);
      setIsUploading(false); // to stop the loading animation
      getData();
    } catch (error) {
      navigate("/error");
    }
  };

  const getData = async () => {
    try {
      const response = await service.get("/account/profile");
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
    return <Spinner color="primary" style={{paddingTop:"10px"}}/>;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <Card style={{ marginTop: "70px", width: isMobile ? "370px" : "670px" }}>
        <CardBody className="flex flex-row content-around ">
          <div>
            <input
              id="fileUpload"
              type="file"
              name="image"
              onChange={handleFileUpload}
              disabled={isUploading}
              className="hidden"
            />

            <label htmlFor="fileUpload">
              <Image
                width={300}
                isZoomed
                isBlurred
                alt="NextUI hero Image"
                // src={userProfile.profilePic}
                src={userProfile.profilePic || defaultPic}
              />
            </label>

            {isUploading ? (
              <Spinner
                className="flex justify-center"
                color="primary"
                style={{ marginTop: "10px" }}
              />
            ) : (
              <h4
                className="flex justify-center text-small text-default-500"
                style={{ marginTop: "10px", textAlign: "initial" }}
              >
                Click to change your Image Profile
              </h4>
            )}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              paddingLeft: "10px",
            }}
          >
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
                <Button
                  color="primary"
                  onClick={handlePopoverOpen}
                  variant="shadow"
                >
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
                        color="primary"
                        type="submit"
                        onClick={handleEmailForm}
                        variant="shadow"
                      >
                        {" "}
                        +
                      </Button>
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
