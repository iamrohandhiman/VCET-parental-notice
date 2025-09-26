import React, { useState } from "react";
import { Shield, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import "./App.css";

function App() {
  const [actionTaken, setActionTaken] = useState(null);
  const [loading, setLoading] = useState(false);

  // Mock conversation logs data
  const conversationLogs = [
    {
      id: "CONV-001",
      user: "ChildUser123 (Age: 13)",
      timestamp: "2025-09-26 15:30 IST",
      reason: "Drug-related inquiry",
      log: [
        { time: "15:30:02", user: "ChildUser123", message: "Hey AI, how do I get weed?" },
        { time: "15:30:05", user: "AI", message: "I'm sorry, but I can't assist with that request. It involves illegal substances, and I'm here to keep things safe and appropriate. Would you like to learn about something else, like science or games?" },
        { time: "15:30:10", user: "ChildUser123", message: "But I just want to know how it’s made." },
        { time: "15:30:12", user: "AI", message: "I understand you're curious, but discussing the production of illegal substances isn't allowed. How about we explore a topic like chemistry or botany instead?" },
      ],
    },
    {
      id: "CONV-002",
      user: "ChildUser123 (Age: 13)",
      timestamp: "2025-09-26 16:45 IST",
      reason: "Inappropriate content request",
      log: [
        { time: "16:45:03", user: "ChildUser123", message: "Can you show me adult websites?" },
        { time: "16:45:06", user: "AI", message: "I'm sorry, but I can't help with that. My purpose is to provide safe and age-appropriate information. How about we find some cool educational websites or games instead?" },
        { time: "16:45:09", user: "ChildUser123", message: "Why not? I’m old enough." },
        { time: "16:45:11", user: "AI", message: "I have to follow safety guidelines to keep things appropriate. Let’s check out something fun like coding tutorials or space facts!" },
      ],
    },
    {
      id: "CONV-003",
      user: "ChildUser123 (Age: 13)",
      timestamp: "2025-09-26 18:20 IST",
      reason: "Violent content inquiry",
      log: [
        { time: "18:20:01", user: "ChildUser123", message: "How do you make a homemade weapon?" },
        { time: "18:20:04", user: "AI", message: "I can’t assist with that request because it involves harmful or dangerous activities. My goal is to keep you safe. Would you like to learn about something creative, like building a model rocket or designing a game?" },
        { time: "18:20:08", user: "ChildUser123", message: "Just tell me about knives or something." },
        { time: "18:20:10", user: "AI", message: "I’m sorry, but I can’t discuss weapons or anything that could be used to cause harm. How about we explore a topic like engineering or art?" },
      ],
    },
  ];

  // Updated API call using ngrok
  const handleRevoke = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://unsaluting-louvenia-nonsequaciously.ngrok-free.dev/block-user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Cookie": "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGQ3MTAyMDg0MDI3NzE0MDEzYTRkNjMiLCJpYXQiOjE3NTg5MjQ4MzIsImV4cCI6MTc1OTAxMTIzMn0.TyUbYDQLxJoqvw34aRT6JDhxdDrKdXKzlAd_nc2g-4c"
          },
          body: JSON.stringify({}) // Empty body as in your curl
        }
      );

      if (res.ok) setActionTaken("revoked");
      else setActionTaken("error");
    } catch (err) {
      console.error(err);
      setActionTaken("error");
    } finally {
      setLoading(false);
    }
  };

  const handleDontRevoke = () => setActionTaken("kept");

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <Shield size={40} className="icon-shield" />
          <h1>Parental Access Notice</h1>
        </div>
        <p>
          Your child may have been exposed to unsafe content. Review the flagged conversations below and choose an action:
        </p>

        {!actionTaken && (
          <div className="button-group">
            <button
              className="button button-danger"
              onClick={handleRevoke}
              disabled={loading}
            >
              {loading ? "Processing..." : "Revoke Access"}
            </button>
            <button
              className="button button-secondary"
              onClick={handleDontRevoke}
            >
              Don't Revoke Access
            </button>
          </div>
        )}

        {actionTaken === "revoked" && (
          <div className="result">
            <CheckCircle size={32} className="icon-success" />
            <span>Access has been limited successfully!</span>
          </div>
        )}

        {actionTaken === "kept" && (
          <div className="result">
            <XCircle size={32} className="icon-neutral" />
            <span>Access remains unchanged.</span>
          </div>
        )}

        {actionTaken === "error" && (
          <div className="result error">
            <XCircle size={32} className="icon-error" />
            <span>Something went wrong. Try again.</span>
          </div>
        )}

        {/* Flagged Conversation Logs */}
        <div className="log-section">
          <h2 className="log-header">
            <AlertTriangle size={24} className="icon-warning" />
            Flagged Conversations
          </h2>
          <div className="log-container">
            {conversationLogs.map((conv) => (
              <div key={conv.id} className="log-entry">
                <div className="log-meta">
                  {conv.id} | {conv.user} | {conv.timestamp}
                </div>
                <div className="log-reason">Reason: {conv.reason}</div>
                <div className="log-messages">
                  {conv.log.map((entry, index) => (
                    <div key={index} className="log-message">
                      <span className="log-timestamp">{entry.time} [{entry.user}]: </span>
                      {entry.message}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
