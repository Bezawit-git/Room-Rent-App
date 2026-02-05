import React from 'react'
import { motion } from 'framer-motion'
import { Flag, CheckCircle2, Calendar, XCircle } from 'lucide-react'

const RoomCard = ({ room, onBook, onFree }) => {
  const isAvailable = room.status === 'available'

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="horizontal-list-item group"
    >
      {/* Left Section: Name & Type */}
      <div className="flex items-center gap-6 flex-1">
        <div className={`p-4 rounded-2xl bg-[#0f172a] border border-white/5 ${isAvailable ? 'text-success' : 'text-danger'}`}>
          <Flag size={20} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">{room.name}</h3>
          <p className="text-slate-400 text-sm font-medium">{room.type}</p>
        </div>
      </div>

      {/* Middle Section: Pricing & Status */}
      <div className="flex items-center gap-12 flex-1 justify-center">
        <div className="flex flex-col items-center">
          <div className="flex items-baseline gap-1">
            <span className="text-[#38bdf8] font-bold text-sm">$</span>
            <span className="text-xl font-black text-white">{room.price}</span>
            <span className="text-slate-500 text-[10px] font-bold uppercase tracking-wider ml-1">night</span>
          </div>
        </div>
        
        <div className={`badge ${!isAvailable ? 'badge-booked' : ''} min-w-[120px] justify-center`}>
          {isAvailable ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
          <span>{isAvailable ? 'Available' : 'Booked'}</span>
        </div>
      </div>

      {/* Right Section: Actions */}
      <div className="flex-1 flex justify-end">
        {isAvailable ? (
          <button 
            className="btn btn-primary px-8 py-3 rounded-xl flex items-center gap-3 w-48"
            onClick={onBook}
          >
            <Calendar size={18} />
            <span className="font-bold">Book Room</span>
          </button>
        ) : (
          <button 
            className="btn px-8 py-3 rounded-xl flex items-center justify-center gap-3 bg-slate-700 text-white hover:bg-slate-600 border-none transition-all w-48"
            onClick={onFree}
          >
            <XCircle size={18} />
            <span className="font-bold">Check-out</span>
          </button>
        )}
      </div>
    </motion.div>
  )
}

export default RoomCard
