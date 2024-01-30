import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const Quizinstructions = () => (
    <Fragment>
        <Helmet>
            <title>Quiz instructions</title>
        </Helmet>
        <div className="instructions" id="instructions">
            <section>
                <h1>How to paly this quiz</h1>
                <p>Ensure you read this guide from start to finish</p>
                <ul className="browser-dafualt" id="main-list">
                    <li>The quiz has a duration of 1 minutes and ends as soon as your time elapses. </li>
                    <li>Every question contains 4 options</li>
                    <li>Clicking the "Hint" checkbox provides additional assistance.</li>
                    <li>Make sure to answer all questions and manage your time effectively.</li>
                    <li>Your answers will be submitted when the quiz timer expires.</li>
                    <li>Have fun and test your knowledge!</li>
                    <li>Good luck!</li>
                </ul>
                <div className="button-container">
                    <Link to="/"><button id="back-button">Go Back</button></Link>
                    <Link to="/play/quiz"><button id="start-button">Start</button></Link>
                </div>
            </section>
        </div>
    </Fragment>
);

export default Quizinstructions;