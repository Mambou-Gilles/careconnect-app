// src/pages/MessagesPage.js
import React, { useState } from 'react'; // useEffect might not be strictly needed here anymore
import { useNavigate, Link } from 'react-router-dom';
import Card from '../components/Card/Card';
import Button from '../components/Button/Button';
import { mockMessages } from '../data/messages';
import './MessagesPage.css';

// Helper function to determine if a conversation has unread incoming messages
const calculateConversationReadStatus = (conversation) => {
  return !conversation.thread.some(msg => msg.sender !== 'You' && !msg.read);
};

const MessagesPage = () => {
  // Initialize conversations with their read status calculated upfront
  const [conversations, setConversations] = useState(() =>
    mockMessages.map(conv => ({
      ...conv,
      read: calculateConversationReadStatus(conv)
    }))
  );
  const navigate = useNavigate();

  const [newMessageContent, setNewMessageContent] = useState('');
  const [newConversationSubject, setNewConversationSubject] = useState('');

  // IMPORTANT: Remove the problematic useEffect here!
  // The read status is now initialized and will be updated on the detail page.
  // When returning to this page, the mockMessages data (which is static) will
  // re-initialize, which is fine for a mock. In a real app, this would come from a global store or API.

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
        read: true, // New conversations started by 'You' are considered read
        thread: [newThread],
      };
      // For mock data, just add it. In a real app, this would persist.
      // We also need to ensure the mockMessages are updated if this new convo should appear consistently.
      // For now, let's keep it simple: new convo adds to local state and navigates.
      setConversations(prev => [...prev, newConversation]);
      setNewMessageContent('');
      setNewConversationSubject('');
      alert('New message sent! (Simulated)');
      navigate(`/messages/${newConvId}`); // Navigate to the newly created message thread
    } else {
      alert('Please enter both a subject and a message.');
    }
  };

  const displayConversations = [...conversations].sort((a, b) => {
    const lastMsgA = a.thread[a.thread.length - 1]?.date;
    const lastMsgB = b.thread[b.thread.length - 1]?.date;
    // Handle cases where a thread might be empty (though our mock ensures this won't happen)
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
              // Ensure the Link is correctly wrapping the clickable area
            >
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