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
  Link,
  Image,
  Button,
} from "@nextui-org/react";
import AddInvestment from "../components/AddInvestment";

export default function Investment() {
  const navigate = useNavigate();
  const { roleAdmin } = useContext(AuthContext);
  const [allInvestment, setAllInvestment] = useState();
  const [userInvestment, setUserInvestment] = useState();
  const [infoToUser,setInfoToUser] = useState("")

  
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const allInv = await service.get("/account/investments");
      const userInv = await service.get("/account/investments/user-investment");
      console.log(allInv.data)
      console.log(userInv.data)

      setAllInvestment(allInv.data);
      setUserInvestment(userInv.data);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

if (allInvestment === undefined || userInvestment === undefined){
    return (
        <h3>Cargando Datos....</h3>
    )
}

  return (
    <div>
      <h1>Investment</h1>

      {roleAdmin === "Admin" && (
        <Button color="danger" variant="bordered">
          Add Investment
        </Button>
      )}

      <div>
        <div>
          <h2>Join a investment</h2>
          <div>
            {allInvestment.map((eachInvestment) => {
              const { name, risk, interesRate, category, duration ,_id} =
                eachInvestment;
              return (
                <Card className="max-w-[400px]" key={_id}>
                  <CardHeader className="flex gap-3">
                    <div className="flex flex-col">
                      <p className="text-md">{name}</p>
                      <p className="text-small text-default-500">{interesRate}</p>
                    </div>
                  </CardHeader>
                  <Divider />
                  <CardBody>
                    <p>
                      {category}
                    </p>
                    <p>
                      {duration}
                    </p>
                    <p>
                      {risk}
                    </p>
                  </CardBody>
                  <Divider />
                  <CardFooter>
                   <AddInvestment getData={getData} idInvestment={_id} />
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
        <div>
        <h2>User Investment</h2>
          <div>
            {userInvestment.map((eachInvestment) => {
              const { name, risk, interesRate, category, duration ,_id} =
                eachInvestment;
              return (
                <Card className="max-w-[400px]" key={_id}>
                  <CardHeader className="flex gap-3">
                    <div className="flex flex-col">
                      <p className="text-md">{name}</p>
                      <p className="text-small text-default-500">{interesRate}</p>
                    </div>
                  </CardHeader>
                  <Divider />
                  <CardBody>
                    <p>
                      {category}
                    </p>
                    <p>
                      {duration}
                    </p>
                    <p>
                      {risk}
                    </p>

                  </CardBody>
                  <Divider />
                  
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
