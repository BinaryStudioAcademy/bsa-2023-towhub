type Properties = {
  label: string;
  type?: 'button' | 'submit';
  onClick?: () => void;
};

const Button: React.FC<Properties> = ({
  type = 'button',
  label,
  onClick,
}: Properties) => (
  <button type={type} onClick={onClick}>
    {label}
  </button>
);

export { Button };
