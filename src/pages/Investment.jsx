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
  Spinner,
  Pagination,
  Image,
} from "@nextui-org/react";
import AddInvestment from "../components/AddInvestment";
import NewInvestment from "../components/NewInvestment";
import { isMobile } from "react-device-detect";

export default function Investment() {
  const navigate = useNavigate();
  const itemsPerPage = 8;

  const { roleAdmin } = useContext(AuthContext);
  const [allInvestment, setAllInvestment] = useState();
  const [userOperations, setUserOperations] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = userOperations.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const allInv = await service.get("/account/investments");
      const userOperation = await service.get(
        "/account/investments/user-investment"
      );
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
    return <Spinner color="primary" style={{paddingTop:"20px"}}/>;
  }

  return (
    <div style={{marginTop:"50px"}}>
      

      {roleAdmin === "Admin" && <NewInvestment getData={getData} />}

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <div style={{ width: isMobile ? "370px" : "580px" }}>
          <h2>Join a investment</h2>
          <div>
            {allInvestment.map((eachInvestment, i) => {
              const { name, risk, interesRate, category, duration, _id } =
                eachInvestment;
              return (
                <Card key={i} style={{ margin: "20px 0px" }}>
                  <CardHeader className="flex flex-row justify-between">
                    <p className="text-md">{name}</p>
                    <p className="text-small text-default-500">
                      <b>Interest Rate</b> {interesRate} %
                    </p>
                  </CardHeader>
                  <Divider />
                  <CardBody className="flex flex-row justify-between">
                    <p>
                      <b>Category:</b> {category}
                    </p>
                    <p>
                      <b>Duration Time:</b> {duration}
                    </p>
                    <p>
                      <b>Risk:</b> {risk}
                    </p>
                  </CardBody>
                  <Divider />
                  <CardFooter className="flex flex-row justify-between">
                    <AddInvestment getData={getData} idInvestment={_id} />
                    {errorMessage ? <p> {errorMessage}</p> : null}
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 32 32"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill="#06b6d4"
                        d="M16.5 14H20v-2h-2v-1h-2v1.05a2.5 2.5 0 0 0 .5 4.95h1a.5.5 0 0 1 0 1H14v2h2v1h2v-1.05a2.5 2.5 0 0 0-.5-4.95h-1a.5.5 0 0 1 0-1Z"
                      />
                      <path
                        fill="#06b6d4"
                        d="M29 13h-2.02A5.779 5.779 0 0 0 25 8.852V5a1 1 0 0 0-1.6-.8L19.667 7H15c-5.51 0-9.463 3.241-9.948 8H5a1 1 0 0 1-1-1v-2H2v2a3.003 3.003 0 0 0 3 3h.07A9.173 9.173 0 0 0 9 23.557V27a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-2h3v2a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-3.363A5.093 5.093 0 0 0 26.819 20H29a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1Zm-1 5h-2.876c-.305 2.753-.824 3.485-3.124 4.315V26h-2v-3h-7v3h-2v-3.622A7.013 7.013 0 0 1 7 16c0-4.835 4.018-7 8-7h5.333L23 7v2.776c2.418 1.86 1.913 3.186 2.018 5.224H28Z"
                      />
                    </svg>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
        <div style={{ width: isMobile ? "370px" : "480px" }}>
          <Image src="https://quietinvestment.com/wp-content/uploads/2023/02/types-of-investment-funds.jpg" isBlurred isZoomed alt="asf" style={{marginTop:"44px",marginBottom:"10px", borderRadius:"50px"}} />
          <h2>User Investment</h2>
          <Pagination
            total={Math.ceil(userOperations.length / itemsPerPage)}
            initialPage={1}
            onChange={setCurrentPage}
            className="mt-2"
          />
          <div>
            {currentItems.map((eachInvestment, i) => {
              const { amount, status, earnings } = eachInvestment;
              eachInvestment;
              return (
                <Card style={{ margin: "20px 0px" }} key={i}>
                  <CardHeader className="flex flex-row justify-between">
                    <p className="text-md">
                      <b>Amount invested: </b>
                      {amount}€
                    </p>
                    <p className="text-small text-default-500">
                      <b>Status:</b> {status}
                    </p>
                    <p
                      className="text-md"
                      style={{
                        color: earnings > 0 ? 'green' : (earnings < 0 ? 'red' : 'yellow'),
                     }}
                    >
                      <b>Earnings: </b>
                      {earnings ? earnings.toFixed(2) : '0.00'}€
                    </p>
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
