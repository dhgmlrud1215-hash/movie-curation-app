import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function ReserveModal({ movie, onClose }) {
  const [date, setDate] = useState(new Date());

  const newReserve = {
      movieTitle: movie.title,
      date: selectedDate,
      people: people,
    };

    const preReserve = JSON.parse(localStorage.getItem("reservations")) || [];
    localStorage.setItem("reservations", JSON.stringify([...preReserve,newReserve]));

    alert("예매가 완료되었습니다.")

  return (
    <div className="modal-bg">
      <div className="reserve-modal">
        <button className="close-btn" onClick={onClose}>×</button>

        <h3>{movie.title}</h3>
        <p>관람일과 시간을 선택해주세요.</p>

        <Calendar 
            onChange={setDate} 
            value={date}
            formatDay={(locale, date) => date.getDate()}
             />

        <label>관람 시간</label>
        <select className="reserve-input">
          <option>10:00</option>
          <option>12:00</option>
          <option>14:00</option>
          <option>16:00</option>
          <option>18:00</option>
          <option>21:00</option>
        </select>

        <button className="reserve-confirm">예매 하기</button>
      </div>
    </div>
  );
}

export default ReserveModal;