import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import questions from '../../questions.json';
import isEmpty from '../../utils/is-empty';
import M from 'materialize-css';
import { withRouter } from 'react-router-dom';
import { toHaveDisplayValue } from "@testing-library/jest-dom/matchers";
import classNames from "classnames";



class Play extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions,
            currentQuestion: {},
            nextQuestion: {},
            previousQuestion: {},
            answer: '',
            numberofQuestions: 0,
            numberofAnsweredQuestions: 0,
            currentQuestionIndex: 0,
            score: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            showHint: false,
            time: {}
        };
        this.interval = null;
    }



    componentDidMount() {
        const { questions, currentQuestion, nextQuestion, previousQuestion } = this.state;
        this.displayQuestions(questions, currentQuestion, previousQuestion);
        this.startTimer();
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }


    displayQuestions = ($questions = this.state.questions, currentQuestion, nextQuestion, previousQuestion) => {
        let { currentQuestionIndex } = this.state;
        if (!isEmpty(this.state.questions)) {
            questions = this.state.questions;
            currentQuestion = questions[currentQuestionIndex];
            nextQuestion = questions[currentQuestionIndex + 1];
            previousQuestion = questions[currentQuestionIndex - 1];

            const answer = currentQuestion.answer;
            this.setState({
                currentQuestion,
                nextQuestion,
                previousQuestion,
                numberofQuestions: questions.length,
                answer
            });
        }
    }

    handleOptionClick = (e) => {
        if (e.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
            this.correctAnswer();
        }
        else {
            this.wrongAnswer();
        }
    }

    handleNextButtonClick = () => {
        if (this.state.nextQuestion != undefined) {
            this.setState(prevState => ({
                currentQuestionIndex: prevState.currentQuestionIndex + 1
            }), () => {
                this.displayQuestions(this.state.state, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
            });
        }
    }

    handlePreviousButtonClick = () => {
        if (this.state.previousQuestion != undefined) {
            this.setState(prevState => ({
                currentQuestionIndex: prevState.currentQuestionIndex - 1
            }), () => {
                this.displayQuestions(this.state.state, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
            });
        }
    }



    handleHintButtonClick = () => {
        const { showHint } = this.state;
        this.setState({
            showHint: !showHint,
        });
    };


    correctAnswer = () => {
        M.toast({
            html: 'Correct Answer!',
            classes: 'toast-valid',
            displayLength: 1500
        });
        this.setState(prevState => ({
            score: prevState.score + 1,
            correctAnswers: prevState.correctAnswers + 1,
            currentQuestionIndex: prevState.currentQuestionIndex + 1,
            numberofAnsweredQuestions: prevState.numberofAnsweredQuestions + 1

        }), () => {
            if (this.state.nextQuestion === undefined) {
                this.endGame();
            }
            else {
                this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion)

            }
        }
        );
    }

    wrongAnswer = () => {
        M.toast({
            html: 'Wrong Answer!',
            classes: 'toast-invalid',
            displayLength: 1500
        });
        this.setState(prevState => ({
            wrongAnswers: prevState.wrongAnswers + 1,
            currentQuestionIndex: prevState.currentQuestionIndex + 1,
            numberofAnsweredQuestions: prevState.numberofAnsweredQuestions + 1

        }), () => {
            if (this.state.nextQuestion === undefined) {
                this.endGame();
            }
            else {
                this.displayQuestions(this.state.questions,
                    this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion)
            }
        }
        );
    }



    startTimer = () => {
        const countDownTime = Date.now() + 60000;
        this.interval = setInterval(() => {
            const now = new Date();
            const distance = countDownTime - now;
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if (distance < 0) {
                clearInterval(this.interval);
                this.setState({
                    time: {
                        minutes: 0,
                        seconds: 0
                    }
                }, () => {
                    this.endGame();
                });

            } else {
                this.setState({
                    time: {
                        minutes,
                        seconds
                    }
                })
            }
        }, 1000);

    }


    endGame = () => {
        alert('Quiz has ended');
        const { state } = this;
        const playStats = {
            score: state.score,
            numberofQuestions: state.numberofQuestions,
            numberofAnsweredQuestions: state.numberofAnsweredQuestions,
            correctAnswers: state.correctAnswers,
            wrongAnswers: state.wrongAnswers,

        };
        this.props.setPlayStats(playStats);
        setTimeout(() => {
            //console.log(playStats);
            this.props.navHook('/play/quizSummary', { state: playStats });

        }, 1000);
    }




    render() {
        const { currentQuestion,
            currentQuestionIndex, numberofQuestions,
            time, showHint } = this.state;

        return (
            <Fragment>
                <Helmet><title>Quiz Page</title></Helmet>
                <div className="questions">
                    <h2>Quiz Mode</h2>

                    <div>
                        <label class="switch">
                            <input type="checkbox" onChange={this.handleHintButtonClick} />
                            <span>Hint!!!</span>
                        </label></div>

                    <div>
                        <p><span className="left">{currentQuestionIndex + 1} of {numberofQuestions}</span>
                            <span className="display-time right">{time.minutes} : {time.seconds}</span>
                        </p>
                    </div>
                    <h5>{currentQuestion.question} </h5>
                    <div className="options-container">
                        <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionA}</p>
                        <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionB}</p>
                    </div>
                    <div className="options-container">
                        <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionC}</p>
                        <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionD}</p>
                    </div>
                    <div className="button-container">
                        <button id="previous-button" onClick={this.handlePreviousButtonClick}>Previous</button>
                        <button id="next-button" onClick={this.handleNextButtonClick}>Next</button>
                        <Link to="/">
                            <button id="quit-button">Quit</button>
                        </Link>
                    </div>

                    {showHint && (
                        <div className="hint-container">
                            <p>&#128161;{currentQuestion.hint}</p>
                        </div>
                    )}
                </div>
            </Fragment>

        );
    }
}



function myParams(Component) {
    return (props) => {
        const { playStats, setPlayStats } = props;
        const navHook = useNavigate();
        return <Component navHook={navHook} setPlayStats={setPlayStats} />;
    };
}


export default myParams(Play);

