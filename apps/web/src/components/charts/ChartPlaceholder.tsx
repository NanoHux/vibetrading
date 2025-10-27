import clsx from 'clsx';

interface ChartPlaceholderProps {
  title: string;
  subtitle?: string;
  height?: number;
  action?: React.ReactNode;
  className?: string;
}

export function ChartPlaceholder({ title, subtitle, height = 240, action, className }: ChartPlaceholderProps) {
  return (
    <div
      className={clsx(
        'rounded-2xl border border-white/5 bg-[#111C30]/80 p-5 shadow-md shadow-black/10 backdrop-blur',
        className,
      )}
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-100">{title}</h3>
          {subtitle && <p className="text-sm text-slate-400">{subtitle}</p>}
        </div>
        {action}
      </div>
      <div
        className="relative flex items-center justify-center rounded-xl border border-dashed border-white/10 bg-white/5 text-sm text-slate-400"
        style={{ height }}
      >
        <span>Chart rendering coming soon</span>
      </div>
    </div>
  );
}
