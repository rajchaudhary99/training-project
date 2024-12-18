import React from "react";
import useFetch from "../hooks/useFetch";
import { Doughnut, Bar } from "react-chartjs-2";
import Loading from '../components/Loader.jsx'
import './Dashboard.css'

// Import and register required components from Chart.js
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
} from 'chart.js';

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

const Dashboard = () => {
  const apiEndpoint = "https://disease.sh/v3/covid-19/all";
  const { data, error, loading } = useFetch(apiEndpoint);

  if (loading) return <Loading/>;
  if (error) return <p>{error}</p>;

  // Doughnut Chart Data
  const doughnutData = {
    labels: ["Active Cases", "Recovered", "Deaths"],
    datasets: [
      {
        label: "Global COVID-19 Stats",
        data: [data.active, data.recovered, data.deaths],
        backgroundColor: ["rgba(54, 162, 235, 0.6)", "rgba(75, 192, 192, 0.6)", "rgba(255, 99, 132, 0.6)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  // Bar Chart Data
  const barChartData = {
    labels: ["Today's Cases", "Today's Deaths", "Today's Recovered"],
    datasets: [
      {
        label: "COVID-19 Daily Stats",
        data: [data.todayCases, data.todayDeaths, data.todayRecovered],
        backgroundColor: ["rgba(153,102,255,0.6)", "rgba(255,99,132,0.6)"],
        borderColor: ["rgba(153,102,255,1)", "rgba(255,99,132,1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">COVID-19 Dashboard</h1>
      <p className="dashboard-subtitle">Stay updated with the latest global COVID-19 statistics</p>
      
      <div className="chart-container"><div className="chart-box">
          <h2 className="chart-title">Global COVID-19 Stats</h2>
          <Doughnut data={doughnutData}   />
        </div>
        <div className="chart-box">
          <h2 className="chart-title">COVID-19 Daily Stats</h2>
          <Bar data={barChartData} />
        </div></div>
      
     
      <div className="info-box">
        <h3>What You Should Know</h3>
        <p>
          The COVID-19 pandemic has impacted millions of lives across the globe. 
          It is essential to stay informed and follow the guidelines from health authorities.
        </p>
        <p>
          The dashboard here provides up-to-date statistics on active cases, recoveries, 
          and daily changes across the world. Use this data to make informed decisions and stay safe.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
