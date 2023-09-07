import service from "../services/service.config";
import { useEffect, useState, useMemo } from "react";
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
  Input,
} from "@nextui-org/react";
import ExChart from "../components/ExChart";

import ExpenseForm from "../components/ExpenseForm";
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
    return <h3>..Buscando</h3>;
  }

  return (
    <div className="flex flex-col gap-4">
      <div>Check your list of Expenses</div>
      <Input
        type="text"
        placeholder="Search by category"
        onChange={handleSearch}
        className="border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                    <h3>
                      <b>Name: </b> {eachExpense.name}
                    </h3>
                    <h3>
                      <b>Amount: </b>
                      {eachExpense.amount}€
                    </h3>
                    <h3>
                      <b>Category: </b>
                      {eachExpense.category}
                    </h3>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      href={`/account/expenses/${eachExpense._id}/details`}
                      as={Link}
                      // color="primary"
                      variant="solid"
                      size="sm"
                      style={{ backgroundColor: "#c3b169" }}
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
      <ExChart userExpenses={userExpenses} />
    </div>
  );
}
