/**
 * VELONET - Sistema Principal
 * Plataforma de Treinamentos Corporativos com VeloAcademy
 */

class VeloNet {
    constructor() {
        this.currentSection = 'dashboard';
        this.user = {
            id: 1,
            name: 'João Silva',
            email: 'joao.silva@empresa.com',
            role: 'Motorista',
            department: 'Logística',
            level: 8,
            points: 2450,
            nextLevelPoints: 3000,
            completedCourses: 12,
            studyHours: 48,
            certificates: 8
        };
        
        this.notifications = [];
        this.init();
    }

    init() {
        console.log('🚀 Inicializando VeloNet...');
        this.setupEventListeners();
        this.loadUserData();
        this.setupNavigation();
        this.hideLoadingScreen();
        this.animateElements();
        console.log('✅ VeloNet inicializado com sucesso!');
    }

    setupEventListeners() {
        // Notifications
        const notificationsBtn = document.getElementById('notificationsBtn');
        if (notificationsBtn) {
            notificationsBtn.addEventListener('click', () => this.toggleNotifications());
        }

        // User Menu
        const userMenuBtn = document.getElementById('userMenuBtn');
        if (userMenuBtn) {
            userMenuBtn.addEventListener('click', () => this.toggleUserMenu());
        }

        // Close modals when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('#notificationsPanel') && !e.target.closest('#notificationsBtn')) {
                this.hideNotifications();
            }
            if (!e.target.closest('#userMenuDropdown') && !e.target.closest('#userMenuBtn')) {
                this.hideUserMenu();
            }
        });

        // Smooth scrolling for navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Filter buttons
        this.setupFilterButtons();
    }

    setupFilterButtons() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');
                
                // Get filter value
                const filter = button.id.replace('filter', '').toLowerCase();
                this.filterCourses(filter);
            });
        });
    }

    filterCourses(category) {
        const coursesGrid = document.getElementById('coursesGrid');
        if (!coursesGrid) return;

        // Show loading state
        coursesGrid.innerHTML = '<div class="col-span-full text-center py-12"><div class="loading-spinner"></div><p class="text-velo-300 mt-4">Filtrando cursos...</p></div>';

        // Simulate API call delay
        setTimeout(() => {
            if (category === 'all' || category === '') {
                this.loadAllCourses();
            } else {
                this.loadCoursesByCategory(category);
            }
        }, 500);
    }

    loadAllCourses() {
        const coursesGrid = document.getElementById('coursesGrid');
        if (!coursesGrid) return;

        // Load all courses from VeloAcademy
        if (window.veloAcademy && window.veloAcademy.loadAllCourses) {
            window.veloAcademy.loadAllCourses();
        }
    }

    loadCoursesByCategory(category) {
        const coursesGrid = document.getElementById('coursesGrid');
        if (!coursesGrid) return;

        // Load courses by category from VeloAcademy
        if (window.veloAcademy && window.veloAcademy.loadCoursesByCategory) {
            window.veloAcademy.loadCoursesByCategory(category);
        }
    }

    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Remove active class from all links
                navLinks.forEach(l => l.classList.remove('active'));
                
                // Add active class to clicked link
                link.classList.add('active');
                
                // Update current section
                const href = link.getAttribute('href');
                this.currentSection = href.replace('#', '');
                
                // Scroll to section
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    toggleNotifications() {
        const panel = document.getElementById('notificationsPanel');
        if (panel) {
            if (panel.classList.contains('hidden')) {
                this.showNotifications();
            } else {
                this.hideNotifications();
            }
        }
    }

    showNotifications() {
        const panel = document.getElementById('notificationsPanel');
        if (panel) {
            panel.classList.remove('hidden');
            panel.classList.add('animate-fade-in-up');
        }
    }

    hideNotifications() {
        const panel = document.getElementById('notificationsPanel');
        if (panel) {
            panel.classList.add('hidden');
            panel.classList.remove('animate-fade-in-up');
        }
    }

    toggleUserMenu() {
        const dropdown = document.getElementById('userMenuDropdown');
        if (dropdown) {
            if (dropdown.classList.contains('hidden')) {
                this.showUserMenu();
            } else {
                this.hideUserMenu();
            }
        }
    }

    showUserMenu() {
        const dropdown = document.getElementById('userMenuDropdown');
        if (dropdown) {
            dropdown.classList.remove('hidden');
            dropdown.classList.add('animate-scale-in');
        }
    }

    hideUserMenu() {
        const dropdown = document.getElementById('userMenuDropdown');
        if (dropdown) {
            dropdown.classList.add('hidden');
            dropdown.classList.remove('animate-scale-in');
        }
    }

    loadUserData() {
        // Load user data from localStorage or API
        const savedUser = localStorage.getItem('veloNetUser');
        if (savedUser) {
            try {
                this.user = { ...this.user, ...JSON.parse(savedUser) };
            } catch (e) {
                console.log('Erro ao carregar dados do usuário:', e);
            }
        }

        // Update UI with user data
        this.updateUserInterface();
    }

    updateUserInterface() {
        // Update user name in header
        const userNameElements = document.querySelectorAll('[data-user-name]');
        userNameElements.forEach(element => {
            element.textContent = this.user.name;
        });

        // Update stats
        this.updateStats();
    }

    updateStats() {
        // Update completed courses
        const completedCoursesElement = document.querySelector('[data-stat="completed-courses"]');
        if (completedCoursesElement) {
            completedCoursesElement.textContent = this.user.completedCourses;
        }

        // Update study hours
        const studyHoursElement = document.querySelector('[data-stat="study-hours"]');
        if (studyHoursElement) {
            studyHoursElement.textContent = this.user.studyHours;
        }

        // Update certificates
        const certificatesElement = document.querySelector('[data-stat="certificates"]');
        if (certificatesElement) {
            certificatesElement.textContent = this.user.certificates;
        }

        // Update points
        const pointsElement = document.querySelector('[data-stat="points"]');
        if (pointsElement) {
            pointsElement.textContent = this.user.points.toLocaleString();
        }

        // Update level progress
        this.updateLevelProgress();
    }

    updateLevelProgress() {
        const progressPercentage = (this.user.points / this.user.nextLevelPoints) * 100;
        const progressBar = document.querySelector('[data-level-progress]');
        if (progressBar) {
            progressBar.style.width = `${Math.min(progressPercentage, 100)}%`;
        }

        const levelText = document.querySelector('[data-level-text]');
        if (levelText) {
            levelText.textContent = `Nível ${this.user.level}`;
        }

        const nextLevelText = document.querySelector('[data-next-level]');
        if (nextLevelText) {
            nextLevelText.textContent = `${this.user.points} / ${this.user.nextLevelPoints}`;
        }
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                loadingScreen.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    loadingScreen.remove();
                }, 300);
            }, 1000);
        }
    }

    animateElements() {
        // Animate stats cards
        const statCards = document.querySelectorAll('.stat-card');
        statCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('animate-fade-in-up');
            }, index * 100);
        });

        // Animate glass cards
        const glassCards = document.querySelectorAll('.glass-card');
        glassCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('animate-slide-in-left');
            }, (index + 4) * 100);
        });
    }

    // Notification system
    addNotification(message, type = 'info', duration = 5000) {
        const notification = {
            id: Date.now(),
            message,
            type,
            timestamp: new Date()
        };

        this.notifications.unshift(notification);
        this.showToastNotification(notification);
        this.updateNotificationsPanel();

        // Auto remove after duration
        setTimeout(() => {
            this.removeNotification(notification.id);
        }, duration);
    }

    removeNotification(id) {
        this.notifications = this.notifications.filter(n => n.id !== id);
        this.updateNotificationsPanel();
    }

    showToastNotification(notification) {
        const toast = document.createElement('div');
        toast.className = `fixed top-4 right-4 p-4 rounded-lg text-white z-50 transition-all duration-300 ${
            notification.type === 'success' ? 'bg-green-600' : 
            notification.type === 'error' ? 'bg-red-600' : 
            notification.type === 'warning' ? 'bg-yellow-600' : 
            'bg-blue-600'
        }`;
        
        toast.innerHTML = `
            <div class="flex items-center gap-2">
                <i class="fas fa-${this.getNotificationIcon(notification.type)}"></i>
                <span>${notification.message}</span>
                <button onclick="this.parentElement.parentElement.remove()" class="ml-2 hover:opacity-75">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        document.body.appendChild(toast);
        
        // Animate in
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
            toast.style.opacity = '1';
        }, 100);
        
        // Auto remove
        setTimeout(() => {
            toast.style.transform = 'translateX(100%)';
            toast.style.opacity = '0';
            setTimeout(() => {
                if (toast.parentElement) {
                    toast.remove();
                }
            }, 300);
        }, notification.duration || 5000);
    }

    getNotificationIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }

    updateNotificationsPanel() {
        const panel = document.getElementById('notificationsPanel');
        if (!panel) return;

        const content = panel.querySelector('.p-4:last-child');
        if (!content) return;

        if (this.notifications.length === 0) {
            content.innerHTML = '<p class="text-velo-300 text-center py-8">Nenhuma notificação</p>';
            return;
        }

        content.innerHTML = this.notifications.map(notification => `
            <div class="flex items-start space-x-3">
                <div class="w-8 h-8 bg-gradient-to-r from-${this.getNotificationColor(notification.type)} rounded-full flex items-center justify-center flex-shrink-0">
                    <i class="fas fa-${this.getNotificationIcon(notification.type)} text-white text-sm"></i>
                </div>
                <div class="flex-1">
                    <p class="text-white text-sm font-medium">${notification.message}</p>
                    <p class="text-velo-400 text-xs">${this.formatTimestamp(notification.timestamp)}</p>
                </div>
                <button onclick="veloNet.removeNotification(${notification.id})" class="text-velo-300 hover:text-white transition-colors">
                    <i class="fas fa-times text-sm"></i>
                </button>
            </div>
        `).join('');
    }

    getNotificationColor(type) {
        const colors = {
            success: 'green-500 to-emerald-600',
            error: 'red-500 to-pink-600',
            warning: 'yellow-500 to-orange-600',
            info: 'blue-500 to-velo-600'
        };
        return colors[type] || 'blue-500 to-velo-600';
    }

    formatTimestamp(timestamp) {
        const now = new Date();
        const diff = now - timestamp;
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 1) return 'Agora mesmo';
        if (minutes < 60) return `Há ${minutes} min`;
        if (hours < 24) return `Há ${hours} h`;
        if (days < 7) return `Há ${days} dias`;
        return timestamp.toLocaleDateString('pt-BR');
    }

    // User management
    updateUserProfile(updates) {
        this.user = { ...this.user, ...updates };
        localStorage.setItem('veloNetUser', JSON.stringify(this.user));
        this.updateUserInterface();
        this.addNotification('Perfil atualizado com sucesso!', 'success');
    }

    // Course management
    startCourse(courseId) {
        // This will be handled by VeloAcademy
        if (window.veloAcademy && window.veloAcademy.startCourse) {
            window.veloAcademy.startCourse(courseId);
        }
    }

    // Certificate management
    generateCertificate(courseId) {
        // This will be handled by VeloAcademy
        if (window.veloAcademy && window.veloAcademy.generateCertificate) {
            window.veloAcademy.generateCertificate(courseId);
        }
    }

    // Analytics and reporting
    generateReport(type, period) {
        console.log(`Gerando relatório: ${type} para o período: ${period}`);
        // Implementation will be added here
    }

    // Export functionality
    exportData(type) {
        console.log(`Exportando dados: ${type}`);
        // Implementation will be added here
    }

    // Search functionality
    search(query) {
        console.log(`Pesquisando: ${query}`);
        // Implementation will be added here
    }

    // Theme management
    toggleTheme() {
        const body = document.body;
        if (body.classList.contains('dark')) {
            body.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
    }

    // Offline support
    setupOfflineSupport() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('Service Worker registrado:', registration);
                })
                .catch(error => {
                    console.log('Erro ao registrar Service Worker:', error);
                });
        }
    }

    // Performance monitoring
    monitorPerformance() {
        if ('performance' in window) {
            window.addEventListener('load', () => {
                const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
                console.log(`Tempo de carregamento: ${loadTime}ms`);
                
                if (loadTime > 3000) {
                    this.addNotification('Página carregou lentamente. Verifique sua conexão.', 'warning');
                }
            });
        }
    }
}

// Initialize VeloNet when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.veloNet = new VeloNet();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VeloNet;
}
