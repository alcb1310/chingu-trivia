import React, { useState, useEffect } from "react";
import axios from "axios";
import { FormSelect, Row, Col } from "react-bootstrap";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import NavigationBar from "./navigation_bar";
import QuestionCard from "./question_card";

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

function App() {
  const [questionsTopic, setQuestionsTopic] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [endMessage, setEndMessage] = useState("");
  const [enableSubmit, setEnableSubmit] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://johnmeade-webdev.github.io/chingu_quiz_api/trial.json")
      .then((results) => {
        setData(results.data)
        const topic_array = results.data.map((topic) => topic.topic);
        setQuestionsTopic(topic_array.filter(onlyUnique));
      });
    setQuestionNumber(0);
  }, []);

  function chooseAnswer(answer) {
    const correctAnswer =
      selectedQuestions[questionNumber - 1].choices[
        selectedQuestions[questionNumber - 1].answer
      ];
    if (correctAnswer === answer) {
      setScore((prev) => prev + 1);
    }
    setEnableSubmit(true);
  }

  function restart() {
    setSelectedTopic("");
    setSelectedQuestions([]);
  }

  function nextQuestion() {
    const nextQuestionIndex = questionNumber;
    if (nextQuestionIndex < selectedQuestions.length) {
      setQuestionNumber((prev) => prev + 1);
      setEnableSubmit(false);
    } else {
      setEndMessage(
        `Game Over! Final Score ${score} / ${selectedQuestions.length}`
      );
    }
  }

  useEffect(() => {
    setAnswers(() => {
      const my_answers = [];

      if (selectedQuestions.length > 0) {
        for (const answer in selectedQuestions[questionNumber - 1].choices) {
          my_answers.push(
            selectedQuestions[questionNumber - 1].choices[answer]
          );
        }
      }
      return my_answers;
    });
  }, [questionNumber]);

  const uniqueAnswers = answers.filter(onlyUnique);

  const optionsEl = questionsTopic.map((question, idx) => (
    <option key={idx} value={question}>
      {question}
    </option>
  ));

  function handleChange(e) {
    const { value } = e.target;
    setSelectedTopic(value);
    setSelectedQuestions(data.filter((ques) => ques.topic === value));
    setQuestionNumber(1);
  }

  const topicSelection = (
    <Row className="m-1">
      <Col md={{ offset: 3, span: 6 }} sm={12}>
        <FormSelect value={selectedTopic} onChange={handleChange}>
          <option value="">--- Select your topic ---</option>
          {optionsEl}
        </FormSelect>
      </Col>
    </Row>
  );

  const endOfGame = endMessage === "" ? "" : <p>{endMessage}</p>;

  const questionCard = (
    <QuestionCard
      question={
        selectedQuestions.length && questionNumber <= selectedQuestions.length
          ? selectedQuestions[questionNumber - 1].question
          : ""
      }
      choices={uniqueAnswers}
      chooseAnswer={chooseAnswer}
      questionNumber={questionNumber}
      nextQuestion={nextQuestion}
      totalQuestions={selectedQuestions.length}
      enableSubmit={enableSubmit}
      endOfGame={endOfGame}
      restart={restart}
      correctAnswer={
        selectedQuestions.length && questionNumber <= selectedQuestions.length
          ? selectedQuestions[questionNumber - 1].choices[
              selectedQuestions[questionNumber - 1].answer
            ]
          : ""
      }
    />
  );

  const whatToShow =
    selectedQuestions.length === 0 ? topicSelection : questionCard;

  return (
    <div className="App">
      <header className="AppHeader">
        <NavigationBar />
      </header>
      <section id="questions">{whatToShow}</section>
    </div>
  );
}

export default App;
