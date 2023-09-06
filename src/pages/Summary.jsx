import { useEffect, useState } from "react";
import service from "../services/service.config";
import "../App.css";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CircularProgress,
  Image,
  Chip,
  Progress,
  CardFooter,
  Divider,
  Avatar,
} from "@nextui-org/react";
import TransactionForm from "../components/TransactionForm";
import AddFunds from "../components/AddFunds";
import moment from "moment/moment";
import ChartBar from "../components/ChartBar";
import { isMobile } from "react-device-detect";
export default function Summary() {
  const [userData, setUserData] = useState();
  const [transactionData, setTransactionData] = useState();
  const [allUsers, setAllUsers] = useState();
  const [isLoadingAddFunds, setIsLoadingAddFunds] = useState(false);
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
    <div className="flex flex-col mx-auto container">
      <div className="flex justify-between flex-wrap">
        <div>
          <Card style={{ margin: "15px 10px", height: "200px", width: "370px" }}>
            <CardBody
              className="flex flex-col text-left gap-4"
              style={{ fontSize: "30px", padding: "10px" }}
            >
              <h1
                style={{
                  display: "flex",
                  justifyContent: "center",
                  paddingTop: "20px",
                }}
              >
                Finapay Balance
              </h1>
              {isLoadingAddFunds === true && (
                <Progress
                  size="sm"
                  isIndeterminate
                  aria-label="Loading..."
                  className="max-w-md"
                />
              )}
            </CardBody>
            <CardFooter className="flex flex-col flex-wrap  text-left gap-4">
              <div className="flex justify-between gap-4">
                <Button size="sm">To Dolars</Button>
                <Chip
                  color="success"
                  variant="shadow"
                  className="text-3xl font-bold"
                  style={{ fontSize: "24px", padding: "20px", display: "flex" }}
                >
                  {userData.funds.toFixed(2)} €
                </Chip>
                <Button size="sm">To Pounds</Button>
              </div>
            </CardFooter>
          </Card>
        </div>
        <div>
          <Card style={{ marginTop: "15px", height: "200px", width: "370px" }}>
            <CardBody style={{ fontSize: "30px", padding: "10px" }}>
              <h1 style={{ display: "flex", justifyContent: "center" }}>
                Welcome
              </h1>
              <h1 style={{ display: "flex", justifyContent: "center" }}>
                {userData.username.toUpperCase()}
              </h1>
            </CardBody>
            <CardFooter className="flex flex-col flex-wrap  text-left gap-4">
              <div className="flex gap-4">
                <AddFunds
                  getData={getData}
                  setIsLoadingAddFunds={setIsLoadingAddFunds}
                />
                <TransactionForm getData={getData} allUsers={allUsers} />
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
              <Divider/>
      <div className="flex flex-row flex-wrap">
        <div>
          <Card style={{ marginTop: "20px", width:isMobile ? "370px" : "470px" }}>
            {transactionData.map((transaction, i) => {
              if (i >= 6) {
                return;
              }
              
              let userNameTo =  transaction.to.username
              let userNameFrom = transaction.from.username
              let capitalizedUsernameTo = userNameTo.charAt(0).toUpperCase() + userNameTo.slice(1);
              let capitalizedUsernameFrom = userNameFrom.charAt(0).toUpperCase() + userNameFrom.slice(1);
              return (
                <Card
                  className="flex gap-4"
                  key={transaction._id}
                  style={{ margin: "5px" }}
                >
                  <CardHeader className="flex justify-between	gap-3">
                    <div className="flex gap-4">
                    <Avatar
                      alt="nextui logo"
                      
                      radius="sm"
                      src={
                        transaction.from._id === userData._id
                          ? transaction.to.profilePic
                          : transaction.from.profilePic
                      }
                      width={55}
                      style={{borderRadius:"200px"}}
                    />
                    <div className="flex flex-col" style={{textAlign:"left"}}>
                      
                        
                        {transaction.from._id === userData._id
                          ? <p><b>To: </b>{capitalizedUsernameTo} </p> 
                          : <p><b>From: </b>{capitalizedUsernameFrom}</p> }
                      
                      <p className="text-small text-default-500">
                        {moment(transaction.date).format("lll")}
                      </p>
                    </div>


                    </div>
                    <div>
                      {/* <p>{transaction.concept}</p> */}    
                        {transaction.from._id === userData._id
                          ? <p style={{color:"red"}}><b>- {transaction.amount}€</b></p>
                          : <p style={{color:"green"}}><b>+ {transaction.amount}€</b></p>}
                     
                    </div>
                  </CardHeader>
                </Card>
              );
            })}
          </Card>
        </div>
        
        <div style={{margin: " 60px 30px", width: isMobile ? "370px" : "600px" }}>
          <ChartBar transactionData={transactionData} userData={userData} />
        </div>
      </div>
    </div>
  );
}
