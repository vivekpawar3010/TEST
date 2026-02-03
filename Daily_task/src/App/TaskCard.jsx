import TaskItem from "./TaskItem";

import "../CSS/TaskCard.css";

function TaskCard({ title, buttonLabel, tasks, setTasks, color }) {
  const addTask = () => {
    setTasks((prev) => [
      ...prev,
      { id: Date.now().toString(), text: "New task...", completed: false },
    ]);
  };

  return (
    <div className={`card task-card task-card--${color}`}>
      <div className="task-card__header">
        <h2 className="card-title">
          <span className="card-dot" />
          {title}
        </h2>
        <button
          onClick={addTask}
          className="task-card__button"
        >
          {buttonLabel}
        </button>
      </div>

      <ul className="task-list">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            tasks={tasks}
            setTasks={setTasks}
            color={color}
          />
        ))}
      </ul>
    </div>
  );
}

export default TaskCard;
