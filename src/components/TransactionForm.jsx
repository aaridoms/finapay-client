import { useEffect, useState } from "react";
import service from "../services/service.config";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
  Select,
  SelectSection,
  SelectItem,
  Avatar,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { isMobile } from "react-device-detect";

export default function TransactionForm(props) {
  const navigate = useNavigate();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [concept, setConcept] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const handleToChange = (e) => setTo(e.target.value);
  const handleAmountChange = (e) => setAmount(e.target.value);
  const handleConceptChange = (e) => setConcept(e.target.value);

  const handleTransaction = async (e) => {
    try {
      await service.post("/account/send", {
        to,
        amount,
        concept,
      });
      props.getData();
      props.setIsLoadingTransaction(false);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        props.setIsLoadingTransaction(false)
        setErrorMessage(error.response.data.errorMessage);
      } else {
        console.log(error);
        navigate("/error");
      }
    }
  };

  const handleModal = (e) => {
    e.preventDefault();
    if (props.userData.funds < amount) {
      props.setIsLoadingTransaction(false)
      return setErrorMessage("You don't have enough funds")
    }
      props.setIsLoadingTransaction(true)
      const intervalId = setInterval(() => {
        handleTransaction();
        
        clearInterval(intervalId);
      }, 3000);
  };


  return (
    <>
      <Button onPress={onOpen} color="success" variant="shadow">
        Send Money
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement={isMobile?"top-center":"center"}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Fill to complete de transaction
              </ModalHeader>
              <ModalBody>
                <Select
                  label="Select a user"
                  className="max-w-xs"
                  onChange={handleToChange}
                >
                  {props.allUsers.map((user) => {
                    // TODO: Poner un buscador en vez de un selected
                    return (
                      <SelectSection key={user._id} label={user.username}>
                        <SelectItem key={user._id} textValue={user.username}>
                          <div className="flex gap-2 items-center">
                            <Avatar
                              alt={user.username}
                              className="flex-shrink-0"
                              size="sm"
                              src={user.profilePic}
                            />
                            <div className="flex flex-col">
                              <span className="text-small">{user.name}</span>
                              <span className="text-tiny text-default-400">
                                {user.email}
                              </span>
                            </div>
                          </div>
                        </SelectItem>
                      </SelectSection>
                    );
                  })}
                </Select>

                <Input
                  endContent={
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 32 32"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g fill="none" fillRule="evenodd">
                        <circle cx="16" cy="16" r="16" fill="#F7931A" />
                        <path
                          fill="#FFF"
                          fillRule="nonzero"
                          d="M23.189 14.02c.314-2.096-1.283-3.223-3.465-3.975l.708-2.84l-1.728-.43l-.69 2.765c-.454-.114-.92-.22-1.385-.326l.695-2.783L15.596 6l-.708 2.839c-.376-.086-.746-.17-1.104-.26l.002-.009l-2.384-.595l-.46 1.846s1.283.294 1.256.312c.7.175.826.638.805 1.006l-.806 3.235c.048.012.11.03.18.057l-.183-.045l-1.13 4.532c-.086.212-.303.531-.793.41c.018.025-1.256-.313-1.256-.313l-.858 1.978l2.25.561c.418.105.828.215 1.231.318l-.715 2.872l1.727.43l.708-2.84c.472.127.93.245 1.378.357l-.706 2.828l1.728.43l.715-2.866c2.948.558 5.164.333 6.097-2.333c.752-2.146-.037-3.385-1.588-4.192c1.13-.26 1.98-1.003 2.207-2.538zm-3.95 5.538c-.533 2.147-4.148.986-5.32.695l.95-3.805c1.172.293 4.929.872 4.37 3.11zm.535-5.569c-.487 1.953-3.495.96-4.47.717l.86-3.45c.975.243 4.118.696 3.61 2.733z"
                        />
                      </g>
                    </svg>
                  }
                  label="Ammount"
                  placeholder="How much money do you want to send?"
                  type="number"
                  variant="bordered"
                  value={amount}
                  onChange={handleAmountChange}
                />
                <Input
                  endContent={
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 32 32"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g fill="none" fillRule="evenodd">
                        <circle cx="16" cy="16" r="16" fill="#F7931A" />
                        <path
                          fill="#FFF"
                          fillRule="nonzero"
                          d="M23.189 14.02c.314-2.096-1.283-3.223-3.465-3.975l.708-2.84l-1.728-.43l-.69 2.765c-.454-.114-.92-.22-1.385-.326l.695-2.783L15.596 6l-.708 2.839c-.376-.086-.746-.17-1.104-.26l.002-.009l-2.384-.595l-.46 1.846s1.283.294 1.256.312c.7.175.826.638.805 1.006l-.806 3.235c.048.012.11.03.18.057l-.183-.045l-1.13 4.532c-.086.212-.303.531-.793.41c.018.025-1.256-.313-1.256-.313l-.858 1.978l2.25.561c.418.105.828.215 1.231.318l-.715 2.872l1.727.43l.708-2.84c.472.127.93.245 1.378.357l-.706 2.828l1.728.43l.715-2.866c2.948.558 5.164.333 6.097-2.333c.752-2.146-.037-3.385-1.588-4.192c1.13-.26 1.98-1.003 2.207-2.538zm-3.95 5.538c-.533 2.147-4.148.986-5.32.695l.95-3.805c1.172.293 4.929.872 4.37 3.11zm.535-5.569c-.487 1.953-3.495.96-4.47.717l.86-3.45c.975.243 4.118.696 3.61 2.733z"
                        />
                      </g>
                    </svg>
                  }
                  label="Concept"
                  placeholder="Text here..."
                  type="text"
                  variant="bordered"
                  value={concept}
                  onChange={handleConceptChange}
                />
              </ModalBody>
              <ModalFooter className="flex justify-center">
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={onClose}
                  onClick={handleModal}
                >
                  Send
                </Button>
              </ModalFooter>
              {errorMessage ? (
                <p
                  style={{ color: "red", paddingBottom: "10px" }}
                  className="flex justify-center"
                >
                  {" "}
                  {errorMessage}
                </p>
              ) : null}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
