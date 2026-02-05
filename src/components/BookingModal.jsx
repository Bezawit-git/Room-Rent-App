import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { X, CalendarCheck } from 'lucide-react'

const BookingModal = ({ room, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    guestName: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#0f172a]/80 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="bg-[#1e293b] border border-white/10 w-full max-w-md rounded-[2rem] p-8 relative z-10 shadow-2xl"
      >
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold">Booking Details</h2>
            <p className="text-slate-400 text-sm">{room.name} - ${room.price}/night</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label>Guest Name</label>
            <input 
              required
              type="text" 
              placeholder="e.g. John Wick"
              className="mt-2"
              value={formData.guestName}
              onChange={(e) => setFormData({...formData, guestName: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label>Check-in</label>
              <input 
                required
                type="date" 
                className="mt-2"
                value={formData.startDate}
                onChange={(e) => setFormData({...formData, startDate: e.target.value})}
              />
            </div>
            <div>
              <label>Check-out</label>
              <input 
                required
                type="date" 
                className="mt-2"
                value={formData.endDate}
                onChange={(e) => setFormData({...formData, endDate: e.target.value})}
              />
            </div>
          </div>

          <div className="pt-4">
            <button type="submit" className="btn btn-primary w-full py-4 rounded-xl shadow-lg shadow-sky-500/10">
              <CalendarCheck size={18} />
              <span>Confirm Booking</span>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

export default BookingModal
