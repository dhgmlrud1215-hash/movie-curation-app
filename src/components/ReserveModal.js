function ReserveModal({ movie, onClose }) {
  return (
    <div className="modal-bg">
      <div className="reserve-modal">
        <button className="close-btn" onClick={onClose}>×</button>

        <h3>{movie.title}</h3>
        <p>관람일과 시간을 선택해주세요.</p>

        <label>관람일</label>
        <input type="date" className="reserve-input" />

        <label>관람 시간</label>
        <select className="reserve-input">
          <option>10:00</option>
          <option>12:00</option>
          <option>14:00</option>
          <option>16:00</option>
          <option>18:00</option>
          <option>21:00</option>
        </select>

        <button className="reserve-confirm">예매 확인</button>
      </div>
    </div>
  );
}

export default ReserveModal;