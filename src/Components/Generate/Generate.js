// App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";
import Feedback_component from "./Feedback_component";
import { BsFillMicFill, BsFillStopFill } from "react-icons/bs";
import { TypeAnimation } from "react-type-animation";
import Generate_description from "./Generate_description";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function Generate() {
  const [questions, setQuestions] = useState([]);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [listening, setListening] = useState(false);
  const [timer, setTimer] = useState(0);
  const [recognition, setRecognition] = useState(null);
  const [loading, setLoading] = useState(false);
  const [feedbackLines, setFeedbackLines] = useState([]);
  const [questionCount, setQuestionCount] = useState(0);
  const [feed, setFeed] = useState("");
  const [updatedQuestion, setUpdatedQuestion] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");

  useEffect(() => {
    fetchQuestions();
  }, [questionCount, description]);

  useEffect(() => {
    let interval;
    if (listening) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
        if (timer >= 120) {
          handleStopClick();
        }
      }, 1000);
    } else {
      clearInterval(interval);
      setTimer(0);
    }

    return () => clearInterval(interval);
  }, [listening, timer]);

  function speak(text) {
    const synth = window.speechSynthesis;
    const utterThis = new SpeechSynthesisUtterance(text);
    synth.speak(utterThis);
  }

  useEffect(() => {
    if (questions.length) {
      const updatedQuestion = questions[0].replace(/^\*\*Question:\*\* /, "");
      setUpdatedQuestion(updatedQuestion);
      speak(updatedQuestion);
    }
  }, [questions]);

  const fetchQuestions = async () => {
    if (!description) return;
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:8005/interviews/question",
        {
          description,
        }
      );
      setQuestions([response.data.question]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching questions:", error);
      setLoading(false);
    }
  };

  const handleStartClick = () => {
    setListening(true);

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = true;

    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript;
      setUserAnswer((prevText) => prevText + transcript + " ");
    };

    recognition.onend = () => {
      setListening(false);
      handleStopClick();
    };

    setRecognition(recognition);
    recognition.start();
  };

  const handleStopClick = () => {
    if (recognition) {
      setListening(false);
      recognition.stop();
      sendTranscriptionToServer(userAnswer);
    }
  };

  const handleNextClick = () => {
    if (questionCount < 5) {
      setQuestionCount((prevCount) => prevCount + 1);
      setUserAnswer("");
      setFeedback("");
      setFeedbackLines([]);
    } else {
      alert("Confidently apply to the job now!");
    }
  };

  const sendTranscriptionToServer = async (transcription) => {
    try {
      const response = await axios.post(
        "http://localhost:8005/interviews/generate",
        {
          user_transcript: transcription,
          question: questions[0],
        }
      );

      if (response && response.data) {
        const generatedText = response.data.generatedFeedback;
        if (generatedText && generatedText.length > 0) {
          const res = JSON.parse(generatedText);
          setFeed(res[0]);
          setRating(res[1]);
        } else {
          console.error("Error: generatedText is undefined or null");
          setFeedback("Error: Unable to generate feedback");
          setFeedbackLines([]);
        }
      } else {
        console.error("Error: Response or response.data is undefined");
        setFeedback("Error: Unable to generate feedback");
        setFeedbackLines([]);
      }
    } catch (error) {
      console.error("Error generating feedback:", error);
      setFeedback("Error: Unable to generate feedback");
      setFeedbackLines([]);
    }
  };

  const handleToggleClick = () => {
    if (listening) {
      handleStopClick();
    } else {
      handleStartClick();
    }
  };

  return (
    <div>
      <Header />
      <Generate_description
        onDescriptionChange={(val) => {
          setDescription(val);
        }}
      />
      <div className="interviews_by_ai_container">
        <div className="question-count">Question {questionCount + 1} of 5</div>
        {loading ? (
          <div>Loading questions...</div>
        ) : (
          <>
            <div className="question-container">
              <h1 className="title">
                Boost your confidence with <span> AI-generated </span>interview
                questions and answers
              </h1>
              {updatedQuestion && (
                <TypeAnimation
                  className="question"
                  sequence={[updatedQuestion, 1000]}
                  wrapper="span"
                  speed={5}
                  style={{ fontSize: "1.4em", display: "inline-block" }}
                  customCursor={{ color: "yellow" }} // Set the color of the cursor to yellow
                  repeat={Infinity}
                />
              )}
            </div>
            <div className="timer">
              <span className="black-color">{`${Math.floor(timer / 60)
                .toString()
                .padStart(2, "0")}:${(timer % 60)
                .toString()
                .padStart(2, "0")}`}</span>
              <span className="color-f4b448"> / 2:00</span>
            </div>

            <textarea
              placeholder="Start Speaking.."
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
            ></textarea>
            <div className="controls">
              <button className="start_end_btns" onClick={handleToggleClick}>
                {listening ? <BsFillStopFill /> : <BsFillMicFill />}
              </button>
              <button className="nxt-btn" onClick={handleNextClick}>
                Next
              </button>
            </div>

            <Feedback_component
              rating={rating}
              feedback={feedbackLines}
              feed={feed}
            />
          </>
        )}
        <Footer />
      </div>
    </div>
  );
}

export default Generate;
