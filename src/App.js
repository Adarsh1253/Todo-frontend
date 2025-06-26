import React, { useState, useEffect } from "react";
import AuthForm from "./components/AuthForm";
import TaskList from "./components/TaskList";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check token on page reload
    const token = localStorage.getItem("token");
    if (token) setIsLoggedIn(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      <h1>MERN Todo App</h1>
      {isLoggedIn ? (
        <>
          <button onClick={handleLogout}>Logout</button>
          <TaskList />
        </>
      ) : (
        <AuthForm onAuthSuccess={() => setIsLoggedIn(true)} />
      )}
    </div>
  );
}

export default App;
