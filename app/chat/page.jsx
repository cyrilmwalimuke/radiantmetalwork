'use client'

import React, { useState } from 'react'

export default function ChatPage() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')

  const sendMessage = (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const newMessage = { text: input, sender: 'You', time: new Date().toLocaleTimeString() }
    setMessages([...messages, newMessage])
    setInput('')
  }

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <h2>Chat Room</h2>
      <div style={{ border: '1px solid #ccc', padding: '1rem', height: '300px', overflowY: 'scroll', marginBottom: '1rem' }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ marginBottom: '0.5rem' }}>
            <strong>{msg.sender}:</strong> {msg.text} <span style={{ fontSize: '0.8rem', color: 'gray' }}>{msg.time}</span>
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} style={{ display: 'flex', gap: '0.5rem' }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message"
          style={{ flex: 1, padding: '0.5rem' }}
        />
        <button type="submit" style={{ padding: '0.5rem 1rem' }}>Send</button>
      </form>
    </div>
  )
}
