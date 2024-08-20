import React, { useState, Fragment, useEffect } from "react";
import "./resume_tailor.css";
import Opener from "./Opener";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Oval } from "react-loader-spinner";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import html2pdf from "html2pdf.js";

const Resume_tailor = () => {
  const [file, setfile] = useState(null);
  const [desc, setdesc] = useState("");
  const [show, setshow] = useState(false);
  const [content, setcontent] = useState("");
  const [loading, setLoading] = useState(false);
  const [downloadLink, setDownloadLink] = useState(""); // New state for download link
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);
  const { company_name, job_title } = useParams();

  useEffect(() => {
    async function getJobData() {
      const token = auth.token;
      if (!token) return;
      try {
        fetch(`${process.env.REACT_APP_API_ENDPOINT}/search_job`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ company_name, job_title }),
        }).then((data) => {
          if (!data.ok) return;
          return data.json().then((res) => {
            if (res["message"] === "No data found") {
              navigate("/login");
              return;
            }
            let d = res["description"].toString();
            setdesc(d);
          });
        });
      } catch (e) {
        alert(e);
      }
    }
    getJobData();
  }, [auth]);

  useEffect(() => {
    if (content !== "") {
      console.log("content is");
    }
  }, [content]);

  const handleCopy = () => {
    let cons = content.replace(/<br\/?>/g, "");

    navigator.clipboard
      .writeText(cons)
      .then(() => {
        console.log("Copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy:", err);
      });
  };

  const selectfilehandler = (e) => {
    setfile(e.target.files[0]);
    console.log(e.target.files[0].name);
  };

  const changetexthandler = (e) => {
    setdesc(e.target.value);
  };

  const gobackhandler = () => {
    if (content !== "") {
      setcontent("");
    }
  };
  const generatehandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (file && desc !== "") {
      const formData = new FormData();
      formData.append("pdf", file);

      try {
        const response = await fetch(`http://localhost:8002/upload`, {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          console.log("File uploaded successfully");

          let ress = await fetch(`http://localhost:8002/upload/${file.name}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ desc }),
          });
          ress = await ress.json();

          if (ress.answeredres !== "") {
            setcontent(ress.answeredres);
            setLoading(false);

            // Convert HTML to PDF
            const pdfBlob = await html2pdf().from(ress.answeredres).outputPdf();
            const url = URL.createObjectURL(
              new Blob([pdfBlob], { type: "application/pdf" })
            );

            // Set the download link
            setDownloadLink(url);
          }
        } else {
          console.error("Failed to upload file");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        setLoading(false);
      }
    }
  };
  return (
    <Fragment>
      <Header />
      <div className="resumewrapper">
        <div>
          <h1>
            <span className="unsuckify">AI</span> Resume Tailor Tool
          </h1>
          <h4>
            Upload your resume, paste in a job description and watch the magic
            happen.
          </h4>
          <hr />
        </div>
        <div className="container">
          <div className="content">
            <div className="uppercontent">
              This tool uses GPT to tailor your resume to any job description.
              It works best when you use a resume with a summary, work
              experience, and skills section. We've built this tool after lots
              of trial and error on our own resume's. Just upload your own
              resume and paste in job description, then simply copy and paste
              the tailored sections into your resume before applying!
            </div>
            <br />
            <div className="lowertextwrapper">
              <div className="lowertexthead">HOW IT WORKS:</div>
              <br />
              <div className="lowertext">
                📝 <b>Summary:</b> Combines your real work experience/summary
                with keywords from the job description and the description of an
                ideal candidate for the role.
                <br />
                💼 <b>Work Experience:</b> Tailors only your most recent work
                experience bullet point using keywords from the job description.
                <br />
                🛠️ <b>Skills:</b> Takes skills mentioned from the job
                description and tells you which ones you need to add to your
                resume.
                <br />
                ❗️<b>Other:</b> Does not change names, dates, company names, or
                education. Also, shows the changes made to your resume at the
                end.
              </div>
            </div>
            <button className="searchjobs">
              &#128269; Find Job on Intern.ai
            </button>
          </div>
          <div className="resumebox" id="changecolor">
            {content === "" && (
              <div className="resumeconsumer">
                {show && content === "" && <Opener setshow={setshow} />}
                <div className="resume-header">
                  <div className="circularwrapper">
                    <div className="circle"></div>
                    <div className="circle"></div>
                    <div className="circle"></div>
                  </div>
                  <div
                    className="svgwrapper"
                    onClick={() => {
                      setshow(true);
                      let resumebox = document.getElementById("changecolor");
                      if (resumebox && content === "") {
                        resumebox.style.filter = "grayscale(100%)";
                      }
                    }}
                  >
                    <svg
                      className="info"
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      viewBox="0 -960 960 960"
                      width="24"
                    >
                      <path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                    </svg>
                  </div>
                </div>
                <div className="resumebody">
                  <img
                    className="jackpot"
                    src="https://kfeokhrdlerhktzxnsym.supabase.co/storage/v1/object/public/app-logos/NM6O8crhAx.png"
                  ></img>
                  <div className="headerresume">Resume Tailor GPT 👇</div>
                  <div className="resdesc">
                    Tailors your resume to any job description
                  </div>
                  <div className="uploadresume">
                    <div
                      className="resumename"
                      style={{ marginBottom: "8px", marginTop: "8px" }}
                    >
                      Upload Resume (PDF)
                    </div>
                    <input
                      style={{ marginBottom: "8px" }}
                      type="file"
                      className="selecthandle"
                      onChange={(e) => {
                        selectfilehandler(e);
                      }}
                    ></input>
                  </div>
                  <div className="jobdes" style={{ marginBottom: "5px" }}>
                    <div className="resumename">Paste Job Description</div>
                    <textarea
                      type="text"
                      className="inputbox"
                      value={desc}
                      placeholder="Job Description..."
                      onChange={(e) => {
                        changetexthandler(e);
                      }}
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="generatebutton"
                    onClick={(e) => {
                      generatehandler(e);
                    }}
                    style={{
                      marginBottom: "10px",
                      padding: "10px",
                      display: "flex",
                    }}
                  >
                    <div style={{ marginRight: "5px" }}>
                      {loading && (
                        <Oval
                          height={15}
                          width={15}
                          color="#fff"
                          wrapperStyle={{}}
                          wrapperClass=""
                          visible={true}
                          ariaLabel="oval-loading"
                          secondaryColor="#333"
                          strokeWidth={2}
                          strokeWidthSecondary={2}
                        />
                      )}
                    </div>
                    Generate
                  </button>
                </div>
              </div>
            )}
            {content !== "" && (
              <div className="wrappercontext">
                <div className="headercopy">
                  <div className="output">Output</div>
                  <div className="buttonwrapper">
                    <div
                      className="copy"
                      onClick={() => {
                        if (content) {
                          handleCopy();
                        }
                      }}
                    >
                      Copy
                    </div>
                    <div
                      className="back"
                      onClick={() => {
                        gobackhandler();
                      }}
                    >
                      Back
                    </div>
                  </div>
                </div>
                <div className="contentshowwrapper">
                  <div
                    className="contentshow"
                    dangerouslySetInnerHTML={{ __html: content }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {downloadLink && (
        <a
          href={downloadLink}
          download="modified_resume.html"
          className="download"
        >
          Download
        </a>
      )}

      <Footer />
    </Fragment>
  );
};

export default Resume_tailor;
