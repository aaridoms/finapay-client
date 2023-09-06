import moment from "moment";
import { Chart } from "react-chartjs-2";
import Charts from "chart.js/auto";

export default function ChartBar(props) {
  let expensesByDate = props.userData.expenses.reduce((acc, expense) => {
    let date = moment(expense.date).format("DD/MM");
    if (!acc[date]) {
      acc[date] = 0;
    }
    acc[date] += expense.amount;
    return acc;
  }, {});
  
  let transactionsByDatePos = props.transactionData.reduce((acc, transaction) => {
    let date = moment(transaction.date).format("DD/MM");
    if (!acc[date]) {
      acc[date] = 0;
    }

    if (transaction.from._id !== props.userData._id) {
      acc[date] += transaction.amount;
    }

    return acc;

  }, {});

  let transactionsByDateNeg = props.transactionData.reduce((acc, transaction) => {
    let date = moment(transaction.date).format("DD/MM");
    if (!acc[date]) {
      acc[date] = 0;
    }

    if (transaction.from._id === props.userData._id) {
      acc[date] -= transaction.amount;
    } 

    return acc;
  }, {});
  
  let labels = [...new Set([...Object.keys(expensesByDate), ...Object.keys(transactionsByDatePos), ...Object.keys(transactionsByDateNeg)])].sort();
  
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Expenses Amount",
        data: labels.map(date => expensesByDate[date] || 0),
        backgroundColor: ["rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
      {
        label: "Transactions positive",
        data: labels.map(date => transactionsByDatePos[date] || 0),
        backgroundColor: ["rgba(43, 89, 63, 0.2)"],
        borderColor: ["rgba(43, 89, 63, 1)"],
        borderWidth: 1,
      },
      {
        label: "Transactions negative",
        data: labels.map(date => transactionsByDateNeg[date] || 0),
        backgroundColor: ["rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)"],
        
        borderWidth: 1,
      }
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'category',
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    
      <Chart type="bar" data={data} options={options} />
  
  );
}