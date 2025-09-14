import { useState } from 'react'
import { Send, Search, Plus, MoreVertical, Phone, Video, Paperclip, Smile, Info } from 'lucide-react'

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState(null)
  const [message, setMessage] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [showInfo, setShowInfo] = useState(false)
  
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

  return (
    <div className="min-h-[600px] lg:h-[calc(100vh-12rem)] flex flex-col lg:flex-row gap-4 lg:gap-0">
      {/* Conversations List */}
      <div className="w-full lg:w-1/3 card-black rounded-2xl lg:rounded-l-2xl lg:rounded-r-none">
        <div className="p-4 border-b border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">Messages</h2>
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
              className="form-input pl-10 bg-gray-800 border-gray-600 text-white placeholder-gray-400"
            />
          </div>
        </div>
        
        <div className="overflow-y-auto">
          {conversations.filter(conv => 
            conv.name.toLowerCase().includes(searchTerm.toLowerCase())
          ).map(conv => (
            <div
              key={conv.id}
              onClick={() => setSelectedChat(conv)}
              className={`p-4 border-b border-gray-700/50 cursor-pointer hover:bg-gray-700/30 transition-colors ${
                selectedChat?.id === conv.id ? 'bg-gray-700/50' : ''
              }`}
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
                    <h3 className="font-semibold text-white truncate">{conv.name}</h3>
                    <span className="text-xs text-gray-400">{conv.time}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-400 truncate">{conv.lastMessage}</p>
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
      <div className="flex-1 card-black rounded-2xl lg:rounded-r-2xl lg:rounded-l-none flex flex-col min-h-[400px] lg:min-h-0">
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-700 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {selectedChat.avatar}
                  </div>
                  {selectedChat.online && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-gray-800 rounded-full"></div>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-white">{selectedChat.name}</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-300">{selectedChat.role}</span>
                    <span className="text-xs text-gray-500">•</span>
                    <span className="text-xs text-gray-400">{selectedChat.department}</span>
                  </div>
                  <span className="text-xs text-green-400">{selectedChat.online ? 'Online' : 'Last seen 1h ago'}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
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
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                    msg.isOwn 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-700 text-white'
                  }`}>
                    <p className="text-sm">{msg.content}</p>
                    <span className="text-xs opacity-70 mt-1 block">{msg.time}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-700">
              <div className="flex items-center space-x-3">
                <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                  <Paperclip className="h-5 w-5 text-gray-400" />
                </button>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="w-full form-input bg-gray-800 border-gray-600 text-white placeholder-gray-400 pr-12"
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-700 rounded transition-colors">
                    <Smile className="h-4 w-4 text-gray-400" />
                  </button>
                </div>
                <button 
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  className="btn-primary px-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
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