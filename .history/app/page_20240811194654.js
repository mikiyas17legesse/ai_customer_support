'use client'
import { useState } from "react";
import {Box, Stack, TextField, Button} from '@mui/material'

export default function Home() {
  const [messages, setMessages] = useState([
    {
    role: 'assistant', 
    content: "Hi I'm the Headstarter Support Agent, how may I assist you today?",
    }
  ])

  const [message, setMessage] = useState('')

  const sendMessage = async() => {
    setMessage('')
    setMessages((messages)=> [
      ...messages,
      {role:'user', content: message},
      {role:'assistant', content: ''},
    ])

    const response = fetch('/api/chat/', {
      method: "POST",
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify([...messages, {role: 'user', content: message}]),
    }).then(async(res)=> {
      const reader = res.body.getReader()
      const decoder = new TextDecoder()

      let result = ''
      return reader.read().then(function processText({done, value}){
        if (done) {
          return result
        }
        const text = decoder.decode(value || new Int8Array(), {stream:true})
        setMessages((messages) => {
          let lastMessage = messages[messages.length-1]
          let otherMessages = messages.slice(0, messages.length-1)
          return [
            ...otherMessages,
            {
              ...lastMessage,
              content: lastMessage.content + text
            },
          ]
        })
        return reader.read().then(processText)
      })
    })
  }


  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: '#001f3f', // Dark blue background
      }}
    >
      <Stack
        direction={'column'}
        sx={{
          width: { xs: '90%', sm: '80%', md: '60%', lg: '40%' }, // Responsive width
          height: { xs: '80%', sm: '70%', md: '60%', lg: '70%' }, // Responsive height
          border: '1px solid #004080', // Slightly lighter dark blue border
          bgcolor: '#002b5c', // Darker blue for chat container
          p: 2,
          spacing: 3,
          borderRadius: '8px', // Rounded corners
        }}
      >
        <Stack
          direction={'column'}
          spacing={2}
          flexGrow={1}
          sx={{
            overflowY: 'auto',
            maxHeight: '100%',
          }}
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent={
                message.role === 'assistant' ? 'flex-start' : 'flex-end'
              }
            >
              <Box
                sx={{
                  bgcolor: message.role === 'assistant' ? '#003366' : '#00509E', // Dark blue for assistant, lighter blue for user
                  color: 'white',
                  borderRadius: '16px',
                  p: 2,
                  maxWidth: '70%',
                  wordWrap: 'break-word',
                }}
              >
                {message.content}
              </Box>
            </Box>
          ))}
        </Stack>
        <Stack direction={'row'} spacing={2}>
          <TextField
            label="Message"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            sx={{
              bgcolor: '#003366', // Input field with dark blue background
              input: { color: 'white' }, // White text
              label: { color: '#99ccff' }, // Lighter blue label
            }}
          />
          <Button
            variant="contained"
            onClick={sendMessage}
            sx={{
              bgcolor: '#004080', // Button with slightly lighter dark blue
              '&:hover': {
                bgcolor: '#00509E', // Lighter blue on hover
              },
            }}
          >
            Send
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

