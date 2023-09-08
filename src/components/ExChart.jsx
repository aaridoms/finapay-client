import { Bar } from "react-chartjs-2";

export default function ExChart(props) {

  let expensesByCategory = props.userExpenses.reduce((acc, expense) => {
    let category = expense.category;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += expense.amount;
    return acc;
  }, {});

  let labels = [...new Set([...Object.keys(expensesByCategory)])].sort();

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Expenses by category",
        data: labels.map(date => expensesByCategory[date] || 0),
        backgroundColor: ["rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    scales: {
      x: {
        ticks: {
          beginAtZero: true,
        },
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
        text: "Expenses by Category",
      },
    },
  };
  

  return (
    <div>
      <Bar type="bar" data={data} options={options}/>
    </div>
  )
}
