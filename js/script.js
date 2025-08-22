// Velotax Academy - Sistema Premium
class PremiumSystem {
    constructor() {
        this.currentTheme = 'light';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadUserPreferences();
        this.initializeAnimations();
        this.setupParallaxEffects();
        this.setupRippleEffects();
        this.preloadCriticalResources();
        
        // Mostrar toast de boas-vindas
        setTimeout(() => {
            this.showToast('Bem-vindo à Velotax Academy! 🎓', 'success');
        }, 1000);
    }

    setupEventListeners() {
        // Theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        // Sidebar toggle
        const sidebarToggle = document.getElementById('sidebar-toggle');
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', () => this.toggleSidebar());
        }

        // Navigation
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.getAttribute('data-section');
                this.navigateToSection(section);
            });
        });

        // Quick actions
        const actionCards = document.querySelectorAll('.action-card');
        actionCards.forEach(card => {
            card.addEventListener('click', () => this.handleQuickAction(card));
        });

        // Member actions
        const memberButtons = document.querySelectorAll('.member-action');
        memberButtons.forEach(button => {
            button.addEventListener('click', () => this.handleMemberAction(button));
        });

        // Chart buttons
        const chartButtons = document.querySelectorAll('.chart-button');
        chartButtons.forEach(button => {
            button.addEventListener('click', () => this.handleChartButton(button));
        });
    }

    toggleSidebar() {
        const sidebar = document.querySelector('.sidebar');
        const mainContent = document.querySelector('.main-content');
        
        if (sidebar && mainContent) {
            sidebar.classList.toggle('collapsed');
            mainContent.classList.toggle('expanded');
        }
    }

    navigateToSection(section) {
        // Remover seção ativa anterior
        const activeSection = document.querySelector('.content-section.active');
        const activeLink = document.querySelector('.nav-link.active');
        
        if (activeSection) activeSection.classList.remove('active');
        if (activeLink) activeLink.classList.remove('active');

        // Ativar nova seção
        const sectionElement = document.getElementById(section);
        const sectionLink = document.querySelector(`[data-section="${section}"]`);
        
        if (sectionElement) {
            sectionElement.classList.add('active');
            this.updateBreadcrumb(section);
            this.animateSectionEntry(section);
        }
        
        if (sectionLink) {
            sectionLink.classList.add('active');
        }
    }

    updateBreadcrumb(section) {
        const breadcrumb = document.querySelector('.breadcrumb');
        if (!breadcrumb) return;

        const sectionNames = {
            'dashboard': 'Dashboard',
            'cursos': 'Meus Cursos',
            'catalogo': 'Catálogo',
            'certificados': 'Certificados',
            'comunidade': 'Comunidade',
            'perfil': 'Meu Perfil'
        };

        const sectionName = sectionNames[section] || 'Dashboard';
        breadcrumb.textContent = sectionName;
    }

    animateSectionEntry(section) {
        const sectionElement = document.getElementById(section);
        if (!sectionElement) return;

        sectionElement.style.opacity = '0';
        sectionElement.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            sectionElement.style.transition = 'all 0.5s ease';
            sectionElement.style.opacity = '1';
            sectionElement.style.transform = 'translateY(0)';
        }, 100);
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.currentTheme = newTheme;
        
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('velotax-academy-theme', newTheme);
        
        // Atualizar ícone do toggle
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            if (icon) {
                icon.className = newTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
            }
        }
        
        this.showToast(`Tema ${newTheme === 'light' ? 'claro' : 'escuro'} ativado!`, 'info');
    }

    loadUserPreferences() {
        const savedTheme = localStorage.getItem('velotax-academy-theme') || 'light';
        this.currentTheme = savedTheme;
        document.body.setAttribute('data-theme', savedTheme);
        
        // Atualizar ícone do toggle
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            if (icon) {
                icon.className = savedTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
            }
        }
    }

    initializeAnimations() {
        const animatedElements = document.querySelectorAll('.stat-card, .action-card, .chart-card, .project-card, .team-member');
        
        animatedElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.6s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    handleQuickAction(card) {
        const actionText = card.querySelector('span')?.textContent || 'Ação';
        this.showToast(`Executando: ${actionText}`, 'info');
        this.simulateAction(actionText, 2000);
    }

    handleMemberAction(button) {
        const action = button.getAttribute('title') || 'Ação';
        this.showToast(`Ação executada: ${action}`, 'success');
    }

    handleChartButton(button) {
        const action = button.textContent || 'Ação';
        this.showToast(`Função ${action} ativada`, 'info');
    }

    simulateAction(action, duration) {
        const progressBar = document.createElement('div');
        progressBar.className = 'action-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 4px;
            background: var(--primary-gradient);
            z-index: 10000;
            transition: width ${duration}ms ease;
            width: 0%;
        `;
        
        document.body.appendChild(progressBar);
        
        setTimeout(() => {
            progressBar.style.width = '100%';
        }, 100);
        
        setTimeout(() => {
            document.body.removeChild(progressBar);
            this.showToast(`${action} concluído com sucesso!`, 'success');
        }, duration);
    }

    showToast(message, type = 'info') {
        if (window.notificationSystem) {
            window.notificationSystem.showToast(message, type);
        }
    }

    preloadCriticalResources() {
        // Preload da fonte Poppins
        const fontLink = document.createElement('link');
        fontLink.rel = 'preload';
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap';
        fontLink.as = 'style';
        document.head.appendChild(fontLink);
    }
}

// Sistema de Notificações
class NotificationSystem {
    constructor() {
        this.toastQueue = [];
        this.isProcessing = false;
        this.init();
    }

    init() {
        this.createToastContainer();
    }

    createToastContainer() {
        const container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    showToast(message, type = 'info') {
        const toast = this.createToast(message, type);
        this.toastQueue.push(toast);
        
        if (!this.isProcessing) {
            this.processQueue();
        }
    }

    createToast(message, type) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <div class="toast-icon">
                <i class="${this.getIconForType(type)}"></i>
            </div>
            <div class="toast-message">${message}</div>
            <button class="toast-close">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // Auto-remover após 5 segundos
        setTimeout(() => {
            this.removeToast(toast);
        }, 5000);
        
        return toast;
    }

    getIconForType(type) {
        const icons = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            warning: 'fas fa-exclamation-triangle',
            info: 'fas fa-info-circle'
        };
        return icons[type] || icons.info;
    }

    processQueue() {
        if (this.toastQueue.length === 0) {
            this.isProcessing = false;
            return;
        }
        
        this.isProcessing = true;
        const toast = this.toastQueue.shift();
        this.showToastElement(toast);
    }

    showToastElement(toast) {
        const container = document.getElementById('toast-container');
        if (!container) return;
        
        container.appendChild(toast);
        this.animateIn(toast);
        
        // Adicionar evento de fechar
        const closeBtn = toast.querySelector('.toast-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.removeToast(toast));
        }
        
        // Processar próximo toast após animação
        setTimeout(() => {
            this.processQueue();
        }, 300);
    }

    removeToast(toast) {
        this.animateOut(toast, () => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        });
    }

    animateIn(toast) {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        
        setTimeout(() => {
            toast.style.transition = 'all 0.3s ease';
            toast.style.opacity = '1';
            toast.style.transform = 'translateX(0)';
        }, 10);
    }

    animateOut(toast, callback) {
        toast.style.transition = 'all 0.3s ease';
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        
        setTimeout(callback, 300);
    }
}

// Efeitos Parallax
function setupParallaxEffects() {
    const cards = document.querySelectorAll('.stat-card, .action-card, .chart-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });
}

// Efeitos Ripple
function setupRippleEffects() {
    const buttons = document.querySelectorAll('.btn, .action-card, .nav-link');
    
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(59, 130, 246, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            button.style.position = 'relative';
            button.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        });
    });
}

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar sistema de notificações
    window.notificationSystem = new NotificationSystem();
    
    // Inicializar sistema principal
    window.premiumSystem = new PremiumSystem();
    
    // Remover tela de carregamento
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }, 1500);
    
    // Configurar efeitos
    setupParallaxEffects();
    setupRippleEffects();
});

// Adicionar animação de ripple ao CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .action-progress {
        box-shadow: 0 2px 8px rgba(30, 64, 175, 0.3);
    }
`;
document.head.appendChild(style);
