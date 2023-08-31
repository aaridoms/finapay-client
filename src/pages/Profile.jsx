import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../services/service.config";
import {Popover, PopoverTrigger, PopoverContent, Button, Input} from "@nextui-org/react";




export default function Profile() {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState();


  useEffect(() => {
    getData();
  }, []);

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
    e.preventDefault()
    try {
        await service.patch("/account/profile/edit-email")

    } catch (error) {
        
    }
  }

if (userProfile === undefined){
    return <h3>BUSCANDO</h3>
}



  return (
    <div>
      <h1>Perfil de {userProfile.username} </h1>
      <h3>Email: {userProfile.email}</h3>

      <Popover placement="bottom" showArrow offset={10}>
      <PopoverTrigger>
        <Button color="primary">Change your Email</Button>
      </PopoverTrigger>
      <PopoverContent className="w-[240px]">
        {() => (
          <div className="px-1 py-2 w-full">
            
            <div  className="mt-2 flex flex-col gap-2 w-full">
              <Input onSubmit={handleEmailForm} defaultValue={userProfile.email} label="email" size="sm" variant="bordered" name="email" />
            
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>

      <img src={userProfile.profilePic} alt="Profile Pic" />

    </div>
  );
}
