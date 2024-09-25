// MainPage.js
import React from "react";
import MainComponent from "./MainComponent";
import { Header } from "./Header";
import { TokenList } from "./TokenList";

const MainPage = () => {
  return (
    <div>
      <Header />
      <TokenList />
      <MainComponent />
    </div>
  );
};

export default MainPage;
