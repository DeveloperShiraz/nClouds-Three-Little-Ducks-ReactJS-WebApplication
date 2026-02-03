import { useState, useRef, useEffect } from 'react'
import { generateClient } from 'aws-amplify/data'
import TopNavigation from '../../components/TopNavigation/TopNavigation'
import BottomNavigation from '../../components/BottomNavigation/BottomNavigation'
import './AskPage.css'



function AskPage() {
    const client = generateClient()
    const [messages, setMessages] = useState([
        { id: '1', text: "Hi! I'm your parenting expert. How can I help you and your little one today?", sender: 'bot' }
    ])
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [sessionId, setSessionId] = useState(null)
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const handleSend = async (e) => {
        e.preventDefault()
        if (!input.trim()) return

        const userMessage = { id: Date.now().toString(), text: input, sender: 'user' }
        setMessages(prev => [...prev, userMessage])
        setInput('')
        setLoading(true)

        try {
            const { data, errors } = await client.queries.askExpert({
                question: userMessage.text,
                sessionId: sessionId || undefined
            })

            if (errors) {
                console.error(errors)
                throw new Error(errors[0].message)
            }

            if (data) {
                const botResponse = JSON.parse(data)
                const botMessage = {
                    id: (Date.now() + 1).toString(),
                    text: botResponse.answer,
                    sender: 'bot'
                }
                setMessages(prev => [...prev, botMessage])
                if (botResponse.sessionId) {
                    setSessionId(botResponse.sessionId)
                }
            }
        } catch (error) {
            console.error('Chat error:', error)
            const errorMessage = {
                id: (Date.now() + 1).toString(),
                text: "I'm having trouble connecting right now. Please try again later.",
                sender: 'bot',
                isError: true
            }
            setMessages(prev => [...prev, errorMessage])
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="dashboard-container">
            <TopNavigation />

            <main className="chat-content" style={{ paddingBottom: '80px' }}>
                <div className="chat-container">
                    <div className="messages-list">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`message-bubble ${msg.sender} ${msg.isError ? 'error' : ''}`}>
                                {msg.sender === 'bot' && <div className="bot-avatar">🦆</div>}
                                <div className="message-text">{msg.text}</div>
                            </div>
                        ))}
                        {loading && (
                            <div className="message-bubble bot">
                                <div className="bot-avatar">🦆</div>
                                <div className="typing-indicator">
                                    <span>●</span><span>●</span><span>●</span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <form className="chat-input-area" onSubmit={handleSend}>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask a question..."
                            className="chat-input"
                            disabled={loading}
                        />
                        <button type="submit" className="send-button" disabled={loading || !input.trim()}>
                            <svg viewBox="0 0 24 24" className="send-icon">
                                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
                            </svg>
                        </button>
                    </form>
                </div>
            </main>

            <BottomNavigation />
        </div>
    )
}

export default AskPage
