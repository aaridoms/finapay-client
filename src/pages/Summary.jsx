import { useEffect, useState } from "react";
import service from "../services/service.config";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CircularProgress,
  Image,
} from "@nextui-org/react";
import TransactionForm from "../components/TransactionForm";
import AddFunds from "../components/AddFunds";
import moment from "moment/moment";
import ChartBar from "../components/ChartBar";

export default function Summary() {
  const [userData, setUserData] = useState();
  const [transactionData, setTransactionData] = useState();
  const [allUsers, setAllUsers] = useState();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await service.get("/account/summary");
      console.log(response.data);
      setUserData(response.data.foundUser);
      setTransactionData(response.data.foundTransaction);
      setAllUsers(response.data.allUsers);
    } catch (error) {
      console.log(error);
    }
  };
  if (userData === undefined || transactionData === undefined) {
    return <CircularProgress label="Loading..." />;
  }

  return (
    <div>
      <h1>HELLO {userData.username.toUpperCase()}</h1>
      <h3>TOTAL CASH: {userData.funds.toFixed(2)}€</h3>
      <div></div>
      <div>
        <AddFunds getData={getData} />
        <TransactionForm getData={getData} allUsers={allUsers} />
      </div>

      <Card style={{ width: "500px" }}>
        {transactionData.map((transaction) => {
          return (
              <Card className="max-w-[400px]" key={transaction._id}>
                <CardHeader className="flex gap-3">
                  <Image
                    alt="nextui logo"
                    height={40}
                    radius="sm"
                    src={transaction.from._id === userData._id ? transaction.to.profilePic : transaction.from.profilePic}
                    width={40}
                  />
                  <div className="flex flex-col">
                    <p>{transaction.from._id === userData._id ? transaction.to.username : transaction.from.username}</p>
                    <p className="text-small text-default-500">{moment(transaction.date).format('lll')}</p>
                  </div>
                  <div>
                    {/* <p>{transaction.concept}</p> */}
                    <p className="text-md">{transaction.from._id === userData._id ? `- ${transaction.amount}` : `+ ${transaction.amount}` }</p>
                  </div>
                </CardHeader>
              </Card>
          );
        })}
      </Card>

      <ChartBar transactionData={transactionData} userData={userData} />
    </div>
  );
}

// {transaction.from._id === userData._id ? (
//   <>
//     <p style={{ color: "red" }}>- {transaction.amount}</p>
//     <p>Enviado a: {transaction.to.username}</p>
//   </>
// ) : (
//   <p style={{ color: "green" }}>+ {transaction.amount}</p>
// )}
// );
// })}
