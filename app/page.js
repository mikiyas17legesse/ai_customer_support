"use client";

import { Box, Button, Stack, TextField } from "@mui/material";
import { useState, useRef, useEffect } from "react";
import NavBar from "@/components/NavBar";

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm the Headstarter support assistant. How can I help you today?",
    },
  ]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim() || isLoading) return;
    setIsLoading(true);

    setMessage("");
    setMessages((messages) => [
      ...messages,
      { role: "user", content: message },
      { role: "assistant", content: "" },
    ]);

    try {
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([...messages, { role: "user", content: message }]),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const text = decoder.decode(value, { stream: true });
        setMessages((messages) => {
          let lastMessage = messages[messages.length - 1];
          let otherMessages = messages.slice(0, messages.length - 1);
          return [
            ...otherMessages,
            { ...lastMessage, content: lastMessage.content + text },
          ];
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((messages) => [
        ...messages,
        {
          role: "assistant",
          content:
            "I'm sorry, but I encountered an error. Please try again later.",
        },
      ]);
    }
    setIsLoading(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      <NavBar></NavBar>
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "#001f3f",
        }}
      >
        <Stack
          direction={"column"}
          sx={{
            width: { xs: "90%", sm: "80%", md: "60%", lg: "40%" },
            height: { xs: "80%", sm: "70%", md: "60%", lg: "70%" },
            border: "1px solid #004080",
            bgcolor: "#002b5c",
            p: 2,
            spacing: 3,
            borderRadius: "8px",
          }}
        >
          <Stack
            direction={"column"}
            spacing={2}
            flexGrow={1}
            sx={{
              overflowY: "auto",
              maxHeight: "100%",
            }}
          >
            {messages.map((message, index) => (
              <Box
                key={index}
                display="flex"
                justifyContent={
                  message.role === "assistant" ? "flex-start" : "flex-end"
                }
              >
                <Box
                  sx={{
                    bgcolor:
                      message.role === "assistant" ? "#003366" : "#00509E",
                    color: "white",
                    borderRadius: "16px",
                    p: 2,
                    maxWidth: "70%",
                    wordWrap: "break-word",
                  }}
                >
                  {message.content}
                </Box>
              </Box>
            ))}
          </Stack>
          <Stack direction={"row"} spacing={2}>
            <TextField
              label="Message"
              fullWidth
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              sx={{
                bgcolor: "#003366",
                input: { color: "white" },
                label: { color: "#99ccff" },
              }}
            />
            <Button
              variant="contained"
              onClick={sendMessage}
              sx={{
                bgcolor: "#005080",
                "&:hover": {
                  bgcolor: "#00509E",
                },
              }}
            >
              Send
            </Button>
          </Stack>
        </Stack>
      </Box>
    </>
  );
}
