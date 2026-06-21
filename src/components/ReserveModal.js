import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function ReserveModal({ movie, onClose }) {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("10:00");
  const [people, setPeople] = useState(1);

  const handleReserve = () => {
    const newReserve = {
      movieTitle: movie.title,
      date: date.toLocaleDateString(),
      time: time,
      people: people,
    };

    const prevReserve = JSON.parse(localStorage.getItem("reservations")) || [];
    localStorage.setItem(
      "reservations",
      JSON.stringify([...prevReserve, newReserve])
    );

    alert("예매가 완료되었습니다.");
    onClose();
  };

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
        <select
          className="reserve-input"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        >
          <option>10:00</option>
          <option>12:00</option>
          <option>14:00</option>
          <option>16:00</option>
          <option>18:00</option>
          <option>21:00</option>
        </select>

        <label>인원</label>
        <select
          className="reserve-input"
          value={people}
          onChange={(e) => setPeople(e.target.value)}
        >
          <option value="1">1명</option>
          <option value="2">2명</option>
          <option value="3">3명</option>
          <option value="4">4명</option>
          <option value="5">5명</option>
          <option value="6">6명</option>
        </select>

        <button className="reserve-confirm" onClick={handleReserve}>
          예매 하기
        </button>
      </div>
    </div>
  );
}

export default ReserveModal;