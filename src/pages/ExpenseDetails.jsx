import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import service from "../services/service.config"
import moment from "moment"
import {Button} from "@nextui-org/react";
import ExpenseForm from "../components/ExpenseForm";

export default function ExpenseDetails() {
  const isEdit = true
  const [ oneExpense, setOneExpense ] = useState()
  
  const navigate = useNavigate()

  const params = useParams()

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      const response = await service.get(`/account/expenses/${params.idExpense}/details`)
      setOneExpense(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async () => {
    try {
      await service.delete(`/account/expenses/${params.idExpense}/delete`)
      navigate('/account/expenses')
    } catch (error) {
      console.log(error)
    }
  }

  if (oneExpense === undefined) {
    return <div>Cargando...</div>
  }

  return (
    <div>
      <h1>{oneExpense.name}</h1>
      <p>{oneExpense.category}</p>
      <p>{oneExpense.amount}</p>
      <p>{oneExpense.notes}</p>
      <p>{moment(oneExpense.date).format('lll')}</p>

      <ExpenseForm isEdit={isEdit} idExpense={params.idExpense} getData={getData} oneExpense={oneExpense}/>
      <Button color="danger" variant="bordered" onClick={ handleDelete }>
        Delete user
      </Button>
    </div>

    
  )
}
