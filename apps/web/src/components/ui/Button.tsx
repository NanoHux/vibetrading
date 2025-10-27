import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  loading?: boolean;
}

const baseClasses =
  'inline-flex items-center justify-center gap-2 rounded-xl border text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand';

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-brand text-white border-transparent hover:bg-brand-dark disabled:bg-brand-dark disabled:text-white/70',
  secondary:
    'bg-[#111C30] border border-white/10 text-slate-100 hover:border-brand/40 hover:text-white',
  ghost: 'border-transparent text-slate-300 hover:text-white hover:bg-white/5',
};

export function Button({ variant = 'primary', loading, className, children, disabled, ...rest }: ButtonProps) {
  return (
    <button
      className={clsx(baseClasses, variantClasses[variant], 'px-4 py-2', className)}
      disabled={disabled ?? loading}
      {...rest}
    >
      {loading && <span className="h-3 w-3 animate-pulse rounded-full bg-white/70" />}
      <span>{children}</span>
    </button>
  );
}
