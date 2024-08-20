import React, { useContext } from "react";
import "./Footer.css";
import { useNavigate } from "react-router";
import { Context } from "../../App";
import logo from "../../logo.svg";
import discord from "./discord.svg";
import arrow from "./arrow.svg";

export default function Footer() {
  const navigate = useNavigate();
  const context = useContext(Context);
  function search(id) {
    navigate("/");
    setTimeout(() => {
      const dropdown = document.getElementById(`options-${id}`);
      dropdown.classList.add("open");
      document.getElementById(`input-${id}`).style.display = "flex";
      document.getElementById(`input-${id}`).classList.add("open-main");
      document.getElementById(`input-box-${id}`).focus();
      document.getElementById(`option-main-${id}`).style.display = "none";
    }, 800);
  }
  return (
    <div className="footer-container">
      {/* <div className="footer-greet-text">
        Hey 👋 I'm Spencer, the creator of Joby.ai. I'd love to hear your
        feedback — Get in touch via{" "}
        <span
          onClick={() =>
            window.open("https://twitter.com/armchairfounder", "_blank")
          }
          className="dm-span"
        >
          DM
        </span>{" "}
        or email{" "}
        <span
          className="footer-spencer-email"
          onClick={() => window.open("mailto:hello@joby.ai", "_blank")}
        >
          hello@joby.ai
        </span>
      </div> */}
      {/* <img style={{cursor: "pointer"}} src={logo} className='logo' onClick={() => navigate("/")}></img> */}
      {/* <div className='footer-head'>Built By <span className='link' onClick={() => window.open(`https://www.linkedin.com/in/sandeeptottadi/`, '_blank')}>Sandeep Tottadi</span>. I'd love to hear your feedback — Get in touch via DM or sandeeptottadi@gmail.com</div> */}
      <div className="footer-sections">
        <div className="footer-section">
          <div className="logo">
            Intern <span>.ai</span>
            <div className="beta">beta</div>
          </div>
          <div className="footer-found-job">Found a job not at Intern?</div>
          <button
            className="email-alert-btn"
            style={{
              paddingLeft: "40px",
            }}
          >
            Submit it here{" "}
            <img
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "8px",
              }}
              src={arrow}
              alt="arrow"
            />
          </button>
        </div>
        <div className="footer-section">
          <div className="footer-section-title">Search</div>
          <a href={`/country`} className="footer-section-link">
            Jobs by Country
          </a>
          <a href="/city" className="footer-section-link">
            Jobs by City
          </a>
          <a href={`/location-type`} className="footer-section-link">
            Jobs by Location Type
          </a>
          <a href="/category" className="footer-section-link">
            Jobs by Category
          </a>
        </div>
        <div className="footer-section">
          <div className="footer-section-title">Useful Links</div>
          Blog
          <div
            className="footer-section-link"
            onClick={() => {
              navigate("/pricing");
            }}
          >
            Pricing
          </div>
          <div
            className="footer-section-link"
            onClick={() => {
              navigate("/promote-job");
            }}
          >
            Promote Job
          </div>
          <div
            className="footer-section-link"
            onClick={() => {
              navigate("/");
              setTimeout(() => {
                document.getElementById("model-container").style.display =
                  "flex";
              }, 800);
            }}
          >
            Create email alerts for new Jobs
          </div>
        </div>
        <div className="footer-section">
          <div className="footer-section-title">Contact Us</div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div
              // onClick={() => window.open("mailto:hello@joby.ai", "_blank")}
              className="footer-section-link-contact"
            >
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="20" cy="20" r="20" fill="#0077b6" />
                <path
                  d="M9.06563 14.6659C9.19795 14.0861 9.52324 13.5684 9.98821 13.1977C10.4532 12.8269 11.0303 12.625 11.625 12.625H27.375C27.9697 12.625 28.5468 12.8269 29.0118 13.1977C29.4768 13.5684 29.8021 14.0861 29.9344 14.6659L19.5 21.0434L9.06563 14.6659ZM9 16.1648V25.4888L16.6164 20.8189L9 16.1648ZM17.8738 21.5894L9.25069 26.8748C9.46374 27.3241 9.8 27.7036 10.2203 27.9691C10.6407 28.2347 11.1278 28.3755 11.625 28.375H27.375C27.8721 28.3751 28.3591 28.2341 28.7792 27.9682C29.1993 27.7024 29.5352 27.3228 29.748 26.8735L21.1249 21.5881L19.5 22.5816L17.8738 21.5881V21.5894ZM22.3836 20.8203L30 25.4888V16.1648L22.3836 20.8189V20.8203Z"
                  fill="white"
                />
              </svg>
            </div>
            <div className="footer-section-link-contact">
              <img src={discord} alt="discord_icon" />
            </div>
            <div
              onClick={() => window.open("_blank")}
              className="footer-section-link-contact"
            >
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="20" cy="20" r="20" fill="#0077b6" />
                <g clipPath="url(#clip0_107_51)">
                  <path
                    d="M28.4498 10H10.5502C10.1391 10 9.74477 10.1633 9.45405 10.454C9.16333 10.7448 9 11.1391 9 11.5502V29.4498C9 29.8609 9.16333 30.2552 9.45405 30.546C9.74477 30.8367 10.1391 31 10.5502 31H28.4498C28.8609 31 29.2552 30.8367 29.546 30.546C29.8367 30.2552 30 29.8609 30 29.4498V11.5502C30 11.1391 29.8367 10.7448 29.546 10.454C29.2552 10.1633 28.8609 10 28.4498 10ZM15.2592 27.8894H12.1019V17.8604H15.2592V27.8894ZM13.6783 16.4706C13.3202 16.4686 12.9707 16.3605 12.6739 16.1601C12.3771 15.9596 12.1464 15.6757 12.0108 15.3442C11.8752 15.0127 11.8408 14.6485 11.912 14.2975C11.9832 13.9465 12.1568 13.6245 12.4109 13.3721C12.6649 13.1196 12.9881 12.9481 13.3395 12.8792C13.691 12.8102 14.055 12.8469 14.3856 12.9846C14.7162 13.1223 14.9986 13.3549 15.1972 13.653C15.3957 13.951 15.5015 14.3012 15.5013 14.6594C15.5046 14.8992 15.4597 15.1372 15.3691 15.3592C15.2786 15.5812 15.1442 15.7828 14.9741 15.9518C14.804 16.1208 14.6016 16.2539 14.379 16.343C14.1564 16.4321 13.9181 16.4755 13.6783 16.4706ZM26.8967 27.8981H23.7408V22.4192C23.7408 20.8033 23.054 20.3046 22.1673 20.3046C21.231 20.3046 20.3123 21.0104 20.3123 22.46V27.8981H17.155V17.8677H20.1913V19.2575H20.2321C20.5369 18.6406 21.6044 17.5863 23.2333 17.5863C24.995 17.5863 26.8981 18.6319 26.8981 21.6944L26.8967 27.8981Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_107_51">
                    <rect
                      width="21"
                      height="21"
                      fill="white"
                      transform="translate(9 10)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div className="footer-section-link-contact">
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="20" cy="20" r="20" fill="#0077b6" />
                <path
                  d="M15.6041 29.0319C23.5286 29.0319 27.863 22.4664 27.863 16.7729C27.863 16.5864 27.863 16.4008 27.8504 16.216C28.6937 15.6061 29.4215 14.8509 30 13.9858C29.2137 14.3344 28.3795 14.5629 27.5254 14.6637C28.4248 14.1253 29.098 13.2783 29.4196 12.2806C28.5738 12.7825 27.6486 13.1362 26.6837 13.3264C26.0341 12.6356 25.1749 12.1782 24.2392 12.025C23.3034 11.8717 22.3432 12.0311 21.5072 12.4785C20.6712 12.926 20.0059 13.6365 19.6144 14.5001C19.2229 15.3637 19.1268 16.3322 19.3412 17.2559C17.6283 17.17 15.9525 16.7248 14.4228 15.9493C12.893 15.1738 11.5434 14.0852 10.4616 12.7543C9.91064 13.7028 9.74189 14.8257 9.98971 15.8942C10.2375 16.9627 10.8833 17.8967 11.7955 18.5058C11.1098 18.4857 10.4391 18.3007 9.84 17.9665V18.0211C9.84027 19.0159 10.1846 19.9799 10.8146 20.7497C11.4447 21.5195 12.3216 22.0477 13.2966 22.2447C12.6623 22.4177 11.9968 22.443 11.3512 22.3186C11.6266 23.1746 12.1626 23.9232 12.8843 24.4596C13.606 24.9961 14.4773 25.2936 15.3764 25.3107C14.4831 26.0128 13.4602 26.532 12.366 26.8384C11.2719 27.1448 10.1281 27.2325 9 27.0965C10.9704 28.3609 13.2629 29.0316 15.6041 29.0285"
                  fill="white"
                />
              </svg>
            </div>
          </div>
        </div>
        {/* <div className="footer-section">
                <div className='footer-section-title'>Need Help?</div>
                <div className='footer-section-link'> 📧 sandeeptottadi@joby.ai</div>
                <div className='footer-section-link'> 📫 Also reach out to us on one of the social media platforms</div>
            </div> */}
      </div>
    </div>
  );
}
