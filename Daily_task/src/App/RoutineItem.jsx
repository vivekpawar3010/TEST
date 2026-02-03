import "../CSS/RoutineItem.css";

function RoutineItem({ item, updateRoutine }) {
  return (
    <div className="routine-item">
      <div className="routine-time">
        <input
          type="text"
          value={item.time}
          onChange={(e) => updateRoutine(item.id, "time", e.target.value)}
          className="routine-time__input"
        />
      </div>

      <div className="routine-content">
        <div className="routine-dot" />
        <input
          type="text"
          value={item.label}
          onChange={(e) => updateRoutine(item.id, "label", e.target.value)}
          className="routine-label"
        />
      </div>
    </div>
  );
}

export default RoutineItem;
