/**
 * Support Chat Widget
 * Displays after 30 seconds with text and voice messaging capabilities
 */

class SupportChat {
    constructor() {
        this.isMinimized = true;
        this.isRecording = false;
        this.mediaRecorder = null;
        this.audioChunks = [];
        this.recordingStartTime = null;
        this.recordingTimer = null;
        this.messages = [];
        this.currentAudio = null;
        this.currentPlayBtn = null;

        this.init();
    }

    init() {
        // Create chat widget after 30 seconds
        setTimeout(() => {
            this.createChatWidget();
            this.showNotification();
        }, 30000); // 30 seconds
    }

    createChatWidget() {
        const widget = document.createElement('div');
        widget.className = 'support-notification minimized';
        widget.id = 'supportChat';
        widget.innerHTML = `
            <div class="notification-badge" id="chatBadge">
                <span class="icon">💬</span>
                <span class="unread-count">1</span>
            </div>
            
            <div class="chat-window">
                <div class="chat-header">
                    <div class="chat-header-info">
                        <div class="chat-avatar">🎧</div>
                        <div class="chat-header-text">
                            <h3>الدعم الفني <span class="status-indicator"></span></h3>
                            <p>نحن هنا لمساعدتك</p>
                        </div>
                    </div>
                    <button class="close-chat" id="closeChat">×</button>
                </div>
                
                <div class="chat-messages" id="chatMessages">
                    <!-- Messages will be added here -->
                </div>
                
                <div class="chat-input-area">
                    <div class="typing-indicator" id="typingIndicator">
                        <div class="typing-dots">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <span style="font-size: 12px; color: #667eea;">الدعم الفني يكتب...</span>
                    </div>
                    
                    <div class="recording-indicator" id="recordingIndicator">
                        <div class="recording-icon"></div>
                        <span class="recording-time" id="recordingTime">00:00</span>
                        <button class="recording-cancel" id="cancelRecording">إلغاء</button>
                    </div>
                    
                    <div class="input-wrapper">
                        <button class="voice-record-btn" id="voiceRecordBtn" title="تسجيل رسالة صوتية">
                            🎤
                        </button>
                        <div class="input-container">
                            <textarea 
                                id="chatInput" 
                                placeholder="اكتب رسالتك هنا..." 
                                rows="1"
                            ></textarea>
                            <button id="sendBtn" disabled>
                                ➤
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(widget);
        this.attachEventListeners();

        // Send initial welcome message
        setTimeout(() => {
            this.addMessage('support', 'مرحباً! كيف يمكنني مساعدتك اليوم؟ 😊');
        }, 500);
    }

    attachEventListeners() {
        const badge = document.getElementById('chatBadge');
        const closeBtn = document.getElementById('closeChat');
        const sendBtn = document.getElementById('sendBtn');
        const chatInput = document.getElementById('chatInput');
        const voiceBtn = document.getElementById('voiceRecordBtn');
        const cancelRecordingBtn = document.getElementById('cancelRecording');

        badge.addEventListener('click', () => this.toggleChat());
        closeBtn.addEventListener('click', () => this.minimizeChat());
        sendBtn.addEventListener('click', () => this.sendMessage());
        chatInput.addEventListener('input', () => this.handleInputChange());
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
        voiceBtn.addEventListener('click', () => this.toggleRecording());
        cancelRecordingBtn.addEventListener('click', () => this.cancelRecording());
    }

    showNotification() {
        const widget = document.getElementById('supportChat');
        if (widget) {
            widget.style.animation = 'slideUp 0.5s ease-out';
        }
    }

    toggleChat() {
        const widget = document.getElementById('supportChat');
        if (this.isMinimized) {
            widget.classList.remove('minimized');
            this.isMinimized = false;
            this.removeUnreadBadge();
            this.scrollToBottom();
        } else {
            this.minimizeChat();
        }
    }

    minimizeChat() {
        const widget = document.getElementById('supportChat');
        widget.classList.add('minimized');
        this.isMinimized = true;
    }

    removeUnreadBadge() {
        const badge = document.querySelector('.unread-count');
        if (badge) {
            badge.style.display = 'none';
        }
    }

    handleInputChange() {
        const input = document.getElementById('chatInput');
        const sendBtn = document.getElementById('sendBtn');

        // Auto-resize textarea
        input.style.height = 'auto';
        input.style.height = input.scrollHeight + 'px';

        // Enable/disable send button
        sendBtn.disabled = input.value.trim() === '';
    }

    sendMessage() {
        const input = document.getElementById('chatInput');
        const message = input.value.trim();

        if (message) {
            this.addMessage('user', message);
            input.value = '';
            input.style.height = 'auto';
            document.getElementById('sendBtn').disabled = true;

            // Simulate support response
            this.showTypingIndicator();
            setTimeout(() => {
                this.hideTypingIndicator();
                this.generateSupportResponse(message);
            }, 1500 + Math.random() * 1000);
        }
    }

    addMessage(sender, text, isVoice = false, audioDuration = null, audioUrl = null) {
        const messagesContainer = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;

        const now = new Date();
        const time = now.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' });

        const avatar = sender === 'support' ? '🎧' : '👤';

        let messageContent = '';
        if (isVoice) {
            const voiceId = 'voice-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
            messageContent = `
                <div class="voice-message" data-voice-id="${voiceId}">
                    <button class="play-btn" data-audio-url="${audioUrl || ''}" data-playing="false">▶️</button>
                    <div class="voice-waveform"></div>
                    <span class="voice-duration">${audioDuration || '0:00'}</span>
                </div>
            `;
        } else {
            messageContent = `<div class="message-bubble">${this.escapeHtml(text)}</div>`;
        }

        messageDiv.innerHTML = `
            <div class="message-avatar">${avatar}</div>
            <div class="message-content">
                ${messageContent}
                <div class="message-time">${time}</div>
            </div>
        `;

        messagesContainer.appendChild(messageDiv);

        // Add play button event listener for voice messages
        if (isVoice && audioUrl) {
            const playBtn = messageDiv.querySelector('.play-btn');
            if (playBtn) {
                playBtn.addEventListener('click', (e) => this.playVoiceMessage(e.target));
            }
        }

        this.messages.push({ sender, text, time, isVoice, audioUrl });
        this.scrollToBottom();
    }

    generateSupportResponse(userMessage) {
        const responses = {
            'default': 'شكراً لتواصلك معنا. سيتم توجيهك إلى أحد ممثلي الدعم الفني قريباً.',
            'مشكلة': 'نأسف لسماع ذلك. يرجى وصف المشكلة بالتفصيل وسنعمل على حلها في أقرب وقت.',
            'تسجيل': 'إذا كنت تواجه مشكلة في التسجيل، يرجى التأكد من إدخال جميع البيانات المطلوبة بشكل صحيح.',
            'دعوى': 'لتقديم دعوى جديدة، يمكنك الانتقال إلى قسم "تقديم الطلبات" من القائمة الرئيسية.',
            'استفسار': 'أنا هنا للإجابة على جميع استفساراتك. كيف يمكنني مساعدتك؟',
            'شكر': 'العفو! يسعدنا خدمتك دائماً 😊',
            'وقت': 'أوقات العمل الرسمية من الأحد إلى الخميس من الساعة 8 صباحاً حتى 4 مساءً.',
            'رقم': 'يمكنك التواصل معنا على الرقم الموحد: 920001234',
        };

        let response = responses.default;

        for (const [key, value] of Object.entries(responses)) {
            if (userMessage.includes(key)) {
                response = value;
                break;
            }
        }

        this.addMessage('support', response);
    }

    async toggleRecording() {
        if (this.isRecording) {
            this.stopRecording();
        } else {
            await this.startRecording();
        }
    }

    async startRecording() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            this.mediaRecorder = new MediaRecorder(stream);
            this.audioChunks = [];

            this.mediaRecorder.ondataavailable = (event) => {
                this.audioChunks.push(event.data);
            };

            this.mediaRecorder.onstop = () => {
                const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
                const duration = this.getRecordingDuration();
                this.handleVoiceMessage(audioBlob, duration);

                // Stop all tracks
                stream.getTracks().forEach(track => track.stop());
            };

            this.mediaRecorder.start();
            this.isRecording = true;
            this.recordingStartTime = Date.now();

            // Update UI
            const voiceBtn = document.getElementById('voiceRecordBtn');
            const recordingIndicator = document.getElementById('recordingIndicator');

            voiceBtn.classList.add('recording');
            voiceBtn.innerHTML = '⏹️';
            recordingIndicator.classList.add('active');

            // Start timer
            this.startRecordingTimer();

        } catch (error) {
            console.error('Error accessing microphone:', error);
            alert('حدث خطأ في الوصول إلى الميكروفون. يرجى التأكد من منح الأذونات اللازمة.');
        }
    }

    stopRecording() {
        if (this.mediaRecorder && this.isRecording) {
            this.mediaRecorder.stop();
            this.isRecording = false;

            // Update UI
            const voiceBtn = document.getElementById('voiceRecordBtn');
            const recordingIndicator = document.getElementById('recordingIndicator');

            voiceBtn.classList.remove('recording');
            voiceBtn.innerHTML = '🎤';
            recordingIndicator.classList.remove('active');

            // Stop timer
            this.stopRecordingTimer();
        }
    }

    cancelRecording() {
        if (this.mediaRecorder && this.isRecording) {
            this.mediaRecorder.stop();
            this.isRecording = false;
            this.audioChunks = [];

            // Update UI
            const voiceBtn = document.getElementById('voiceRecordBtn');
            const recordingIndicator = document.getElementById('recordingIndicator');

            voiceBtn.classList.remove('recording');
            voiceBtn.innerHTML = '🎤';
            recordingIndicator.classList.remove('active');

            // Stop timer
            this.stopRecordingTimer();
        }
    }

    startRecordingTimer() {
        this.recordingTimer = setInterval(() => {
            const elapsed = Date.now() - this.recordingStartTime;
            const minutes = Math.floor(elapsed / 60000);
            const seconds = Math.floor((elapsed % 60000) / 1000);

            const timeDisplay = document.getElementById('recordingTime');
            timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }, 100);
    }

    stopRecordingTimer() {
        if (this.recordingTimer) {
            clearInterval(this.recordingTimer);
            this.recordingTimer = null;
        }
    }

    getRecordingDuration() {
        if (!this.recordingStartTime) return '0:00';

        const elapsed = Date.now() - this.recordingStartTime;
        const minutes = Math.floor(elapsed / 60000);
        const seconds = Math.floor((elapsed % 60000) / 1000);

        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    handleVoiceMessage(audioBlob, duration) {
        // Create audio URL from blob
        const audioUrl = URL.createObjectURL(audioBlob);

        // Add voice message to chat with audio URL
        this.addMessage('user', 'رسالة صوتية', true, duration, audioUrl);

        // Simulate support response to voice message
        this.showTypingIndicator();
        setTimeout(() => {
            this.hideTypingIndicator();
            this.addMessage('support', 'شكراً لإرسال الرسالة الصوتية. سيتم مراجعتها والرد عليك في أقرب وقت.');
        }, 2000);
    }

    showTypingIndicator() {
        const indicator = document.getElementById('typingIndicator');
        indicator.classList.add('active');
    }

    hideTypingIndicator() {
        const indicator = document.getElementById('typingIndicator');
        indicator.classList.remove('active');
    }

    scrollToBottom() {
        const messagesContainer = document.getElementById('chatMessages');
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    playVoiceMessage(playBtn) {
        const audioUrl = playBtn.getAttribute('data-audio-url');
        const isPlaying = playBtn.getAttribute('data-playing') === 'true';

        if (!audioUrl) {
            console.error('No audio URL found');
            return;
        }

        // Stop any currently playing audio
        if (this.currentAudio) {
            this.currentAudio.pause();
            this.currentAudio.currentTime = 0;
            if (this.currentPlayBtn) {
                this.currentPlayBtn.textContent = '▶️';
                this.currentPlayBtn.setAttribute('data-playing', 'false');
                this.currentPlayBtn.classList.remove('playing');
            }
        }

        if (isPlaying) {
            // Stop current audio
            playBtn.textContent = '▶️';
            playBtn.setAttribute('data-playing', 'false');
            playBtn.classList.remove('playing');
            this.currentAudio = null;
            this.currentPlayBtn = null;
        } else {
            // Create and play new audio
            const audio = new Audio(audioUrl);
            this.currentAudio = audio;
            this.currentPlayBtn = playBtn;

            playBtn.textContent = '⏸️';
            playBtn.setAttribute('data-playing', 'true');
            playBtn.classList.add('playing');

            audio.play().catch(error => {
                console.error('Error playing audio:', error);
                playBtn.textContent = '▶️';
                playBtn.setAttribute('data-playing', 'false');
                playBtn.classList.remove('playing');
            });

            // Reset button when audio ends
            audio.addEventListener('ended', () => {
                playBtn.textContent = '▶️';
                playBtn.setAttribute('data-playing', 'false');
                playBtn.classList.remove('playing');
                this.currentAudio = null;
                this.currentPlayBtn = null;
            });

            // Handle audio errors
            audio.addEventListener('error', (e) => {
                console.error('Audio error:', e);
                playBtn.textContent = '▶️';
                playBtn.setAttribute('data-playing', 'false');
                playBtn.classList.remove('playing');
                this.currentAudio = null;
                this.currentPlayBtn = null;
            });
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize support chat when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new SupportChat();
    });
} else {
    new SupportChat();
}
