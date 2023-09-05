import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import service from "../services/service.config";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
} from "@nextui-org/react";
import AddInvestment from "../components/AddInvestment";
import NewInvestment from "../components/NewInvestment";

export default function Investment() {
  const navigate = useNavigate();
  const { roleAdmin } = useContext(AuthContext);
  const [allInvestment, setAllInvestment] = useState();
  const [userOperations, setUserOperations] = useState();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const allInv = await service.get("/account/investments");
      const userOperation = await service.get("/account/investments/user-investment");
      // console.log(allInv.data)
     
     
      setAllInvestment(allInv.data);
      setUserOperations(userOperation.data);
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        console.log(error);
        navigate("/error");
      }
    }
  };

  if (allInvestment === undefined || userOperations === undefined) {
    return <h3>Cargando Datos....</h3>;
  }

  return (
    <div>
      <h1>Investment</h1>

      {roleAdmin === "Admin" && (
        <NewInvestment getData={getData} />
      )}

      <div style={{display:"flex" , justifyContent:"space-around"}}>
        <div style={{width:"600px"}}>
          <h2>Join a investment</h2>
          <div>
            {allInvestment.map((eachInvestment, i) => {
              const { name, risk, interesRate, category, duration, _id } =
                eachInvestment;
              return (
                <Card className="max-w-[400px]" key={i}>
                  <CardHeader className="flex gap-3">
                    <div className="flex flex-col">
                      <p className="text-md">{name}</p>
                      <p className="text-small text-default-500">
                        {interesRate}
                      </p>
                    </div>
                  </CardHeader>
                  <Divider />
                  <CardBody>
                    <p>{category}</p>
                    <p>{duration}</p>
                    <p>{risk}</p>
                  </CardBody>
                  <Divider />
                  <CardFooter>
                    <AddInvestment
                      getData={getData}
                      idInvestment={_id}
                    />
                    {errorMessage ? <p> {errorMessage}</p> : null}
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
        <div style={{width:"400px"}}>
          <h2>User Investment</h2>
          <div>
            {userOperations.map((eachInvestment, i) => {
              const { amount , status , earnings } = eachInvestment
                eachInvestment;
              return (
                <Card className="max-w-[400px]" key={i}>
                  <CardHeader className="flex gap-3">
                    <div className="flex flex-col">
                      <p className="text-md">{amount}</p>
                      <p className="text-small text-default-500">
                        {status}
                      </p>
                      <p className="text-md">{earnings}</p>
                    </div>
                  </CardHeader>
                           
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
