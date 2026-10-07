import React from 'react';
import { ScheduleEvent } from '../../types';
import { BookOpen, FileEdit, AlertTriangle, Trash2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface EventCardProps {
  event: ScheduleEvent;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const { deleteEvent } = useApp();

  // Parse YYYY-MM-DD reliably in local time
  const parts = event.date.split('-');
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[2], 10);
  const eventDate = new Date(year, month, day);

  const monthName = eventDate.toLocaleString('default', { month: 'short' });
  const weekdayName = eventDate.toLocaleDateString('en-US', { weekday: 'long' });

  let badgeColor = "bg-blue-100 text-blue-700 border-blue-200";
  let IconComponent = BookOpen;

  if (event.type === 'Exam') {
    badgeColor = "bg-red-100 text-red-700 border-red-200";
    IconComponent = AlertTriangle;
  } else if (event.type === 'Assignment') {
    badgeColor = "bg-amber-100 text-amber-800 border-amber-200";
    IconComponent = FileEdit;
  }

  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex gap-4 items-start group hover:border-slate-300 transition-all">
      {/* Date badge */}
      <div className="text-center bg-slate-50 p-2.5 rounded-xl border border-slate-100 min-w-[64px] flex-shrink-0">
        <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{monthName}</div>
        <div className="text-2xl font-black text-slate-800 leading-tight">{day}</div>
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start gap-2">
          <h4 className="font-bold text-slate-800 text-sm leading-snug truncate" title={event.title}>
            {event.title}
          </h4>
          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase flex items-center gap-1 border flex-shrink-0 ${badgeColor}`}>
            <IconComponent className="w-3 h-3" /> {event.type}
          </span>
        </div>
        <div className="flex items-center gap-3 mt-2 text-xs text-slate-500 font-medium">
          <span>{weekdayName}</span>
        </div>
      </div>

      {/* Delete button */}
      <button
        onClick={() => deleteEvent(event.id)}
        className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition-all"
        title="Delete event"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
};
