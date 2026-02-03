import RoutineItem from "./RoutineItem";

import "../CSS/RoutineSection.css";

function RoutineSection({ routine, setRoutine }) {
  const updateRoutine = (id, field, value) => {
    setRoutine((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  return (
    <section className="routine">
      <div className="card routine-card">
        <h2 className="card-title routine-title">
          <span className="card-dot card-dot--blue" />
          Daily Routine
        </h2>

        <div className="routine-list">
          {routine.map((item) => (
            <RoutineItem
              key={item.id}
              item={item}
              updateRoutine={updateRoutine}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default RoutineSection;
