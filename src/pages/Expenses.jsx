import service from "../services/service.config";
import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router";

import {
  Card,
  CardHeader,
  Link,
  Button,
  Spinner,
  Input,
} from "@nextui-org/react";
import ExChart from "../components/ExChart";

import ExpenseForm from "../components/ExpenseForm";
import { isMobile } from "react-device-detect";

// Este componente muestra la lista de gastos del usuario
export default function Expenses() {
  const navigate = useNavigate();

  const [userExpenses, setUserExpenses] = useState();
  const [categoryFilter, setCategoryFilter] = useState();

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

  const filteredExpenses = useMemo(() => {
    if (!categoryFilter) return userExpenses;

    return userExpenses.filter((expense) =>
      expense.category.some((cat) =>
        cat.toLowerCase().includes(categoryFilter.toLowerCase())
      )
    );
  }, [userExpenses, categoryFilter]);

  const handleSearch = (e) => {
    setCategoryFilter(e.target.value);
  };

  if (userExpenses === undefined) {
    return <Spinner color="primary" style={{ paddingTop: "20px" }} />;
  }

  return (
    <div className="flex flex-col gap-4">
      <div>Check your list of Expenses</div>
      <Input
        type="text"
        placeholder="Search by category"
        onChange={handleSearch}
        className="border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        role="search"
      />
      <ExpenseForm userExpenses={userExpenses} getData={getData} />
      <div>
        <div>
          {filteredExpenses.map((eachExpense, i) => {
            return (
              <Card key={i} className="w-full max-w-1/2 mx-auto mb-2">
                <CardHeader className="flex justify-between items-center px-4">
                  <div className="flex gap-3">
                    <p className={isMobile && "text-small text-default-500"}>
                      <b>Name: </b> {eachExpense.name}
                    </p>
                    <p className={isMobile && "text-small text-default-500"}>
                      <b>Amount: </b>
                      {eachExpense.amount}€
                    </p>
                    <p className={isMobile && "text-small text-default-500"}>
                      <b>Category: </b>
                      {eachExpense.category}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      onClick={() =>
                        navigate(`/account/expenses/${eachExpense._id}/details`)
                      }
                      as={Link}
                      variant="shadow"
                      size="sm"
                      style={{ backgroundColor: "#c3b169" }}
                    >
                      Details
                    </Button>

                    <Button
                      color="danger"
                      variant="shadow"
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
      <ExChart userExpenses={userExpenses} />
    </div>
  );
}
