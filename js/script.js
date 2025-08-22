// Sistema Premium - JavaScript Exclusivo
class PremiumSystem {
    constructor() {
        this.isSidebarOpen = true;
        this.currentSection = 'dashboard';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupSidebarToggle();
        this.loadUserPreferences();
        this.initializeAnimations();
        this.showToast('Velotax Academy carregada com sucesso!', 'success');
    }

    setupEventListeners() {
        // Navegação da sidebar
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.getAttribute('data-section');
                this.navigateToSection(section);
            });
        });

        // Toggle de tema
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        // Ações rápidas
        document.querySelectorAll('.action-card').forEach(card => {
            card.addEventListener('click', () => this.handleQuickAction(card));
        });

        // Botões de gráfico
        document.querySelectorAll('.chart-btn').forEach(button => {
            button.addEventListener('click', () => this.handleChartButton(button));
        });

        // Ações de membros da equipe (agora certificados)
        document.querySelectorAll('.btn-icon').forEach(button => {
            button.addEventListener('click', () => this.handleMemberAction(button));
        });

        // Tecla Escape para fechar sidebar
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeSidebar();
            }
        });

        // Preload de recursos críticos
        this.preloadCriticalResources();
    }

    setupSidebarToggle() {
        const sidebarToggle = document.getElementById('sidebar-toggle');
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', () => this.toggleSidebar());
        }
    }

    toggleSidebar() {
        if (this.isSidebarOpen) {
            this.closeSidebar();
        } else {
            this.openSidebar();
        }
    }

    openSidebar() {
        const sidebar = document.querySelector('.sidebar');
        const mainContent = document.querySelector('.main-content');
        
        if (sidebar && mainContent) {
            sidebar.classList.add('active');
            mainContent.style.marginLeft = '280px';
            this.isSidebarOpen = true;
            this.showToast('Sidebar aberta', 'info');
        }
    }

    closeSidebar() {
        const sidebar = document.querySelector('.sidebar');
        const mainContent = document.querySelector('.main-content');
        
        if (sidebar && mainContent) {
            sidebar.classList.remove('active');
            mainContent.style.marginLeft = '0';
            this.isSidebarOpen = false;
            this.showToast('Sidebar fechada', 'info');
        }
    }

    navigateToSection(section) {
        // Remover seção ativa anterior
        const previousSection = document.querySelector('.content-section.active');
        if (previousSection) {
            previousSection.classList.remove('active');
        }

        // Ativar nova seção
        const newSection = document.getElementById(section);
        if (newSection) {
            newSection.classList.add('active');
            this.currentSection = section;
            this.updateBreadcrumb(section);
            this.animateSectionEntry(section);
        }

        // Atualizar navegação ativa
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        const activeLink = document.querySelector(`[data-section="${section}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }

        // Fechar sidebar em dispositivos móveis
        if (window.innerWidth <= 1024) {
            this.closeSidebar();
        }
    }

    updateBreadcrumb(section) {
        const breadcrumb = document.querySelector('.breadcrumb span');
        if (breadcrumb) {
            const sectionNames = {
                'dashboard': 'Dashboard',
                'cursos': 'Meus Cursos',
                'catalogo': 'Catálogo',
                'certificados': 'Certificados',
                'comunidade': 'Comunidade',
                'perfil': 'Meu Perfil'
            };
            breadcrumb.textContent = sectionNames[section] || 'Dashboard';
        }
    }

    animateSectionEntry(section) {
        const sectionElement = document.getElementById(section);
        if (sectionElement) {
            sectionElement.style.opacity = '0';
            sectionElement.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                sectionElement.style.transition = 'all 0.6s ease-out';
                sectionElement.style.opacity = '1';
                sectionElement.style.transform = 'translateY(0)';
            }, 100);
        }
    }

    toggleTheme() {
        const body = document.body;
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('premium-system-theme', newTheme);
        
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            if (icon) {
                icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
            }
        }
        
        this.showToast(`Tema ${newTheme === 'dark' ? 'escuro' : 'claro'} ativado`, 'success');
    }

    loadUserPreferences() {
        const savedTheme = localStorage.getItem('premium-system-theme');
        if (savedTheme) {
            document.body.setAttribute('data-theme', savedTheme);
            
            const themeToggle = document.getElementById('theme-toggle');
            if (themeToggle) {
                const icon = themeToggle.querySelector('i');
                if (icon) {
                    icon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
                }
            }
        }
    }

    initializeAnimations() {
        const animatedElements = document.querySelectorAll('.stat-card, .action-card, .chart-card, .project-card, .team-member');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease-out';
            observer.observe(el);
        });
    }

    handleQuickAction(card) {
        const actionText = card.querySelector('span').textContent;
        this.showToast(`Ação "${actionText}" executada!`, 'success');
        
        // Simular ação
        this.simulateAction(actionText, 2000);
    }

    handleMemberAction(button) {
        const action = button.getAttribute('title') || 'ver perfil';
        this.showToast(`Ação "${action}" executada!`, 'info');
    }

    handleChartButton(button) {
        // Remover classe ativa de todos os botões
        button.parentElement.querySelectorAll('.chart-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Adicionar classe ativa ao botão clicado
        button.classList.add('active');
        
        const buttonText = button.textContent;
        this.showToast(`Período "${buttonText}" selecionado`, 'info');
    }

    simulateAction(action, duration) {
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 4px;
            background: var(--primary-gradient);
            z-index: 10000;
            transition: width 0.3s ease;
        `;
        
        document.body.appendChild(progressBar);
        
        setTimeout(() => {
            progressBar.style.width = '100%';
        }, 100);
        
        setTimeout(() => {
            document.body.removeChild(progressBar);
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
        this.container = document.getElementById('toast-container');
        this.toastQueue = [];
        this.isProcessing = false;
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
        toast.className = `toast ${type}`;
        
        const icon = this.getIconForType(type);
        
        toast.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <i class="${icon}" style="font-size: 1.2rem;"></i>
                <span>${message}</span>
            </div>
        `;
        
        return toast;
    }

    getIconForType(type) {
        const icons = {
            'success': 'fas fa-check-circle',
            'error': 'fas fa-exclamation-circle',
            'warning': 'fas fa-exclamation-triangle',
            'info': 'fas fa-info-circle'
        };
        return icons[type] || icons.info;
    }

    async processQueue() {
        if (this.toastQueue.length === 0) {
            this.isProcessing = false;
            return;
        }

        this.isProcessing = true;
        const toast = this.toastQueue.shift();
        
        this.container.appendChild(toast);
        
        // Animar entrada
        await this.animateIn(toast);
        
        // Aguardar e remover
        setTimeout(async () => {
            await this.animateOut(toast);
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
            this.processQueue();
        }, 4000);
    }

    animateIn(toast) {
        return new Promise(resolve => {
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => {
                toast.style.transform = 'translateX(0)';
                resolve();
            }, 50);
        });
    }

    animateOut(toast) {
        return new Promise(resolve => {
            toast.style.transform = 'translateX(100%)';
            setTimeout(resolve, 300);
        });
    }
}

// Inicializar sistema quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar sistema de notificações
    window.notificationSystem = new NotificationSystem();
    
    // Inicializar sistema principal
    window.premiumSystem = new PremiumSystem();
    
    // Remover loading screen após 3 segundos
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 800);
        }
    }, 3000);

    // Efeitos adicionais
    setupParallaxEffects();
    setupRippleEffects();
});

// Efeitos de Parallax
function setupParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.stat-card, .action-card, .chart-card, .project-card, .team-member');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.1 + (index * 0.02);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Efeito Ripple nos botões
function setupRippleEffects() {
    document.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
            const button = e.target.tagName === 'BUTTON' ? e.target : e.target.closest('button');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        }
    });
}

// Adicionar CSS para animação ripple
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);
