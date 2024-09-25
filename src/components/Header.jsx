import { useTheme, createTheme, Button, useMediaQuery } from "@mui/material";
import { useRef, useState } from "react";
import { ethers } from "ethers";
import Logo from "../assets/img/logo.png";
import HeaderLogo from "../assets/img/Topbar-Logo.png";
import "./style.css";
import "../App.css";

const Header = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [address, setAddress] = useState(localStorage.getItem("walletAddress"));

  const theme = createTheme({
    // Define the theme within the component
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1360, // Change the value of lg breakpoint here
        xl: 1920,
      },
    },
  });

  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg")); // Use the theme with useMediaQuery

  const connectMetaMask = async () => {
    // Check if MetaMask is installed
    if (typeof window.ethereum !== "undefined") {
      try {
        // Request account access if needed
        await window.ethereum.request({ method: "eth_requestAccounts" });

        // Create an instance of ethers provider
        const provider = new ethers.providers.Web3Provider(window.ethereum); // Corrected

        // Get the signer
        const signer = provider.getSigner();

        // Log the user's address
        const address = await signer.getAddress();
        setAddress(address); // Updated to remove the array access
        localStorage.setItem("walletAddress", address);
        setErrorMessage("");
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      setErrorMessage("MetaMask is not installed. Please install it.");
    }
  };

  return isLargeScreen ? (
    <>
      <div className="header-background">
        <div className="header-justify">
          <div className="header-col">
            {!address ? (
              <Button
                variant="contained"
                className="gradient-button font-header flow-container" // Apply the gradient-button class
                onClick={() => connectMetaMask()}
                sx={{
                  paddingY: "10px",
                  wordWrap: "break-word",
                }}
              >
                <div className="not-flow-content font-header">
                  Connect MetaMask Wallet
                </div>
              </Button>
            ) : (
              <>
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{
                    textTransform: "none",
                    color: "white",
                    borderColor: "white",
                    padding: "0.5vw",
                    display: "flex",
                    textWrap: "nowrap",
                    overflow: "hidden",
                  }} // Apply white color and border
                >
                  {address}
                </Button>
                <Button
                  onClick={() => {
                    setAddress("");
                    localStorage.removeItem("walletAddress");
                  }}
                  sx={{
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }} // Apply white color and border
                >
                  Disconnect
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
      {errorMessage !== "" ? (
        <div className="error-box">{errorMessage}</div>
      ) : (
        <></>
      )}
    </>
  ) : (
    <>
      <div className="header-background">
        <div className="header-justify" style={{ marginBottom: "20px" }}>
          <div className="header-col">
            {!address ? (
              <Button
                variant="contained"
                className="gradient-button font-header flow-container" // Apply the gradient-button class
                onClick={() => connectMetaMask()}
                sx={{
                  paddingY: "10px",
                  wordWrap: "break-word",
                  maxWidth: "50%",
                }}
              >
                <div className="not-flow-content font-header">
                  Connect MetaMask Wallet
                </div>
              </Button>
            ) : (
              <>
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{
                    textTransform: "none",
                    color: "white",
                    borderColor: "white",
                    padding: "0.5vw",
                    display: "flex",
                    textWrap: "nowrap",
                    overflow: "hidden",
                  }} // Apply white color and border
                >
                  {address}
                </Button>
                <Button
                  onClick={() => {
                    setAddress("");
                    localStorage.removeItem("walletAddress");
                  }}
                  sx={{
                    "&:hover": {
                      textDecoration: "underline",
                    },
                    flex: "start"
                  }} // Apply white color and border
                >
                  Disconnect
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
      {errorMessage !== "" ? (
        <div className="error-box">{errorMessage}</div>
      ) : (
        <></>
      )}
    </>
  );
};

export { Header };
