export const RadialProgressBar = ({
  size = 40,
  invested = 0,
  required = 100,
  maxInvestment = 0,
  onInvest,
  ringThickness = 10,
  colorClassName = "text-primary-500"
}) => {
  const radius = 50 - ringThickness / 2;
  const circumference = 2 * Math.PI * radius;
  const segments = Math.max(1, required);
  const segmentSize = required / segments;
  const gapSize = 2;
  
  const handleInvestmentClick = (index) => {
    const newInvestment = (index + 1) * segmentSize;
    if (newInvestment <= invested) {
      onInvest(newInvestment - invested);
    } else if (newInvestment - invested <= maxInvestment) {
      onInvest(newInvestment - invested);
    }
  };

  return (
    <div className={`energyDisc relative w-${size} h-${size}`} style={{ pointerEvents: 'all' }}>
      <svg className="size-full" viewBox="0 0 100 100">
        {/* Background Circle */}
        <circle
          className="stroke-current text-gray-200"
          strokeWidth={ringThickness}
          cx="50"
          cy="50"
          r={radius}
          fill="transparent"
        />
        {/* Segments */}
        {Array.from({ length: segments }).map((_, index) => {
          const isActive = (index + 1) * segmentSize <= invested;
          const segmentColor = isActive ? colorClassName : `text-gray-${300 + index * 100}`;
          return (
            <circle
              key={index}
              className={`stroke-current ${segmentColor}`}
              strokeWidth={ringThickness}
              strokeLinecap="round"
              cx="50"
              cy="50"
              r={radius}
              fill="transparent"
              strokeDasharray={`${(circumference / segments) - gapSize} ${circumference - (circumference / segments) + gapSize}`}
              strokeDashoffset={circumference - ((index + 1) / segments) * circumference}
              onClick={() => handleInvestmentClick(index)}
              style={{ cursor: 'pointer', pointerEvents: 'all' }}
            />
          );
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center -space-y-1">
        <p className="text-sm text-gray-500">Energy</p>
        <h5 className="text-lg font-bold text-gray-900">{invested}/{required}</h5>
      </div>
    </div>
  );
};