import React, { Component } from "react";
import Chart from "react-apexcharts";
import './ChartSection.css';

export class ChartSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Price: {
        options: {
          chart: { id: "area-datetime" },
          grid: { show: false },
          title: {
            text: "Market Price (USD)",
            style: { fontSize: "14px", fontWeight: "bold", color: "#fcdf03" },
          },
          stroke: { curve: "smooth" },
          xaxis: { type: "datetime" },
          dataLabels: { enabled: false },
          yaxis: { show: false },
          colors: ["#fcdf03"],
          tooltip: {
            y: { formatter: (value) => value.toFixed(2) },
            theme: "dark",
          },
          selection: 365,
        },
        series: [{ name: "Market Price", data: [[1645837250522, 39804.53519937617]] }],
      },
      Market_Cap: {
        options: {
          grid: { show: false },
          title: {
            text: "Market Cap (USD)",
            style: { fontSize: "14px", fontWeight: "bold", color: "#ff69f5" },
          },
          stroke: { curve: "smooth" },
          xaxis: { type: "datetime" },
          dataLabels: { enabled: false },
          yaxis: { show: false },
          colors: ["#ff69f5"],
          tooltip: {
            y: { formatter: (value) => value.toFixed(2) },
            theme: "dark",
          },
        },
        series: [{ name: "Market Cap (USD)", data: [[1645837250522, 39804.53519937617]] }],
      },
      Tot_Vol: {
        options: {
          grid: { show: false },
          title: {
            text: "Market Volume",
            style: { fontSize: "14px", fontWeight: "bold", color: "#00ffea" },
          },
          stroke: { curve: "smooth" },
          xaxis: { type: "datetime" },
          dataLabels: { enabled: false },
          yaxis: { show: false },
          colors: ["#00ffea"],
          tooltip: {
            y: { formatter: (value) => value.toFixed(2) },
            theme: "dark",
          },
        },
        series: [{ name: "Market Volume", data: [[1645837250522, 39804.53519937617]] }],
      },
    };

    this.prevSelection = this.state.Price.options.selection;
    this.prevId = this.props.Id;
  }

  fetchData = async () => {
    let chartData = await fetch(
      `https://api.coingecko.com/api/v3/coins/${this.props.Id}/market_chart?vs_currency=usd&days=${this.state.Price.options.selection}`
    );
    let jsonChartData = await chartData.json();
    this.setState({
      Price: {
        options: this.state.Price.options,
        series: [{ name: "Market Price", data: jsonChartData.prices }],
      },
      Market_Cap: {
        options: this.state.Market_Cap.options,
        series: [{ name: "Market Cap", data: jsonChartData.market_caps }],
      },
      Tot_Vol: {
        options: this.state.Tot_Vol.options,
        series: [{ name: "Market Volume", data: jsonChartData.total_volumes }],
      },
    });
  };

  componentDidMount() {
    this.fetchData();
    this.interval = setInterval(() => this.fetchData(), 2000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentDidUpdate() {
    if (this.prevId !== this.props.Id) {
      this.prevId = this.props.Id;
      this.fetchData();
    }
    if (this.prevSelection !== this.state.Price.options.selection) {
      this.prevSelection = this.state.Price.options.selection;
      this.fetchData();
    }
  }

  render() {
    return (
      <div className="chart-section-container">
        <div className="chart-section-row">
          {/* Price Chart */}
          <div className="chart-section-col price-chart">
            <div id="chart" className="chart-card">
              <div className="chart-toolbar">
                {["1D", "1W", "1M", "6M", "1Y"].map((label, index) => {
                  const days = [1, 7, 30, 182, 365][index];
                  return (
                    <button
                      key={label}
                      className="chart-btn"
                      onClick={() =>
                        this.setState({
                          Price: {
                            options: { ...this.state.Price.options, selection: days },
                            series: this.state.Price.series,
                          },
                        })
                      }
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
              <Chart
                options={this.state.Price.options}
                series={this.state.Price.series}
                type="area"
                height="350"
                width="100%" // Ensures full width for responsive design
              />
            </div>
          </div>

          {/* Info Cards */}
          <div className="chart-section-col info-cards">
            {[{ title: "Market Cap", value: `$ ${this.props.MarketCap}` },
              { title: "Price Change 24hrs", value: `$ ${this.props.priceChange24}` },
              { title: "Total Volume", value: `$ ${this.props.TotVol}` },
              { title: "Circulating Supply", value: this.props.Circulating },
              { title: "Twitter Followers", value: this.props.twitterF },
            ].map((item, index) => (
              <div key={index} className="info-card">
                <h6 className="info-card-title">{item.title}</h6>
                <p className="info-card-value">{item.value}</p>
              </div>
            ))}
          </div>

          {/* Additional Charts */}
          <div className="chart-section-col additional-charts">
            <div>
              <Chart
                options={this.state.Market_Cap.options}
                series={this.state.Market_Cap.series}
                type="line"
                height="215"
                width="100%" // Ensures full width for responsive design
              />
            </div>
            <div>
              <Chart
                options={this.state.Tot_Vol.options}
                series={this.state.Tot_Vol.series}
                type="line"
                height="215"
                width="100%" // Ensures full width for responsive design
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ChartSection;
