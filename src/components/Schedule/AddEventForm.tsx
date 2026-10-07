import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { EventType } from '../../types';
import { PlusCircle } from 'lucide-react';

export const AddEventForm: React.FC = () => {
  const { addEvent } = useApp();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [type, setType] = useState<EventType>('Lecture');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !date) return;

    addEvent({
      title: title.trim(),
      date,
      type
    });

    setTitle('');
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 sticky top-8">
      <h3 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
        <PlusCircle className="w-5 h-5 text-blue-600" /> Add Event
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
            Event Title
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Physics Midterm Exam"
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-slate-400"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
            Date
          </label>
          <input
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
            Type
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as EventType)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          >
            <option value="Lecture">Lecture</option>
            <option value="Assignment">Assignment</option>
            <option value="Exam">Exam</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 rounded-xl transition-colors mt-2 text-sm shadow-sm cursor-pointer"
        >
          Add Event
        </button>
      </form>
    </div>
  );
};
