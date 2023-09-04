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

export default function AddInvestment(props) {
  const navigate = useNavigate();

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [amount, setAmount] = useState(0);

  const handleJoinForm = async (e) => {
    e.preventDefault();
    try {
      // console.log(funds)
      const userInfo = await service.post(`/account/investments/${props.idInvestment}/join`, {
        amount,
      });
      
      console.log(userInfo.data)
      props.getData();
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
          Join
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[240px]">
        {(titleProps) => (
          <div className="px-1 py-2 w-full">
            <p className="text-small font-bold text-foreground" {...titleProps}>
              How many amount want to risk
            </p>
            <form className="mt-2 flex flex-col gap-2 w-full">
              <Input
                type="number"
                label="Amount"
                size="sm"
                variant="bordered"
                name="amount"
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
              />
              <Button
                className="hidden"
                type="submit"
                onClick={handleJoinForm}
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
