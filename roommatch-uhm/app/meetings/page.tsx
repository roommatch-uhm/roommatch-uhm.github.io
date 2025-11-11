"use client";
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "bootstrap/dist/css/bootstrap.min.css";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface Meeting {
  date: string;
  time: string;
  title: string;
}

export default function MeetingsPage() {
  const [value, setValue] = useState<Value>(new Date());
  const [meetings, setMeetings] = useState<Meeting[]>([
    { date: "2025-11-15", time: "10:00", title: "Coffee chat with Grace @ Campus Center" },
    { date: "2025-11-17", time: "14:00", title: "Meeting with Jamie @ Hamilton Library" },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [newMeeting, setNewMeeting] = useState<Meeting>({
    title: "",
    date: "",
    time: "",
  });

  const meetingDates = meetings.map((m) => m.date);

  const isMeetingDate = (date: Date) => {
    const formatted = date.toISOString().split("T")[0];
    return meetingDates.includes(formatted);
  };

  const selectedDateValue = Array.isArray(value) ? value[0] : value ?? new Date();
  const selectedDate =
    selectedDateValue instanceof Date ? selectedDateValue : new Date();

  const selectedMeetings = meetings.filter(
    (m) => m.date === selectedDate.toISOString().split("T")[0]
  );

  // Handle new or edited meeting submission
  const handleAddOrEditMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMeeting.title || !newMeeting.date || !newMeeting.time) return;

    if (editingIndex !== null) {
      const updated = [...meetings];
      updated[editingIndex] = newMeeting;
      setMeetings(updated);
      setEditingIndex(null);
    } else {
      setMeetings([...meetings, newMeeting]);
    }

    setNewMeeting({ title: "", date: "", time: "" });
    setShowForm(false);
  };

  // Handle delete
  const handleDeleteMeeting = (index: number) => {
    const updated = meetings.filter((_, i) => i !== index);
    setMeetings(updated);
  };

  // Handle edit
  const handleEditMeeting = (index: number) => {
    setNewMeeting(meetings[index]);
    setEditingIndex(index);
    setShowForm(true);
  };

  return (
    <div className="container-fluid min-vh-100 py-5 meetings-page">
      <div className="text-center mb-5">
        <h2 className="fw-bold page-title">My Meetings</h2>
        <p className="text-muted page-subtitle">
          Stay organized and easily manage your meetings.
        </p>
      </div>

      <div className="d-flex justify-content-center">
        <div className="p-4 rounded-4 shadow-sm bg-white calendar-wrapper">
          <Calendar
            onChange={setValue}
            value={value}
            tileClassName={({ date }) =>
              isMeetingDate(date) ? "meeting-day" : ""
            }
          />
        </div>
      </div>

      <div className="text-center mt-4">
        <h5 className="fw-semibold">{selectedDate.toDateString()}</h5>

        {selectedMeetings.length > 0 ? (
          selectedMeetings.map((m, index) => (
            <div key={index} className="meeting-card mx-auto mb-3 p-3 rounded-3 shadow-sm bg-white" style={{ maxWidth: "500px" }}>
              <h6 className="fw-semibold">{m.title}</h6>
              <p className="text-muted mb-2">{m.date} | {m.time}</p>
              <div className="d-flex justify-content-center gap-2">
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => handleEditMeeting(meetings.indexOf(m))}
                >
                Edit
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDeleteMeeting(meetings.indexOf(m))}
                >
                  Cancel
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted">No meetings scheduled for this date.</p>
        )}

        <button
          className="btn btn-coral mt-3"
          onClick={() => {
            setShowForm(!showForm);
            setEditingIndex(null);
            setNewMeeting({ title: "", date: "", time: "" });
          }}
        >
          {showForm ? "Cancel" : "Add New Meeting"}
        </button>

        {showForm && (
          <form
            onSubmit={handleAddOrEditMeeting}
            className="mt-4 d-flex flex-column align-items-center"
          >
            <input
              type="date"
              className="form-control mb-2"
              style={{ width: "250px" }}
              value={newMeeting.date}
              onChange={(e) =>
                setNewMeeting({ ...newMeeting, date: e.target.value })
              }
            />
            <input
              type="time"
              className="form-control mb-2"
              style={{ width: "250px" }}
              value={newMeeting.time}
              onChange={(e) =>
                setNewMeeting({ ...newMeeting, time: e.target.value })
              }
            />
            <input
              type="text"
              className="form-control mb-2"
              style={{ width: "250px" }}
              placeholder="Enter meeting title"
              value={newMeeting.title}
              onChange={(e) =>
                setNewMeeting({ ...newMeeting, title: e.target.value })
              }
            />
            <button type="submit" className="btn btn-coral mt-2">
              {editingIndex !== null ? "Update Meeting" : "Save Meeting"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
