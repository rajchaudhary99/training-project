import React from "react";
import "./Header.css"

const Header = ({ handle_Submit }) => {
    return (
        <header>
            <nav
                className="navbar navbar-expand-lg"
                style={{
                    backgroundColor: "transparent",
                    padding: "15px 20px",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
                    borderBottom: "2px solid rgba(0, 0, 0, 0.3)",
                }}
            >
                <div className="container-fluid d-flex align-items-center justify-content-between">
                    {/* Logo */}
                    <a
                        className="navbar-brand text-uppercase text-light fw-bold"
                        href="/"
                        style={{
                            fontFamily: "NHaasGroteskDSPro-65Md",
                            fontSize: "1.8rem",
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                        }}
                    >
                        <img
                            src="https://cryptologos.cc/logos/bitcoin-btc-logo.png"
                            alt="Crypto Logo"
                            style={{
                                width: "35px",
                                height: "35px",
                                objectFit: "contain",
                            }}
                        />
                        Crypto Dashboard
                    </a>

                    {/* Dropdown for Cryptocurrency Selection */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            flex: 1,
                            justifyContent: "flex-end", // Align to the right for larger screens
                        }}
                    >
                        <select
                            className="form-select"
                            aria-label="Select cryptocurrency"
                            name="selectCoin"
                            style={{
                                width: "200px",
                                fontSize: "16px",
                                fontWeight: "500",
                                padding: "8px 12px",
                                border: "1px solid #fcdf03",
                                borderRadius: "5px",
                                backgroundColor: "#1c1c1c",
                                color: "#fcdf03",
                                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
                            }}
                            onChange={handle_Submit}
                        >
                            <option value="bitcoin">Select Coin</option>
                            <option value="avalanche-2">Avalanche (AVAX)</option>
                            <option value="binancecoin">Binance (BNB)</option>
                            <option value="bitcoin">Bitcoin (BTC)</option>
                            <option value="cardano">Cardano (ADA)</option>
                            <option value="decentraland">Decentraland (MANA)</option>
                            <option value="dogecoin">Dogecoin (DOGE)</option>
                            <option value="ethereum">Ethereum (ETH)</option>
                            <option value="ripple">Ripple (XRP)</option>
                            <option value="solana">Solana (SOL)</option>
                            <option value="tether">Tether (USDT)</option>
                        </select>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
