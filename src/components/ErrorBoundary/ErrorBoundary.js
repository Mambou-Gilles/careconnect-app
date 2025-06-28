
import React from 'react';
import './ErrorBoundary.css'; // Optional: for fallback UI styling
import Button from '../Button/Button';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  // This lifecycle method is called after an error is thrown by a descendant component.
  static getDerivedStateFromError(error) {
    // Update state so the next render shows the fallback UI.
    return { hasError: true };
  }

  // This lifecycle method is called after an error has been caught.
  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      // Can render any custom fallback UI
      return (
        <div className="error-boundary-fallback">
          <h2>Oops! Something went wrong.</h2>
          <p>We're sorry for the inconvenience. Please try refreshing the page or navigating back.</p>
          {/* Optional: Display error details in development mode */}
          {process.env.NODE_ENV === 'development' && (
            <details style={{ whiteSpace: 'pre-wrap', backgroundColor: 'var(--card-bg)', padding: '15px', borderRadius: '8px', marginTop: '20px', border: '1px solid var(--card-border)' }}>
              <summary>Error Details</summary>
              <p style={{ color: 'red' }}>{this.state.error && this.state.error.toString()}</p>
              <pre>{this.state.errorInfo && this.state.errorInfo.componentStack}</pre>
            </details>
          )}
          <Button onClick={() => window.location.reload()} style={{ marginTop: '20px' }}>Refresh Page</Button>
        </div>
      );
    }

    return this.props.children; // Render children normally if no error
  }
}

export default ErrorBoundary;