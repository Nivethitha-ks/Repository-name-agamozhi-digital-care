const ProcessStep = ({ step, index, total }) => {
  return (
    <div className="flex flex-col items-center text-center relative">
      {/* Step number */}
      <div className="w-14 h-14 rounded-full bg-blue-primary text-white flex items-center justify-center text-xl font-bold mb-4 relative z-10">
        {index + 1}
      </div>

      {/* Connector line for desktop */}
      {index < total - 1 && (
        <div className="hidden lg:block absolute top-7 left-[calc(50%+28px)] w-[calc(100%-56px)] h-0.5 bg-blue-light" style={{ width: 'calc(100% - 56px)' }} />
      )}

      <h3 className="font-semibold text-text-primary mb-2">{step.title}</h3>
      <p className="text-text-muted text-sm max-w-[200px]">{step.description}</p>
    </div>
  )
}

export default ProcessStep
