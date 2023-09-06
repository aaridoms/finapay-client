import { useEffect, useState } from "react";
import service from "../services/service.config";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CircularProgress,
  Image,
  Chip,
  CardFooter,
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
    <div className="flex flex-col h-screen">

      <Card className="max-w-2xl mt-2 mb-2">
        <CardBody className="flex flex-col text-left gap-4">
          {/* <p>Finapay Balance</p> */}
          <Chip color="success" variant="shadow" className="text-3xl font-bold" style={{fontSize: "30px", padding: "20px"}}>{userData.funds.toFixed(2)} €</Chip>
          {/* <Chip color="success" variant="shadow">{userData.username.toUpperCase()}</Chip> */}
        </CardBody>
        <CardFooter className="flex flex-col text-left gap-4">
          <div className="flex gap-4">
            <AddFunds getData={getData} />
            <TransactionForm getData={getData} allUsers={allUsers} />
          </div>
        </CardFooter>
      </Card>

      <div className="flex flex-row">

        <Card style={{ width: "500px" }}>
          {transactionData.map((transaction) => {
            return (
              <Card className="max-w-[400px]" key={transaction._id}>
                <CardHeader className="flex gap-3">
                  <Image
                    alt="nextui logo"
                    height={40}
                    radius="sm"
                    src={
                      transaction.from._id === userData._id
                        ? transaction.to.profilePic
                        : transaction.from.profilePic
                    }
                    width={40}
                  />
                  <div className="flex flex-col">
                    <p>
                      {transaction.from._id === userData._id
                        ? transaction.to.username
                        : transaction.from.username}
                    </p>
                    <p className="text-small text-default-500">
                      {moment(transaction.date).format("lll")}
                    </p>
                  </div>
                  <div>
                    {/* <p>{transaction.concept}</p> */}
                    <p className="text-md">
                      {transaction.from._id === userData._id
                        ? `- ${transaction.amount}`
                        : `+ ${transaction.amount}`}
                    </p>
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </Card>

        <ChartBar transactionData={transactionData} userData={userData} />
      </div>
    </div>
  );
}
