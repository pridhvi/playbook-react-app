import React from "react";
import { Game } from "../../types";

interface RatingSvgProps {
  rating: number;
  size: string;
  colour: string;
  type: string;
}

const RatingSvg: React.FC<RatingSvgProps> = ({ rating, size, colour, type }) => {
  return (
    <svg
      className="gauge filter-great ms-4 mb-4"
      viewBox="0 0 110 110"
      width={size}
      height={size}
      //   style={{ width: "100px" }}
    >
      <circle cx="55" cy="55" r="55" fill="#FFFFFF"></circle>
      <path
        strokeLinecap="round"
        strokeWidth="6"
        stroke={colour}
        fill="none"
        strokeDasharray="251.2, 251.2"
        d="M55 15 a 40 40 0 0 1 0 80 a 40 40 0 0 1 0 -80"
      ></path>
      {/* <path
                    className="gauge-progress"
                    strokeLinecap="round"
                    strokeWidth="6"
                    fill="none"
                    d="M55 15 a 40 40 0 0 1 0 80 a 40 40 0 0 1 0 -80"
                    strokeDasharray="221.056, 251.2"
                    style={{"transition": "stroke-dasharray 3s"}}
                  ></path> */}
      <text
        x="55"
        y="50"
        textAnchor="middle"
        dy="7"
        fill="#34373b"
        fontSize="30"
      >
        {rating ? Number(rating).toFixed() : "N/A"}
      </text>
      <text
        className="gauge-description"
        x="55"
        y="67"
        textAnchor="middle"
        dy="7"
        fontSize="12"
      >
        {rating || rating === 0 ? type : ""}
      </text>
    </svg>
  );
};

export default RatingSvg;
