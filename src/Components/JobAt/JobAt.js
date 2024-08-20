import React from "react";
import { useParams } from "react-router";
import Footer from "../Footer/Footer";
import Menu from "../Dropdowns/Menu";
import Header from "../Header/Header";
import { Helmet } from "react-helmet-async";
import Jobs from "../Jobs/Jobs";

export default function JobAt(props) {
  const { name } = useParams();
  const { country } = useParams();
  const { city } = useParams();
  const { category } = useParams();
  const { locationType } = useParams();

  let placeholder;
  let title = ``,
    description = ``;
  if (name) {
    title = `Jobs at ${name}`;
    description = `Job Openings at ${name}. Find the latest job openings at ${name}.`;
    placeholder = name;
  }
  if (country) {
    title = `Jobs at ${country}`;
    description = `Hiring now in ${country}, apply now. Find more great hidden jobs like this on Intern.ai. The best job search engine on the internet.`;
    placeholder = country;
  }
  if (city) {
    title = `Jobs in ${city}`;
    description = `Job Openings in ${city}. Find the latest job openings in ${city}.`;
    placeholder = city;
  }
  if (category) {
    title = `${category}`;
    description = `${category} Jobs. Find the latest job openings by Category.`;
    placeholder = category;
  }
  if (locationType) {
    title = `${locationType} Jobs`;
    description = `${locationType} Jobs. Find the latest job openings by Category.`;
    placeholder = locationType;
  }

  return (
    <div className="company-container" style={{ backgroundColor: "#fff" }}>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link ref="icon" href="../../public/logo.png" />
      </Helmet>
      <Header />
      <div className="header-content">
        <h1 className="heading-title">
          {props.text} <span className="unsuckify">{placeholder}</span>{" "}
          {locationType && <sapn> Jobs</sapn>}
        </h1>
      </div>
      <Menu />
      <Jobs />
      <Footer />
    </div>
  );
}
