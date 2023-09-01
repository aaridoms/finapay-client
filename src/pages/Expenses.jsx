import { Button } from "@nextui-org/react";
import service from "../services/service.config";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

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
      await service.delete(`/account/expenses/${id}/delete`)
      getData()
      navigate('/account/expenses')
    } catch (error) {
      console.log(error)
    }
  }

  if (userExpenses === undefined) {
    return <h3>..Buscando</h3>;
  }

  return (
    <>
      <div>Expenses</div>
      <Button color="success" variant="shadow">
        Add an expense
      </Button>
      <div>
        <div>{/* <h2>AQUI IRAN GRAFICAS</h2> */}</div>
        <div>{/* <h2>AQUI SE FILTRARAN GASTOS</h2> */}</div>
        <div>{userExpenses.map((eachExpense) => {
            return  (
                <div key={eachExpense._id}>
                    <Link to={`/account/expenses/${eachExpense._id}/details`}>{eachExpense.name}</Link>
                    <Button color="danger" variant="bordered" onClick={ ()=>handleDelete(eachExpense._id) }> Delete Expense </Button>
                </div>
            )
            
        })}</div>
      </div>
    </>
  );
}
