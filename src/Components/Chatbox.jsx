import {useState} from "react";

const Chatbot = () => {
  const [visible, setVisible] = useState(false);

  const toggleChatbot = () => {
    setVisible((prev) => !prev);
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={toggleChatbot}
        style={{
          position: "fixed",
          bottom: visible ? "410px" : "20px",
          right: "20px",
          zIndex: 10000,
          padding: "0.5rem 1rem",
          borderRadius: "20px",
          backgroundColor: "#1976d2",
          color: "white",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 2px 6px rgba(0,0,0,0.2)"
        }}
      >
        {visible ? "Hide Bot" : "ChatBot"}
      </button>

      {/* Iframe */}
      {visible && (
        <iframe
          src="https://ellie1370.github.io/chatbot/"
          width="400"
          height="400"
          style={{
            position: "fixed",
            bottom: 0,
            right: 0,
            border: "none",
            zIndex: 9999,
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(0,0,0,0.15)"
          }}
          title="Chatbot"
        />
      )}
    </>
  );
};

export default Chatbot;