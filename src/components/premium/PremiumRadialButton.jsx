import React from 'react';
import { useNavigate } from 'react-router-dom';
import RadialRevealButton from '../originkit/ui/radial-reveal-button-base';

const PRIMARY = '#4F7F7F';
const PRIMARY_DARK = '#3D6565';
const INK = '#1a2e2e';

const VARIANTS = {
  primary: {
    colors: {
      fill: PRIMARY,
      hoverFill: PRIMARY_DARK,
      textColor: '#FFFFFF',
      hoverTextColor: '#FFFFFF',
    },
    border: { borderWidth: 0, borderStyle: 'solid', borderColor: 'transparent' },
  },
  inverse: {
    colors: {
      fill: '#FFFFFF',
      hoverFill: PRIMARY,
      textColor: INK,
      hoverTextColor: '#FFFFFF',
    },
    border: { borderWidth: 0, borderStyle: 'solid', borderColor: 'transparent' },
  },
  outline: {
    colors: {
      fill: '#FFFFFF',
      hoverFill: PRIMARY,
      textColor: INK,
      hoverTextColor: '#FFFFFF',
    },
    border: { borderWidth: 1, borderStyle: 'solid', borderColor: 'rgba(26, 46, 46, 0.14)' },
  },
  glass: {
    colors: {
      fill: 'rgba(255, 255, 255, 0.16)',
      hoverFill: 'rgba(255, 255, 255, 0.32)',
      textColor: '#FFFFFF',
      hoverTextColor: '#FFFFFF',
    },
    border: { borderWidth: 1, borderStyle: 'solid', borderColor: 'rgba(255, 255, 255, 0.32)' },
  },
};

const SIZES = {
  sm: { padding: '10px 18px', fontSize: 13 },
  md: { padding: '14px 28px', fontSize: 14 },
  lg: { padding: '16px 32px', fontSize: 15 },
  nav: { padding: '8px 10px 8px 20px', fontSize: 14 },
};

export default function PremiumRadialButton({
  to,
  label,
  variant = 'primary',
  size = 'md',
  className = '',
  fullWidth = false,
  addIcon = false,
  iconSymbol = '→',
  iconSide = 'right',
  stopPropagation = false,
  style,
}) {
  const navigate = useNavigate();
  const theme = VARIANTS[variant] || VARIANTS.primary;
  const sizing = SIZES[size] || SIZES.md;

  const handleClick = (e) => {
    if (stopPropagation) e.stopPropagation();
    e.preventDefault();
    if (to) navigate(to);
  };

  return (
    <div className={`inline-flex ${fullWidth ? 'w-full [&_a]:w-full [&_button]:w-full' : ''} ${className}`}>
      <RadialRevealButton
        label={label}
        showText
        link=""
        newTab={false}
        rounded={100}
        padding={sizing.padding}
        font={{
          fontFamily: 'inherit',
          fontWeight: 600,
          fontSize: sizing.fontSize,
          lineHeight: '1.25',
          letterSpacing: '0.01em',
          textAlign: 'center',
        }}
        colors={theme.colors}
        border={theme.border}
        addIcon={addIcon}
        icon={{
          type: 'symbol',
          symbol: iconSymbol,
          color: theme.colors.textColor,
          hoverColor: theme.colors.hoverTextColor,
          size: 16,
          side: iconSide,
        }}
        gap={8}
        transition={{ type: 'tween', ease: 'easeInOut', duration: 0.45 }}
        style={{ width: fullWidth ? '100%' : undefined, ...style }}
        onClick={handleClick}
      />
    </div>
  );
}
