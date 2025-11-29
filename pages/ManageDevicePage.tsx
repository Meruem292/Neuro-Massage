import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Trash2, 
  Edit2, 
  Wifi, 
  Cpu, 
  Save, 
  X, 
  Activity, 
  Zap 
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { auth, db } from '../lib/firebase';
import { 
  collection, 
  query, 
  onSnapshot, 
  addDoc, 
  deleteDoc, 
  doc, 
  updateDoc, 
  serverTimestamp 
} from 'firebase/firestore';

interface Device {
  id: string;
  deviceId: string;
  status: 'online' | 'offline' | 'active';
  lastSync?: any;
}

export const ManageDevicePage: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [newDeviceId, setNewDeviceId] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Auth Protection & Real-time Data Fetching
  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate('/signin');
        return;
      }

      // Query devices subcollection for the current user
      const q = query(collection(db, `users/${user.uid}/devices`));
      
      const unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
        const deviceData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Device[];
        setDevices(deviceData);
        setLoading(false);
      }, (error) => {
        console.error("Error fetching devices:", error);
        setLoading(false);
      });

      return () => unsubscribeSnapshot();
    });

    return () => unsubscribeAuth();
  }, [navigate]);

  const handleAddDevice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDeviceId.trim() || !auth.currentUser) return;
    setIsAdding(true);

    try {
      await addDoc(collection(db, `users/${auth.currentUser.uid}/devices`), {
        deviceId: newDeviceId,
        status: 'online', // Mock status
        createdAt: serverTimestamp(),
        lastSync: serverTimestamp()
      });
      setNewDeviceId('');
    } catch (error) {
      console.error("Error adding device:", error);
    } finally {
      setIsAdding(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!auth.currentUser) return;
    try {
      await deleteDoc(doc(db, `users/${auth.currentUser.uid}/devices`, id));
    } catch (error) {
      console.error("Error deleting device:", error);
    }
  };

  const startEdit = (device: Device) => {
    setEditingId(device.id);
    setEditValue(device.deviceId);
  };

  const handleUpdate = async (id: string) => {
    if (!auth.currentUser || !editValue.trim()) return;
    try {
      await updateDoc(doc(db, `users/${auth.currentUser.uid}/devices`, id), {
        deviceId: editValue
      });
      setEditingId(null);
    } catch (error) {
      console.error("Error updating device:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold font-display text-white mb-2">
              Device Command Center
            </h1>
            <p className="text-slate-400">Manage your connected Neuro-Nodes and synchronization settings.</p>
          </div>
          
          <div className="flex items-center gap-4 bg-slate-900/50 p-4 rounded-xl border border-white/5 backdrop-blur-md">
            <div className="relative">
              <div className="absolute inset-0 bg-green-500 blur-sm opacity-50 animate-pulse" />
              <div className="w-3 h-3 bg-green-500 rounded-full relative z-10" />
            </div>
            <div className="text-sm">
              <div className="text-slate-400 text-xs uppercase tracking-wider font-semibold">System Status</div>
              <div className="text-white font-medium">Neural Network Online</div>
            </div>
          </div>
        </div>

        {/* Add Device Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-slate-900 to-slate-900/50 rounded-2xl p-6 border border-violet-500/20 shadow-lg shadow-violet-900/10 mb-12 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-violet-600/20 transition-colors duration-700" />
          
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Wifi className="w-5 h-5 text-violet-400" />
            Link New Device
          </h2>
          
          <form onSubmit={handleAddDevice} className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-grow w-full">
              <Input
                label="Device ID (Serial Number)"
                placeholder="e.g. NM-X92-001"
                value={newDeviceId}
                onChange={(e) => setNewDeviceId(e.target.value)}
                className="bg-slate-950/50"
              />
            </div>
            <Button 
              type="submit" 
              size="lg"
              isLoading={isAdding}
              disabled={!newDeviceId}
              className="w-full sm:w-auto mb-[2px]"
            >
              <Plus className="w-4 h-4 mr-2" />
              Link Device
            </Button>
          </form>
        </motion.div>

        {/* Devices Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {devices.map((device) => (
              <motion.div
                key={device.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -4 }}
                className="bg-slate-900/40 backdrop-blur-sm border border-white/5 rounded-2xl p-6 group hover:border-violet-500/30 transition-all relative overflow-hidden"
              >
                {/* Background Animation */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />

                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-violet-400 group-hover:scale-110 transition-transform duration-300">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-2">
                     <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        device.status === 'online' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-slate-800 text-slate-400'
                     }`}>
                        {device.status === 'online' && <Activity className="w-3 h-3 mr-1" />}
                        {device.status.charAt(0).toUpperCase() + device.status.slice(1)}
                     </span>
                  </div>
                </div>

                <div className="space-y-4 relative z-10">
                  {editingId === device.id ? (
                    <div className="flex gap-2">
                      <Input
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="h-9 text-sm"
                        autoFocus
                      />
                      <Button size="sm" onClick={() => handleUpdate(device.id)} variant="primary" className="h-9 w-9 p-0">
                        <Save className="w-4 h-4" />
                      </Button>
                      <Button size="sm" onClick={() => setEditingId(null)} variant="ghost" className="h-9 w-9 p-0">
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Device ID</div>
                      <div className="text-xl font-bold text-white font-display tracking-wide">{device.deviceId}</div>
                    </div>
                  )}

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Zap className="w-3 h-3" />
                      Sync: Just now
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => startEdit(device)}
                        className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(device.id)}
                        className="p-2 hover:bg-red-500/10 rounded-lg text-slate-400 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Empty State */}
          {devices.length === 0 && !loading && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-1 md:col-span-2 py-12 flex flex-col items-center justify-center text-center border-2 border-dashed border-slate-800 rounded-2xl bg-slate-900/20"
            >
              <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mb-4">
                <Wifi className="w-8 h-8 text-slate-600" />
              </div>
              <h3 className="text-lg font-medium text-white mb-1">No Devices Linked</h3>
              <p className="text-slate-500 max-w-xs mx-auto">
                Connect your Neuro Massage pillow to start tracking your sleep data.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};