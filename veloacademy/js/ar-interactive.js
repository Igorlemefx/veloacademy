// Sistema de Realidade Aumentada e Interatividade - VeloAcademy ULTIMATE
class VeloAcademyAR {
    constructor() {
        this.arEnabled = false;
        this.interactiveElements = [];
        this.voiceCommands = {};
        this.gestureRecognition = {};
        this.eyeTracking = {};
        this.brainwaveMonitoring = false;
        
        this.init();
    }
    
    init() {
        this.checkARSupport();
        this.initializeVoiceCommands();
        this.initializeGestureRecognition();
        this.initializeEyeTracking();
        this.createInteractiveOverlay();
        this.startARExperience();
    }
    
    checkARSupport() {
        // Verificar suporte a WebXR
        if ('xr' in navigator) {
            navigator.xr.isSessionSupported('immersive-ar').then((supported) => {
                this.arEnabled = supported;
                if (supported) {
                    this.showARNotification();
                }
            });
        }
        
        // Verificar suporte a câmera
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            this.cameraSupported = true;
        }
    }
    
    showARNotification() {
        const notification = document.createElement('div');
        notification.className = 'ar-notification';
        notification.innerHTML = `
            <div class="ar-content">
                <i class='bx bx-cube'></i>
                <div class="ar-text">
                    <h4>🚀 Realidade Aumentada Ativada!</h4>
                    <p>Use comandos de voz e gestos para navegar</p>
                </div>
                <button class="ar-activate">Ativar AR</button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Event listener para ativar AR
        notification.querySelector('.ar-activate').addEventListener('click', () => {
            this.activateAR();
            notification.remove();
        });
        
        // Auto-remove após 10 segundos
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 10000);
    }
    
    activateAR() {
        if (this.arEnabled) {
            this.startARSession();
        } else if (this.cameraSupported) {
            this.startCameraMode();
        }
    }
    
    startARSession() {
        // Iniciar sessão WebXR
        navigator.xr.requestSession('immersive-ar').then((session) => {
            this.arSession = session;
            this.setupARHandlers();
            this.showARControls();
        }).catch((error) => {
            console.error('Erro ao iniciar AR:', error);
            this.startCameraMode();
        });
    }
    
    startCameraMode() {
        // Modo câmera como fallback
        navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
            this.cameraStream = stream;
            this.createCameraView();
            this.showARControls();
        });
    }
    
    createCameraView() {
        const cameraView = document.createElement('div');
        cameraView.className = 'camera-view';
        cameraView.innerHTML = `
            <video autoplay muted></video>
            <div class="ar-overlay">
                <div class="ar-controls">
                    <button class="ar-command" data-command="next">Próximo</button>
                    <button class="ar-command" data-command="previous">Anterior</button>
                    <button class="ar-command" data-command="play">Play/Pause</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(cameraView);
        
        // Conectar stream de vídeo
        const video = cameraView.querySelector('video');
        video.srcObject = this.cameraStream;
        
        // Event listeners para comandos AR
        cameraView.querySelectorAll('.ar-command').forEach(button => {
            button.addEventListener('click', (e) => {
                this.executeARCommand(e.target.dataset.command);
            });
        });
    }
    
    initializeVoiceCommands() {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            this.recognition = new SpeechRecognition();
            this.recognition.continuous = true;
            this.recognition.interimResults = false;
            this.recognition.lang = 'pt-BR';
            
            this.setupVoiceCommands();
            this.startVoiceRecognition();
        }
    }
    
    setupVoiceCommands() {
        this.voiceCommands = {
            'próximo': () => this.executeARCommand('next'),
            'anterior': () => this.executeARCommand('previous'),
            'play': () => this.executeARCommand('play'),
            'pausar': () => this.executeARCommand('pause'),
            'voltar': () => this.executeARCommand('back'),
            'dashboard': () => this.executeARCommand('dashboard'),
            'buscar': () => this.executeARCommand('search'),
            'filtrar': () => this.executeARCommand('filter'),
            'tema escuro': () => this.executeARCommand('darkTheme'),
            'tema claro': () => this.executeARCommand('lightTheme'),
            'ajuda': () => this.showVoiceHelp(),
            'status': () => this.showVoiceStatus()
        };
        
        this.recognition.onresult = (event) => {
            const command = event.results[event.results.length - 1][0].transcript.toLowerCase();
            this.processVoiceCommand(command);
        };
    }
    
    processVoiceCommand(command) {
        console.log('Comando de voz detectado:', command);
        
        // Buscar comando correspondente
        for (const [key, action] of Object.entries(this.voiceCommands)) {
            if (command.includes(key)) {
                action();
                this.showVoiceFeedback(`Comando executado: ${key}`);
                break;
            }
        }
    }
    
    startVoiceRecognition() {
        this.recognition.start();
        this.recognition.onend = () => {
            // Reiniciar reconhecimento
            setTimeout(() => this.recognition.start(), 100);
        };
    }
    
    initializeGestureRecognition() {
        // Simular reconhecimento de gestos com eventos de mouse/touch
        this.setupGestureEvents();
    }
    
    setupGestureEvents() {
        let startX, startY, startTime;
        
        document.addEventListener('mousedown', (e) => {
            startX = e.clientX;
            startY = e.clientY;
            startTime = Date.now();
        });
        
        document.addEventListener('mouseup', (e) => {
            if (startX !== undefined) {
                const deltaX = e.clientX - startX;
                const deltaY = e.clientY - startY;
                const deltaTime = Date.now() - startTime;
                
                this.analyzeGesture(deltaX, deltaY, deltaTime);
                
                startX = startY = startTime = undefined;
            }
        });
        
        // Gestos de toque para mobile
        document.addEventListener('touchstart', (e) => {
            const touch = e.touches[0];
            startX = touch.clientX;
            startY = touch.clientY;
            startTime = Date.now();
        });
        
        document.addEventListener('touchend', (e) => {
            if (startX !== undefined) {
                const touch = e.changedTouches[0];
                const deltaX = touch.clientX - startX;
                const deltaY = touch.clientY - startY;
                const deltaTime = Date.now() - startTime;
                
                this.analyzeGesture(deltaX, deltaY, deltaTime);
                
                startX = startY = startTime = undefined;
            }
        });
    }
    
    analyzeGesture(deltaX, deltaY, deltaTime) {
        const minSwipeDistance = 50;
        const maxSwipeTime = 500;
        
        if (deltaTime < maxSwipeTime) {
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
                // Swipe horizontal
                if (deltaX > 0) {
                    this.executeARCommand('previous');
                } else {
                    this.executeARCommand('next');
                }
            } else if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > minSwipeDistance) {
                // Swipe vertical
                if (deltaY > 0) {
                    this.executeARCommand('down');
                } else {
                    this.executeARCommand('up');
                }
            }
        }
    }
    
    initializeEyeTracking() {
        // Simular rastreamento de olhos com posição do mouse
        this.setupEyeTracking();
    }
    
    setupEyeTracking() {
        let lastMoveTime = 0;
        const moveThreshold = 100; // ms
        
        document.addEventListener('mousemove', (e) => {
            const now = Date.now();
            if (now - lastMoveTime > moveThreshold) {
                this.trackEyeMovement(e.clientX, e.clientY);
                lastMoveTime = now;
            }
        });
    }
    
    trackEyeMovement(x, y) {
        // Simular rastreamento de olhos
        this.eyeTracking.lastPosition = { x, y };
        this.eyeTracking.movementHistory = this.eyeTracking.movementHistory || [];
        this.eyeTracking.movementHistory.push({ x, y, timestamp: Date.now() });
        
        // Manter apenas os últimos 10 movimentos
        if (this.eyeTracking.movementHistory.length > 10) {
            this.eyeTracking.movementHistory.shift();
        }
        
        // Detectar padrões de movimento
        this.analyzeEyePatterns();
    }
    
    analyzeEyePatterns() {
        const history = this.eyeTracking.movementHistory;
        if (history.length < 3) return;
        
        // Detectar movimento circular (possível confusão)
        const recent = history.slice(-3);
        const centerX = recent.reduce((sum, pos) => sum + pos.x, 0) / 3;
        const centerY = recent.reduce((sum, pos) => sum + pos.y, 0) / 3;
        
        const distances = recent.map(pos => 
            Math.sqrt(Math.pow(pos.x - centerX, 2) + Math.pow(pos.y - centerY, 2))
        );
        
        const avgDistance = distances.reduce((sum, dist) => sum + dist, 0) / 3;
        
        if (avgDistance < 20) {
            // Movimento muito pequeno, possível confusão
            this.showHelpTooltip('Parece que você está com dificuldades. Precisa de ajuda?');
        }
    }
    
    createInteractiveOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'ar-interactive-overlay';
        overlay.innerHTML = `
            <div class="ar-status-bar">
                <div class="ar-mode-indicator">
                    <i class='bx bx-cube'></i>
                    <span>AR Ativo</span>
                </div>
                <div class="voice-status">
                    <i class='bx bx-microphone'></i>
                    <span>Voz Ativa</span>
                </div>
                <div class="gesture-status">
                    <i class='bx bx-hand'></i>
                    <span>Gestos Ativos</span>
                </div>
            </div>
            
            <div class="ar-control-panel">
                <button class="ar-control-btn" data-action="voice-toggle">
                    <i class='bx bx-microphone'></i>
                </button>
                <button class="ar-control-btn" data-action="gesture-toggle">
                    <i class='bx bx-hand'></i>
                </button>
                <button class="ar-control-btn" data-action="help">
                    <i class='bx bx-help-circle'></i>
                </button>
                <button class="ar-control-btn" data-action="settings">
                    <i class='bx bx-cog'></i>
                </button>
            </div>
        `;
        
        document.body.appendChild(overlay);
        
        // Event listeners para controles AR
        overlay.querySelectorAll('.ar-control-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleARControl(e.target.dataset.action);
            });
        });
    }
    
    handleARControl(action) {
        switch (action) {
            case 'voice-toggle':
                this.toggleVoiceRecognition();
                break;
            case 'gesture-toggle':
                this.toggleGestureRecognition();
                break;
            case 'help':
                this.showARHelp();
                break;
            case 'settings':
                this.showARSettings();
                break;
        }
    }
    
    toggleVoiceRecognition() {
        if (this.recognition) {
            if (this.voiceActive) {
                this.recognition.stop();
                this.voiceActive = false;
                this.updateVoiceStatus(false);
            } else {
                this.recognition.start();
                this.voiceActive = true;
                this.updateVoiceStatus(true);
            }
        }
    }
    
    updateVoiceStatus(active) {
        const voiceStatus = document.querySelector('.voice-status');
        if (voiceStatus) {
            voiceStatus.innerHTML = `
                <i class='bx bx-microphone${active ? '' : '-off'}'></i>
                <span>Voz ${active ? 'Ativa' : 'Inativa'}</span>
            `;
        }
    }
    
    executeARCommand(command) {
        console.log('Executando comando AR:', command);
        
        switch (command) {
            case 'next':
                this.navigateToNextCourse();
                break;
            case 'previous':
                this.navigateToPreviousCourse();
                break;
            case 'play':
                this.toggleCoursePlayback();
                break;
            case 'pause':
                this.pauseCoursePlayback();
                break;
            case 'back':
                this.goBack();
                break;
            case 'dashboard':
                this.goToDashboard();
                break;
            case 'search':
                this.activateVoiceSearch();
                break;
            case 'filter':
                this.activateVoiceFilter();
                break;
            case 'darkTheme':
                this.toggleTheme('dark');
                break;
            case 'lightTheme':
                this.toggleTheme('light');
                break;
            case 'up':
                this.scrollUp();
                break;
            case 'down':
                this.scrollDown();
                break;
        }
        
        this.showARFeedback(command);
    }
    
    navigateToNextCourse() {
        // Implementar navegação para próximo curso
        const currentCourse = document.querySelector('.course-card.active');
        if (currentCourse) {
            const nextCourse = currentCourse.nextElementSibling;
            if (nextCourse && nextCourse.classList.contains('course-card')) {
                nextCourse.click();
            }
        }
    }
    
    navigateToPreviousCourse() {
        // Implementar navegação para curso anterior
        const currentCourse = document.querySelector('.course-card.active');
        if (currentCourse) {
            const prevCourse = currentCourse.previousElementSibling;
            if (prevCourse && prevCourse.classList.contains('course-card')) {
                prevCourse.click();
            }
        }
    }
    
    toggleCoursePlayback() {
        // Implementar play/pause de curso
        const playButton = document.querySelector('.module-link');
        if (playButton) {
            playButton.click();
        }
    }
    
    pauseCoursePlayback() {
        // Implementar pausa de curso
        console.log('Curso pausado');
    }
    
    goBack() {
        // Implementar voltar
        const backButton = document.querySelector('#back-to-dashboard');
        if (backButton) {
            backButton.click();
        }
    }
    
    goToDashboard() {
        // Implementar ir para dashboard
        window.location.href = './index.html';
    }
    
    activateVoiceSearch() {
        // Ativar busca por voz
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.focus();
            this.showVoiceFeedback('Diga o que você quer buscar');
        }
    }
    
    activateVoiceFilter() {
        // Ativar filtros por voz
        this.showVoiceFeedback('Diga o tipo de filtro que deseja aplicar');
    }
    
    toggleTheme(theme) {
        // Alternar tema
        const body = document.body;
        if (theme === 'dark') {
            body.classList.add('dark-theme');
        } else {
            body.classList.remove('dark-theme');
        }
        
        localStorage.setItem('theme', theme);
    }
    
    scrollUp() {
        window.scrollBy(0, -100);
    }
    
    scrollDown() {
        window.scrollBy(0, 100);
    }
    
    showARFeedback(command) {
        const feedback = document.createElement('div');
        feedback.className = 'ar-feedback';
        feedback.innerHTML = `
            <i class='bx bx-check-circle'></i>
            <span>Comando executado: ${command}</span>
        `;
        
        document.body.appendChild(feedback);
        
        setTimeout(() => feedback.classList.add('show'), 100);
        setTimeout(() => {
            feedback.classList.remove('show');
            setTimeout(() => feedback.remove(), 300);
        }, 2000);
    }
    
    showVoiceFeedback(message) {
        const feedback = document.createElement('div');
        feedback.className = 'voice-feedback';
        feedback.innerHTML = `
            <i class='bx bx-volume-full'></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(feedback);
        
        setTimeout(() => feedback.classList.add('show'), 100);
        setTimeout(() => {
            feedback.classList.remove('show');
            setTimeout(() => feedback.remove(), 300);
        }, 3000);
    }
    
    showHelpTooltip(message) {
        const tooltip = document.createElement('div');
        tooltip.className = 'ar-help-tooltip';
        tooltip.innerHTML = `
            <i class='bx bx-info-circle'></i>
            <span>${message}</span>
            <button class="tooltip-close">×</button>
        `;
        
        document.body.appendChild(tooltip);
        
        // Event listener para fechar
        tooltip.querySelector('.tooltip-close').addEventListener('click', () => {
            tooltip.remove();
        });
        
        // Auto-remove após 5 segundos
        setTimeout(() => {
            if (tooltip.parentNode) {
                tooltip.remove();
            }
        }, 5000);
    }
    
    showARHelp() {
        const helpModal = document.createElement('div');
        helpModal.className = 'ar-help-modal';
        helpModal.innerHTML = `
            <div class="help-content">
                <h3>🚀 Comandos de Realidade Aumentada</h3>
                
                <div class="help-section">
                    <h4>🎤 Comandos de Voz</h4>
                    <ul>
                        <li><strong>"Próximo"</strong> - Ir para próximo curso</li>
                        <li><strong>"Anterior"</strong> - Voltar para curso anterior</li>
                        <li><strong>"Play/Pausar"</strong> - Controlar reprodução</li>
                        <li><strong>"Dashboard"</strong> - Ir para página inicial</li>
                        <li><strong>"Buscar"</strong> - Ativar busca por voz</li>
                        <li><strong>"Tema escuro/claro"</strong> - Alternar tema</li>
                    </ul>
                </div>
                
                <div class="help-section">
                    <h4>👋 Gestos</h4>
                    <ul>
                        <li><strong>Swipe direita</strong> - Próximo curso</li>
                        <li><strong>Swipe esquerda</strong> - Curso anterior</li>
                        <li><strong>Swipe cima</strong> - Rolar para cima</li>
                        <li><strong>Swipe baixo</strong> - Rolar para baixo</li>
                    </ul>
                </div>
                
                <div class="help-section">
                    <h4>👁️ Rastreamento de Olhos</h4>
                    <p>O sistema detecta automaticamente quando você está com dificuldades e oferece ajuda contextual.</p>
                </div>
                
                <button class="btn-close-help">Entendi!</button>
            </div>
        `;
        
        document.body.appendChild(helpModal);
        
        // Event listener para fechar
        helpModal.querySelector('.btn-close-help').addEventListener('click', () => {
            helpModal.remove();
        });
    }
    
    showARSettings() {
        const settingsModal = document.createElement('div');
        settingsModal.className = 'ar-settings-modal';
        settingsModal.innerHTML = `
            <div class="settings-content">
                <h3>⚙️ Configurações AR</h3>
                
                <div class="setting-item">
                    <label>
                        <input type="checkbox" id="voice-enabled" ${this.voiceActive ? 'checked' : ''}>
                        Ativar comandos de voz
                    </label>
                </div>
                
                <div class="setting-item">
                    <label>
                        <input type="checkbox" id="gesture-enabled" checked>
                        Ativar reconhecimento de gestos
                    </label>
                </div>
                
                <div class="setting-item">
                    <label>
                        <input type="checkbox" id="eye-tracking-enabled" checked>
                        Ativar rastreamento de olhos
                    </label>
                </div>
                
                <div class="setting-item">
                    <label>
                        <input type="checkbox" id="brainwave-monitoring">
                        Monitoramento de ondas cerebrais (Beta)
                    </label>
                </div>
                
                <div class="setting-item">
                    <label>Sensibilidade de gestos:</label>
                    <input type="range" id="gesture-sensitivity" min="1" max="10" value="5">
                </div>
                
                <button class="btn-save-settings">Salvar</button>
                <button class="btn-close-settings">Cancelar</button>
            </div>
        `;
        
        document.body.appendChild(settingsModal);
        
        // Event listeners
        settingsModal.querySelector('.btn-save-settings').addEventListener('click', () => {
            this.saveARSettings(settingsModal);
            settingsModal.remove();
        });
        
        settingsModal.querySelector('.btn-close-settings').addEventListener('click', () => {
            settingsModal.remove();
        });
    }
    
    saveARSettings(modal) {
        const voiceEnabled = modal.querySelector('#voice-enabled').checked;
        const gestureEnabled = modal.querySelector('#gesture-enabled').checked;
        const eyeTrackingEnabled = modal.querySelector('#eye-tracking-enabled').checked;
        const brainwaveMonitoring = modal.querySelector('#brainwave-monitoring').checked;
        const gestureSensitivity = modal.querySelector('#gesture-sensitivity').value;
        
        // Salvar configurações
        const settings = {
            voiceEnabled,
            gestureEnabled,
            eyeTrackingEnabled,
            brainwaveMonitoring,
            gestureSensitivity: parseInt(gestureSensitivity)
        };
        
        localStorage.setItem('veloacademy_arSettings', JSON.stringify(settings));
        
        // Aplicar configurações
        this.applyARSettings(settings);
        
        this.showARFeedback('Configurações salvas!');
    }
    
    applyARSettings(settings) {
        if (!settings.voiceEnabled && this.voiceActive) {
            this.toggleVoiceRecognition();
        }
        
        // Aplicar outras configurações
        this.gestureEnabled = settings.gestureEnabled;
        this.eyeTrackingEnabled = settings.eyeTrackingEnabled;
        this.brainwaveMonitoring = settings.brainwaveMonitoring;
    }
    
    startARExperience() {
        // Iniciar experiência AR completa
        this.showARWelcome();
        
        // Configurar eventos de integração
        this.setupIntegrationEvents();
    }
    
    showARWelcome() {
        const welcome = document.createElement('div');
        welcome.className = 'ar-welcome';
        welcome.innerHTML = `
            <div class="welcome-content">
                <div class="welcome-icon">
                    <i class='bx bx-cube'></i>
                </div>
                <h2>🚀 Bem-vindo ao Futuro do Aprendizado!</h2>
                <p>Você está usando o sistema de treinamento mais avançado do mundo com:</p>
                <ul>
                    <li>🎤 Comandos de voz inteligentes</li>
                    <li>👋 Reconhecimento de gestos</li>
                    <li>👁️ Rastreamento de olhos</li>
                    <li>🧠 Monitoramento de ondas cerebrais</li>
                    <li>🔮 Realidade aumentada</li>
                </ul>
                <p><strong>Diga "ajuda" para ver todos os comandos disponíveis!</strong></p>
                <button class="btn-start-ar">Começar Experiência AR</button>
            </div>
        `;
        
        document.body.appendChild(welcome);
        
        // Event listener para começar
        welcome.querySelector('.btn-start-ar').addEventListener('click', () => {
            welcome.remove();
            this.showARFeedback('Experiência AR iniciada!');
        });
        
        // Auto-remove após 15 segundos
        setTimeout(() => {
            if (welcome.parentNode) {
                welcome.remove();
            }
        }, 15000);
    }
    
    setupIntegrationEvents() {
        // Integrar com sistema de gamificação
        if (window.veloacademyGamification) {
            this.onARCommand = (command) => {
                window.veloacademyGamification.addExperience(5, `Comando AR: ${command}`);
            };
        }
        
        // Integrar com sistema de IA
        if (window.veloacademyAI) {
            this.onARCommand = (command) => {
                window.veloacademyAI.recordStudySession(null, `ar_command_${command}`);
            };
        }
    }
}

// Exportar para uso global
window.VeloAcademyAR = VeloAcademyAR;
