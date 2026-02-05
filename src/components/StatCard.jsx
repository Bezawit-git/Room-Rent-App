import React from 'react'

const StatCard = ({ title, value, icon, color = '#38bdf8' }) => {
  return (
    <div className="bg-[#1e293b] border border-white/5 rounded-[1.5rem] p-8 flex-1 flex flex-col justify-between min-h-[200px]">
      <div>
        <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.1em] mb-2">{title}</p>
        <h3 className="text-5xl font-black text-white">{value}</h3>
      </div>
      <div className="mt-4" style={{ color: color }}>
        {React.cloneElement(icon, { size: 28, strokeWidth: 2.5 })}
      </div>
    </div>
  )
}

export default StatCard
