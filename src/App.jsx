import React, { useState, useEffect } from 'react'
import { Plus, Home, Calendar, LayoutGrid, Search } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { collection, addDoc, onSnapshot, updateDoc, doc, deleteDoc } from "firebase/firestore"
import { db } from "./firebase"
import RoomCard from './components/RoomCard'
import AddRoomModal from './components/AddRoomModal'
import BookingModal from './components/BookingModal'
import StatCard from './components/StatCard'

function App() {
  const [rooms, setRooms] = useState([])
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [selectedRoomForBooking, setSelectedRoomForBooking] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch rooms from Firestore
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "rooms"), 
      (snapshot) => {
        const roomList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setRooms(roomList)
        setLoading(false)
        setError(null)
      },
      (err) => {
        console.error("Firestore Listen Error:", err);
        setError("Permission denied or connection lost. Please check your Firestore Rules.");
        setLoading(false)
      }
    );
    return () => unsub();
  }, [])

  const addRoom = async (newRoom) => {
    try {
      await addDoc(collection(db, "rooms"), {
        ...newRoom,
        status: 'available',
        bookings: []
      });
      setError(null);
    } catch (e) {
      console.error("Error adding room: ", e);
      alert("⚠️ Error: Insufficient Firestore Permissions. \n\nPlease update your Firestore Security Rules in the Firebase Console to allow read/write access.");
    }
  }

  const handleBooking = async (roomId, bookingData) => {
    try {
      const roomRef = doc(db, "rooms", roomId);
      const room = rooms.find(r => r.id === roomId);
      await updateDoc(roomRef, {
        status: 'booked',
        bookings: [...(room.bookings || []), { ...bookingData, id: Date.now() }]
      });
      setError(null);
    } catch (e) {
      console.error("Error booking room: ", e);
      alert("⚠️ Error updating booking: Permission denied.");
    }
    setSelectedRoomForBooking(null)
  }

  const freeRoom = async (roomId) => {
    try {
      const roomRef = doc(db, "rooms", roomId);
      await updateDoc(roomRef, {
        status: 'available'
      });
      setError(null);
    } catch (e) {
      console.error("Error freeing room: ", e);
      alert("⚠️ Error updating status: Permission denied.");
    }
  }

  const stats = {
    total: rooms.length,
    available: rooms.filter(r => r.status === 'available').length,
    booked: rooms.filter(r => r.status === 'booked').length,
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <div className="container max-w-7xl mx-auto px-6 py-8">
        
        {/* Top Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <div className="bg-[#38bdf8] p-3 rounded-2xl text-[#0f172a]">
              <Home size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">RoomRent</h1>
              <p className="text-slate-400 text-sm font-medium">Premium Management Dashboard</p>
            </div>
          </div>
          <button 
            className="btn btn-primary px-8 py-3 rounded-xl shadow-lg shadow-sky-500/20"
            onClick={() => setIsAddModalOpen(true)}
          >
            <Plus size={22} strokeWidth={3} />
            <span>Add Room</span>
          </button>
        </div>

        {/* Stats Row */}
        <div style={{ display: 'flex', flexDirection: 'row', gap: '10rem', marginBottom: '4rem', alignItems: 'stretch' }}>
          <StatCard title="Total Rooms" value={stats.total} icon={<LayoutGrid />} color="#38bdf8" />
          <StatCard title="Available Now" value={stats.available} icon={<Calendar />} color="#10b981" />
          <StatCard title="Booked" value={stats.booked} icon={<Home />} color="#ef4444" />
        </div>

        {/* Room List Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">All Rooms</h2>
        </div>

        {/* Rooms List */}
        <div className="flex flex-col gap-4">
          {loading ? (
            <div className="py-20 text-center text-slate-400">Loading properties...</div>
          ) : (
            <AnimatePresence>
              {rooms.map(room => (
                <RoomCard 
                  key={room.id} 
                  room={room} 
                  onBook={() => setSelectedRoomForBooking(room)}
                  onFree={() => freeRoom(room.id)}
                />
              ))}
              {rooms.length === 0 && (
                <div className="py-20 text-center text-slate-400">No rooms found. Add your first room to get started!</div>
              )}
            </AnimatePresence>
          )}
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {isAddModalOpen && (
          <AddRoomModal 
            onClose={() => setIsAddModalOpen(false)} 
            onSubmit={addRoom} 
          />
        )}
        {selectedRoomForBooking && (
          <BookingModal 
            room={selectedRoomForBooking} 
            onClose={() => setSelectedRoomForBooking(null)} 
            onSubmit={(data) => handleBooking(selectedRoomForBooking.id, data)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
