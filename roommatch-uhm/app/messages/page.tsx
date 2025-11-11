"use client";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

interface Message {
  id: number;
  sender: string;
  text: string;
  time: string;
}

interface Chat {
  id: number;
  name: string;
  messages: Message[];
  meeting?: {
    date: string;
    time: string;
    location: string;
  };
}

export default function MessagesPage() {
  // --- Mock data: list of chats ---
  const [chats, setChats] = useState<Chat[]>([
    {
      id: 1,
      name: "Kai",
      messages: [
        { id: 1, sender: "Kai", text: "Hey! Want to meet later?", time: "9:00 AM" },
        { id: 2, sender: "You", text: "Sure! Does 2pm work?", time: "9:05 AM" },
      ],
    },
    {
      id: 2,
      name: "Noelani",
      messages: [
        { id: 1, sender: "Noelani", text: "Hi! Are you still looking for a roommate?", time: "10:10 AM" },
        { id: 2, sender: "You", text: "Yes, still looking :)", time: "10:12 AM" },
      ],
    },
    {
      id: 3,
      name: "Aiden",
      messages: [
        { id: 1, sender: "Aiden", text: "Hey, how’s the housing search going?", time: "Yesterday" },
      ],
    },
  ]);

  const [activeChat, setActiveChat] = useState<Chat>(chats[0]);
  const [newMessage, setNewMessage] = useState("");

  // --- Scheduling form state ---
  const [meeting, setMeeting] = useState({ date: "", time: "", location: "" });

  // --- Send a message ---
  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const newMsg: Message = {
      id: activeChat.messages.length + 1,
      sender: "You",
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updatedChats = chats.map((chat) =>
      chat.id === activeChat.id
        ? { ...chat, messages: [...chat.messages, newMsg] }
        : chat
    );

    setChats(updatedChats);
    setActiveChat({ ...activeChat, messages: [...activeChat.messages, newMsg] });
    setNewMessage("");
  };

  // --- Schedule a meeting ---
  const scheduleMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!meeting.date || !meeting.time) return;

    const updatedChats = chats.map((chat) =>
      chat.id === activeChat.id
        ? { ...chat, meeting }
        : chat
    );

    setChats(updatedChats);
    alert(
      `Meeting with ${activeChat.name} scheduled on ${meeting.date} at ${meeting.time} ${
        meeting.location ? `in ${meeting.location}` : ""
      }`
    );
    setMeeting({ date: "", time: "", location: "" });
  };

  return (
    <div className="container-fluid my-4">
      <h2 className="text-center mb-4 fw-bold text-success">Messages & Meetings</h2>

      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 border-end">
          <h5 className="fw-semibold mb-3">Chats</h5>
          <ul className="list-group">
            {chats.map((chat) => (
              <li
                key={chat.id}
                className={`list-group-item list-group-item-action ${
                  chat.id === activeChat.id ? "active" : ""
                }`}
                onClick={() => {
                  setActiveChat(chat);
                  setMeeting(chat.meeting || { date: "", time: "", location: "" });
                }}
                style={{ cursor: "pointer" }}
              >
                {chat.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Chat + Schedule area */}
        <div className="col-md-9">
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-success text-white">
              Chat with {activeChat.name}
            </div>
            <div
              className="card-body"
              style={{ height: "350px", overflowY: "auto", background: "#f8f9fa" }}
            >
              {activeChat.messages.map((m) => (
                <div key={m.id} className="mb-2">
                  <strong>{m.sender}:</strong> {m.text}
                  <div className="text-muted small">{m.time}</div>
                </div>
              ))}
            </div>
            <div className="card-footer">
              <form onSubmit={sendMessage} className="d-flex gap-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder={`Message ${activeChat.name}...`}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <button type="submit" className="btn btn-success">
                  Send
                </button>
              </form>
            </div>
          </div>

          {/* Scheduling section */}
          <div className="card shadow-sm">
            <div className="card-header bg-warning">
              Schedule a Meeting with {activeChat.name}
            </div>
            <div className="card-body">
              <form onSubmit={scheduleMeeting} className="row g-3">
                <div className="col-md-4">
                  <label htmlFor="date" className="form-label">
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    className="form-control"
                    value={meeting.date}
                    onChange={(e) => setMeeting({ ...meeting, date: e.target.value })}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="time" className="form-label">
                    Time
                  </label>
                  <input
                    type="time"
                    id="time"
                    className="form-control"
                    value={meeting.time}
                    onChange={(e) => setMeeting({ ...meeting, time: e.target.value })}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="location" className="form-label">
                    Location
                  </label>
                  <select
                    id="location"
                    className="form-select"
                    value={meeting.location}
                    onChange={(e) =>
                      setMeeting({ ...meeting, location: e.target.value })
                    }
                  >
                    <option value="">Choose...</option>
                    <option value="Campus Center">Campus Center</option>
                    <option value="Hamilton Library">Hamilton Library</option>
                    <option value="Paradise Palms">Paradise Palms</option>
                    <option value="Hemenway Courtyard">Hemenway Courtyard</option>
                  </select>
                </div>
                <div className="col-12 text-end">
                  <button type="submit" className="btn btn-warning fw-semibold">
                    Confirm Meeting
                  </button>
                </div>
              </form>
              {activeChat.meeting && (
                <div className="mt-3 text-success">
                  <strong>Current Meeting:</strong>{" "}
                  {activeChat.meeting.date} at {activeChat.meeting.time}{" "}
                  {activeChat.meeting.location
                    ? `(${activeChat.meeting.location})`
                    : ""}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
