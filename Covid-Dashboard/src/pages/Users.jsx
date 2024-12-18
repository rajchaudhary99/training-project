import React, { useState } from "react";
import useFetchcountry from "../hooks/useFetchcountry";
import "./Users.css";
import Loading from '../components/Loader.jsx'
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Users = () => {
  const [country, setCountry] = useState("India");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { covidData, error, loading } = useFetchcountry(country);

  if (loading) return <Loading/>;
  if (error) return <p>{error}</p>;

  const doughnutcountryData = {
    labels: [
      "Total Cases",
      "Total Deaths",
      "Total Recovered",
      "Active Cases",
      "Critical Cases",
      "Today Cases",
      "Today Deaths",
    ],
    datasets: [
      {
        label: "COVID-19 Full Stats",
        data: [
          covidData.cases,
          covidData.deaths,
          covidData.recovered,
          covidData.active,
          covidData.critical,
          covidData.todayCases,
          covidData.todayDeaths,
        ],
        backgroundColor: [
          "rgba(54, 162, 235, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(255, 205, 86, 0.6)",
          "rgba(54, 162, 235, 0.4)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 205, 86, 1)",
          "rgba(54, 162, 235, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  function handleCountry(countryname) {
    setCountry(countryname);
  }

  return (
    <div className="page-container">
      <h1 className="main-page-title">COVID-19 Information</h1>

      <div className="dropdown-container">
        <button
          className="dropdown-toggle"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          Select by Country<span className="symbol">▼</span>
        </button>
        {isDropdownOpen && (
          <ul className="dropdown-menu">
            <li onClick={() => handleCountry("USA")}>USA</li>
            <li onClick={() => handleCountry("India")}>India</li>
            <li onClick={() => handleCountry("China")}>China</li>
            <li onClick={() => handleCountry("Pakistan")}>Pakistan</li>
            <li onClick={() => handleCountry("Japan")}>Japan</li>
          </ul>
        )}
      </div>

      <div className="stats-container">
        <div className="stats-box">
          <h3 className="stats-title">COVID-19 Stats for {country}</h3>
          <p className="stat-item">Total Cases: {covidData.cases}</p>
          <p className="stat-item">Total Deaths: {covidData.deaths}</p>
          <p className="stat-item">Total Recovered: {covidData.recovered}</p>
          <p className="stat-item">Active Cases: {covidData.active}</p>
          <p className="stat-item">Critical Cases: {covidData.critical}</p>
          <p className="stat-item">Today's Cases: {covidData.todayCases}</p>
          <p className="stat-item">Today's Deaths: {covidData.todayDeaths}</p>
        </div>
        <div className="doughnut-chart-container">
          <Doughnut data={doughnutcountryData} />
        </div>
      </div>

      <div className="notification-preferences">
        <h3>Notification Preferences</h3>
        <p>Stay updated with the latest COVID-19 statistics in your region.</p>
        <div className="checkbox-wrapper-17">
          <input
            type="checkbox"
            id="push-notifications"
            className="notification-checkbox"
          />
          <label htmlFor="push-notifications"></label>
          <span className="notification-text">Enable Push Notifications</span>
        </div>

        <div className="checkbox-wrapper-17">
          <input
            type="checkbox"
            id="email-updates"
            className="notification-checkbox"
          />
          <label htmlFor="email-updates"></label>
          <span className="notification-text">Receive Email Updates</span>
        </div>
      </div>

      <div className="covid-resources">
        <h3>COVID-19 Resources</h3>
        <ul className="resource-list">
          <li className="resource-item">
            <a
              className="resource-link"
              href="https://www.who.int"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="arrow">❱</span> World Health Organization
            </a>
          </li>
          <li className="resource-item">
            <a
              className="resource-link"
              href="https://www.cdc.gov"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="arrow">❱</span> CDC - Centers for Disease Control and Prevention
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Users;
