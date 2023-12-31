interface CheckIconProps {
  variant: 'white' | 'black';
}

export const CheckIcon = ({ variant }: CheckIconProps) => (
  <svg
    width="24"
    height="20"
    viewBox="0 0 24 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line
      x1="1.06066"
      y1="11.5659"
      x2="8.06066"
      y2="18.5659"
      stroke={variant}
      strokeWidth="3"
    />
    <line
      x1="6.2953"
      y1="18.5659"
      x2="22.9218"
      y2="1.9394"
      stroke={variant}
      strokeWidth="3"
    />
  </svg>
);
