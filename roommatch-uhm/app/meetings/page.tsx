"use client";
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "bootstrap/dist/css/bootstrap.min.css";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function MeetingsPage() {
  const [value, setValue] = useState<Value>(new Date());

  const meetings = [
    { date: "2025-11-15", title: "Meet Kai @ Campus Center" },
    { date: "2025-11-17", title: "Meet Noelani @ Hamilton Library" },
  ];

  const meetingDates = meetings.map((m) => m.date);

  const isMeetingDate = (date: Date) => {
    const formatted = date.toISOString().split("T")[0];
    return meetingDates.includes(formatted);
  };

  const selectedDate =
    (Array.isArray(value) && value.length > 0 ? value[0] : value) as Date;

  const selectedMeeting = meetings.find(
    (m) => m.date === selectedDate.toISOString().split("T")[0]
  );

  return (
    <div className="container my-5">
      <h2 className="text-center fw-bold text-success mb-4">My Meetings</h2>
      <div className="d-flex justify-content-center">
        <Calendar
          onChange={setValue}
          value={value}
          tileClassName={({ date }) =>
            isMeetingDate(date) ? "bg-success text-white rounded" : ""
          }
        />
      </div>

      <div className="mt-4 text-center">
        <h5>Selected Date: {selectedDate.toDateString()}</h5>
        {selectedMeeting ? (
          <>
            <p className="text-success fw-semibold">
              You have a meeting scheduled!
            </p>
            <p>
              <strong>Details:</strong> {selectedMeeting.title}
            </p>
          </>
        ) : (
          <p className="text-muted">No meetings scheduled for this date.</p>
        )}
      </div>
    </div>
  );
}
