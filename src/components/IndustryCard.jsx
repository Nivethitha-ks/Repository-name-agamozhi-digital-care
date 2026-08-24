const IndustryCard = ({ industry }) => {
  const IconComponent = industry.icon

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 hover:border-blue-300 hover:shadow-md hover:-translate-y-1 transition-all duration-200 text-center group flex flex-col items-center justify-center">
      <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center mb-3 group-hover:bg-blue-50 group-hover:text-blue-600 text-slate-600 transition-colors">
        <IconComponent className="w-5 h-5" />
      </div>
      <h3 className="font-bold text-xs md:text-sm text-[#0B1727] group-hover:text-blue-600 transition-colors">
        {industry.name}
      </h3>
    </div>
  )
}

export default IndustryCard
