import { useState, useEffect } from "react";

import "../CSS/App.css";

import Header from "./Header";
import Footer from "./Footer";
import MainLayout from "./Mainlayout";

const INITIAL_ROUTINE = [
  { id: "1", time: "06:00 AM", label: "Wake up" },
  { id: "2", time: "06:15 AM", label: "Exercise & Yoga" },
  { id: "3", time: "06:45 AM", label: "Bath" },
  { id: "4", time: "07:15 AM", label: "Healthy Breakfast" },
  { id: "5", time: "08:00 AM", label: "Deep Work Session" },
  { id: "6", time: "12:00 PM", label: "Lunch & Break" },
  { id: "7", time: "01:30 PM", label: "Meetings / Admin" },
  { id: "8", time: "05:00 PM", label: "Evening Walk" },
  { id: "9", time: "07:00 PM", label: "Dinner" },
  { id: "10", time: "09:00 PM", label: "Reading & Wind down" },
  { id: "11", time: "10:00 PM", label: "Sleep" },
];

const INITIAL_TODAY_TASKS = [
  { id: "t1", text: "Finish project documentation", completed: false },
  { id: "t2", text: "Reply to urgent emails", completed: false },
  { id: "t3", text: "Call the bank", completed: false },
];

const INITIAL_WEEK_TASKS = [
  { id: "w1", text: "Clean the apartment", completed: false },
  { id: "w2", text: "Grocery shopping", completed: false },
  { id: "w3", text: "Read 50 pages of new book", completed: false },
];

function App() {
  const [routine, setRoutine] = useState(
    JSON.parse(localStorage.getItem("routine")) || INITIAL_ROUTINE
  );
  const [todayTasks, setTodayTasks] = useState(
    JSON.parse(localStorage.getItem("todayTasks")) || INITIAL_TODAY_TASKS
  );
  const [weekTasks, setWeekTasks] = useState(
    JSON.parse(localStorage.getItem("weekTasks")) || INITIAL_WEEK_TASKS
  );

  useEffect(() => {
    localStorage.setItem("routine", JSON.stringify(routine));
    localStorage.setItem("todayTasks", JSON.stringify(todayTasks));
    localStorage.setItem("weekTasks", JSON.stringify(weekTasks));
  }, [routine, todayTasks, weekTasks]);

  return (
    <div className="app">
      <Header />

      <MainLayout
        routine={routine}
        setRoutine={setRoutine}
        todayTasks={todayTasks}
        setTodayTasks={setTodayTasks}
        weekTasks={weekTasks}
        setWeekTasks={setWeekTasks}
      />

      <Footer />
    </div>
  );
}

export default App;
