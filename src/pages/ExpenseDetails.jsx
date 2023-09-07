import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import service from "../services/service.config";
import moment from "moment";
import ExpenseForm from "../components/ExpenseForm";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Button,
  Spinner,
  Chip,
} from "@nextui-org/react";
import { isMobile } from "react-device-detect";


export default function ExpenseDetails() {
  const isEdit = true;
  const [oneExpense, setOneExpense] = useState();

  const navigate = useNavigate();

  const params = useParams();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await service.get(
        `/account/expenses/${params.idExpense}/details`
      );
      setOneExpense(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      await service.delete(`/account/expenses/${params.idExpense}/delete`);
      navigate("/account/expenses");
    } catch (error) {
      console.log(error);
    }
  };

  if (oneExpense === undefined) {
    return <Spinner color="primary" style={{paddingTop:"20px"}} />;
  }

  return (
    <div style={{ paddingTop: "100px" }}>
      <Card className="max-w-[400px] mb-2">
        <CardHeader className="flex justify-between" >
            <p className="text-small text-default-500">
              <Chip color="default">{oneExpense.category}</Chip>
            </p>
            <p className="text-md hover:font-bold">{oneExpense.name}</p>
            <Chip color="success" variant="shadow" className="text-3xl font-bold">{oneExpense.amount.toFixed(2)} €</Chip>
        </CardHeader>
        <Divider />
        <CardBody style={{ padding: "0px 100px 0px 100px", marginTop: "20px", marginBottom: "20px" }} > 
          <p className="flex justify-center text-center" >{oneExpense.notes}</p>
        </CardBody>
        <Divider />
        <CardFooter className="flex justify-between">
          <div>
            <p className="text-small text-default-500">{moment(oneExpense.date).format("lll")}</p>
          </div>
          <div style={{display: "flex", gap: "20px"}}>
            <ExpenseForm
              isEdit={isEdit}
              idExpense={params.idExpense}
              getData={getData}
              oneExpense={oneExpense}
            />
            <Button color="danger" variant="shadow" onClick={handleDelete} size="sm">
              Delete Expense
            </Button>
          </div>
        </CardFooter>
      </Card>
      <Button as={Link} color="primary" size="sm" variant="bordered" onClick={() => navigate('/account/expenses')}><svg width="20" height="20" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <path fill="#78a3ad" d="M52.52 92.09h-6.43c-.26 0-.49.16-.57.4L35.17 120l.07.57c.11.17.3.27.51.27h6.77c.27 0 .5-.17.59-.43l1.57-4.72h9.25l1.57 4.72c.08.25.32.43.58.43h6.78c.2 0 .39-.1.5-.27l.07-.57L53.1 92.49c-.1-.24-.32-.4-.58-.4zm-5.9 17.75l2.69-8.09l2.68 8.09h-5.37zm-16.07-3.89c1.57-1.49 2.55-3.49 2.55-5.7c0-4.57-4.14-8.29-9.21-8.29H13.47c-.34 0-.62.27-.62.62v27.78c0 .34.28.62.62.62H25.2c5.08 0 9.21-3.72 9.21-8.3c0-2.78-1.53-5.22-3.86-6.73zm-7.08-2.58h-3.85l-.13-4.88l-.02-.84h.02l.62-.03l3.35-.12c1.55 0 2.8 1.31 2.8 2.93c.01 1.63-1.25 2.94-2.79 2.94zm.22 12.24h-4.05v-.01l-.15-6.63l.62-.02l3.22-.11l.36-.01c.04 0 .08.01.11.01c1.66.07 3 1.55 3 3.38c0 1.83-1.33 3.32-3 3.39c-.03-.01-.06 0-.11 0zm61.82-4.55l-.27.06c-1.74 1.38-4.73 2.42-6.96 2.42c-4.3 0-7.3-2.91-7.3-7.07c0-4.17 3-7.08 7.3-7.08c2.33 0 4.72.75 6.23 1.95l.27.07l.22-.16l3.45-6.28l-.08-.42c-2.62-2.06-5.92-3.07-10.12-3.07c-8.94 0-15.43 6.3-15.43 14.99c0 8.68 6.49 14.98 15.43 14.98c4.09 0 7.63-1.25 10.5-3.7l.08-.4l-3.1-6.12l-.22-.17zm20.29-5.81l8.18-12.33a.62.62 0 0 0 .03-.63a.622.622 0 0 0-.55-.32h-6.72c-.21 0-.4.1-.52.27l-7.42 11.19V92.57c0-.34-.28-.62-.62-.62h-6.03c-.34 0-.61.27-.61.62v27.78c0 .34.28.62.61.62h6.03c.34 0 .62-.28.62-.62v-13.21l8.48 13.55c.12.18.31.29.52.29h6.73c.23 0 .43-.12.53-.32a.6.6 0 0 0-.01-.62l-9.25-14.79z"/>
    <path fill="#40c0e7" d="m14.78 47.94l47.61-34.9v21.77h50.83v26.04H62.39v22L14.78 47.94z"/>
</svg> </Button>
    </div>
  );
}
