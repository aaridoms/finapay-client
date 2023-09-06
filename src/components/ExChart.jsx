import moment from "moment";
import { Chart } from "react-chartjs-2";

export default function ExChart(props) {

  let expensesByDate = props.userExpenses.reduce((acc, expense) => {
    let date = moment(expense.date).format("DD/MM/YYYY");
    if (!acc[date]) {
      acc[date] = 0;
    }
    acc[date] += expense.amount;
    return acc;
  }, {});

  let labels = [...new Set([...Object.keys(expensesByDate)])].sort();

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
    <div>
      <Chart type="bar" data={data} options={options} />
    </div>
  )
}
