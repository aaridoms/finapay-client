import service from "../services/service.config";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Image,
  Link,
  Button,
} from "@nextui-org/react";

import ExpenseForm from "../components/ExpenseForm";
export default function Expenses() {
  const navigate = useNavigate();

  const [userExpenses, setUserExpenses] = useState();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await service.get("/account/expenses");
      setUserExpenses(response.data.expenses);
    } catch (error) {
      navigate("/error");
    }
  };

  const handleDelete = async (id) => {
    try {
      await service.delete(`/account/expenses/${id}/delete`);
      getData();
      navigate("/account/expenses");
    } catch (error) {
      console.log(error);
    }
  };

  if (userExpenses === undefined) {
    return <h3>..Buscando</h3>;
  }

  return (
    <>
      <div>Expenses</div>
      <ExpenseForm userExpenses={userExpenses} getData={getData} />
      <div>
        <div>{/* <h2>AQUI IRAN GRAFICAS</h2> */}</div>
        <div>{/* <h2>AQUI SE FILTRARAN GASTOS</h2> */}</div>

        <div >
          {userExpenses.map((eachExpense, i) => {
            return (
              <Card key={i} className="w-full max-w-1/2 mx-auto">
                <CardHeader className="flex justify-between items-center px-4">
                  <div className="flex gap-3">
                    <h3>{eachExpense.name}</h3>
                    <h3>
                      <b>{eachExpense.amount}€</b>
                    </h3>
                  </div>
                  <div>
                    <Button
                      href={`/account/expenses/${eachExpense._id}/details`}
                      as={Link}
                      color="primary"
                     
                      variant="solid"
                      
                      size="sm"
                    >
                      Details
                    </Button>

                    <Button
                      color="danger"
                      variant="bordered"
                      onClick={() => handleDelete(eachExpense._id)}
                      
                      size="sm"
                    >
                      Delete 
                    </Button>
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </>
  );
}
