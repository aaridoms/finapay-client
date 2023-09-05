import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import service from "../services/service.config";
import moment from "moment";
import ExpenseForm from "../components/ExpenseForm";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
  Button,
} from "@nextui-org/react";

export default function ExpenseDetails() {
  const isEdit = true;
  const [oneExpense, setOneExpense] = useState();

  const navigate = useNavigate();

  const params = useParams();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await service.get(
        `/account/expenses/${params.idExpense}/details`
      );
      setOneExpense(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      await service.delete(`/account/expenses/${params.idExpense}/delete`);
      navigate("/account/expenses");
    } catch (error) {
      console.log(error);
    }
  };

  if (oneExpense === undefined) {
    return <div>Cargando...</div>;
  }

  return (
    <div style={{ paddingTop: "100px" }}>
      <Card className="max-w-[400px]">
        <CardHeader className="flex justify-between" >
         
            <p className="text-small text-default-500">
              Category: {oneExpense.category}
            </p>
            <p className="text-md">Name:{oneExpense.name}</p>
            <p>Amount: {oneExpense.amount} €</p>
         
        </CardHeader>
        <Divider />
        <CardBody > 
          <p className="flex justify-center">{oneExpense.notes}</p>
        </CardBody>
        <Divider />
        <CardFooter className="flex justify-between">
          <div>
            <p>Created at {moment(oneExpense.date).format("lll")}</p>
          </div>
          <div>
            <ExpenseForm
              isEdit={isEdit}
              idExpense={params.idExpense}
              getData={getData}
              oneExpense={oneExpense}
            />
            <Button color="danger" variant="bordered" onClick={handleDelete} size="sm">
              Delete Expense
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
