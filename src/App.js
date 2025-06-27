// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import MessagesPage from './pages/MessagesPage';
import MessageDetailPage from './pages/MessageDetailPage';
import ResourcesPage from './pages/ResourcesPage';
import AppointmentsPage from './pages/AppointmentsPage';
import NotFoundPage from './pages/NotFoundPage';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Header />

        <main className="app-main">
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              {/* IMPORTANT: Place the more specific route BEFORE the less specific one */}
              <Route path="/messages/:id" element={<MessageDetailPage />} /> {/* Moved this up */}
              <Route path="/messages" element={<MessagesPage />} />
              <Route path="/appointments" element={<AppointmentsPage />} />
              <Route path="/resources" element={<ResourcesPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </ErrorBoundary>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;