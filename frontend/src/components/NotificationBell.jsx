import { useState, useEffect, useRef } from 'react';

/**
 * NotificationBell — Polls /api/videos every 10s, detects status changes,
 * shows a dropdown of recent notifications with a subtle sound on new ones.
 */
export default function NotificationBell() {
  const [notifications, setNotifications] = useState(() => {
    // Load persisted notifications from localStorage
    try {
      const saved = localStorage.getItem('summareye_notifications');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Track previous video states to detect changes
  const prevVideosRef = useRef({});
  const dropdownRef = useRef(null);

  // Persist notifications to localStorage
  useEffect(() => {
    localStorage.setItem('summareye_notifications', JSON.stringify(notifications));
    const unread = notifications.filter(n => !n.read).length;
    setUnreadCount(unread);
  }, [notifications]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Play a subtle notification beep using Web Audio API
  const playNotificationSound = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      // Short high-pitched beep — sounds like a terminal alert
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(880, audioCtx.currentTime); // A5 note
      gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime); // Quiet
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);

      oscillator.start(audioCtx.currentTime);
      oscillator.stop(audioCtx.currentTime + 0.3);
    } catch (e) {
      // Audio not available — fail silently
      console.warn('Notification sound unavailable:', e);
    }
  };

  // Poll videos for status changes
  useEffect(() => {
    const pollVideos = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/videos');
        if (!res.ok) return;
        const videos = await res.json();

        const prevMap = prevVideosRef.current;
        let hasNew = false;

        videos.forEach(v => {
          const vid = v.video_id || v.id;
          const prevStatus = prevMap[vid];

          // Detect transition to 'done' or 'error'
          if (prevStatus && prevStatus !== v.status) {
            if (v.status === 'done' || v.status === 'error') {
              const newNotif = {
                id: `${vid}-${Date.now()}`,
                videoId: vid,
                filename: v.filename,
                status: v.status,
                eventCount: v.event_count || 0,
                timestamp: new Date().toISOString(),
                read: false,
              };

              setNotifications(prev => {
                const updated = [newNotif, ...prev].slice(0, 20); // Keep max 20
                return updated;
              });
              hasNew = true;
            }
          }
        });

        if (hasNew) {
          playNotificationSound();
        }

        // Update the previous state map
        const newMap = {};
        videos.forEach(v => {
          newMap[v.video_id || v.id] = v.status;
        });
        prevVideosRef.current = newMap;

      } catch (e) {
        // Network error — silently skip this poll cycle
      }
    };

    // Initial load of video states (don't trigger notifications on first load)
    const initPoll = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/videos');
        if (!res.ok) return;
        const videos = await res.json();
        const map = {};
        videos.forEach(v => { map[v.video_id || v.id] = v.status; });
        prevVideosRef.current = map;
      } catch (e) {
        // Silently fail
      }
    };

    initPoll();
    const interval = setInterval(pollVideos, 10000);
    return () => clearInterval(interval);
  }, []);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const clearAll = () => {
    setNotifications([]);
    setIsOpen(false);
  };

  const formatTimeAgo = (isoStr) => {
    const diff = Date.now() - new Date(isoStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Button */}
      <button
        onClick={() => { setIsOpen(!isOpen); }}
        className="relative p-2 text-neon-green hover:text-neon-green transition-colors"
        title="Notifications"
      >
        {/* Bell SVG icon */}
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
        </svg>
        {/* Unread badge */}
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-neon-green text-black text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-neon-panel border border-neon-border rounded-lg shadow-2xl z-50 overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 border-b border-neon-border flex items-center justify-between">
            <span className="text-neon-green text-xs font-bold uppercase tracking-wider">
              {'>'} notifications.log
            </span>
            <div className="flex gap-2">
              {notifications.length > 0 && (
                <>
                  <button onClick={markAllRead} className="text-[10px] text-neon-dim hover:text-neon-green transition-colors">
                    Mark read
                  </button>
                  <span className="text-neon-border">|</span>
                  <button onClick={clearAll} className="text-[10px] text-hacker-red hover:text-red-400 transition-colors">
                    Clear
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Notification List */}
          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-neon-dim text-xs">
                <p className="mb-1">No notifications yet.</p>
                <p className="text-neon-dark">Upload and analyse a video to get started.</p>
              </div>
            ) : (
              notifications.map(n => (
                <a
                  key={n.id}
                  href={`/dashboard?video_id=${n.videoId}`}
                  className={`block px-4 py-3 border-b border-neon-border/50 hover:bg-neon-dark/30 transition-colors ${!n.read ? 'bg-neon-dark/20' : ''}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {/* Status indicator */}
                        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${n.status === 'done' ? 'bg-neon-green' : 'bg-hacker-red'}`}></span>
                        <span className="text-xs font-medium truncate text-neon-green">
                          {n.filename}
                        </span>
                      </div>
                      <p className="text-[11px] text-neon-dim">
                        {n.status === 'done'
                          ? `✓ Analysis complete — ${n.eventCount} event${n.eventCount !== 1 ? 's' : ''} detected`
                          : '✗ Analysis failed'
                        }
                      </p>
                    </div>
                    <span className="text-[10px] text-neon-dark flex-shrink-0 whitespace-nowrap">
                      {formatTimeAgo(n.timestamp)}
                    </span>
                  </div>
                </a>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
