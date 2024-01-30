import "../styles/styles.scss";
import React, { Fragment } from "react";
import { Helmet } from "react-helmet"; //to change the favicon title
import { Link } from "react-router-dom";


const Home = () => (
    <Fragment>
        <Helmet><title>Quiz Master</title></Helmet>
        <div id="home">
            <section>
                <div className="display-logo">
                    <img id="logo" src="img/logo-transparent-png.png" alt="Icon" />
                </div>
                <h1>Quiz Master</h1>
                <div className="play-button-container">
                    <ul>
                        <li>
                            <Link className="play-button" to="/play/instructions">Play</Link>
                        </li>
                    </ul>
                </div>

            </section>
        </div>
    </Fragment>


);


export default Home;