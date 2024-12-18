import React from "react";
import './CardSection.css';

const CardSection = ({
    coinName,
    mCap24,
    ath,
    atl,
    sentiment,
    high24,
    low24,
    currentPrice,
}) => {
    const renderCard = (title, value, color) => (
        <div className="card">
            <h6 className="card-title">{title}</h6>
            <p className="card-value" style={{ color }}>
                {value}
            </p>
        </div>
    );

    return (
        <div className="card-section">
            {/* Coin Name Header */}
            <div className="header">
                <h2>{coinName}</h2>
            </div>

            {/* Cards Section */}
            <div className="cards-container">
                {renderCard("Market Cap 24Hrs", `${mCap24}%`, "#FFC107")}
                {renderCard("All Time High", `$${ath}`, "#FFC107")}
                {renderCard("All Time Low", `$${atl}`, "#FFC107")}
                {renderCard("Positive Sentiments", `${sentiment}%`, "#FFC107")}
                {renderCard("High 24Hrs", `$${high24}`, "#4CAF50")}
                {renderCard("Low 24Hrs", `$${low24}`, "#F44336")}
            </div>

            {/* Current Price */}
            <div className="current-price-container ">
                <span>Current Price</span>
                <h1>${currentPrice}</h1>
            </div>
        </div>
    );
};

export default CardSection;
