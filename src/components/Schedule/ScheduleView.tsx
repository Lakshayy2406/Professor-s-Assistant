import React from 'react';
import { useApp } from '../../context/AppContext';
import { AddEventForm } from './AddEventForm';
import { EventCard } from './EventCard';
import { Calendar, CalendarX } from 'lucide-react';

export const ScheduleView: React.FC = () => {
  const { events } = useApp();

  const formattedCurrentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });

  const sortedEvents = [...events].sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  return (
    <div className="flex-1 flex-col h-full overflow-y-auto p-4 sm:p-8 animate-fade-in bg-slate-50">
      <div className="max-w-5xl mx-auto w-full">
        {/* Top Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Academic Schedule</h2>
            <p className="text-slate-500 text-sm mt-0.5">Track your lectures, assignments, and exam deadlines.</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-200 text-sm text-slate-700 font-semibold flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-600" />
            <span>{formattedCurrentDate}</span>
          </div>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <AddEventForm />
          </div>

          <div className="lg:col-span-2 space-y-3.5">
            {sortedEvents.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border-2 border-slate-200 border-dashed p-8">
                <CalendarX className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-600 font-semibold text-base">No events scheduled.</p>
                <p className="text-slate-400 text-xs mt-1">Use the form on the left to add upcoming exams and assignments.</p>
              </div>
            ) : (
              sortedEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
