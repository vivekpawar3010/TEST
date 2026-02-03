import TaskCard from "./TaskCard";
import QuoteCard from "./QuoteCard";

import "../CSS/TaskColumn.css";

function TasksColumn({
  todayTasks,
  setTodayTasks,
  weekTasks,
  setWeekTasks,
}) {
  return (
    <div className="tasks-column">
      <TaskCard
        title="Today / Tomorrow Tasks"
        buttonLabel="+ Add Task"
        tasks={todayTasks}
        setTasks={setTodayTasks}
        color="emerald"
      />

      <TaskCard
        title="This Week Tasks"
        buttonLabel="+ Add Goal"
        tasks={weekTasks}
        setTasks={setWeekTasks}
        color="indigo"
      />

      <QuoteCard />
    </div>
  );
}

export default TasksColumn;
