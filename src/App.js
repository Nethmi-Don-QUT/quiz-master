import "./styles/styles.scss";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import Quizinstructions from "./components/quiz/Quizinstructions";
import Play from "./components/quiz/Play";
import QuizSummary from "./components/quiz/QuizSummary";


function App() {
  const [playStats, setPlayStats] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" exact Component={Home} />
        <Route path="/play/instructions" exact Component={Quizinstructions} />
        <Route path="/play/quiz" element={<Play setPlayStats={setPlayStats} />} />
        <Route path="/play/quizSummary" element={<QuizSummary playStats={playStats} />} />
      </Routes>
    </Router>
  );
}

export default App;
