"use client";

import React from "react";

export default function Error({ error, reset }) {
  // Send error details to parent window when component mounts
  React.useEffect(() => {
    if (window.parent) {
      window.parent.postMessage(
        {
          type: "ERROR_LOG",
          error: error.message,
          stack: error.stack,
          timestamp: new Date().toISOString(),
        },
        "*"
      );
    }
  }, [error]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
        padding: "20px",
        backgroundColor: "#f8f9fa",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 2px 15px rgba(0, 0, 0, 0.1)",
          maxWidth: process.env.NODE_ENV === "development" ? "800px" : "400px",
          width: "100%",
        }}
      >
        <svg
          style={{
            width: "64px",
            height: "64px",
            margin: "0 auto 1rem",
            display: "block",
            color: "#dc3545",
          }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>

        <h1
          style={{
            fontSize: "1.5rem",
            color: "#343a40",
            marginBottom: "1rem",
            fontWeight: "600",
          }}
        >
          {process.env.NODE_ENV === "development"
            ? "Development Mode Error"
            : "Something went wrong!"}
        </h1>

        {process.env.NODE_ENV === "development" ? (
          <>
            <div
              style={{
                backgroundColor: "#f8f9fa",
                padding: "1rem",
                borderRadius: "4px",
                marginBottom: "1rem",
                textAlign: "left",
              }}
            >
              <h2
                style={{
                  fontSize: "1.1rem",
                  color: "#dc3545",
                  marginTop: 0,
                  marginBottom: "0.5rem",
                }}
              >
                {error.message}
              </h2>
              <pre
                style={{
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                  color: "#666",
                  fontSize: "0.9rem",
                  marginBottom: 0,
                  overflow: "auto",
                  maxHeight: "300px",
                }}
              >
                {error.stack}
              </pre>
            </div>
          </>
        ) : (
          <p
            style={{
              color: "#6c757d",
              marginBottom: "1.5rem",
              fontSize: "0.95rem",
              lineHeight: "1.5",
            }}
          >
            We're sorry, but something unexpected happened. Please try again.
          </p>
        )}

        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
          }}
        >
          <button
            onClick={reset}
            style={{
              backgroundColor: "#0d6efd",
              color: "white",
              border: "none",
              padding: "0.5rem 1rem",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "0.9rem",
              transition: "background-color 0.2s",
            }}
          >
            Try again
          </button>

          {process.env.NODE_ENV === "development" && (
            <button
              onClick={() => window.location.reload()}
              style={{
                backgroundColor: "#6c757d",
                color: "white",
                border: "none",
                padding: "0.5rem 1rem",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "0.9rem",
                transition: "background-color 0.2s",
              }}
            >
              Refresh Page
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
