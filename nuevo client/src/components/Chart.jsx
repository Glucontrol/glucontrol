import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  LineController,
  Title,
} from "chart.js";
import { useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title
);
import { Line } from "react-chartjs-2";
import { link } from "../utilities/functions";

const Chart = () => {
  const [registros, setRegistros] = useState([]);
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState([1, 2, 3, 4, 5, 6]);

  useEffect(() => {
    const maxDate = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      0
    );

    //Días
    let array = [];
    for (let i = 1; i < maxDate.getDate(); i++) {
      array.push(i);
    }
    setDays(array);

    //Registros
    link.getRegistersI().then((res) => {
      const insulina = res.map((registro) => {
        console.log("map", registro);
        return registro.Glucosa;
      });
      const otroArray = res.map((registro) => {
        if (typeof registro.Glucosa == "string") {
          return new Date(
            registro.Fecha.split("T")[0].split("-")[0],
            registro.Fecha.split("T")[0].split("-")[1],
            registro.Fecha.split("T")[0].split("-")[2]
          ).getDate();
        }
      });
      setDays(otroArray);
      setRegistros(insulina);
    });
    setLoading(false);
  }, []);

  return !loading ? (
    <Line
      data={{
        labels: days,
        datasets: [
          {
            label: "Ventas",
            data: registros,
            borderColor: "rgba(255, 99, 132, 1)",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            pointBackgroundColor: "rgba(255, 99, 132, 1)",
            pointBorderColor: "rgba(255, 99, 132, 1)",
            pointHoverBackgroundColor: "rgba(255, 99, 132, 1)",
            pointHoverBorderColor: "rgba(255, 99, 132, 1)",
          },
        ],
      }}
    />
  ) : (
    <></>
  );
};
export default Chart;
