import TrashIcon from "./TrashIcon";

import "../CSS/TaskItem.css";

function TaskItem({ task, tasks, setTasks, color }) {
  const toggle = () => {
    setTasks(
      tasks.map((t) =>
        t.id === task.id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const update = (text) => {
    setTasks(
      tasks.map((t) => (t.id === task.id ? { ...t, text } : t))
    );
  };

  const remove = () => {
    setTasks(tasks.filter((t) => t.id !== task.id));
  };

  return (
    <li className="task-item">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={toggle}
        className={`task-checkbox task-checkbox--${color}`}
      />
      <input
        type="text"
        value={task.text}
        onChange={(e) => update(e.target.value)}
        className={`task-text ${task.completed ? "task-text--done" : ""}`}
      />
      <button
        onClick={remove}
        className="task-remove"
        title="Remove task"
      >
        <TrashIcon />
      </button>
    </li>
  );
}

export default TaskItem; 
