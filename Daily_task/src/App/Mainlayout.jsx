import RoutineSection from "./RoutineSection";
import TaskColumn from "./TaskColumn";

import "../CSS/Mainlayout.css";

function MainLayout({
    routine,
    setRoutine,
    todayTasks,
    setTodayTasks,
    weekTasks,
    setWeekTasks,
}) {
    return (
        <main className="layout">
            <RoutineSection routine = {routine} setRoutine = {setRoutine}/>

            <TaskColumn
                todayTasks = {todayTasks}
                setTodayTasks = {setTodayTasks}
                weekTasks = {weekTasks}
                setWeekTasks = {setWeekTasks}
            />
        </main>
    );
}

export default MainLayout;
