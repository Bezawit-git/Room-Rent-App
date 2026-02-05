import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { X, Save } from 'lucide-react'

const AddRoomModal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: 'Room ',
    type: 'Deluxe',
    price: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ ...formData, price: Number(formData.price) })
    onClose()
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
          <h2 className="text-2xl font-bold">New Room</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label>Name / Number</label>
            <input 
              required
              type="text" 
              placeholder="e.g. Room 402"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div>
            <label>Category</label>
            <select 
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
            >
              <option>Standard</option>
              <option>Deluxe</option>
              <option>Suite</option>
            </select>
          </div>

          <div>
            <label>Price per night ($)</label>
            <input 
              required
              type="number" 
              placeholder="120"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
            />
          </div>

          <div className="pt-4">
            <button type="submit" className="btn btn-primary w-full py-4 rounded-xl shadow-lg shadow-sky-500/10">
              <Save size={18} />
              <span>Save Room</span>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

export default AddRoomModal
