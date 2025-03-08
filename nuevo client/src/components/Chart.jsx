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
  const [type, setType] = useState(["GLUCOSA"]);
  const [registros, setRegistros] = useState([]);
  const [insulina, setChartData] = useState({});
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
      const glucosa = res.map((registro) => {
        if (type == "GLUCOSA") {
          return registro.Glucosa;
        } else if (type == "INSULINA") {
          return registro.Dosis;
        }
      });

      const otroArray = res.map((registro) => {
        {
          return new Date(
            registro.Fecha.split("T")[0].split("-")[0],
            registro.Fecha.split("T")[0].split("-")[1],
            registro.Fecha.split("T")[0].split("-")[2]
          ).getDate();
        }
      });
      setDays(otroArray);
      setRegistros(glucosa);
    });
    setLoading(false);
  }, [type]);

  return !loading ? (
    <>
      <div className="flex w-full  ">
        <div className=" flex-row flex mx-auto gap-10">
          <input
            type="button"
            className="font-semibold text-xl"
            value="<"
            onClick={() =>
              type == "GLUCOSA" ? setType("INSULINA") : setType("GLUCOSA")
            }
          />
          <h1 className="text-xl font-semibold">Gráfica de {type}</h1>
          <input
            type="button"
            className="font-semibold text-xl"
            value=">"
            onClick={() =>
              type == "GLUCOSA" ? setType("INSULINA") : setType("GLUCOSA")
            }
          />
        </div>
      </div>
      <Line
        data={{
          labels: days,
          datasets: [
            {
              label: "Ventas",
              data: registros,
              borderColor: `${
                type == "GLUCOSA"
                  ? "rgba(255, 99, 132, 1)"
                  : "rgba(0, 0, 255, 1)"
              }`,
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              pointBackgroundColor: `${
                type == "GLUCOSA"
                  ? "rgba(255, 99, 132, 1)"
                  : "rgba(0, 0, 255, 1)"
              }`,
              pointBorderColor: `${
                type == "GLUCOSA"
                  ? "rgba(255, 99, 132, 1)"
                  : "rgba(0, 0, 255, 1)"
              }`,
              pointHoverBackgroundColor: "rgba(255, 99, 132, 1)",
              pointHoverBorderColor: "rgba(255, 99, 132, 1)",
            },
          ],
        }}
      />
    </>
  ) : (
    <></>
  );
};
export default Chart;
