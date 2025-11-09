import React from 'react';

interface IconProps {
  name: string;
  sizeH?: number;
  sizeW?: number;
  color?: string;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({
  name,
  sizeH = 24,
  sizeW = 24,
  color = 'currentColor',
  className,
}) => (
  <svg
    className={className}
    width={sizeW}
    height={sizeH}
    aria-hidden="true"
    fill={color}
  >
    <use
      href={`/icons/icons-header.svg#${name}`}
      xlinkHref={`/icons/icons-header.svg#${name}`}
    />
  </svg>
);
