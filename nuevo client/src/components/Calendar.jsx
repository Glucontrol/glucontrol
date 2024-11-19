import React, { useEffect, useState } from "react";
import { link } from "../utilities/functions";

const Calendar = ({ onClick, props }) => {
  const [registros, setRegistros] = useState([]);
  const Months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  let date = new Date();
  const [month, setMonth] = useState(date.getMonth());
  const [year, setYear] = useState(date.getFullYear());
  const [days, setDays] = useState([]);

  useEffect(() => {
    link.getRegistersI().then((array) => {
      let toRegistros = [];
      array.forEach((element) => {
        let fecha = element.Fecha.split("T", 2);
        let parts = fecha[0].split("-", 3);
        let elDate = new Date(parts[0], parts[1] - 1, parts[2]);
        toRegistros.push(elDate);
      });
      setRegistros(toRegistros);
    });
  }, []);

  useEffect(() => {
    let arr = [];
    for (let i = 1; i <= new Date(year, month + 1, 0).getDate(); i++) {
      arr.push(i);
    }
    setDays(arr);
  }, [month]);

  return (
    <div className="calendar  w-full mx-auto flex flex-col">
      <div className="calendar__header flex flex-row p-3 justify-between shadow-lg rounded-xl font-light text-xl text-center mb-2">
        <input
          type="button"
          value="<"
          className="font-bold cursor-pointer hover:scale-125 duration-150"
          onClick={() => {
            if (month > 0) {
              setMonth(month - 1);
            } else {
              setMonth(11);
              setYear(year - 1);
            }
          }}
        />
        <h1 className="text-xl font-semibold">
          {Months[month]} - {year}
        </h1>
        <input
          type="button"
          value=">"
          className="font-bold cursor-pointer hover:scale-125 duration-150"
          onClick={() => {
            if (month < 11) {
              setMonth(month + 1);
            } else {
              setMonth(0);
              setYear(year + 1);
            }
          }}
        />
      </div>
      <div className="calendar_body bg-slate-200 grid grid-cols-7 grid-rows-4 text-center rounded-lg">
        {days.map((day, index) => {
          const thatDay = new Date(year, month, day);
          const hasRegister = registros.find((el) => {
            return el.toDateString() == thatDay.toDateString();
          });
          const prevRegister = registros.find((el) => {
            return (
              el.toDateString() == new Date(year, month, day - 1).toDateString()
            );
          });
          const nextRegister = registros.find((el) => {
            return (
              el.toDateString() == new Date(year, month, day + 1).toDateString()
            );
          });

          return (
            <div
              className={`hover:-translate-y-1 ${
                !nextRegister ? "rounded-e-lg" : ""
              } ${
                !prevRegister ? "rounded-s-lg" : ""
              }  hover:bg-slate-400 duration-200 cursor-pointer hover:shadow-md  ${
                hasRegister ? "bg-sky-200 hover:bg-sky-300" : "bg-slate-200"
              }`}
              key={index}
            >
              {day}
            </div>
          );
        })}
        {/* <div className="hover:bg-gray-100 hover:-translate-y-1 hover:shadow-md duration-500 h-8  cursor-pointer">
          <span>1</span>
          </div>
          <div className="hover:bg-gray-100 hover:-translate-y-1 hover:shadow-md duration-500 h-8  cursor-pointer">
          <span>2</span>
        </div>
        <div className="hover:bg-gray-100 hover:-translate-y-1 hover:shadow-md duration-500 h-8  cursor-pointer">
          <span>3</span>
        </div>
        <div className="hover:bg-gray-100 hover:-translate-y-1 hover:shadow-md duration-500 h-8  cursor-pointer">
          <span>4</span>
        </div>
        <div className="hover:bg-gray-100 hover:-translate-y-1 hover:shadow-md duration-500 h-8  cursor-pointer">
          <span>5</span>
        </div>
        <div className="hover:bg-gray-100 hover:-translate-y-1 hover:shadow-md duration-500 h-8  cursor-pointer">
          <span>6</span>
        </div>
        <div className="hover:bg-gray-100 hover:-translate-y-1 hover:shadow-md duration-500 h-8  cursor-pointer">
          <span>7</span>
        </div>
        <div className="hover:bg-gray-100 hover:-translate-y-1 hover:shadow-md duration-500 h-8  cursor-pointer">
          <span>8</span>
        </div>
        <div className="hover:bg-gray-100 hover:-translate-y-1 hover:shadow-md duration-500 h-8  cursor-pointer">
          <span>9</span>
        </div>
        <div className="hover:bg-gray-100 hover:-translate-y-1 hover:shadow-md duration-500 h-8  cursor-pointer">
          <span>10</span>
        </div>
        <div className="hover:bg-gray-100 hover:-translate-y-1 hover:shadow-md duration-500 h-8  cursor-pointer">
          <span>11</span>
        </div>
        <div className="hover:bg-gray-100 hover:-translate-y-1 hover:shadow-md duration-500 h-8  cursor-pointer">
          <span>12</span>
        </div>
        <div className="hover:bg-gray-100 hover:-translate-y-1 hover:shadow-md duration-500 h-8  cursor-pointer">
          <span>13</span>
        </div>
        <div className="hover:bg-gray-100 hover:-translate-y-1 hover:shadow-md duration-500 h-8  cursor-pointer">
          <span>14</span>
        </div>
        <div className="hover:bg-gray-100 hover:-translate-y-1 hover:shadow-md duration-500 h-8  cursor-pointer">
          <span>15</span>
        </div>
        <div className="hover:bg-gray-100 hover:-translate-y-1 hover:shadow-md duration-500 h-8  cursor-pointer">
          <span>16</span>
        </div>
        <div className="hover:bg-gray-100 hover:-translate-y-1 hover:shadow-md duration-500 h-8  cursor-pointer">
          <span>17</span>
        </div>
        <div className="hover:bg-gray-100 hover:-translate-y-1 hover:shadow-md duration-500 h-8  cursor-pointer">
          <span>18</span>
        </div>
        <div className="hover:bg-gray-100 hover:-translate-y-1 hover:shadow-md duration-500 h-8  cursor-pointer">
          <span>19</span>
        </div>
        <div className="hover:bg-gray-100 hover:-translate-y-1 hover:shadow-md duration-500 h-8  cursor-pointer">
          <span>20</span>
        </div>
        <div className="hover:bg-gray-100 hover:-translate-y-1 hover:shadow-md duration-500 h-8  cursor-pointer">
          <span>21</span>
        </div>
        <div className="hover:bg-gray-100 hover:-translate-y-1 hover:shadow-md duration-500 h-8  cursor-pointer">
          <span>22</span>
        </div>
        <div className="hover:bg-gray-100 hover:-translate-y-1 hover:shadow-md duration-500 h-8  cursor-pointer">
          <span>23</span>
        </div>
        <div className="hover:bg-gray-100 hover:-translate-y-1 hover:shadow-md duration-500 h-8  cursor-pointer">
          <span>24</span>
        </div>
        <div className="hover:bg-gray-100 hover:-translate-y-1 hover:shadow-md duration-500 h-8  cursor-pointer">
          <span>25</span>
        </div>
        <div className="hover:bg-gray-100 hover:-translate-y-1 hover:shadow-md duration-500 h-8  cursor-pointer">
          <span>26</span>
        </div>
        <div className="hover:bg-gray-100 hover:-translate-y-1 hover:shadow-md duration-500 h-8  cursor-pointer">
          <span>27</span>
        </div>
        <div className="hover:bg-gray-100 hover:-translate-y-1 hover:shadow-md duration-500 h-8  cursor-pointer">
          <span>28</span>
        </div>
        <div className="hover:bg-gray-100 hover:-translate-y-1 hover:shadow-md duration-500 h-8  cursor-pointer">
          <span>29</span>
        </div>
        <div className="hover:bg-gray-100 hover:-translate-y-1 hover:shadow-md duration-500 h-8  cursor-pointer">
          <span>30</span>
        </div> */}
      </div>
    </div>
  );
};
export default Calendar;
