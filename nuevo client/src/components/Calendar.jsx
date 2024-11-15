import React, { useEffect, useState } from "react";
import { link } from "../utilities/functions";

const Calendar = () => {
  const [registros, setRegistros] = useState([]);
  const Fechas = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ];

  useEffect(() => {
    link.getRegistersI().then((array) => setRegistros(array));
    console.log(registros);
  }, []);

  return (
    <div className="calendar shadow-lg w-1/4 mx-auto flex flex-col">
      <div className="calendar__header bg-gray-50 font-light text-xl text-center mb-2">
        <h1 className="text-3xl font-semibold">Enerinho</h1>
      </div>
      <div className="calendar_body bg-slate-200 grid grid-cols-7 grid-rows-4 text-center rounded-lg">
        {Fechas.map((fecha) => {})}
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
