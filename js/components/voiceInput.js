/**
 * VoiceInputController - Handles speech-to-text functionality for form inputs
 */
class VoiceInputController {
    constructor() {
        this.recognition = null;
        this.isRecording = false;
        this.currentInput = null;
        this.currentButton = null;

        this.init();
    }

    init() {
        if ('webkitSpeechRecognition' in window) {
            this.recognition = new webkitSpeechRecognition();
            this.recognition.continuous = false;
            this.recognition.interimResults = false;
            this.recognition.lang = 'ar-SA'; // Set Arabic as default

            this.recognition.onstart = () => {
                this.isRecording = true;
                this.updateUI(true);
            };

            this.recognition.onend = () => {
                this.isRecording = false;
                this.updateUI(false);
                this.currentInput = null;
                this.currentButton = null;
            };

            this.recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                if (this.currentInput) {
                    // If input has value, append with space, otherwise set value
                    const currentValue = this.currentInput.value;
                    this.currentInput.value = currentValue ? `${currentValue} ${transcript}` : transcript;

                    // Trigger change event to ensure any bound listeners react
                    this.currentInput.dispatchEvent(new Event('change', { bubbles: true }));
                    this.currentInput.dispatchEvent(new Event('input', { bubbles: true }));
                }
            };

            this.recognition.onerror = (event) => {
                console.error('Speech recognition error', event.error);
                this.isRecording = false;
                this.updateUI(false);

                // Show simple feedback if available (assuming showNotification exists from app.js)
                if (typeof showNotification === 'function') {
                    showNotification('حدث خطأ أثناء التعرف على الصوت. الرجاء المحاولة مرة أخرى.', 'error');
                }
            };
        } else {
            console.warn('Web Speech API is not supported in this browser.');
        }
    }

    toggleRecording(btnElement, inputName) {
        if (!this.recognition) {
            if (typeof showNotification === 'function') {
                showNotification('عذراً، متصفحك لا يدعم خاصية الكتابة الصوتية.', 'warning');
            }
            return;
        }

        const inputElement = document.querySelector(`[name="${inputName}"]`);
        if (!inputElement) {
            console.error('Target input not found:', inputName);
            return;
        }

        if (this.isRecording && this.currentInput === inputElement) {
            this.stopRecording();
        } else {
            // Stop any existing recording first
            if (this.isRecording) {
                this.stopRecording();
            }
            this.startRecording(inputElement, btnElement);
        }
    }

    startRecording(inputElement, btnElement) {
        this.currentInput = inputElement;
        this.currentButton = btnElement;
        this.recognition.start();
    }

    stopRecording() {
        if (this.recognition) {
            this.recognition.stop();
        }
    }

    updateUI(isRecording) {
        if (this.currentButton) {
            if (isRecording) {
                this.currentButton.classList.add('listening');
                this.currentButton.innerHTML = `
                    <svg class="icon-svg" viewBox="0 0 24 24">
                        <line x1="1" y1="1" x2="23" y2="23"></line>
                        <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path>
                        <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path>
                        <line x1="12" y1="19" x2="12" y2="23"></line>
                        <line x1="8" y1="23" x2="16" y2="23"></line>
                    </svg>
                `; // Switch to 'stop' or 'listening' state icon if desired, or keep mic with animation
                // Actually, let's keep the mic icon but maybe pulsate, or show a stop icon.
                // For simplicity/UX, let's just add the class for animation and maybe change color. 
                // Let's reset the innerHTML to just the mic for now, CSS handles the animation.
                this.currentButton.innerHTML = `
                    <svg class="icon-svg" viewBox="0 0 24 24">
                        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                        <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                        <line x1="12" y1="19" x2="12" y2="23"></line>
                        <line x1="8" y1="23" x2="16" y2="23"></line>
                    </svg>
                `;
            } else {
                this.currentButton.classList.remove('listening');
                this.currentButton.innerHTML = `
                    <svg class="icon-svg" viewBox="0 0 24 24">
                        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                        <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                        <line x1="12" y1="19" x2="12" y2="23"></line>
                        <line x1="8" y1="23" x2="16" y2="23"></line>
                    </svg>
                `;
            }
        }
    }
}

// Initialize global instance
const voiceInputController = new VoiceInputController();
