import React from "react";

const DynamicSvg = ({ value }: any) => {
  return (
    <svg width="100" height="100">
      <circle cx="50" cy="50" r={value} fill="blue" />
      <text x="50" y="55" fontSize="20" textAnchor="middle" fill="white">
        {value}
      </text>
    </svg>
  );
};

const TheSvg = () => {
  const [radius, setRadius] = React.useState(20);

  const increaseRadius = () => {
    setRadius(prev => (prev < 50 ? prev + 10 : prev)); // 최대 반지름을 50으로 설정
  };

  return <DynamicSvg value={radius} />;
};

export default TheSvg;
