import React, { useRef, useState, useEffect } from "react";
import Header from "../Header/Header";
import main_svg from "./main_svg.svg";
import "./Landing_page.css";
import Footer from "../Footer/Footer";
import Testimonials from "../Testimonials/Testimonials";
import img1 from "./Imgs/job 1.png";
import img2 from "./Imgs/job 2.png";
import notepad from "./Imgs/Notebook 1.png";
import pen from "./Imgs/pen 1.png";
import { motion, useInView } from "framer-motion";
import CountUp from "react-countup";
import { Helmet } from "react-helmet";

export default function Landing_page() {
  const ref = useRef(null);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

  const isInView = useInView(ref, { once: true });
  const isCard1InView = useInView(ref1, { once: true });
  const isCard2InView = useInView(ref2, { once: true });
  const isCard3InView = useInView(ref3, { once: true });
  const [no_of_jobs, setNoOfJobs] = useState(0);

  const containerAnimation = {
    hidden: { opacity: 0, x: -200 },
    visible: { opacity: 1, x: 0 },
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/no_of_jobs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => {
        return data.json();
      })
      .then((res) => {
        setNoOfJobs(res[0]);
      });
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
      }}
    >
      <Helmet>
        <title>Intern.ai - Best Job Search Engine on the Internet</title>
        <meta
          name="description"
          content="Welcome to the last job search engine you’ll ever use. Uncover hidden jobs, filter out expired roles and land your dream job faster with Intern.ai."
        />
        {/* <link rel="canonical" href="https://www.joby.ai" /> */}
      </Helmet>
      <Header />
      <div className="landing_page_main_container">
        <div className="landing_page_wishlist_container">
          <motion.div
            ref={ref}
            className="landing-page-wishlist-container"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerAnimation}
            transition={{ duration: 0.5 }}
          >
            <h1 className="landing-page-heading-title">
              <span className="unsuckify">Unsuckify</span> the job search
            </h1>
            <h2 className="landing-page-heading-description">
              We use AI to scan{" "}
              <span className="unsuckify">
                <CountUp end={no_of_jobs} delay={5} />
              </span>{" "}
              tech jobs in real-time directly from company pages. Every company,
              every job, actually hiring on the internet.{" "}
            </h2>
            <a href="/" className="landing-page-join-wishlist-btn-2">
              🔎 Search Jobs
            </a>
          </motion.div>
        </div>
        <div className="landing_page_svg">
          <img className="landing-page-svg" src={main_svg} alt="svg" />
        </div>
      </div>
      <div
        style={{
          marginTop: "100px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "100px",
        }}
      >
        <h2 className="landing-page-how-title">
          Why use <span className="unsuckify">Intern</span>.ai?
        </h2>
        <div ref={ref1} className="landing_page_cards_container">
          <motion.div
            className="landing_page_card"
            initial="hidden"
            animate={isCard1InView ? "visible" : "hidden"}
            variants={containerAnimation}
            transition={{ duration: 0.8 }}
          >
            <div className="landing_page_card_img_container">
              <img
                src={img1}
                className="landing_page_card_img1"
                alt="landing page card"
              ></img>
            </div>
            <div className="landing_page_card_content1">
              <h3 className="landing_page_card_title">
                Access the hidden job market
              </h3>
              <h4 className="landing_page_card_subtitle">
                We scan the career pages of every single company on the internet
                to find jobs that you’ll never find on LinkedIn, Indeed, or any
                other job search tool 🤫
              </h4>
            </div>
          </motion.div>
        </div>

        <div ref={ref2} className="landing_page_cards_container">
          <motion.div
            className="landing_page_card"
            initial="hidden"
            animate={isCard2InView ? "visible" : "hidden"}
            variants={containerAnimation}
            transition={{ duration: 0.8 }}
          >
            <div className="landing_page_card_img_container">
              <img
                src={img2}
                className="landing_page_card_img2"
                alt="card"
              ></img>
            </div>
            <div className="landing_page_card_content2">
              <h3 className="landing_page_card_title">
                No expired jobs... ever.
              </h3>
              <h4 className="landing_page_card_subtitle">
                Job boards are filled with old listings that companies forget to
                take down. Intern constantly scans companies directly and ONLY
                has listings that are hiring now. No more wasting your time
                applying for roles that closed 3 months ago 💅
              </h4>
            </div>
          </motion.div>
        </div>

        <div ref={ref3} className="landing_page_cards_container">
          <motion.div
            className="landing_page_card"
            initial="hidden"
            animate={isCard3InView ? "visible" : "hidden"}
            variants={containerAnimation}
            transition={{ duration: 0.8 }}
          >
            <div className="landing_page_card_notepad_container">
              <img
                src={notepad}
                className="landing_page_card_notepad_img"
                alt="notepad"
              ></img>
              <img
                src={pen}
                className="landing_page_card_pen_img"
                alt="cardpen"
              ></img>
            </div>
            <div className="landing_page_card_content1">
              <h3 className="landing_page_card_title">Get Hired Faster</h3>
              <h4 className="landing_page_card_subtitle">
                Spend less time searching and more time applying. Intern is your
                one-stop-shop job search engine to beat them all. Find your
                dream job faster 🕒
              </h4>
            </div>
          </motion.div>
        </div>
      </div>
      {/* <Testimonials />  */}
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <div className="landing_page_footer_container">
          <div className="landing_page_footer_title">
            <h3 style={{ margin: "0" }}>📩 ‍Ready to find a job?</h3>
          </div>
          <h3 className="landing_page_footer_subtitle">
            The job search process is broken. Access the hidden job market now
            and get hired faster.
          </h3>
          <a href="/" className="landing-page-join-wishlist-btn-3">
            Get Started Now
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
}
