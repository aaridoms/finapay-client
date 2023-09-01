import { useEffect, useState } from "react"
import service from "../services/service.config";
import { Button , CircularProgress } from "@nextui-org/react";
import TransactionForm from "../components/TransactionForm";
import AddFunds from "../components/AddFunds";



export default function Summary() {

const [userData , setUserData] = useState()
const [transactionData , setTransactionData] = useState()
useEffect(() => {
  getData();
}, []);

const getData = async() => {
  try {
    const response = await service.get("/account/summary")
    console.log(response.data)
    setUserData(response.data.foundUser)
    setTransactionData(response.data.foundTransaction)
  } catch (error) {
    console.log(error)
  }
}
if (userData === undefined || transactionData === undefined) {
  return <CircularProgress label="Loading..." />;
}

  return (
    <div>
        <h1>HELLO {userData.username.toUpperCase()}</h1>
        <h3>TOTAL CASH: {userData.funds}</h3>
    <div>

    </div>
    <div>
      <AddFunds userData={userData}  setUserData={setUserData} />
      <TransactionForm />
    </div>
    </div>
  )
}
