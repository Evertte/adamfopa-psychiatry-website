"use client";

import { useMemo, useState } from "react";

type VisitType = "telehealth" | "inperson" | "";

export default function ContactForm({ defaultVisit }: { defaultVisit: VisitType }) {
  const [visitType, setVisitType] = useState<VisitType>(defaultVisit);
  const [visitDate, setVisitDate] = useState<string>("");
  const [visitTime, setVisitTime] = useState<string>("");

  const timeSlots = useMemo(() => {
    const slots: string[] = [];
    const start = new Date();
    start.setHours(8, 0, 0, 0);
    const end = new Date();
    end.setHours(19, 45, 0, 0);

    const cursor = new Date(start);
    while (cursor <= end) {
      const hours = cursor.getHours();
      const minutes = cursor.getMinutes();
      const displayHours = hours % 12 === 0 ? 12 : hours % 12;
      const ampm = hours >= 12 ? "PM" : "AM";
      const paddedMinutes = minutes.toString().padStart(2, "0");
      slots.push(`${displayHours}:${paddedMinutes} ${ampm}`);
      cursor.setMinutes(cursor.getMinutes() + 15);
    }
    return slots;
  }, []);

  return (
    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
      <div>
        <label className="text-sm font-medium text-slate-900">Visit type</label>
        <select
          value={visitType}
          onChange={(e) => setVisitType(e.target.value as VisitType)}
          required
          className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-4 focus:ring-teal-100"
        >
          <option value="">Select visit type</option>
          <option value="telehealth">Telehealth</option>
          <option value="inperson">In-person</option>
        </select>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-slate-900">Preferred date</label>
          <input
            type="date"
            value={visitDate}
            onChange={(e) => setVisitDate(e.target.value)}
            required
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-4 focus:ring-teal-100"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-900">Preferred time</label>
          <select
            value={visitTime}
            onChange={(e) => setVisitTime(e.target.value)}
            required
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-4 focus:ring-teal-100"
          >
            <option value="">Select a time</option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-slate-900">Full name</label>
          <input
            type="text"
            required
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-teal-100"
            placeholder="Your name"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-900">Phone</label>
          <input
            type="tel"
            required
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-teal-100"
            placeholder="(###) ###-####"
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-slate-900">Email</label>
        <input
          type="email"
          required
          className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-teal-100"
          placeholder="you@email.com"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-slate-900">Message</label>
        <textarea
          rows={5}
          className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-teal-100"
          placeholder="Tell us what you’re looking for (please avoid sensitive details)."
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-200"
      >
        Send request
      </button>
    </form>
  );
}
