import React, { Component, Fragment } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import questions from '../../questions.json';
class QuizSummary extends Component {
    constructor(props) {
        super(props);
        this.playStats = {
            score: 0,
            numberofQuestions: 0,
            numberofAnsweredQuestions: 0,
            correctAnswers: 0,
            wrongAnswers: 0
        };
        //console.log(this.playStats);
    }

    componentDidMount() {
        const playStats = this.props.playStats;
        if (playStats !== null) {
            this.setState({
                score: (playStats.score / playStats.numberofQuestions) * 100,
                numberofQuestions: playStats.numberofQuestions,
                numberofAnsweredQuestions: playStats.numberofAnsweredQuestions,
                correctAnswers: playStats.correctAnswers,
                wrongAnswers: playStats.wrongAnswers
            });
        }
    }

    render() {
        const playstats = this.props.playStats;
        console.log(playstats);
        let stats, remark;

        if (playstats !== undefined && playstats !== null) {
            const score = (playstats.score / playstats.numberofQuestions) * 100;
            if (score <= 50) {
                remark = 'Better Luck next time!!!'
            }
            else (
                remark = 'You are a genius!!!'
            )
            stats = (<Fragment>
                <div className="container">
                    <h4>{remark}</h4>
                    <h2>Your Score: {score.toFixed(0)}&#37;</h2>
                    <span className="stat left">Total Number of Questions:</span>
                    <span className="right">{playstats.numberofQuestions}</span><br />

                    <span className="stat left">Number of Attempted questions:</span>
                    <span className="right">{playstats.numberofAnsweredQuestions}</span><br />

                    <span className="stat left">Number of Correct Answer:</span>
                    <span className="right">{playstats.correctAnswers}</span><br />

                    <span className="stat left">Number of Wrong Answer:</span>
                    <span className="right">{playstats.wrongAnswers}</span><br />
                </div>

                <div id="display-answers">
                    <h1>Questions and Answers Summary</h1>
                    <ul>
                        {questions.map((q, index) => (
                            <li key={index}>
                                <p><strong>{q.question}</strong> </p>
                                <p>{q.answer} </p>
                            </li>
                        ))}
                    </ul>
                </div>
                <section>
                    <div className="button-container">
                        <Link to="/"><button id="back-button">Back to Home</button></Link>
                        <Link to="/play/quiz"><button id="quit-button">Play Again</button></Link>
                    </div>
                </section>
            </Fragment>
            )
        }
        else {
            stats = <div id="summary">
                <h1 className="no-stats">No Statistics Available</h1>
                <div className="button-container">
                    <Link to="/"><button id="back-button">Back to Home</button></Link>
                    <Link to="/play/quiz"><button id="quit-button">Take a Quiz</button></Link>
                </div>
            </div>
        }






        return (
            <Fragment>
                <Helmet>
                    <title>Quiz Master - Summary</title>
                </Helmet>
                <div id="summary">
                    <div className="display-logo">
                        <img id="logo1" src="/img/logo-transparent-png.png" alt="Icon" />
                    </div>
                    <h1>Quiz Summary</h1>
                    {stats}
                </div>
            </Fragment>
        );
    }
}

export default QuizSummary;

