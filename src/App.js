import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  const [showAdd, setShowAdd] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const initTasks = async () => {
      const data = await fetchTasks();
      setTasks(data);
    };

    initTasks();
  }, []);

  //fetch data
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:8000/tasks");
    const data = await res.json();
    //return data so other places might use it as well
    return data;
  };

  const deleteTask = async (id) => {
    await fetch(`http://localhost:8000/tasks/${id}`, {
      method: "DELETE",
    });

    setTasks(tasks.filter((task) => task.id !== id));
  };

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:8000/tasks/${id}`);
    const data = await res.json();

    return data;
  };

  const toggleTask = async (id) => {
    const task = await fetchTask(id);

    const res = await fetch(`http://localhost:8000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...task, reminder: !task.reminder }),
    });

    const data = await res.json();

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    );
  };

  const addTask = async (newTask) => {
    const res = await fetch("http://localhost:8000/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newTask),
    });

    const data = await res.json();
    setTasks([...tasks, data]);

    // const id =
    //   tasks.length > 0
    //     ? tasks.reduce(
    //         (biggestId, task) => (task.id > biggestId ? task.id : biggestId),
    //         tasks[0].id
    //       ) + 1
    //     : 1;

    // setTasks([...tasks, { id, ...newTask }]);
    //setShowAdd(false);
  };

  return (
    <Router>
      <div className="container">
        <Header onAdd={() => setShowAdd(!showAdd)} showAdd={showAdd} />
        <Route
          path="/"
          exact
          render={(props) => (
            <>
              {showAdd && <AddTask onAdd={addTask} />}
              {tasks.length > 0 ? (
                <Tasks
                  tasks={tasks}
                  onDelete={deleteTask}
                  onToggle={toggleTask}
                />
              ) : (
                "No Tasks Yet=.=Baby~"
              )}
            </>
          )}
        />
        <Route path="/about" component={About} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
