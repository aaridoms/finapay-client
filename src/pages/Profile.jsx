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
  CardBody,
} from "@nextui-org/react";
import defaultPic from "../assets/defaultPic.webp";

export default function Profile() {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState();
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
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
      // or below line if not using services
      // const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/upload`, uploadData)

      // setImageUrl(response.data.imageUrl);
      //                          |
      //     this is how the backend sends the image to the frontend => res.json({ imageUrl: req.file.path });

      setIsUploading(false); // to stop the loading animation
      getData();
    } catch (error) {
      navigate("/error");
    }
  };

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
              // src={userProfile.profilePic}
              src={userProfile.profilePic || defaultPic}
            />
            <label>Image: </label>
            <input
              type="file"
              name="image"
              onChange={handleFileUpload}
              disabled={isUploading}
            />
          </div>
          
          {isUploading ? <h3>... uploading image</h3> : null}
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
