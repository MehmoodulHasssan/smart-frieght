import { useTheme } from '@/context/theme-context';
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
}
const GradientButton = (props: ButtonProps) => {
  const { theme } = useTheme();

  return (
    <button
      {...props}
      className="relative hidden lg:inline-flex h-12 overflow-hidden min-w-24 rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
    >
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
      <span
        className={`inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full ${
          theme == 'light' ? 'bg-slate-50' : 'bg-slate-950'
        } px-3 py-1 text-sm font-medium ${
          theme == 'light' ? 'text-black' : 'text-white'
        } backdrop-blur-3xl`}
      >
        {props.title}
      </span>
    </button>
  );
};

export default GradientButton;
