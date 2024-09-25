import React, { useState } from "react";
import {
  Grid,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { TVChartContainer } from "./common/TVChartContainer";
import Table from "./Table";
import "./style.css";

const MainComponent = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md")); // Check if screen is larger than medium

  return (
    <Grid
      container
      spacing={2}
      sx={{
        backgroundColor: "#191919",
        paddingRight: "7vw",
      }}
    >
      {/* Main content */}
      <Grid
        item
        xs={12}
        sx={{ transition: "width 0.5s", position: "relative" }}
      >
        <TVChartContainer height={70} />
        {/* Collapse button */}
      </Grid>

      {/* Menu or additional content */}
      <Grid item xs={3} className="font-header"></Grid>
    </Grid>
  );
};

export default MainComponent;
