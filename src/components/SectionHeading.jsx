const SectionHeading = ({
  eyebrow,
  title,
  subtitle,
  centered = true,
  light = false,
  className = '',
}) => {
  return (
    <div className={`mb-10 sm:mb-14 md:mb-16 ${centered ? 'text-center' : ''} ${className}`}>
      {eyebrow && (
        <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-extrabold tracking-wider uppercase mb-3.5 shadow-xs ${
          light 
            ? 'bg-white/10 text-blue-200 border border-white/20' 
            : 'bg-blue-50 text-blue-800 border border-blue-200'
        }`}>
          {eyebrow}
        </div>
      )}
      <h2
        className={`text-balance text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-3.5 sm:mb-4 leading-tight ${
          light ? 'text-white' : 'text-slate-950'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`max-w-2xl text-base sm:text-lg md:text-xl leading-relaxed font-medium ${
            centered ? 'mx-auto' : ''
          } ${light ? 'text-slate-200' : 'text-slate-800'}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}

export default SectionHeading
