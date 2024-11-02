// components/icons/Icon.tsx
import * as React from 'react';

export type IconProps = React.SVGAttributes<SVGElement> & {
  className?: string;
  color?: 'primary' | 'secondary' | 'accent' | 'disabled';
  width?: number;
  height?: number;
};

const Icon: React.FC<React.PropsWithChildren<IconProps>> = ({
  className = '',
  color,
  width = 24,
  height = 24,
  stroke,
  children,
  ...props
}) => {
  const getColor = () => {
    switch (color) {
      case 'primary':
        return 'var(--primary)';
      case 'secondary':
        return 'var(--secondary)';
      case 'accent':
        return 'var(--accent)';
      default:
        return 'currentColor'; // Цвет по умолчанию (наследование от родителя)
    }
  };

  return (
    <svg
      className={className}
      width={width}
      height={height}
      fill={getColor()}
      stroke={stroke==="none"? "none": getColor()}
      {...props}
    >
      {children}
    </svg>
  );
};

export default Icon;
