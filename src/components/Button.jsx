import { Link } from 'react-router-dom'

const variants = {
  primary:
    'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-sm hover:shadow-md hover:shadow-blue-500/10 border border-blue-600 hover:border-blue-700',
  secondary:
    'bg-[#0B1F3A] text-white hover:bg-[#07111F] active:bg-black border border-[#0B1F3A]',
  outline:
    'border border-slate-300 bg-white text-slate-800 hover:bg-slate-50 hover:border-slate-400 active:bg-slate-100 shadow-xs',
  outlineBlue:
    'border border-blue-600 text-blue-600 bg-transparent hover:bg-blue-50 active:bg-blue-100',
  white:
    'bg-white text-[#0B1F3A] hover:bg-blue-50 active:bg-blue-100 font-bold shadow-sm',
  ghost:
    'text-slate-600 hover:text-blue-600 hover:bg-blue-50/60 active:bg-blue-100/60',
}

const sizes = {
  sm: 'px-3.5 py-1.5 text-xs font-semibold rounded-lg',
  md: 'px-4 sm:px-5 py-2.5 text-sm font-semibold rounded-lg',
  lg: 'px-5 sm:px-7 py-3.5 text-sm sm:text-base font-bold rounded-xl tracking-tight',
}

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  to,
  external,
  className = '',
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer select-none active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 max-w-full text-center'
  const classes = `${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...props}
      >
        {children}
      </a>
    )
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}

export default Button
