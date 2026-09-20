import React, { useState, useEffect, useRef } from 'react';
import { Memory } from '../types';
import { INITIAL_MEMORIES } from '../data/content';
import { Plus, Image as ImageIcon, Calendar, MapPin, Trash2, Edit3, Heart, X } from 'lucide-react';

interface MemoriesSectionProps {
  isDarkMode: boolean;
}

const STORAGE_KEY = 'sanidhya_apology_memories_v1';

export const MemoriesSection: React.FC<MemoriesSectionProps> = ({ isDarkMode }) => {
  const [memories, setMemories] = useState<Memory[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return INITIAL_MEMORIES;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMemory, setEditingMemory] = useState<Memory | null>(null);

  // Form states
  const [formTitle, setFormTitle] = useState('');
  const [formDate, setFormDate] = useState('');
  const [formLocation, setFormLocation] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formImage, setFormImage] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(memories));
    } catch {
      // Ignore
    }
  }, [memories]);

  const handleOpenAdd = () => {
    setEditingMemory(null);
    setFormTitle('');
    setFormDate('');
    setFormLocation('');
    setFormDescription('');
    setFormImage('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (memory: Memory) => {
    setEditingMemory(memory);
    setFormTitle(memory.title);
    setFormDate(memory.date);
    setFormLocation(memory.location || '');
    setFormDescription(memory.description);
    setFormImage(memory.imageUrl);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Delete this memory card?')) {
      setMemories((prev) => prev.filter((m) => m.id !== id));
    }
  };

  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setFormImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrUpdated: Memory = {
      id: editingMemory ? editingMemory.id : `mem-${Date.now()}`,
      title: formTitle.trim() || 'Our Beautiful Memory',
      date: formDate.trim() || 'Unforgettable Day',
      location: formLocation.trim() || undefined,
      description: formDescription.trim() || 'A priceless moment between us.',
      imageUrl:
        formImage.trim() ||
        'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80',
    };

    if (editingMemory) {
      setMemories((prev) =>
        prev.map((m) => (m.id === editingMemory.id ? newOrUpdated : m))
      );
    } else {
      setMemories((prev) => [newOrUpdated, ...prev]);
    }
    setIsModalOpen(false);
  };

  return (
    <section
      id="section-memories"
      className="py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto relative z-10"
    >
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2
          className={`font-serif-romantic text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight mb-4 ${
            isDarkMode ? 'text-stone-100' : 'text-stone-800'
          }`}
        >
          Our Memories
        </h2>

        <div className="w-12 h-0.5 bg-rose-400/60 rounded-full mx-auto mb-4" />

        <p
          className={`text-base sm:text-lg leading-relaxed ${
            isDarkMode ? 'text-stone-300' : 'text-stone-600'
          }`}
        >
          Har ek muskurahat, har ek choti baat. Jab bhi gussa ya udaasi aaye,
          yeh tasveerein hume yaad dilati hain ki humara pyaar kitna gehra hai.
        </p>

        {/* Add Memory Button */}
        <div className="mt-6 flex justify-center">
          <button
            id="btn-add-memory"
            type="button"
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-rose-300/80 bg-white/80 hover:bg-rose-50 text-rose-600 text-xs font-semibold uppercase tracking-wider shadow-sm transition-all hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            <span>Add Our Photo / Memory</span>
          </button>
        </div>
      </div>

      {/* Memory Cards Grid (Polaroid Style) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {memories.map((mem) => (
          <div
            key={mem.id}
            id={`memory-card-${mem.id}`}
            className={`group rounded-2xl p-4 border transition-all duration-300 flex flex-col justify-between relative shadow-sm hover:shadow-md ${
              isDarkMode
                ? 'bg-stone-900/80 border-stone-800 hover:border-rose-900/60'
                : 'bg-white border-rose-100 hover:border-rose-300'
            }`}
          >
            {/* Action buttons (Edit / Delete) */}
            <div className="absolute top-6 right-6 z-20 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 p-1 rounded-lg backdrop-blur-sm">
              <button
                type="button"
                onClick={() => handleOpenEdit(mem)}
                className="p-1 text-white hover:text-rose-300 transition-colors"
                title="Edit Memory"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={(e) => handleDelete(mem.id, e)}
                className="p-1 text-white hover:text-red-400 transition-colors"
                title="Delete Memory"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div>
              {/* Photo Frame */}
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-rose-50/50">
                <img
                  src={mem.imageUrl}
                  alt={mem.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => {
                    // Fallback to warm romance placeholder
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-40" />
              </div>

              {/* Title */}
              <h3
                className={`font-serif-romantic text-xl font-medium mb-1.5 line-clamp-1 ${
                  isDarkMode ? 'text-stone-100' : 'text-stone-800'
                }`}
              >
                {mem.title}
              </h3>

              {/* Meta date / location */}
              <div className="flex items-center gap-3 text-xs text-rose-500 font-medium mb-3">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {mem.date}
                </span>
                {mem.location && (
                  <span className="flex items-center gap-1 text-stone-400">
                    <MapPin className="w-3 h-3" />
                    {mem.location}
                  </span>
                )}
              </div>

              {/* Description */}
              <p
                className={`text-xs sm:text-sm leading-relaxed ${
                  isDarkMode ? 'text-stone-300' : 'text-stone-600'
                }`}
              >
                {mem.description}
              </p>
            </div>

            <div className="pt-3 mt-3 border-t border-rose-100/30 flex items-center justify-between text-[11px] text-stone-400">
              <span className="font-cursive text-sm text-rose-400">
                Forever In My Heart
              </span>
              <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400/30" />
            </div>
          </div>
        ))}
      </div>

      {/* Memory Add/Edit Modal */}
      {isModalOpen && (
        <div
          id="memory-modal-overlay"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            id="memory-modal-content"
            className={`w-full max-w-lg rounded-2xl p-6 sm:p-8 border shadow-2xl transition-all ${
              isDarkMode
                ? 'bg-stone-900 border-stone-800 text-stone-200'
                : 'bg-white border-rose-200 text-stone-800'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-serif-romantic text-2xl font-medium">
                {editingMemory ? 'Edit Memory' : 'Add A Cherished Memory'}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-rose-50 text-stone-400 hover:text-stone-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-400 mb-1">
                  Memory Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. The Day We Said Yes"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className={`w-full px-3.5 py-2 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-rose-400 ${
                    isDarkMode
                      ? 'bg-stone-800 border-stone-700 text-stone-100'
                      : 'bg-white border-rose-200 text-stone-800'
                  }`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-400 mb-1">
                    Date / Occasion
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 14 February or Special Night"
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    className={`w-full px-3.5 py-2 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-rose-400 ${
                      isDarkMode
                        ? 'bg-stone-800 border-stone-700 text-stone-100'
                        : 'bg-white border-rose-200 text-stone-800'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-400 mb-1">
                    Location (optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Marine Drive / Our Home"
                    value={formLocation}
                    onChange={(e) => setFormLocation(e.target.value)}
                    className={`w-full px-3.5 py-2 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-rose-400 ${
                      isDarkMode
                        ? 'bg-stone-800 border-stone-700 text-stone-100'
                        : 'bg-white border-rose-200 text-stone-800'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-400 mb-1">
                  Photo (Upload or Image URL)
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Paste image URL..."
                    value={formImage}
                    onChange={(e) => setFormImage(e.target.value)}
                    className={`flex-1 px-3.5 py-2 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-rose-400 ${
                      isDarkMode
                        ? 'bg-stone-800 border-stone-700 text-stone-100'
                        : 'bg-white border-rose-200 text-stone-800'
                    }`}
                  />
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageFileUpload}
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-2 rounded-xl border border-rose-200 text-xs font-medium hover:bg-rose-50 flex items-center gap-1.5 text-stone-600"
                  >
                    <ImageIcon className="w-4 h-4 text-rose-500" />
                    <span>Upload</span>
                  </button>
                </div>
                {formImage && (
                  <div className="w-16 h-16 rounded-lg overflow-hidden border border-rose-200">
                    <img
                      src={formImage}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-400 mb-1">
                  Why this moment is special
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="What makes this memory with Sanidhya unforgettable..."
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className={`w-full px-3.5 py-2 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-rose-400 resize-none ${
                    isDarkMode
                      ? 'bg-stone-800 border-stone-700 text-stone-100'
                      : 'bg-white border-rose-200 text-stone-800'
                  }`}
                />
              </div>

              <div className="pt-2 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-full text-xs font-semibold text-stone-500 hover:bg-rose-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold uppercase tracking-wider shadow-md transition-transform hover:scale-105"
                >
                  {editingMemory ? 'Save Changes' : 'Add Memory'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
