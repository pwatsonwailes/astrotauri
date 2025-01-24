export const RadialProgressBar = ({
    size = 40,
    progress = 67,
    ringThickness = 10,
    descriptionText = "Progress",
    descriptionTextClass = "text-sm",
    descriptionValue = progress.toFixed(0) + "%",
    descriptionValueClass = "text-lg font-bold",
    colorClassName = "text-primary-500",
  }: {
    size: number;
    progress: number;
    ringThickness: number;
    descriptionText?: string;
    descriptionTextClass?: string;
    descriptionValue?: string;
    descriptionValueClass?: string;
    colorClassName?: string;
  }) => {
    const width = `w-${size}`;
    const height = `h-${size}`;
    const radius = Number((size * 0.94).toFixed(0));
    const circumference = Number((2 * Math.PI * radius).toFixed(1));
    const strokeDashOffset = circumference - (circumference * progress) / 100;
  
    return (
      <div className={`relative ${width} ${height}`}>
        <svg className="size-full" viewBox="0 0 100 100">
          <circle
            className="stroke-current text-gray-200"
            strokeWidth={ringThickness}
            cx="50"
            cy="50"
            r={radius}
            fill="transparent"
          />
          <circle
            className={`stroke-current ${colorClassName}`}
            strokeWidth={ringThickness}
            strokeLinecap="round"
            cx="50"
            cy="50"
            r={radius}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={`${strokeDashOffset}px`}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center -space-y-1">
          <p className={`${descriptionTextClass} ${colorClassName}`}>{descriptionText}</p>
          <h5 className={`${descriptionValueClass} ${colorClassName}`}>
            {descriptionValue}
          </h5>
        </div>
      </div>
    );
  };
  