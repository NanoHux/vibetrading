import { ReactNode } from 'react';
import clsx from 'clsx';

interface StatCardProps {
  title: string;
  value: ReactNode;
  delta?: {
    value: string;
    trend: 'up' | 'down' | 'flat';
  };
  icon?: ReactNode;
  className?: string;
}

const deltaStyles: Record<'up' | 'down' | 'flat', string> = {
  up: 'text-emerald-400',
  down: 'text-rose-400',
  flat: 'text-slate-300',
};

export function StatCard({ title, value, delta, icon, className }: StatCardProps) {
  return (
    <div
      className={clsx(
        'rounded-2xl border border-white/5 bg-gradient-to-br from-white/4 via-white/2 to-transparent p-5 shadow-lg shadow-black/10 backdrop-blur-sm',
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm uppercase tracking-wide text-slate-400">{title}</span>
        {icon && <div className="text-brand">{icon}</div>}
      </div>
      <div className="mt-3 text-2xl font-semibold text-slate-50">{value}</div>
      {delta && (
        <div className={clsx('mt-2 text-xs font-medium', deltaStyles[delta.trend])}>
          {delta.trend === 'up' && '▲ '}
          {delta.trend === 'down' && '▼ '}
          {delta.value}
        </div>
      )}
    </div>
  );
}
