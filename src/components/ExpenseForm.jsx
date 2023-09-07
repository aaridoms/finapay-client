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
import { isMobile } from "react-device-detect";

export default function ExpenseForm(props) {
  const navigate = useNavigate();
  const headingClasses =
    "flex w-full sticky top-1 z-20 py-1.5 px-2 bg-default-100 shadow-small rounded-small";
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [notes, setNotes] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleNameChange = (e) => setName(e.target.value);
  const handleAmountChange = (e) => setAmount(e.target.value);
  const handleCategoryChange = (e) => setCategory(e.target.value);
  const handleNotesChange = (e) => setNotes(e.target.value);

  const handleExpense = async (e) => {
    e.preventDefault();

    if (props.isEdit) {
      try {
        await service.put(`/account/expenses/${props.idExpense}/edit`, {
          name,
          amount,
          category,
          notes,
        });
        props.getData();
      } catch (error) {
        if (error.response && error.response.status === 400) {
          setErrorMessage(error.response.data.errorMessage);
        } else {
          console.log(error);
          navigate("/error");
        }
      }
    } else if (props.isEdit === undefined) {
      try {
        await service.post("/account/expenses/add", {
          name,
          amount,
          category,
          notes,
        });
        props.getData();
      } catch (error) {
        if (error.response && error.response.status === 400) {
          setErrorMessage(error.response.data.errorMessage);
        } else {
          console.log(error);
          navigate("/error");
        }
      }
    }
  };

  return (
    <div>
      <Button onPress={onOpen} color={props.isEdit ? "warning" : "success"} size={props.isEdit && "sm"}>
        {props.isEdit ? "Edit expense" : "New expense"}
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement={isMobile?"top-center":"center"}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add an expense
              </ModalHeader>
              <ModalBody>
                <Input
                  label="Name"
                  placeholder={
                    props.isEdit ? props.oneExpense.name : "Add a name"
                  }
                  type="text"
                  variant="bordered"
                  value={name}
                  onChange={handleNameChange}
                />
                <Input
                  label="Amount"
                  placeholder={
                    props.isEdit
                      ? props.oneExpense.amount
                      : "Amount of the Expense"
                  }
                  type="number"
                  variant="bordered"
                  value={amount}
                  onChange={handleAmountChange}
                />

                <Select
                  label="Select a Category"
                  placeholder={
                    props.isEdit
                      ? props.oneExpense.category
                      : "Select a Category"
                  }
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
                    <SelectItem key="Food">Food</SelectItem>
                    <SelectItem key="Transportation">Transportation</SelectItem>
                    <SelectItem key="Housing">Housing</SelectItem>
                    <SelectItem key="Utilities">Utilities</SelectItem>
                    <SelectItem key="Insurance">Insurance</SelectItem>
                    <SelectItem key="Medical & Healthcare">
                      Medical & Healthcare
                    </SelectItem>
                    <SelectItem key="Debt Payments">Debt Payments</SelectItem>
                    <SelectItem key="Personal">Personal</SelectItem>
                    <SelectItem key="Recreation & Entertainment">
                      Recreation & Entertainment
                    </SelectItem>
                    <SelectItem key="Miscellaneous">Miscellaneous</SelectItem>
                  </SelectSection>
                </Select>
                <Input
                  label="Notes"
                  placeholder={
                    props.isEdit ? props.oneExpense.notes : "Text here..."
                  }
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
                  onClick={handleExpense}
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
