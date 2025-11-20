"use client";

function cn(...args) {
  return args.filter(Boolean).join(" ");
}

export function Button({
  variant = "default",
  size = "sm",
  className = "",
  ...props
}) {
  const base = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 disabled:pointer-events-none disabled:opacity-50";
  const sizes = {
    sm: "h-8 px-3",
    md: "h-9 px-4",
    lg: "h-10 px-5 text-base",
  };
  const variants = {
    default: "bg-white text-black hover:bg-neutral-200",
    outline: "border border-white/20 bg-transparent text-white hover:bg-white/10",
    ghost: "bg-transparent text-white hover:bg-white/10",
    secondary: "bg-white/10 text-white hover:bg-white/20",
  };
  return (
    <button className={cn(base, sizes[size], variants[variant], className)} {...props} />
  );
}
