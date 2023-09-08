import { useState } from "react";
import service from "../services/service.config";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Select,
  SelectSection,
  SelectItem,
  Avatar,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { isMobile } from "react-device-detect";

// Este es el modal que se abre para enviar dinero a otro usuario
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
        props.setIsLoadingTransaction(false);
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
      props.setIsLoadingTransaction(false);
      return setErrorMessage("You don't have enough funds");
    }
    props.setIsLoadingTransaction(true);
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
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement={isMobile ? "top-center" : "center"}
        backdrop="opaque"
        style={{ backgroundColor: "#18181b", color: "#fff" }}
      >
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
                    return (
                      <SelectSection key={user._id} label={user.username} >
                        <SelectItem key={user._id} textValue={user.email} >
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
                              <span className="text-tiny text-default-400">
                                {user.username}
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
                      viewBox="0 0 16 16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g fill="#000000">
                        <path
                          fill-rule="evenodd"
                          d="M11 15a4 4 0 1 0 0-8a4 4 0 0 0 0 8zm5-4a5 5 0 1 1-10 0a5 5 0 0 1 10 0z"
                        />
                        <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207c0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158c0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522c0-.294.216-.514.572-.578v1.1h-.003zm.432.746c.449.104.655.272.655.569c0 .339-.257.571-.709.614v-1.195l.054.012z" />
                        <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083c.058-.344.145-.678.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1H1z" />
                        <path d="M9.998 5.083L10 5a2 2 0 1 0-3.132 1.65a5.982 5.982 0 0 1 3.13-1.567z" />
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
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill="none"
                        stroke="#000000"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        d="M8 14h8m-8-4h2m-2 8h4M10 3H6a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-3.5M10 3V1m0 2v2"
                      />
                    </svg>
                  }
                  label="Concept"
                  placeholder="Text here..."
                  type="text"
                  variant="bordered"
                  value={concept}
                  onChange={handleConceptChange}
                  style={{ color: "#fff" }}
                />
              </ModalBody>
              <ModalFooter className="flex justify-center">
                <Button color="danger" variant="shadow" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" variant="shadow" onPress={onClose} onClick={handleModal}>
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
