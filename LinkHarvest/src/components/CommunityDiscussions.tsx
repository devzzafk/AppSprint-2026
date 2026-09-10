import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageSquare,
  Users,
  Search,
  Plus,
  ThumbsUp,
  MessageCircle,
  Share2,
  Tag,
  MapPin,
  Send,
  Sparkles,
  Phone,
  CheckCircle2,
  Clock,
  Filter,
  ArrowRight,
  TrendingUp,
  Truck,
  ShieldCheck,
  Building2,
  Store,
  Sprout,
  Check,
  AlertCircle,
} from 'lucide-react';
import {
  UserProfile,
  UserRole,
  Language,
  DiscussionTopic,
  DiscussionCategory,
  DiscussionComment,
  DirectConversation,
  ChatMessage,
} from '../types';

interface Props {
  currentUser: UserProfile;
  currentRole: UserRole;
  language: Language;
  discussions: DiscussionTopic[];
  onAddDiscussion: (topic: DiscussionTopic) => void;
  onAddComment: (topicId: string, comment: DiscussionComment) => void;
  onLikeTopic: (topicId: string) => void;
  conversations: DirectConversation[];
  onSendMessage: (conversationId: string, text: string) => void;
  onConfirmDealProposal?: (conversationId: string) => void;
}

export const CommunityDiscussions: React.FC<Props> = ({
  currentUser,
  currentRole,
  language,
  discussions,
  onAddDiscussion,
  onAddComment,
  onLikeTopic,
  conversations,
  onSendMessage,
  onConfirmDealProposal,
}) => {
  const [activeView, setActiveView] = useState<'forum' | 'messages'>('forum');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isNewTopicModalOpen, setIsNewTopicModalOpen] = useState(false);

  // New topic form states
  const [newTopicTitle, setNewTopicTitle] = useState('');
  const [newTopicCategory, setNewTopicCategory] = useState<DiscussionCategory>('Price & Mandi Trends');
  const [newTopicContent, setNewTopicContent] = useState('');
  const [newTopicTags, setNewTopicTags] = useState('');

  // Active expanded comments map
  const [expandedTopicId, setExpandedTopicId] = useState<string | null>(discussions[0]?.id || null);
  const [replyTextMap, setReplyTextMap] = useState<Record<string, string>>({});

  // Direct Messages state
  const [selectedConvId, setSelectedConvId] = useState<string>(conversations[0]?.id || '');
  const [messageInput, setMessageInput] = useState('');

  const isEn = language === 'en';

  const categories: (string | DiscussionCategory)[] = [
    'All',
    'Price & Mandi Trends',
    'Logistics & Pooling',
    'Buyer Direct Contracts',
    'Farming & Crop Care',
    'Seeds & Tech',
  ];

  const filteredDiscussions = discussions.filter((topic) => {
    const matchesCat = selectedCategory === 'All' || topic.category === selectedCategory;
    const matchesSearch =
      topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      topic.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleCreateTopic = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopicTitle.trim() || !newTopicContent.trim()) return;

    const tagsArray = newTopicTags
      .split(',')
      .map((t) => t.trim().replace(/^#/, ''))
      .filter(Boolean);

    const newTopic: DiscussionTopic = {
      id: `disc-${Date.now()}`,
      title: newTopicTitle.trim(),
      category: newTopicCategory,
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorRole: currentRole,
      authorAvatar: currentUser.avatar,
      authorOrg: currentUser.organization,
      location: currentUser.location,
      content: newTopicContent.trim(),
      createdAt: isEn ? 'Just now' : 'ഇപ്പോൾ',
      likes: 1,
      likedByCurrentUser: true,
      comments: [],
      tags: tagsArray.length > 0 ? tagsArray : ['LinkHarvest', 'AgriDirect'],
    };

    onAddDiscussion(newTopic);
    setNewTopicTitle('');
    setNewTopicContent('');
    setNewTopicTags('');
    setIsNewTopicModalOpen(false);
    setExpandedTopicId(newTopic.id);
  };

  const handleSendReply = (topicId: string) => {
    const reply = replyTextMap[topicId]?.trim();
    if (!reply) return;

    const newComment: DiscussionComment = {
      id: `comm-${Date.now()}`,
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorRole: currentRole,
      authorAvatar: currentUser.avatar,
      text: reply,
      timestamp: isEn ? 'Just now' : 'ഇപ്പോൾ',
      likes: 0,
    };

    onAddComment(topicId, newComment);
    setReplyTextMap((prev) => ({ ...prev, [topicId]: '' }));
  };

  const activeConversation = conversations.find((c) => c.id === selectedConvId) || conversations[0];

  const handleSendDirectMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || !activeConversation) return;

    onSendMessage(activeConversation.id, messageInput.trim());
    setMessageInput('');
  };

  const handleSendQuickChip = (text: string) => {
    if (!activeConversation) return;
    onSendMessage(activeConversation.id, text);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Mode Switcher */}
      <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-stone-200 p-4 sm:p-5 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
              <MessageSquare className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-stone-900 leading-tight">
                {isEn ? 'Agri Community & Direct Discussions' : 'കാർഷിക കൂട്ടായ്മയും ചർച്ചകളും'}
              </h2>
              <p className="text-xs text-stone-600 mt-0.5">
                {isEn
                  ? 'Connect with nearby farmers and commercial buyers to pool logistics, discuss APMC rates, and negotiate directly.'
                  : 'വിലനിലവാരം അറിയാനും വാഹനം പങ്കുവെക്കാനും കച്ചവടക്കാരുമായി നേരിട്ട് സംസാരിക്കാനും ഇവിടെ പങ്കുചേരൂ.'}
              </p>
            </div>
          </div>
        </div>

        {/* View Switcher: Forum vs Direct Messages */}
        <div className="flex items-center gap-1.5 bg-stone-100 p-1.5 rounded-xl border border-stone-200 shrink-0 w-full sm:w-auto">
          <button
            onClick={() => setActiveView('forum')}
            className={`flex-1 sm:flex-initial px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${
              activeView === 'forum'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>{isEn ? 'Community Forum' : 'ഫോറം ചർച്ചകൾ'}</span>
            <span className="px-1.5 py-0.5 rounded-full bg-white/20 text-[10px]">
              {discussions.length}
            </span>
          </button>

          <button
            onClick={() => setActiveView('messages')}
            className={`flex-1 sm:flex-initial px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${
              activeView === 'messages'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <MessageCircle className="w-4 h-4" />
            <span>{isEn ? 'Direct Messages' : 'സന്ദേശങ്ങൾ'}</span>
            <span className="px-1.5 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-bold">
              {conversations.reduce((acc, c) => acc + c.unreadCount, 0)}
            </span>
          </button>
        </div>
      </div>

      {/* VIEW 1: Community Forum */}
      {activeView === 'forum' && (
        <div className="space-y-5">
          {/* Controls: Category Filter, Search Bar, and Start Topic Button */}
          <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-stone-200 p-4 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isEn ? 'Search discussions, mandi trends, truck pooling, crops...' : 'ചർച്ചകൾ, വിളകൾ, വാഹനം തിരയുക...'}
                  className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-600 bg-stone-50/50"
                />
              </div>

              {/* Start Discussion Button */}
              <button
                onClick={() => setIsNewTopicModalOpen(true)}
                className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs sm:text-sm font-bold shadow-sm flex items-center justify-center gap-2 shrink-0 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>{isEn ? 'Start Discussion' : 'പുതിയ ചർച്ച'}</span>
              </button>
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
              <span className="text-stone-400 flex items-center gap-1 font-semibold pl-1 shrink-0">
                <Filter className="w-3.5 h-3.5" />
                {isEn ? 'Topics:' : 'വിഷയം:'}
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg font-semibold shrink-0 transition-all ${
                    selectedCategory === cat
                      ? 'bg-emerald-800 text-white shadow-xs'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {cat === 'All' ? (isEn ? 'All Discussions' : 'എല്ലാം') : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Topics List */}
          <div className="space-y-4">
            {filteredDiscussions.length === 0 ? (
              <div className="text-center py-12 bg-white/90 rounded-2xl border border-stone-200 p-6 space-y-3">
                <MessageSquare className="w-10 h-10 text-stone-300 mx-auto" />
                <p className="text-stone-600 font-semibold text-sm">
                  {isEn ? 'No discussions found matching your criteria.' : 'ചർച്ചകൾ ഒന്നും കണ്ടെത്തിയില്ല.'}
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSearchQuery('');
                  }}
                  className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-xs font-bold"
                >
                  {isEn ? 'Reset Filters' : 'ഫിൽട്ടർ മാറ്റുക'}
                </button>
              </div>
            ) : (
              filteredDiscussions.map((topic) => {
                const isExpanded = expandedTopicId === topic.id;
                return (
                  <div
                    key={topic.id}
                    className="bg-white/95 backdrop-blur-sm rounded-2xl border border-stone-200/90 shadow-sm hover:border-emerald-500/40 transition-all p-5 sm:p-6 space-y-4"
                  >
                    {/* Topic Header: Author info, Role, Location, Category */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2 border-b border-stone-100">
                      <div className="flex items-center gap-3">
                        <img
                          src={topic.authorAvatar}
                          alt={topic.authorName}
                          className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-500/20"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-stone-900">
                              {topic.authorName}
                            </span>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                                topic.authorRole === 'producer'
                                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                  : 'bg-amber-100 text-amber-800 border border-amber-300'
                              }`}
                            >
                              {topic.authorRole === 'producer' ? (isEn ? '🌱 Producer' : '🌱 കർഷകൻ') : (isEn ? '🏪 Commercial Buyer' : '🏪 ഉപഭോക്താവ്')}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 text-xs text-stone-500 mt-0.5">
                            {topic.authorOrg && (
                              <>
                                <span className="font-medium text-stone-700">{topic.authorOrg}</span>
                                <span>•</span>
                              </>
                            )}
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-stone-400" />
                              {topic.location}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
                        <span className="px-2.5 py-1 rounded-full bg-stone-100 text-stone-700 text-xs font-semibold border border-stone-200">
                          {topic.category}
                        </span>
                        <span className="text-[11px] text-stone-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {topic.createdAt}
                        </span>
                      </div>
                    </div>

                    {/* Topic Title & Content */}
                    <div className="space-y-2">
                      <h3 className="text-base sm:text-lg font-bold font-display text-stone-900 leading-snug">
                        {topic.title}
                      </h3>
                      <p className="text-stone-700 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                        {topic.content}
                      </p>
                    </div>

                    {/* Tags */}
                    {topic.tags && topic.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {topic.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60 flex items-center gap-1"
                          >
                            <Tag className="w-2.5 h-2.5 text-emerald-600" />
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Topic Footer: Likes, Comments Toggle */}
                    <div className="flex items-center justify-between pt-3 border-t border-stone-100 text-xs">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => onLikeTopic(topic.id)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                            topic.likedByCurrentUser
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                          }`}
                        >
                          <ThumbsUp className="w-3.5 h-3.5" />
                          <span>{topic.likes}</span>
                          <span className="hidden sm:inline font-normal">
                            {isEn ? 'Helpful' : 'ഉപകാരം'}
                          </span>
                        </button>

                        <button
                          onClick={() =>
                            setExpandedTopicId(isExpanded ? null : topic.id)
                          }
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold transition-all cursor-pointer"
                        >
                          <MessageCircle className="w-3.5 h-3.5 text-stone-500" />
                          <span>{topic.comments.length}</span>
                          <span className="hidden sm:inline font-normal">
                            {isEn ? 'Responses' : 'മറുപടികൾ'}
                          </span>
                        </button>
                      </div>

                      <button
                        onClick={() =>
                          setExpandedTopicId(isExpanded ? null : topic.id)
                        }
                        className="text-emerald-700 hover:text-emerald-900 font-bold flex items-center gap-1 text-xs"
                      >
                        <span>{isExpanded ? (isEn ? 'Hide Replies' : 'മറയ്ക്കുക') : (isEn ? 'Reply & Discuss' : 'മറുപടി നൽകുക')}</span>
                      </button>
                    </div>

                    {/* Expanded Replies & Add Reply Box */}
                    {isExpanded && (
                      <div className="pt-4 border-t border-stone-100 space-y-4 bg-stone-50/70 -mx-5 -mb-5 sm:-mx-6 sm:-mb-6 p-5 sm:p-6 rounded-b-2xl">
                        {/* List of comments */}
                        {topic.comments.length > 0 ? (
                          <div className="space-y-3">
                            {topic.comments.map((comment) => (
                              <div
                                key={comment.id}
                                className="bg-white rounded-xl p-3.5 border border-stone-200/80 shadow-xs space-y-1.5"
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <img
                                      src={comment.authorAvatar}
                                      alt={comment.authorName}
                                      className="w-6 h-6 rounded-full object-cover"
                                    />
                                    <span className="font-bold text-xs text-stone-900">
                                      {comment.authorName}
                                    </span>
                                    <span className="text-[10px] text-stone-500 font-medium">
                                      ({comment.authorRole === 'producer' ? (isEn ? 'Farmer' : 'കർഷകൻ') : (isEn ? 'Buyer' : 'കച്ചവടക്കാരൻ')})
                                    </span>
                                  </div>
                                  <span className="text-[10px] text-stone-400">
                                    {comment.timestamp}
                                  </span>
                                </div>
                                <p className="text-xs text-stone-700 leading-relaxed pl-8">
                                  {comment.text}
                                </p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-xs text-stone-500 italic">
                            {isEn ? 'No responses yet. Be the first to reply!' : 'മറുപടികൾ ഒന്നും നൽകിയിട്ടില്ല. ആദ്യ കമന്റ് രേഖപ്പെടുത്തൂ!'}
                          </p>
                        )}

                        {/* Reply Input Form */}
                        <div className="flex items-center gap-2 pt-2">
                          <img
                            src={currentUser.avatar}
                            alt={currentUser.name}
                            className="w-8 h-8 rounded-full object-cover shrink-0 ring-1 ring-stone-300"
                          />
                          <input
                            type="text"
                            value={replyTextMap[topic.id] || ''}
                            onChange={(e) =>
                              setReplyTextMap({
                                ...replyTextMap,
                                [topic.id]: e.target.value,
                              })
                            }
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleSendReply(topic.id);
                            }}
                            placeholder={
                              isEn
                                ? `Reply as ${currentUser.name}...`
                                : `${currentUser.name} ആയി മറുപടി എഴുതുക...`
                            }
                            className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-600 bg-white"
                          />
                          <button
                            type="button"
                            onClick={() => handleSendReply(topic.id)}
                            className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shrink-0 transition-all flex items-center gap-1.5 cursor-pointer"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">{isEn ? 'Post' : 'അയക്കുക'}</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* VIEW 2: Direct Messages Inbox & Deal Negotiations */}
      {activeView === 'messages' && (
        <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-stone-200 shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
          {/* Left Column: Conversations List */}
          <div className="lg:col-span-4 border-r border-stone-200 flex flex-col">
            <div className="p-4 border-b border-stone-200 bg-stone-50/70 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-stone-900 font-display">
                  {isEn ? 'Harvest Inquiries & Chats' : 'സന്ദേശങ്ങൾ & കരാറുകൾ'}
                </h3>
                <p className="text-[11px] text-stone-500">
                  {conversations.length} {isEn ? 'Active Direct Threads' : 'സജീവ ചർച്ചകൾ'}
                </p>
              </div>
            </div>

            <div className="divide-y divide-stone-100 overflow-y-auto flex-1 max-h-[550px]">
              {conversations.map((conv) => {
                const isSelected = conv.id === activeConversation.id;
                return (
                  <button
                    key={conv.id}
                    onClick={() => setSelectedConvId(conv.id)}
                    className={`w-full p-4 text-left transition-all flex items-start gap-3 cursor-pointer ${
                      isSelected ? 'bg-emerald-50/80 border-l-4 border-emerald-700' : 'hover:bg-stone-50'
                    }`}
                  >
                    <div className="relative shrink-0">
                      <img
                        src={conv.otherUser.avatar}
                        alt={conv.otherUser.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      {conv.unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-white rounded-full text-[9px] font-black flex items-center justify-center">
                          {conv.unreadCount}
                        </span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-bold text-xs text-stone-900 truncate">
                          {conv.otherUser.name}
                        </span>
                        <span className="text-[10px] text-stone-400 shrink-0">
                          {conv.lastTimestamp}
                        </span>
                      </div>

                      <div className="text-[11px] text-stone-500 truncate mt-0.5">
                        {conv.otherUser.organization || conv.otherUser.location}
                      </div>

                      {conv.productContext && (
                        <div className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-stone-100 text-[10px] font-semibold text-emerald-800 border border-stone-200 truncate max-w-full">
                          <span>📦</span>
                          <span className="truncate">
                            {conv.productContext.quantityKg} kg {conv.productContext.product} @ ₹{conv.productContext.targetPrice}
                          </span>
                        </div>
                      )}

                      <p className="text-xs text-stone-600 truncate mt-1.5 font-normal">
                        {conv.lastMessage}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Active Thread & Negotiation Terminal */}
          <div className="lg:col-span-8 flex flex-col justify-between bg-stone-50/30">
            {activeConversation ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-stone-200 bg-white flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={activeConversation.otherUser.avatar}
                      alt={activeConversation.otherUser.name}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-600/20"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-stone-900">
                          {activeConversation.otherUser.name}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-300">
                          {activeConversation.otherUser.role === 'producer' ? (isEn ? '🌱 Producer' : '🌱 കർഷകൻ') : (isEn ? '🏪 Buyer' : '🏪 ഉപഭോക്താവ്')}
                        </span>
                      </div>
                      <div className="text-[11px] text-stone-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-stone-400" />
                        <span>{activeConversation.otherUser.location}</span>
                        <span>•</span>
                        <span className="text-emerald-700 font-semibold">{activeConversation.otherUser.phone}</span>
                      </div>
                    </div>
                  </div>

                  <a
                    href={`tel:${activeConversation.otherUser.phone}`}
                    className="p-2.5 rounded-xl bg-stone-100 hover:bg-emerald-50 text-emerald-800 border border-stone-200 flex items-center gap-1.5 text-xs font-bold transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{isEn ? 'Call Directly' : 'വിളിക്കുക'}</span>
                  </a>
                </div>

                {/* Deal Context Strip */}
                {activeConversation.productContext && (
                  <div className="bg-emerald-900 text-white p-3 px-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs border-b border-emerald-800">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-300 shrink-0" />
                      <span>
                        <strong>{activeConversation.productContext.product}</strong> ({activeConversation.productContext.quantityKg} kg)
                        — Target: <strong>₹{activeConversation.productContext.targetPrice}/kg</strong>
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-[11px]">
                      <span className="px-2 py-0.5 rounded bg-white/15 text-emerald-200 font-medium">
                        {activeConversation.productContext.location}
                      </span>
                      <button
                        onClick={() => {
                          if (onConfirmDealProposal) {
                            onConfirmDealProposal(activeConversation.id);
                          }
                        }}
                        className="px-2.5 py-1 rounded bg-emerald-500 hover:bg-emerald-400 text-white font-bold transition-all shadow-xs cursor-pointer"
                      >
                        {isEn ? 'Lock In Deal' : 'കരാർ ഉറപ്പിക്കുക'}
                      </button>
                    </div>
                  </div>
                )}

                {/* Messages Body */}
                <div className="p-4 sm:p-6 space-y-3.5 overflow-y-auto max-h-[400px] flex-1">
                  {activeConversation.messages.map((msg) => {
                    const isMe = msg.senderId === currentUser.id || msg.senderRole === currentRole;
                    return (
                      <div
                        key={msg.id}
                        className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                      >
                        <div className="text-[10px] text-stone-400 mb-1 px-1">
                          {msg.senderName} • {msg.timestamp}
                        </div>
                        <div
                          className={`max-w-[85%] sm:max-w-[70%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs ${
                            isMe
                              ? 'bg-emerald-700 text-white rounded-tr-none'
                              : 'bg-white text-stone-800 border border-stone-200 rounded-tl-none'
                          }`}
                        >
                          <p className="whitespace-pre-line">{msg.text}</p>

                          {msg.isDealProposal && msg.proposalDetails && (
                            <div className="mt-2.5 p-2.5 rounded-xl bg-black/10 border border-white/20 text-xs space-y-1">
                              <div className="font-bold flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>{isEn ? 'Agreed Terms' : 'ധാരണയായ വിവരങ്ങൾ'}</span>
                              </div>
                              <div className="grid grid-cols-2 gap-1 text-[11px]">
                                <div>Qty: {msg.proposalDetails.offeredQuantity} kg</div>
                                <div>Rate: ₹{msg.proposalDetails.offeredPrice}/kg</div>
                                <div>Type: {msg.proposalDetails.pickupType}</div>
                                <div>Date: {msg.proposalDetails.agreedDate}</div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Quick Negotiation Chips */}
                <div className="px-4 py-2 bg-stone-100/80 border-t border-stone-200 flex items-center gap-2 overflow-x-auto text-[11px]">
                  <span className="text-stone-400 font-semibold shrink-0">
                    {isEn ? 'Quick replies:' : 'വേഗത്തിലുള്ള മറുപടികൾ:'}
                  </span>
                  <button
                    onClick={() =>
                      handleSendQuickChip(
                        isEn
                          ? 'I can supply the requested quantity at ₹48/kg with morning dispatch.'
                          : 'രാവിലെ ₹48 നിരക്കിൽ നൽകാൻ തയ്യാറാണ്.'
                      )
                    }
                    className="px-2.5 py-1 rounded-lg bg-white border border-stone-300 text-stone-700 hover:bg-emerald-50 hover:text-emerald-900 shrink-0 font-medium"
                  >
                    🤝 {isEn ? 'Confirm ₹48/kg' : '₹48/kg സമ്മതം'}
                  </button>
                  <button
                    onClick={() =>
                      handleSendQuickChip(
                        isEn
                          ? 'Please share farmgate location coordinates for pickup van.'
                          : 'വാഹനം അയക്കാൻ കൃഷിത്തോട്ടത്തിന്റെ ലൊക്കേഷൻ അയക്കൂ.'
                      )
                    }
                    className="px-2.5 py-1 rounded-lg bg-white border border-stone-300 text-stone-700 hover:bg-emerald-50 hover:text-emerald-900 shrink-0 font-medium"
                  >
                    📍 {isEn ? 'Share GPS Location' : 'ലൊക്കേഷൻ ആവശ്യപ്പെടുക'}
                  </button>
                  <button
                    onClick={() =>
                      handleSendQuickChip(
                        isEn
                          ? 'Packaging in 25 kg aerated plastic crates for freshness.'
                          : '25 കിലോ പെട്ടികളിൽ വൃത്തിയായി പായ്ക്ക് ചെയ്യാം.'
                      )
                    }
                    className="px-2.5 py-1 rounded-lg bg-white border border-stone-300 text-stone-700 hover:bg-emerald-50 hover:text-emerald-900 shrink-0 font-medium"
                  >
                    📦 {isEn ? 'Crate Packaging' : 'ക്രേറ്റ് പാക്കിംഗ്'}
                  </button>
                </div>

                {/* Message Input Box */}
                <form
                  onSubmit={handleSendDirectMessage}
                  className="p-3 bg-white border-t border-stone-200 flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder={
                      isEn
                        ? `Message ${activeConversation.otherUser.name}...`
                        : `${activeConversation.otherUser.name}-ലേക്ക് സന്ദേശം അയക്കുക...`
                    }
                    className="flex-1 px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-600 bg-stone-50/50"
                  />
                  <button
                    type="submit"
                    className="p-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold transition-all shadow-sm flex items-center gap-1.5 text-xs sm:text-sm cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span className="hidden sm:inline">{isEn ? 'Send' : 'അയക്കുക'}</span>
                  </button>
                </form>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center p-8 text-center text-stone-400">
                <p>{isEn ? 'Select a conversation to start chatting' : 'സംഭാഷണം തിരഞ്ഞെടുക്കുക'}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Start New Discussion Modal */}
      <AnimatePresence>
        {isNewTopicModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 space-y-5 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
                    <Plus className="w-5 h-5" />
                  </span>
                  <h3 className="text-lg font-bold font-display text-stone-900">
                    {isEn ? 'Start a Community Discussion' : 'പുതിയ ചർച്ച ആരംഭിക്കുക'}
                  </h3>
                </div>
                <button
                  onClick={() => setIsNewTopicModalOpen(false)}
                  className="text-stone-400 hover:text-stone-700 p-1"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateTopic} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700 block">
                    {isEn ? 'Topic Title' : 'വിഷയ തലക്കെട്ട്'}
                  </label>
                  <input
                    type="text"
                    value={newTopicTitle}
                    onChange={(e) => setNewTopicTitle(e.target.value)}
                    placeholder={
                      isEn
                        ? 'e.g. Nedumangad wholesale banana price expectations this week'
                        : 'ഉദാഹരണത്തിന്: നെടുമങ്ങാട് നേന്ത്രക്കായ വിലനിലവാരം'
                    }
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-600 bg-white"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-stone-700 block">
                      {isEn ? 'Category' : 'വിഭാഗം'}
                    </label>
                    <select
                      value={newTopicCategory}
                      onChange={(e) =>
                        setNewTopicCategory(e.target.value as DiscussionCategory)
                      }
                      className="w-full px-3 py-2 text-sm rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-600 bg-white"
                    >
                      <option value="Price & Mandi Trends">Price & Mandi Trends</option>
                      <option value="Logistics & Pooling">Logistics & Pooling</option>
                      <option value="Buyer Direct Contracts">Buyer Direct Contracts</option>
                      <option value="Farming & Crop Care">Farming & Crop Care</option>
                      <option value="Seeds & Tech">Seeds & Tech</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-stone-700 block">
                      {isEn ? 'Tags (comma separated)' : 'ടാഗുകൾ'}
                    </label>
                    <input
                      type="text"
                      value={newTopicTags}
                      onChange={(e) => setNewTopicTags(e.target.value)}
                      placeholder="Banana, APMC, Rates"
                      className="w-full px-3 py-2 text-sm rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-600 bg-white"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700 block">
                    {isEn ? 'Discussion Content & Details' : 'വിശദാംശങ്ങൾ'}
                  </label>
                  <textarea
                    rows={4}
                    value={newTopicContent}
                    onChange={(e) => setNewTopicContent(e.target.value)}
                    placeholder={
                      isEn
                        ? 'Share mandi rates, vehicle space to share, farming techniques, or buyer procurement details...'
                        : 'വിലനിലവാരം, വാഹനത്തിൽ ഒഴിവുള്ള സ്ഥലം, മറ്റു വിവരങ്ങൾ ഇവിടെ രേഖപ്പെടുത്തൂ...'
                    }
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-600 bg-white"
                    required
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-100">
                  <button
                    type="button"
                    onClick={() => setIsNewTopicModalOpen(false)}
                    className="px-4 py-2 text-xs font-bold text-stone-600 hover:bg-stone-100 rounded-xl"
                  >
                    {isEn ? 'Cancel' : 'റദ്ദാക്കുക'}
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer"
                  >
                    {isEn ? 'Publish Discussion' : 'പ്രസിദ്ധീകരിക്കുക'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
