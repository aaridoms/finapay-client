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
import { useState } from "react";
import service from "../services/service.config";
import { useNavigate } from "react-router-dom";

export default function NewInvestment(props) {
  const navigate = useNavigate();
  const headingClasses =
    "flex w-full sticky top-1 z-20 py-1.5 px-2 bg-default-100 shadow-small rounded-small";
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [name, setName] = useState("");
  const [risk, setRisk] = useState("");
  const [category, setCategory] = useState("");
  const [interesRate, setInteresRate] = useState("");
  const [duration, setDuration] = useState("");
  const [notes, setNotes] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleNameChange = (e) => setName(e.target.value);
  const handleRiskChange = (e) => setRisk(e.target.value);
  const handleCategoryChange = (e) => setCategory(e.target.value);
  const handleInteresRateChange = (e) => setInteresRate(e.target.value);
  const handleDurationChange = (e) => setDuration(e.target.value);
  const handleNotesChange = (e) => setNotes(e.target.value);

  const handleInvestment = async (e) => {
    e.preventDefault();

    try {
      await service.post("/account/investments/add", {
        name,
        risk,
        category,
        interesRate,
        duration,
        notes,
      });
      props.getData();
    } catch (error) {
      navigate("/error");
    }
  };
  return (
    <div>
      <Button onPress={onOpen} color={props.isEdit ? "warning" : "success"}>
        Add Investment
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add an Investment
              </ModalHeader>
              <ModalBody>
                <Input
                  label="Name"
                  type="text"
                  variant="bordered"
                  value={name}
                  onChange={handleNameChange}
                />
                <Select
                  label="Select Risk"
                  className="max-w-xs"
                  placeholder="Low | Medium | High"
                  scrollShadowProps={{
                    isEnabled: false,
                  }}
                  onChange={handleRiskChange}
                >
                  <SelectSection
                    title="Risk"
                    classNames={{
                      heading: headingClasses,
                    }}
                  >
                    <SelectItem key="Low">Low</SelectItem>
                    <SelectItem key="Medium">Medium</SelectItem>
                    <SelectItem key="High">High</SelectItem>
                  </SelectSection>
                </Select>

                <Select
                  label="Select a Category"
                  placeholder="Stocks, Bonds, Mutual Funds, ETFs..."
                  className="max-w-xs"
                  scrollShadowProps={{
                    isEnabled: false,
                  }}
                  onChange={handleCategoryChange}
                >
                  <SelectSection
                    title="Category"
                    classNames={{
                      heading: headingClasses,
                    }}
                  >
                    <SelectItem key="Stocks">Stocks</SelectItem>
                    <SelectItem key="Bonds">Bonds</SelectItem>
                    <SelectItem key="Mutual Funds">Mutual Funds</SelectItem>
                    <SelectItem key="ETFs">ETFs</SelectItem>
                    <SelectItem key="Real Estate">Real Estate</SelectItem>
                    <SelectItem key="Commodities">Commodities</SelectItem>
                    <SelectItem key="Cryptocurrency">Cryptocurrency</SelectItem>
                    <SelectItem key="Personal">Personal</SelectItem>
                    <SelectItem key="Cash Equivalents">
                      Cash Equivalents
                    </SelectItem>
                  </SelectSection>
                </Select>
                <Input
                  label="Interest Rate"
                  type="number"
                  placeholder="%"
                  variant="bordered"
                  value={interesRate}
                  onChange={handleInteresRateChange}
                />
                <Input
                  label="Duration Time"
                  type="text"
                  variant="bordered"
                  value={duration}
                  onChange={handleDurationChange}
                />
                <Input
                  label="Notes"
                  type="text"
                  variant="bordered"
                  value={notes}
                  onChange={handleNotesChange}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={onClose}
                  onClick={handleInvestment}
                >
                  Create
                </Button>
              </ModalFooter>
              {errorMessage ? <p> {errorMessage}</p> : null}
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
