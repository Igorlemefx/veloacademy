/**
 * VELONET & VELOACADEMY - Aplicação Principal
 * Arquivo de inicialização e integração dos sistemas
 */

class VeloNetApp {
    constructor() {
        this.isInitialized = false;
        this.modules = {};
        this.init();
    }

    init() {
        console.log('🚀 Inicializando VeloNet & VeloAcademy...');
        
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        try {
            // Initialize core modules
            this.initializeModules();
            
            // Setup global event listeners
            this.setupGlobalEvents();
            
            // Setup performance monitoring
            this.setupPerformanceMonitoring();
            
            // Setup offline support
            this.setupOfflineSupport();
            
            // Setup analytics
            this.setupAnalytics();
            
            // Mark as initialized
            this.isInitialized = true;
            
            console.log('✅ VeloNet & VeloAcademy inicializados com sucesso!');
            
            // Show welcome message
            this.showWelcomeMessage();
            
        } catch (error) {
            console.error('❌ Erro durante inicialização:', error);
            this.showErrorMessage(error);
        }
    }

    initializeModules() {
        // Check if VeloNet is available
        if (typeof VeloNet !== 'undefined') {
            this.modules.veloNet = new VeloNet();
        } else {
            console.warn('⚠️ VeloNet não encontrado');
        }

        // Check if VeloAcademy is available
        if (typeof VeloAcademy !== 'undefined') {
            this.modules.veloAcademy = new VeloAcademy();
        } else {
            console.warn('⚠️ VeloAcademy não encontrado');
        }

        // Initialize additional features
        this.initializeAdditionalFeatures();
    }

    initializeAdditionalFeatures() {
        // Initialize charts and visualizations
        this.initializeCharts();
        
        // Initialize search functionality
        this.initializeSearch();
        
        // Initialize keyboard shortcuts
        this.initializeKeyboardShortcuts();
        
        // Initialize accessibility features
        this.initializeAccessibility();
    }

    initializeCharts() {
        // Progress Chart
        const progressChart = document.getElementById('progressChart');
        if (progressChart) {
            this.createProgressChart(progressChart);
        }

        // Skills Radar
        const skillsRadar = document.getElementById('skillsRadar');
        if (skillsRadar) {
            this.createSkillsRadar(skillsRadar);
        }
    }

    createProgressChart(container) {
        // Simple progress chart using CSS
        const chartHTML = `
            <div class="space-y-4">
                <div class="flex justify-between items-center">
                    <span class="text-velo-300 text-sm">Janeiro</span>
                    <span class="text-white font-medium">85%</span>
                </div>
                <div class="w-full bg-slate-700 rounded-full h-3">
                    <div class="bg-gradient-to-r from-velo-500 to-green-500 h-3 rounded-full transition-all duration-1000" style="width: 85%"></div>
                </div>
                
                <div class="flex justify-between items-center">
                    <span class="text-velo-300 text-sm">Fevereiro</span>
                    <span class="text-white font-medium">92%</span>
                </div>
                <div class="w-full bg-slate-700 rounded-full h-3">
                    <div class="bg-gradient-to-r from-velo-500 to-green-500 h-3 rounded-full transition-all duration-1000" style="width: 92%"></div>
                </div>
                
                <div class="flex justify-between items-center">
                    <span class="text-velo-300 text-sm">Março</span>
                    <span class="text-white font-medium">78%</span>
                </div>
                <div class="w-full bg-slate-700 rounded-full h-3">
                    <div class="bg-gradient-to-r from-velo-500 to-green-500 h-3 rounded-full transition-all duration-1000" style="width: 78%"></div>
                </div>
            </div>
        `;
        
        container.innerHTML = chartHTML;
    }

    createSkillsRadar(container) {
        // Simple skills visualization
        const skillsHTML = `
            <div class="grid grid-cols-2 gap-4">
                <div class="text-center">
                    <div class="w-16 h-16 bg-gradient-to-r from-velo-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span class="text-white font-bold">85%</span>
                    </div>
                    <p class="text-white text-sm font-medium">Segurança</p>
                </div>
                
                <div class="text-center">
                    <div class="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span class="text-white font-bold">92%</span>
                    </div>
                    <p class="text-white text-sm font-medium">Gestão</p>
                </div>
                
                <div class="text-center">
                    <div class="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span class="text-white font-bold">78%</span>
                    </div>
                    <p class="text-white text-sm font-medium">Atendimento</p>
                </div>
                
                <div class="text-center">
                    <div class="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span class="text-white font-bold">88%</span>
                    </div>
                    <p class="text-white text-sm font-medium">Técnica</p>
                </div>
            </div>
        `;
        
        container.innerHTML = skillsHTML;
    }

    initializeSearch() {
        // Add search functionality to the page
        const searchHTML = `
            <div class="relative max-w-md mx-auto mb-8">
                <div class="relative">
                    <input type="text" id="searchInput" placeholder="Pesquisar cursos..." 
                           class="w-full bg-white/10 border border-white/20 text-white placeholder-velo-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-velo-500 focus:bg-white/15 transition-all duration-300">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <i class="fas fa-search text-velo-300"></i>
                    </div>
                </div>
                <div id="searchResults" class="absolute w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg mt-2 shadow-xl z-50 hidden">
                    <!-- Search results will appear here -->
                </div>
            </div>
        `;

        // Insert search bar after the courses section title
        const coursesSection = document.querySelector('#cursos .mb-8');
        if (coursesSection) {
            coursesSection.insertAdjacentHTML('afterend', searchHTML);
            this.setupSearchFunctionality();
        }
    }

    setupSearchFunctionality() {
        const searchInput = document.getElementById('searchInput');
        const searchResults = document.getElementById('searchResults');
        
        if (!searchInput || !searchResults) return;

        let searchTimeout;

        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            const query = e.target.value.trim();
            
            if (query.length < 2) {
                searchResults.classList.add('hidden');
                return;
            }

            searchTimeout = setTimeout(() => {
                this.performSearch(query, searchResults);
            }, 300);
        });

        // Hide search results when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('#searchInput') && !e.target.closest('#searchResults')) {
                searchResults.classList.add('hidden');
            }
        });
    }

    performSearch(query, resultsContainer) {
        if (!window.veloAcademy) return;

        const allCourses = [];
        Object.values(window.veloAcademy.courses).forEach(category => {
            allCourses.push(...category);
        });

        const filteredCourses = allCourses.filter(course => 
            course.title.toLowerCase().includes(query.toLowerCase()) ||
            course.description.toLowerCase().includes(query.toLowerCase()) ||
            course.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
        );

        if (filteredCourses.length === 0) {
            resultsContainer.innerHTML = `
                <div class="p-4 text-center">
                    <p class="text-velo-300">Nenhum curso encontrado</p>
                </div>
            `;
        } else {
            resultsContainer.innerHTML = filteredCourses.map(course => `
                <div class="p-3 hover:bg-white/10 cursor-pointer transition-colors" onclick="veloAcademy.openCourse('${course.id}')">
                    <div class="flex items-center space-x-3">
                        <span class="text-2xl">${course.thumbnail}</span>
                        <div>
                            <p class="text-white font-medium">${course.title}</p>
                            <p class="text-velo-300 text-sm">${course.category}</p>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        resultsContainer.classList.remove('hidden');
    }

    initializeKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + K for search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                const searchInput = document.getElementById('searchInput');
                if (searchInput) {
                    searchInput.focus();
                }
            }

            // Ctrl/Cmd + / for help
            if ((e.ctrlKey || e.metaKey) && e.key === '/') {
                e.preventDefault();
                this.showHelp();
            }

            // Escape to close modals
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });
    }

    initializeAccessibility() {
        // Add skip to main content link
        const skipLink = document.createElement('a');
        skipLink.href = '#main';
        skipLink.textContent = 'Pular para o conteúdo principal';
        skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-velo-600 text-white px-4 py-2 rounded-lg z-50';
        document.body.insertBefore(skipLink, document.body.firstChild);

        // Add main content id
        const main = document.querySelector('main');
        if (main) {
            main.id = 'main';
        }

        // Add ARIA labels
        this.addAriaLabels();
    }

    addAriaLabels() {
        // Add ARIA labels to interactive elements
        const buttons = document.querySelectorAll('button:not([aria-label])');
        buttons.forEach(button => {
            if (button.textContent.trim()) {
                button.setAttribute('aria-label', button.textContent.trim());
            }
        });

        // Add ARIA labels to navigation
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach((link, index) => {
            link.setAttribute('aria-label', `Navegação ${index + 1}: ${link.textContent}`);
        });
    }

    setupGlobalEvents() {
        // Handle form submissions
        document.addEventListener('submit', (e) => {
            if (e.target.matches('form')) {
                e.preventDefault();
                this.handleFormSubmission(e.target);
            }
        });

        // Handle profile updates
        this.setupProfileForm();
        
        // Handle smooth scrolling
        this.setupSmoothScrolling();
        
        // Handle responsive navigation
        this.setupResponsiveNavigation();
    }

    setupProfileForm() {
        const profileForm = document.querySelector('#perfil form');
        if (profileForm) {
            profileForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.updateProfile(profileForm);
            });
        }
    }

    updateProfile(form) {
        const formData = new FormData(form);
        const updates = {};
        
        for (const [key, value] of formData.entries()) {
            updates[key] = value;
        }

        if (window.veloNet && window.veloNet.updateUserProfile) {
            window.veloNet.updateUserProfile(updates);
        }

        // Show success message
        this.showSuccessMessage('Perfil atualizado com sucesso!');
    }

    setupSmoothScrolling() {
        // Smooth scroll for anchor links
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
    }

    setupResponsiveNavigation() {
        // Add mobile menu toggle for small screens
        const header = document.querySelector('header');
        if (header) {
            const mobileMenuButton = document.createElement('button');
            mobileMenuButton.className = 'md:hidden p-2 text-velo-300 hover:text-white transition-colors';
            mobileMenuButton.innerHTML = '<i class="fas fa-bars text-xl"></i>';
            mobileMenuButton.setAttribute('aria-label', 'Abrir menu de navegação');
            
            mobileMenuButton.addEventListener('click', () => this.toggleMobileMenu());
            
            // Insert before the user menu
            const userMenu = header.querySelector('.flex.items-center.space-x-4');
            if (userMenu) {
                userMenu.insertBefore(mobileMenuButton, userMenu.firstChild);
            }
        }
    }

    toggleMobileMenu() {
        const nav = document.querySelector('nav');
        if (nav) {
            nav.classList.toggle('hidden');
            nav.classList.toggle('flex');
        }
    }

    setupPerformanceMonitoring() {
        if ('performance' in window) {
            window.addEventListener('load', () => {
                const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
                console.log(`📊 Tempo de carregamento: ${loadTime}ms`);
                
                if (loadTime > 3000) {
                    console.warn('⚠️ Página carregou lentamente');
                }
            });
        }
    }

    setupOfflineSupport() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('🔧 Service Worker registrado:', registration);
                })
                .catch(error => {
                    console.log('❌ Erro ao registrar Service Worker:', error);
                });
        }
    }

    setupAnalytics() {
        // Simple analytics tracking
        this.trackPageView();
        this.trackUserEngagement();
    }

    trackPageView() {
        console.log('📈 Página visualizada:', window.location.pathname);
    }

    trackUserEngagement() {
        // Track time spent on page
        let startTime = Date.now();
        
        window.addEventListener('beforeunload', () => {
            const timeSpent = Date.now() - startTime;
            console.log('📈 Tempo na página:', Math.round(timeSpent / 1000), 'segundos');
        });
    }

    showWelcomeMessage() {
        if (window.veloNet && window.veloNet.addNotification) {
            setTimeout(() => {
                window.veloNet.addNotification('Bem-vindo ao VeloNet & VeloAcademy! 🎉', 'success', 8000);
            }, 2000);
        }
    }

    showSuccessMessage(message) {
        if (window.veloNet && window.veloNet.addNotification) {
            window.veloNet.addNotification(message, 'success');
        }
    }

    showErrorMessage(error) {
        if (window.veloNet && window.veloNet.addNotification) {
            window.veloNet.addNotification(`Erro: ${error.message}`, 'error');
        }
    }

    showHelp() {
        const helpContent = `
            <div class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                <div class="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden">
                    <div class="p-6">
                        <div class="flex justify-between items-start mb-6">
                            <h3 class="text-2xl font-bold text-white">Atalhos do Teclado</h3>
                            <button onclick="this.closest('.fixed').remove()" class="text-velo-300 hover:text-white transition-colors">
                                <i class="fas fa-times text-xl"></i>
                            </button>
                        </div>
                        
                        <div class="space-y-4 text-white">
                            <div class="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                                <span><kbd class="px-2 py-1 bg-white/20 rounded text-sm">Ctrl</kbd> + <kbd class="px-2 py-1 bg-white/20 rounded text-sm">K</kbd></span>
                                <span>Pesquisar cursos</span>
                            </div>
                            <div class="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                                <span><kbd class="px-2 py-1 bg-white/20 rounded text-sm">Ctrl</kbd> + <kbd class="px-2 py-1 bg-white/20 rounded text-sm">/</kbd></span>
                                <span>Mostrar ajuda</span>
                            </div>
                            <div class="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                                <span><kbd class="px-2 py-1 bg-white/20 rounded text-sm">Esc</kbd></span>
                                <span>Fechar modais</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', helpContent);
    }

    closeAllModals() {
        // Close course modal
        if (window.veloAcademy) {
            window.veloAcademy.closeCourseModal();
        }
        
        // Close notifications
        if (window.veloNet) {
            window.veloNet.hideNotifications();
            window.veloNet.hideUserMenu();
        }
    }

    handleFormSubmission(form) {
        const formData = new FormData(form);
        const data = {};
        
        for (const [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        console.log('📝 Formulário enviado:', data);
        
        // Show success message
        this.showSuccessMessage('Formulário enviado com sucesso!');
    }

    // Public API methods
    getModule(name) {
        return this.modules[name];
    }

    isReady() {
        return this.isInitialized;
    }

    reload() {
        window.location.reload();
    }

    // Error handling
    handleError(error, context = '') {
        console.error(`❌ Erro em ${context}:`, error);
        
        if (window.veloNet && window.veloNet.addNotification) {
            window.veloNet.addNotification(`Erro: ${error.message}`, 'error');
        }
    }
}

// Initialize the application
let veloNetApp;

document.addEventListener('DOMContentLoaded', () => {
    veloNetApp = new VeloNetApp();
});

// Make it globally available
window.veloNetApp = veloNetApp;

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VeloNetApp;
}
