import { useState } from 'react'
import { HashtagIcon, UserIcon } from '@heroicons/react/24/outline'
import { ChatProvider, useChat } from '../../../contexts/ChatContext'
import MessageList from '../../../components/chat/MessageList'
import MessageInput from '../../../components/chat/MessageInput'
import StageBar from '../../../components/chat/StageBar'
import RaiseHandButton from '../../../components/chat/RaiseHandButton'
import InterventionOverlay from '../../../components/chat/InterventionOverlay'
import { DM_MEMBERS } from '../data/placeholders'

function ChatInner({ userRole, isLeader }) {
  const { wsError, setWsError, channels, activeChannel, setActiveChannel, nudgeActive, dismissNudge } = useChat()
  const [activeDM, setActiveDM] = useState(null)
  const [dmMessages, setDmMessages] = useState({})
  const [dmInput, setDmInput] = useState('')

  const handleDMSelect = (member) => {
    setActiveDM(member)
    setActiveChannel(null)
  }

  const handleChannelSelect = (channel) => {
    setActiveChannel(channel)
    setActiveDM(null)
  }

  const handleDMSend = (e) => {
    e.preventDefault()
    if (!dmInput.trim() || !activeDM) return
    const msgs = dmMessages[activeDM.id] || []
    setDmMessages({
      ...dmMessages,
      [activeDM.id]: [...msgs, { id: Date.now(), text: dmInput, sender: 'you', time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) }]
    })
    setDmInput('')
  }

  const currentDMMessages = activeDM ? (dmMessages[activeDM.id] || []) : []

  return (
    <div style={{ display: 'flex', flex: 1, minHeight: 0, background: 'white', borderRadius: '10px', overflow: 'hidden', boxShadow: 'var(--sc-shadow)' }}>
      {/* Vertical Channel Rail */}
      <div style={{ width: '220px', background: '#f8fafc', borderRight: '1px solid var(--sc-border)', display: 'flex', flexDirection: 'column', paddingTop: '20px', overflowY: 'auto' }}>
        <div style={{ padding: '0 20px 12px', fontSize: '11px', fontWeight: 800, color: 'var(--sc-text-muted)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
          Circle Channels
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {channels.map((channel) => {
            const isActive = !activeDM && activeChannel?.id === channel.id
            return (
              <button
                key={channel.id}
                onClick={() => handleChannelSelect(channel)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '10px 20px', fontSize: '13px',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? 'var(--sc-green-dark)' : 'var(--sc-text-muted)',
                  background: isActive ? 'var(--sc-green-bg)' : 'transparent',
                  border: 'none',
                  borderLeft: isActive ? '4px solid var(--sc-green)' : '4px solid transparent',
                  cursor: 'pointer', textAlign: 'left', transition: 'background 0.2s'
                }}
              >
                <HashtagIcon style={{ width: 16, height: 16, opacity: 0.7 }} />
                {channel.name}
              </button>
            )
          })}
        </div>

        {/* DM Channels — Leader Only */}
        {isLeader && (
          <>
            <div style={{ padding: '20px 20px 12px', fontSize: '11px', fontWeight: 800, color: '#f08c3b', textTransform: 'uppercase', letterSpacing: '0.8px', borderTop: '1px solid var(--sc-border)', marginTop: '12px' }}>
              Direct Messages
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {DM_MEMBERS.map((member) => {
                const isDMActive = activeDM?.id === member.id
                return (
                  <button
                    key={member.id}
                    onClick={() => handleDMSelect(member)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '10px',
                      padding: '10px 20px', fontSize: '13px',
                      fontWeight: isDMActive ? 600 : 500,
                      color: isDMActive ? '#f08c3b' : 'var(--sc-text-muted)',
                      background: isDMActive ? '#fff7ed' : 'transparent',
                      border: 'none',
                      borderLeft: isDMActive ? '4px solid #f08c3b' : '4px solid transparent',
                      cursor: 'pointer', textAlign: 'left', transition: 'background 0.2s'
                    }}
                  >
                    <div style={{ position: 'relative' }}>
                      <div style={{
                        width: '24px', height: '24px', borderRadius: '50%',
                        background: isDMActive ? '#f08c3b' : '#e8f5f0',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '9px', fontWeight: 700,
                        color: isDMActive ? '#fff' : 'var(--sc-green-dark)',
                      }}>{member.initials}</div>
                      {member.online && (
                        <div style={{ position: 'absolute', bottom: -1, right: -1, width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', border: '2px solid #f8fafc' }}></div>
                      )}
                    </div>
                    {member.name}
                  </button>
                )
              })}
            </div>
          </>
        )}
      </div>

      {/* Main Chat Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', minWidth: 0 }}>
        {wsError?.code === 'message_blocked' && (
          <InterventionOverlay 
            type="block" 
            message={wsError.reason} 
            onDismiss={() => setWsError(null)} 
          />
        )}

        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--sc-border)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: activeDM ? '#f08c3b' : '#22c55e' }} />
          <div style={{ fontSize: '15px', fontWeight: 700 }}>
            {activeDM ? `${activeDM.name}` : `#${activeChannel?.name || 'General Chat'}`}
          </div>
          {activeDM && (
            <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '4px', background: '#fff7ed', color: '#f08c3b', fontWeight: 600, marginLeft: '8px' }}>
              Private
            </span>
          )}
          {!activeDM && (
            <div style={{ position: 'absolute', top: 12, right: 20 }}>
              <RaiseHandButton userPersona={userRole} />
            </div>
          )}
        </div>

        {/* DM View or Circle Chat */}
        {activeDM ? (
          <>
            <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {currentDMMessages.length === 0 && (
                <div style={{ textAlign: 'center', color: 'var(--sc-text-muted)', fontSize: '13px', marginTop: '40px' }}>
                  <UserIcon style={{ width: 40, height: 40, opacity: 0.3, margin: '0 auto 8px' }} />
                  <div>Start a private conversation with <strong>{activeDM.name}</strong></div>
                  <div style={{ fontSize: '11px', marginTop: '4px', opacity: 0.6 }}>Messages here are private between you and this member.</div>
                </div>
              )}
              {currentDMMessages.map((msg) => (
                <div key={msg.id} style={{ display: 'flex', justifyContent: msg.sender === 'you' ? 'flex-end' : 'flex-start' }}>
                  <div style={{
                    maxWidth: '70%', padding: '10px 14px', borderRadius: '12px',
                    background: msg.sender === 'you' ? 'var(--sc-green)' : '#f3f4f6',
                    color: msg.sender === 'you' ? '#fff' : '#1a1a1a',
                    fontSize: '13px', lineHeight: '1.5',
                  }}>
                    <div>{msg.text}</div>
                    <div style={{ fontSize: '10px', opacity: 0.6, marginTop: '4px', textAlign: 'right' }}>{msg.time}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ padding: '16px 20px', borderTop: '1px solid var(--sc-border)' }}>
              <form onSubmit={handleDMSend} style={{ display: 'flex', gap: '10px' }}>
                <input
                  value={dmInput}
                  onChange={(e) => setDmInput(e.target.value)}
                  placeholder={`Message ${activeDM.name}...`}
                  style={{
                    flex: 1, padding: '10px 14px', borderRadius: '10px',
                    border: '1px solid var(--sc-border)', fontSize: '14px', outline: 'none',
                  }}
                />
                <button type="submit" style={{
                  padding: '10px 20px', borderRadius: '10px', border: 'none',
                  background: '#f08c3b', color: '#fff', fontWeight: 700, cursor: 'pointer',
                }}>Send</button>
              </form>
            </div>
          </>
        ) : (
          <>
            <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
              <MessageList userPersona={userRole} activeChannelId={activeChannel?.id} />
            </div>
            <div style={{ padding: '16px 20px', borderTop: '1px solid var(--sc-border)' }}>
              <MessageInput userPersona={userRole} />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default function SCChatMainView({ circleId, userRole, isLeader = false }) {
  return (
    <div className="sc-chat-main-container" style={{ display: 'flex', flex: 1, minHeight: 0 }}>
      <ChatProvider circleId={circleId} userRole={userRole}>
        <ChatInner userRole={userRole} isLeader={isLeader} />
      </ChatProvider>
    </div>
  )
}
