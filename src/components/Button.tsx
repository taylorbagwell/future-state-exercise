import React from 'react';
import clsx from 'clsx';

interface Props {
  disabled?: boolean;
  text: string;
  theme?: 'DANGER' | 'DEFAULT' | 'PLAIN';
  type?: 'button' | 'reset' | 'submit';
  onClick?: () => void;
}

export default function Button(props: Props) {
  const {
      disabled,
      text,
      theme = 'DEFAULT',
      type = 'button',
      onClick
  } = props;

  return (
    <button
      className={clsx(
        theme === 'DANGER' && 'bg-red-500 px-3 py-2 rounded-md text-white transition-opacity hover:opacity-70',
        theme === 'DEFAULT' && 'bg-slate-500 px-3 py-2 rounded-md text-white transition-opacity hover:opacity-70',
        theme === 'PLAIN' && 'text-blue-500 transition-opacity hover:opacity-70',
        disabled && 'opacity-50',
      )}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
