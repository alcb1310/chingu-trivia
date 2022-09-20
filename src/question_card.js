import React, { useState } from "react";

import { Card, Row, Col, Button, Container } from "react-bootstrap";

function QuestionCard(props) {
  const {
    question,
    choices,
    questionNumber,
    chooseAnswer,
    nextQuestion,
    totalQuestions,
    enableSubmit,
    endOfGame,
    restart,
    correctAnswer,
  } = props;
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const answerEl = choices.map((answer, idx) => {
    return (
      <Col md={6} sm={12} className="d-grid gap-2 mt-2" key={idx}>
        <Button
          variant={
            selectedAnswer === ""
              ? "outline-primary"
              : selectedAnswer === correctAnswer && selectedAnswer === answer
              ? "success"
              : selectedAnswer === answer
              ? "danger"
              : correctAnswer === answer
              ? "outline-success"
              : "outline-danger"
          }
          size="lg"
          onClick={() => {
            setSelectedAnswer(answer);
            chooseAnswer(answer);
          }}
          disabled={enableSubmit}
        >
          {answer}
        </Button>
      </Col>
    );
  });

  const cardTitle =
    endOfGame === ""
      ? `Question ${questionNumber}/${totalQuestions}`
      : endOfGame;

  const cardBody =
    endOfGame === "" ? (
      <>
        <p>{question}</p>
        <Row>{answerEl}</Row>
      </>
    ) : (
      <Row>
        <Col sm={12} className="d-grid gap-2 mt-2">
          <Button
            variant="primary"
            size="lg"
            onClick={restart}
            disabled={!enableSubmit}
          >
            Play Again
          </Button>
        </Col>
      </Row>
    );

  const cardFooter =
    endOfGame === "" ? (
      <Card.Footer>
        <Row>
          <Col sm={12} className="d-grid gap-2 mt-2">
            <Button
              variant="primary"
              size="lg"
              onClick={() => {
                setSelectedAnswer("")
                nextQuestion()
              }}
              disabled={!enableSubmit}
            >
              Submit
            </Button>
          </Col>
        </Row>
      </Card.Footer>
    ) : (
      ""
    );

  return (
    <Container className="p-3">
      <Card>
        <Card.Header className="bg-success text-light p-3">
          {cardTitle}
        </Card.Header>
        <Card.Body>{cardBody}</Card.Body>
        {cardFooter}
      </Card>
    </Container>
  );
}

export default QuestionCard;
