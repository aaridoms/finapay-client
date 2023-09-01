import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Input,
} from "@nextui-org/react";
import service from "../services/service.config";

export default function AddFunds(props) {
  const navigate = useNavigate();
  const [funds, setFunds] = useState("");

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (props.userData && props.userData.funds) {
      setFunds(props.userData.funds);
    }
  }, [props.userData]);

  const handleFundsForm = async (e) => {
    e.preventDefault();
    try {
        console.log(funds)
      await service.post("/account/add-funds", {
        funds,
      });
      props.setUserData((prevUserData) => ({ ...prevUserData, funds }));
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

  return (
    <Popover
      placement="bottom"
      showArrow
      offset={10}
      isOpen={isPopoverOpen}
      onClose={handlePopoverClose}
    >
      <PopoverTrigger>
        <Button color="primary" onClick={handlePopoverOpen}>
          Add Funds
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[240px]">
        {(titleProps) => (
          <div className="px-1 py-2 w-full">
            <p className="text-small font-bold text-foreground" {...titleProps}>
              Add Funds
            </p>
            <form className="mt-2 flex flex-col gap-2 w-full">
              <Input
                // defaultValue="Add Funds"
                type="number"
                label="Funds"
                size="sm"
                variant="bordered"
                name="funds"
                onChange={(e) => {
                  setFunds(e.target.value);
                }}
              />
              <Button
                className="hidden"
                type="submit"
                onClick={handleFundsForm}
              />
              {errorMessage ? (
                <p className="flex justify-center" style={{ color: "red" }}>
                  {" "}
                  {errorMessage}
                </p>
              ) : null}
            </form>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
