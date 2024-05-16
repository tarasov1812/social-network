import React from 'react';

function Round({ colour, amountOfSimbols }) {
  const r = 23;
  const circ = 2 * Math.PI * r;
  const strokePct = ((140 - amountOfSimbols) * circ) / 140;
  return (
    <circle
      r={r}
      cx={173}
      cy={26}
      fill="transparent"
      stroke={strokePct !== circ ? colour : ''} // remove colour as 0% sets full circumference
      strokeWidth="3px"
      strokeDasharray={circ}
      strokeDashoffset={amountOfSimbols ? strokePct : 0}
      strokeLinecap="round"
    />
  );
}

function Text({ amountOfSimbols }) {
  return (
    <text
      x="50%"
      y="50%"
      dominantBaseline="central"
      textAnchor="middle"
      fontSize="16px"
    >
      {amountOfSimbols.toFixed(0)}
    </text>
  );
}

function Circle({ amountOfSimbols }) {
  return (
    <svg width={52} height={52}>
      <g transform={`rotate(-90 ${'100 100'})`}>
        <Round colour="#DFDFDF" />
        <Round colour="#0057FF" amountOfSimbols={amountOfSimbols} />
      </g>
      <Text amountOfSimbols={amountOfSimbols} />
    </svg>
  );
}

export default Circle;
