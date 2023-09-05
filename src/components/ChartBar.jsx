import moment from "moment";
import { Chart } from "react-chartjs-2";
import Charts from "chart.js/auto";

export default function ChartBar(props) {
  const data = {
    labels: props.userData.expenses.map((transaction) => {
      return moment(transaction.date).format("DD/MM/YYYY");
    }),
    datasets: [
      {
        label: "Amount",
        data: props.userData.expenses.map((transaction) => {
          return transaction.amount;
        }),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'category', // Esto configura la escala de categoría para el eje X
      },
    },
  };

  return (
    <div>
      <Chart type="bar" data={data} options={options} />
    </div>
  );
}