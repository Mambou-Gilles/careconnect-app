// src/pages/MessagesPage.js
import React, { useState } from 'react'; // Removed useEffect, useMemo for debugging
import { useNavigate, Link } from 'react-router-dom';
import Card from '../components/Card/Card';
import Button from '../components/Button/Button';
import { mockMessages } from '../data/messages'; // Assume this is static and doesn't change reference

import './MessagesPage.css';

// Helper function to calculate read status (used directly in map, not for state update loop)
const calculateConversationReadStatus = (conversation) => {
  return !conversation.thread.some(msg => msg.sender !== 'You' && !msg.read);
};

const MessagesPage = () => {
  // Initialize conversations directly from mockMessages.
  // This will *not* cause a loop as long as mockMessages itself is a stable reference.
  const [conversations, setConversations] = useState(
    mockMessages.map(conv => ({
      ...conv,
      read: calculateConversationReadStatus(conv)
    }))
  );

  const navigate = useNavigate();

  const [newMessageContent, setNewMessageContent] = useState('');
  const [newConversationSubject, setNewConversationSubject] = useState('');

  // ALL useEffects related to setConversations are REMOVED for debugging this loop.
  // We will re-introduce read status logic later if needed, but not through a looping useEffect.

  const handleStartNewConversation = () => {
    if (newConversationSubject.trim() && newMessageContent.trim()) {
      const newConvId = `msg${conversations.length + 1}`;
      const newThread = {
        id: `${newConvId}_1`,
        sender: 'You',
        content: newMessageContent.trim(),
        date: new Date().toISOString(),
        read: true,
      };
      const newConversation = {
        id: newConvId,
        sender: 'You',
        subject: newConversationSubject.trim(),
        read: true,
        thread: [newThread],
      };
      // When adding a new conversation, we must update `conversations` state.
      // This is the *only* place `setConversations` should be called in this version
      // other than the initial useState call.
      setConversations(prev => {
        const updated = [...prev, newConversation];
        // For a real app, you'd probably send this to a backend and refresh data.
        return updated.map(conv => ({ // Re-calculate read status for all on new message
            ...conv,
            read: calculateConversationReadStatus(conv)
        }));
      });
      setNewMessageContent('');
      setNewConversationSubject('');
      alert('New message sent! (Simulated)');
      navigate(`/messages/${newConvId}`);
    } else {
      alert('Please enter both a subject and a message.');
    }
  };

  // The sorting can be done directly in render or with useMemo,
  // but if the loop is still there, sorting isn't the primary problem.
  const displayConversations = [...conversations].sort((a, b) => {
    const lastMsgA = a.thread[a.thread.length - 1]?.date;
    const lastMsgB = b.thread[b.thread.length - 1]?.date;
    if (!lastMsgA) return 1;
    if (!lastMsgB) return -1;
    return new Date(lastMsgB) - new Date(lastMsgA);
  });

  return (
    <div className="container">
      <h2>My Messages</h2>

      <div style={{ marginBottom: '30px' }}>
        <Card>
          <h3>Start a New Message</h3>
          <input
            type="text"
            placeholder="Subject..."
            value={newConversationSubject}
            onChange={(e) => setNewConversationSubject(e.target.value)}
            style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '4px', border: '1px solid var(--input-border)', backgroundColor: 'var(--card-bg)', color: 'var(--text-color)' }}
          />
          <textarea
            placeholder="Type your message here..."
            value={newMessageContent}
            onChange={(e) => setNewMessageContent(e.target.value)}
            rows="3"
            style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '4px', border: '1px solid var(--input-border)', backgroundColor: 'var(--card-bg)', color: 'var(--text-color)' }}
          ></textarea>
          <Button onClick={handleStartNewConversation}>Send New Message</Button>
        </Card>
      </div>

      <div>
        <h3>Your Conversations</h3>
        {displayConversations.length === 0 ? (
          <p>No conversations yet.</p>
        ) : (
          displayConversations.map((conv) => (
            <Card
              key={conv.id}
              className={`message-summary-card ${!conv.read ? 'unread-message' : ''}`}
            >
              {/* This Link will now definitely try to navigate */}
              <Link to={`/messages/${conv.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block', padding: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4>{conv.subject}</h4>
                  <span style={{ fontSize: '0.8em', color: 'var(--text-color)' }}>
                    {new Date(conv.thread[conv.thread.length - 1]?.date).toLocaleString()}
                  </span>
                </div>
                <p>From: **{conv.sender}**</p>
                <p className="message-preview">{conv.thread[conv.thread.length - 1]?.content.substring(0, 100)}...</p>
                {!conv.read && <span className="new-badge">NEW</span>}
              </Link>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default MessagesPage;