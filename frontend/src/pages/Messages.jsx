import { useState } from 'react'
import { Send, Search, Plus, MoreVertical, Phone, Video, Paperclip, Smile, Info, ArrowLeft } from 'lucide-react'

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState(null)
  const [message, setMessage] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [showInfo, setShowInfo] = useState(false)
  const [showChatView, setShowChatView] = useState(false) // WhatsApp-style mobile view state
  
  const [conversations] = useState([
    {
      id: 1,
      name: 'Dr. Rajesh Kumar',
      role: 'Faculty',
      lastMessage: 'Your assignment submission looks good',
      time: '2 min ago',
      unread: 2,
      avatar: 'RK',
      online: true,
      department: 'Computer Science'
    },
    {
      id: 2,
      name: 'Jane Smith',
      role: 'Student',
      lastMessage: 'Can you help with the database query?',
      time: '1 hour ago',
      unread: 0,
      avatar: 'JS',
      online: false,
      department: 'Computer Science'
    }
  ])

  const [messages] = useState([
    {
      id: 1,
      sender: 'Dr. Rajesh Kumar',
      content: 'Your assignment submission looks good. Just need to fix the edge cases.',
      time: '2:30 PM',
      isOwn: false
    },
    {
      id: 2,
      sender: 'You',
      content: 'Thank you for the feedback! I will work on the edge cases.',
      time: '2:35 PM',
      isOwn: true
    }
  ])

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessage('')
    }
  }

  const handleSelectChat = (chat) => {
    setSelectedChat(chat)
    setShowChatView(true) // Switch to chat view on mobile
  }

  const handleBackToChats = () => {
    setShowChatView(false)
    setSelectedChat(null)
  }

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-8rem)] max-h-[800px] lg:gap-0">
      {/* Conversations List */}
      <div className={`${showChatView ? 'hidden lg:flex' : 'flex'} w-full lg:w-1/3 card-black rounded-2xl lg:rounded-l-2xl lg:rounded-r-none overflow-hidden flex-col`}>
        <div className="border-b border-gray-700" style={{padding: 'clamp(1rem, 3vw, 1.5rem)'}}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg md:text-xl font-bold text-white">Messages</h2>
            <button className="p-2 hover:bg-gray-700 rounded-lg">
              <Plus className="h-5 w-5 text-gray-400" />
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input pl-10 bg-gray-800 border-gray-600 text-white placeholder-gray-400 text-sm md:text-base"
            />
          </div>
        </div>
        
        <div className="overflow-y-auto" style={{maxHeight: 'clamp(300px, 50vh, 600px)'}}>
          {conversations.filter(conv => 
            conv.name.toLowerCase().includes(searchTerm.toLowerCase())
          ).map(conv => (
            <div
              key={conv.id}
              onClick={() => handleSelectChat(conv)}
              className={`border-b border-gray-700/50 cursor-pointer hover:bg-gray-700/30 transition-colors active:bg-gray-600/50 ${
                selectedChat?.id === conv.id ? 'bg-gray-700/50' : ''
              }`}
              style={{padding: 'clamp(1rem, 3vw, 1rem)'}}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {conv.avatar}
                  </div>
                  {conv.online && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-gray-800 rounded-full"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-white truncate text-sm md:text-base">{conv.name}</h3>
                    <span className="text-xs text-gray-400">{conv.time}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-xs md:text-sm text-gray-400 truncate">{conv.lastMessage}</p>
                    {conv.unread > 0 && (
                      <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                        {conv.unread}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">{conv.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className={`${!showChatView ? 'hidden lg:flex' : 'flex'} flex-1 card-black rounded-2xl lg:rounded-r-2xl lg:rounded-l-none flex-col overflow-hidden`}>
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="border-b border-gray-700 flex items-center justify-between p-4">
              <div className="flex items-center space-x-3">
                {/* Mobile Back Button */}
                <button 
                  onClick={handleBackToChats}
                  className="lg:hidden p-2 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <ArrowLeft className="h-5 w-5 text-gray-400" />
                </button>
                
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {selectedChat.avatar}
                  </div>
                  {selectedChat.online && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-gray-800 rounded-full"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white text-base truncate">{selectedChat.name}</h3>
                  <div className="flex items-center space-x-1">
                    <span className="text-xs text-gray-300">{selectedChat.role}</span>
                    <span className="text-xs text-gray-500 hidden sm:inline">•</span>
                    <span className="text-xs text-gray-400 truncate hidden sm:inline">{selectedChat.department}</span>
                  </div>
                  <span className="text-xs text-green-400">{selectedChat.online ? 'Online' : 'Last seen 1h ago'}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                  <Phone className="h-5 w-5 text-gray-400" />
                </button>
                <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                  <Video className="h-5 w-5 text-gray-400" />
                </button>
                <button 
                  onClick={() => setShowInfo(!showInfo)}
                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <Info className="h-5 w-5 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-900/20">
              {messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] sm:max-w-sm px-3 py-2 rounded-2xl ${
                    msg.isOwn 
                      ? 'bg-blue-500 text-white rounded-br-md' 
                      : 'bg-gray-700 text-white rounded-bl-md'
                  }`}>
                    <p className="text-sm break-words leading-relaxed">{msg.content}</p>
                    <span className="text-xs opacity-70 mt-1 block text-right">{msg.time}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="border-t border-gray-700 p-3">
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-700 rounded-full transition-colors">
                  <Paperclip className="h-5 w-5 text-gray-400" />
                </button>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-full text-white placeholder-gray-400 text-sm focus:outline-none focus:border-blue-500"
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-700 rounded-full transition-colors">
                    <Smile className="h-4 w-4 text-gray-400" />
                  </button>
                </div>
                <button 
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  className="p-3 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-full transition-colors"
                >
                  <Send className="h-4 w-4 text-white" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="hidden lg:flex flex-1 items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Select a conversation</h3>
              <p className="text-gray-400">Choose a conversation to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Messages