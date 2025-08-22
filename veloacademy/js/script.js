document.addEventListener("DOMContentLoaded", () => {
    const coursesGrid = document.getElementById("courses-grid");
    const dashboardView = document.getElementById("dashboard-view");
    const courseView = document.getElementById("course-view");
    const themeToggle = document.getElementById("theme-toggle");
    const searchInput = document.getElementById("search-input");
    const categorySelect = document.getElementById("category-select");

    let courses = []; // Variável para armazenar os cursos carregados do JSON
    let currentView = 'dashboard'; // Controle de visualização atual
    let searchTimeout = null; // Para debounce da busca
    let analytics = {}; // Dados de analytics
    let userPreferences = {}; // Preferências do usuário

    // Sistema de Cache Inteligente
    const cache = {
        data: new Map(),
        maxAge: 5 * 60 * 1000, // 5 minutos
        
        set(key, value) {
            this.data.set(key, {
                value,
                timestamp: Date.now()
            });
        },
        
        get(key) {
            const item = this.data.get(key);
            if (!item) return null;
            
            if (Date.now() - item.timestamp > this.maxAge) {
                this.data.delete(key);
                return null;
            }
            
            return item.value;
        },
        
        clear() {
            this.data.clear();
        }
    };

    // Sistema de Notificações Profissional
    const notificationSystem = {
        show(message, type = 'info', duration = 5000) {
            const notification = document.createElement('div');
            notification.className = `notification notification-${type}`;
            notification.innerHTML = `
                <div class="notification-content">
                    <i class="bx ${this.getIcon(type)}"></i>
                    <span>${message}</span>
                    <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                        <i class="bx bx-x"></i>
                    </button>
                </div>
                <div class="notification-progress"></div>
            `;
            
            document.body.appendChild(notification);
            
            // Animação de entrada
            setTimeout(() => notification.classList.add('show'), 100);
            
            // Auto-remoção
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 300);
            }, duration);
            
            // Barra de progresso
            const progressBar = notification.querySelector('.notification-progress');
            progressBar.style.animation = `notificationProgress ${duration}ms linear`;
        },
        
        getIcon(type) {
            const icons = {
                success: 'bx-check-circle',
                error: 'bx-error-circle',
                warning: 'bx-warning',
                info: 'bx-info-circle'
            };
            return icons[type] || icons.info;
        }
    };

    // Sistema de Analytics
    function initializeAnalytics() {
        analytics = {
            pageViews: parseInt(localStorage.getItem('veloacademy_pageViews') || '0'),
            courseViews: parseInt(localStorage.getItem('veloacademy_courseViews') || '0'),
            searchQueries: parseInt(localStorage.getItem('veloacademy_searchQueries') || '0'),
            themeChanges: parseInt(localStorage.getItem('veloacademy_themeChanges') || '0'),
            lastVisit: localStorage.getItem('veloacademy_lastVisit') || new Date().toISOString()
        };
        
        // Incrementar visualizações de página
        analytics.pageViews++;
        localStorage.setItem('veloacademy_pageViews', analytics.pageViews.toString());
        localStorage.setItem('veloacademy_lastVisit', new Date().toISOString());
        
        // Atualizar estatísticas avançadas
        updateAdvancedStats();
    }

    function updateAdvancedStats() {
        const statsContainer = document.querySelector('.stats-section');
        if (statsContainer) {
            const advancedStats = document.createElement('div');
            advancedStats.className = 'advanced-stats';
            advancedStats.innerHTML = `
                <div class="stats-row">
                    <div class="stat-item">
                        <i class='bx bx-show'></i>
                        <span>${analytics.pageViews} visualizações</span>
                    </div>
                    <div class="stat-item">
                        <i class='bx bx-search'></i>
                        <span>${analytics.searchQueries} buscas</span>
                    </div>
                    <div class="stat-item">
                        <i class='bx bx-palette'></i>
                        <span>${analytics.themeChanges} mudanças de tema</span>
                    </div>
                </div>
            `;
            
            statsContainer.appendChild(advancedStats);
        }
    }

    // Função para carregar os dados dos cursos do arquivo JSON
    async function loadCourses() {
        try {
            // Verificar cache primeiro
            const cachedCourses = cache.get('courses');
            if (cachedCourses) {
                courses = cachedCourses;
                populateCategories();
                populateFilters();
                renderCourses();
                updateStats();
                initializeAnalytics();
                return;
            }

            const response = await fetch("./veloacademy/Data/cursos.json");
            courses = await response.json();
            
            // Salvar no cache
            cache.set('courses', courses);
            
            populateCategories();
            populateFilters();
            renderCourses();
            updateStats();
            initializeAnalytics();
            
            notificationSystem.show('Cursos carregados com sucesso!', 'success', 3000);
        } catch (error) {
            console.error("Erro ao carregar os cursos:", error);
            showErrorMessage("Erro ao carregar os cursos. Tente novamente.");
        }
    }

    // Função para popular o filtro de categorias
    function populateCategories() {
        const categories = [...new Set(courses.map(course => course.category))];
        categorySelect.innerHTML = '<option value="all">Todas as Categorias</option>';
        categories.forEach(category => {
            const option = document.createElement("option");
            option.value = category;
            option.textContent = category;
            categorySelect.appendChild(option);
        });
    }

    // Função para popular filtros avançados
    function populateFilters() {
        const filterContainer = document.querySelector('.category-filter');
        if (!filterContainer.querySelector('.advanced-filters')) {
            const advancedFilters = document.createElement('div');
            advancedFilters.className = 'advanced-filters';
            advancedFilters.innerHTML = `
                <div class="filter-row">
                    <select id="level-select">
                        <option value="all">Todos os Níveis</option>
                        <option value="Iniciante">Iniciante</option>
                        <option value="Intermediário">Intermediário</option>
                        <option value="Avançado">Avançado</option>
                    </select>
                    <select id="duration-select">
                        <option value="all">Qualquer Duração</option>
                        <option value="short">Até 8 horas</option>
                        <option value="medium">8-15 horas</option>
                        <option value="long">Mais de 15 horas</option>
                    </select>
                    <select id="rating-select">
                        <option value="all">Qualquer Avaliação</option>
                        <option value="4.5">4.5+ estrelas</option>
                        <option value="4.0">4.0+ estrelas</option>
                        <option value="3.5">3.5+ estrelas</option>
                    </select>
                </div>
                <div class="filter-actions">
                    <button id="clear-filters" class="btn-clear-filters">
                        <i class='bx bx-refresh'></i> Limpar Filtros
                    </button>
                    <button id="save-filters" class="btn-save-filters">
                        <i class='bx bx-save'></i> Salvar Filtros
                    </button>
                </div>
            `;
            filterContainer.appendChild(advancedFilters);

            // Event listeners para filtros avançados
            document.getElementById('level-select').addEventListener('change', filterCourses);
            document.getElementById('duration-select').addEventListener('change', filterCourses);
            document.getElementById('rating-select').addEventListener('change', filterCourses);
            
            // Event listeners para ações dos filtros
            document.getElementById('clear-filters').addEventListener('click', clearAllFilters);
            document.getElementById('save-filters').addEventListener('click', saveCurrentFilters);
        }
    }

    // Função para limpar todos os filtros
    function clearAllFilters() {
        searchInput.value = '';
        categorySelect.value = 'all';
        document.getElementById('level-select').value = 'all';
        document.getElementById('duration-select').value = 'all';
        document.getElementById('rating-select').value = 'all';
        
        filterCourses();
        notificationSystem.show('Filtros limpos com sucesso!', 'info', 2000);
    }

    // Função para salvar filtros atuais
    function saveCurrentFilters() {
        const currentFilters = {
            search: searchInput.value,
            category: categorySelect.value,
            level: document.getElementById('level-select').value,
            duration: document.getElementById('duration-select').value,
            rating: document.getElementById('rating-select').value
        };
        
        localStorage.setItem('veloacademy_savedFilters', JSON.stringify(currentFilters));
        notificationSystem.show('Filtros salvos com sucesso!', 'success', 2000);
    }

    // Função para carregar filtros salvos
    function loadSavedFilters() {
        const savedFilters = localStorage.getItem('veloacademy_savedFilters');
        if (savedFilters) {
            const filters = JSON.parse(savedFilters);
            searchInput.value = filters.search || '';
            categorySelect.value = filters.category || 'all';
            document.getElementById('level-select').value = filters.level || 'all';
            document.getElementById('duration-select').value = filters.duration || 'all';
            document.getElementById('rating-select').value = filters.rating || 'all';
            
            filterCourses();
        }
    }

    // Função para renderizar os cards de cursos
    function renderCourses(list = courses) {
        coursesGrid.innerHTML = ""; // Limpa o grid antes de renderizar
        if (!list.length) {
            const emptyState = document.createElement("div");
            emptyState.className = "empty-state";
            emptyState.innerHTML = `
                <i class='bx bx-search-alt'></i>
                <h3>Nenhum curso encontrado</h3>
                <p>Tente ajustar os filtros de busca</p>
                <button onclick="clearAllFilters()" class="btn-clear-search">
                    <i class='bx bx-refresh'></i> Limpar Busca
                </button>
            `;
            coursesGrid.appendChild(emptyState);
            return;
        }
        
        list.forEach(course => {
            const courseCard = document.createElement("div");
            courseCard.classList.add("course-card");
            courseCard.setAttribute("role", "article");
            
            const ratingStars = generateRatingStars(course.rating);
            const levelBadge = generateLevelBadge(course.level);
            const progressPercentage = calculateCourseProgress(course);
            
            courseCard.innerHTML = `
                <div class="course-header">
                    <h2>${course.title}</h2>
                    <div class="course-meta">
                        <span class="instructor">${course.instructor}</span>
                        <span class="enrolled">${course.enrolled} alunos</span>
                    </div>
                </div>
                <p class="course-description">${course.description}</p>
                <div class="course-info">
                    <div class="course-stats">
                        <span class="duration"><i class='bx bx-time'></i> ${course.duration}</span>
                        <span class="modules"><i class='bx bx-book-open'></i> ${course.modules.length} módulos</span>
                    </div>
                    <div class="course-rating">
                        ${ratingStars}
                        <span class="rating-text">${course.rating}</span>
                    </div>
                </div>
                <div class="course-progress-mini">
                    <div class="progress-info-mini">
                        <span>Progresso: ${progressPercentage}%</span>
                    </div>
                    <div class="progress-bar-mini">
                        <div class="progress-fill-mini" style="width: ${progressPercentage}%"></div>
                    </div>
                </div>
                <div class="course-footer">
                    ${levelBadge}
                    <button data-id="${course.id}" aria-label="Ver detalhes do curso ${course.title}">
                        Ver Detalhes
                    </button>
                </div>
            `;
            coursesGrid.appendChild(courseCard);
        });
    }

    // Função para calcular progresso do curso
    function calculateCourseProgress(course) {
        const completedModules = course.modules.filter(module => module.completed).length;
        const totalModules = course.modules.length;
        return totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;
    }

    // Função para gerar estrelas de avaliação
    function generateRatingStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        let starsHTML = '';
        
        for (let i = 0; i < fullStars; i++) {
            starsHTML += '<i class="bx bxs-star"></i>';
        }
        if (hasHalfStar) {
            starsHTML += '<i class="bx bxs-star-half"></i>';
        }
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        for (let i = 0; i < emptyStars; i++) {
            starsHTML += '<i class="bx bx-star"></i>';
        }
        
        return starsHTML;
    }

    // Função para gerar badge de nível
    function generateLevelBadge(level) {
        const colors = {
            'Iniciante': 'success',
            'Intermediário': 'warning',
            'Avançado': 'danger'
        };
        return `<span class="level-badge ${colors[level]}">${level}</span>`;
    }

    // Função para renderizar a página de detalhes do curso
    function renderCourseDetails(courseId) {
        const course = courses.find(c => c.id === courseId);
        if (course) {
            // Incrementar visualizações de curso
            analytics.courseViews++;
            localStorage.setItem('veloacademy_courseViews', analytics.courseViews.toString());
            
            const completedModules = course.modules.filter(module => module.completed).length;
            const totalModules = course.modules.length;
            const progress = totalModules > 0 ? ((completedModules / totalModules) * 100).toFixed(0) : 0;
            const totalDuration = course.modules.reduce((sum, module) => sum + parseInt(module.duration), 0);

            courseView.innerHTML = `
                <div class="course-header-detail">
                    <h1>${course.title}</h1>
                    <div class="course-meta-detail">
                        <span class="instructor"><i class='bx bx-user'></i> ${course.instructor}</span>
                        <span class="duration"><i class='bx bx-time'></i> ${course.duration}</span>
                        <span class="level"><i class='bx bx-target-lock'></i> ${course.level}</span>
                        <span class="enrolled"><i class='bx bx-group'></i> ${course.enrolled} alunos</span>
                    </div>
                    <div class="course-rating-detail">
                        ${generateRatingStars(course.rating)}
                        <span class="rating-text">${course.rating}/5.0</span>
                    </div>
                </div>
                
                <p class="course-description-detail">${course.description}</p>
                
                <div class="course-progress">
                    <h3>Seu Progresso</h3>
                    <div class="progress-info">
                        <span>${completedModules}/${totalModules} módulos concluídos</span>
                        <span>${progress}% completo</span>
                    </div>
                    <div class="progress-bar-container">
                        <div class="progress-bar" style="width: ${progress}%;"></div>
                    </div>
                    <div class="progress-stats">
                        <span>Tempo estimado restante: ${calculateRemainingTime(course)}</span>
                    </div>
                </div>
                
                <div class="modules-section">
                    <h3>Módulos do Curso</h3>
                    <div class="modules-grid">
                        ${course.modules.map((module, index) => `
                            <div class="module-card ${module.completed ? 'completed' : ''}">
                                <div class="module-header">
                                    <h4>${module.name}</h4>
                                    <span class="module-duration">${module.duration}</span>
                                </div>
                                <div class="module-actions">
                                    <a href="${module.link}" class="module-link">
                                        <i class='bx bx-play-circle'></i> Acessar
                                    </a>
                                    <label class="completion-checkbox">
                                        <input type="checkbox" 
                                               data-course-id="${course.id}" 
                                               data-module-index="${index}" 
                                               ${module.completed ? "checked" : ""}>
                                        <span class="checkmark"></span>
                                        Concluído
                                    </label>
                                </div>
                            </div>
                        `).join("")}
                    </div>
                </div>
                
                <div class="course-actions">
                    <button id="back-to-dashboard" class="btn-secondary">
                        <i class='bx bx-arrow-back'></i> Voltar para o Dashboard
                    </button>
                    <button class="btn-primary" onclick="shareCourse(${course.id})">
                        <i class='bx bx-share-alt'></i> Compartilhar Curso
                    </button>
                    <button class="btn-success" onclick="downloadCertificate(${course.id})">
                        <i class='bx bx-download'></i> Baixar Certificado
                    </button>
                </div>
            `;
            
            dashboardView.classList.remove("active");
            courseView.classList.add("active");
            currentView = 'course';
        }
    }

    // Função para calcular tempo restante
    function calculateRemainingTime(course) {
        const completedModules = course.modules.filter(module => module.completed);
        const remainingModules = course.modules.filter(module => !module.completed);
        
        if (remainingModules.length === 0) return 'Concluído!';
        
        const totalRemainingTime = remainingModules.reduce((sum, module) => sum + parseInt(module.duration), 0);
        const hours = Math.floor(totalRemainingTime / 60);
        const minutes = totalRemainingTime % 60;
        
        if (hours > 0) {
            return `${hours}h ${minutes}min`;
        }
        return `${minutes}min`;
    }

    // Função para atualizar estatísticas
    function updateStats() {
        const totalCourses = courses.length;
        const totalStudents = courses.reduce((sum, course) => sum + course.enrolled, 0);
        const avgRating = (courses.reduce((sum, course) => sum + course.rating, 0) / totalCourses).toFixed(1);
        
        // Adicionar estatísticas ao dashboard se não existirem
        if (!document.querySelector('.stats-section')) {
            const statsSection = document.createElement('div');
            statsSection.className = 'stats-section';
            statsSection.innerHTML = `
                <div class="stats-grid">
                    <div class="stat-card">
                        <i class='bx bx-book-open'></i>
                        <div class="stat-info">
                            <h3>${totalCourses}</h3>
                            <p>Cursos Disponíveis</p>
                        </div>
                    </div>
                    <div class="stat-card">
                        <i class='bx bx-group'></i>
                        <div class="stat-info">
                            <h3>${totalStudents.toLocaleString()}</h3>
                            <p>Alunos Matriculados</p>
                        </div>
                    </div>
                    <div class="stat-card">
                        <i class='bx bxs-star'></i>
                        <div class="stat-info">
                            <h3>${avgRating}</h3>
                            <p>Avaliação Média</p>
                        </div>
                    </div>
                    <div class="stat-card">
                        <i class='bx bx-trending-up'></i>
                        <div class="stat-info">
                            <h3>${calculateTotalProgress()}%</h3>
                            <p>Progresso Geral</p>
                        </div>
                    </div>
                </div>
            `;
            
            const dashboardTitle = document.querySelector('#dashboard-view h1');
            dashboardTitle.insertAdjacentElement('afterend', statsSection);
        }
    }

    // Função para calcular progresso geral
    function calculateTotalProgress() {
        let totalProgress = 0;
        let totalModules = 0;
        
        courses.forEach(course => {
            const completedModules = course.modules.filter(module => module.completed).length;
            totalProgress += completedModules;
            totalModules += course.modules.length;
        });
        
        return totalModules > 0 ? Math.round((totalProgress / totalModules) * 100) : 0;
    }

    // Função para mostrar mensagem de erro
    function showErrorMessage(message) {
        notificationSystem.show(message, 'error', 5000);
    }

    // Event Listener para os botões de "Ver Detalhes"
    coursesGrid.addEventListener("click", (event) => {
        if (event.target.tagName === "BUTTON") {
            const courseId = parseInt(event.target.dataset.id);
            renderCourseDetails(courseId);
        }
    });

    // Event Listener para o botão "Voltar para o Dashboard"
    courseView.addEventListener("click", (event) => {
        if (event.target.id === "back-to-dashboard" || event.target.closest('#back-to-dashboard')) {
            courseView.classList.remove("active");
            dashboardView.classList.add("active");
            currentView = 'dashboard';
        } else if (event.target.type === "checkbox") {
            const courseId = parseInt(event.target.dataset.courseId);
            const moduleIndex = parseInt(event.target.dataset.moduleIndex);
            const course = courses.find(c => c.id === courseId);
            if (course) {
                course.modules[moduleIndex].completed = event.target.checked;
                // Salvar o progresso no localStorage
                localStorage.setItem("courseProgress", JSON.stringify(courses.map(c => ({ 
                    id: c.id, 
                    modules: c.modules.map(m => ({ name: m.name, completed: m.completed })) 
                }))));
                
                // Mostrar notificação de progresso
                if (event.target.checked) {
                    notificationSystem.show('Módulo marcado como concluído!', 'success', 2000);
                }
                
                renderCourseDetails(courseId); // Re-renderiza para atualizar o progresso
            }
        }
    });

    // Função para alternar o tema e persistir a preferência
    function toggleTheme() {
        document.body.classList.toggle("dark-theme");
        const isDarkTheme = document.body.classList.contains("dark-theme");
        document.querySelector(".bx-sun").style.display = isDarkTheme ? "block" : "none";
        document.querySelector(".bx-moon").style.display = isDarkTheme ? "none" : "block";
        localStorage.setItem("theme", isDarkTheme ? "dark" : "light");
        
        // Incrementar contador de mudanças de tema
        analytics.themeChanges++;
        localStorage.setItem('veloacademy_themeChanges', analytics.themeChanges.toString());
        
        notificationSystem.show('Tema alterado com sucesso!', 'info', 2000);
    }

    // Aplica o tema salvo no localStorage ao carregar a página
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-theme");
        document.querySelector(".bx-sun").style.display = "block";
        document.querySelector(".bx-moon").style.display = "none";
    } else {
        document.body.classList.remove("dark-theme");
        document.querySelector(".bx-sun").style.display = "none";
        document.querySelector(".bx-moon").style.display = "block";
    }

    themeToggle.addEventListener("click", toggleTheme);

    // Funcionalidade de busca com debounce
    searchInput.addEventListener("keyup", (event) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            filterCourses();
            // Incrementar contador de buscas
            analytics.searchQueries++;
            localStorage.setItem('veloacademy_searchQueries', analytics.searchQueries.toString());
        }, 300);
    });

    // Funcionalidade de filtro por categoria
    categorySelect.addEventListener("change", () => {
        filterCourses();
    });

    function filterCourses() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categorySelect.value;
        const selectedLevel = document.getElementById('level-select')?.value || 'all';
        const selectedDuration = document.getElementById('duration-select')?.value || 'all';
        const selectedRating = document.getElementById('rating-select')?.value || 'all';

        let filteredCourses = courses.filter(course => {
            const matchesSearch = course.title.toLowerCase().includes(searchTerm) ||
                                course.description.toLowerCase().includes(searchTerm) ||
                                course.instructor.toLowerCase().includes(searchTerm);
            
            const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
            const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
            const matchesRating = selectedRating === 'all' || course.rating >= parseFloat(selectedRating);
            
            let matchesDuration = true;
            if (selectedDuration !== 'all') {
                const hours = parseInt(course.duration);
                if (selectedDuration === 'short') matchesDuration = hours <= 8;
                else if (selectedDuration === 'medium') matchesDuration = hours > 8 && hours <= 15;
                else if (selectedDuration === 'long') matchesDuration = hours > 15;
            }
            
            return matchesSearch && matchesCategory && matchesLevel && matchesDuration && matchesRating;
        });
        
        renderCourses(filteredCourses);
    }

    // Função para compartilhar curso
    window.shareCourse = function(courseId) {
        const course = courses.find(c => c.id === courseId);
        if (navigator.share && course) {
            navigator.share({
                title: course.title,
                text: course.description,
                url: window.location.href
            });
        } else {
            // Fallback para navegadores que não suportam Web Share API
            const url = window.location.href;
            navigator.clipboard.writeText(`${course.title}\n${course.description}\n${url}`);
            notificationSystem.show("Link do curso copiado para a área de transferência!", 'success', 3000);
        }
    };

    // Função para baixar certificado
    window.downloadCertificate = function(courseId) {
        const course = courses.find(c => c.id === courseId);
        const progress = calculateCourseProgress(course);
        
        if (progress === 100) {
            // Simular download do certificado
            notificationSystem.show('Certificado baixado com sucesso!', 'success', 3000);
        } else {
            notificationSystem.show('Complete o curso para baixar o certificado!', 'warning', 3000);
        }
    };

    // Carrega o progresso salvo no localStorage (se existir)
    const savedProgress = localStorage.getItem("courseProgress");
    if (savedProgress) {
        const progressData = JSON.parse(savedProgress);
        courses.forEach(course => {
            const savedCourse = progressData.find(c => c.id === course.id);
            if (savedCourse) {
                course.modules.forEach(module => {
                    const savedModule = savedCourse.modules.find(m => m.name === module.name);
                    if (savedModule) {
                        module.completed = savedModule.completed;
                    }
                });
            }
        });
    }

    // Carrega filtros salvos
    loadSavedFilters();

    // Carrega os cursos ao iniciar
    loadCourses();

    // Sistema de limpeza automática de cache
    setInterval(() => {
        cache.clear();
    }, 10 * 60 * 1000); // Limpar cache a cada 10 minutos

    // Inicializar todos os sistemas ULTIMATE
    document.addEventListener('DOMContentLoaded', function() {
        // Inicializar sistema de gamificação
        window.veloacademyGamification = new VeloAcademyGamification();
        
        // Inicializar sistema de IA
        window.veloacademyAI = new VeloAcademyAI();
        
        // Inicializar sistema de blockchain
        window.veloacademyBlockchain = new VeloAcademyBlockchain();
        
        // Inicializar sistema de certificados
        window.veloacademyCertificates = new VeloAcademyCertificates(window.veloacademyBlockchain);
        
        // Inicializar sistema de realidade aumentada
        window.veloacademyAR = new VeloAcademyAR();
        
        // Carregar cursos e inicializar sistema principal
        loadCourses();
        
        // Mostrar painel ULTIMATE
        showUltimatePanel();
    });

    // Função para mostrar painel ULTIMATE
    function showUltimatePanel() {
        const dashboard = document.querySelector('#dashboard-view');
        if (!dashboard) return;
        
        const ultimatePanel = document.createElement('div');
        ultimatePanel.className = 'ultimate-panel';
        ultimatePanel.innerHTML = `
            <div class="ultimate-header">
                <h2>🚀 VeloAcademy ULTIMATE</h2>
                <p>Sistema de treinamento mais avançado do mundo</p>
            </div>
            
            <div class="ultimate-features">
                <div class="feature-card gamification">
                    <i class='bx bx-trophy'></i>
                    <h3>Sistema de Gamificação</h3>
                    <p>Níveis, conquistas e recompensas</p>
                    <button onclick="showGamificationPanel()">Ver Detalhes</button>
                </div>
                
                <div class="feature-card ai">
                    <i class='bx bx-brain'></i>
                    <h3>IA Inteligente</h3>
                    <p>Recomendações personalizadas</p>
                    <button onclick="showAIPanel()">Ver Detalhes</button>
                </div>
                
                <div class="feature-card ar">
                    <i class='bx bx-cube'></i>
                    <h3>Realidade Aumentada</h3>
                    <p>Comandos de voz e gestos</p>
                    <button onclick="showARPanel()">Ver Detalhes</button>
                </div>
                
                <div class="feature-card blockchain">
                    <i class='bx bx-link'></i>
                    <h3>Blockchain</h3>
                    <p>Certificados imutáveis</p>
                    <button onclick="showBlockchainPanel()">Ver Detalhes</button>
                </div>
            </div>
            
            <div class="ultimate-stats">
                <div class="stat-item">
                    <span class="stat-value" id="total-xp">0</span>
                    <span class="stat-label">XP Total</span>
                </div>
                <div class="stat-item">
                    <span class="stat-value" id="total-achievements">0</span>
                    <span class="stat-label">Conquistas</span>
                </div>
                <div class="stat-item">
                    <span class="stat-value" id="total-certificates">0</span>
                    <span class="stat-label">Certificados</span>
                </div>
                <div class="stat-item">
                    <span class="stat-value" id="ar-commands">0</span>
                    <span class="stat-label">Comandos AR</span>
                </div>
            </div>
        `;
        
        dashboard.appendChild(ultimatePanel);
        
        // Atualizar estatísticas
        updateUltimateStats();
    }

    // Função para mostrar painel de gamificação
    function showGamificationPanel() {
        const modal = document.createElement('div');
        modal.className = 'feature-modal gamification-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>🏆 Sistema de Gamificação</h3>
                    <button class="modal-close">×</button>
                </div>
                <div class="modal-body">
                    <div class="user-profile">
                        <div class="level-circle">
                            <span class="level-number">${window.veloacademyGamification.user.level}</span>
                            <span class="level-label">Nível</span>
                        </div>
                        <div class="user-info">
                            <h4>${window.veloacademyGamification.user.rank}</h4>
                            <div class="xp-bar">
                                <div class="xp-fill" style="width: ${(window.veloacademyGamification.user.experience % 100)}%"></div>
                            </div>
                            <span>${window.veloacademyGamification.user.experience % 100}/100 XP</span>
                        </div>
                    </div>
                    
                    <div class="achievements-section">
                        <h4>Conquistas Desbloqueadas</h4>
                        <div class="achievements-grid">
                            ${window.veloacademyGamification.user.achievements.map(achievement => `
                                <div class="achievement-item unlocked">
                                    <i class="${achievement.icon}"></i>
                                    <span>${achievement.name}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="streak-section">
                        <h4>Sequência Diária</h4>
                        <div class="streak-display">
                            <span class="streak-number">${window.veloacademyGamification.user.streak}</span>
                            <span class="streak-label">dias</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
    }

    // Função para mostrar painel de IA
    function showAIPanel() {
        const modal = document.createElement('div');
        modal.className = 'feature-modal ai-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>🧠 Sistema de IA Inteligente</h3>
                    <button class="modal-close">×</button>
                </div>
                <div class="modal-body">
                    <div class="ai-profile">
                        <h4>Perfil de Aprendizado</h4>
                        <div class="profile-item">
                            <span>Estilo:</span>
                            <span>${window.veloacademyAI.userProfile.learningStyle}</span>
                        </div>
                        <div class="profile-item">
                            <span>Dificuldade:</span>
                            <span>${window.veloacademyAI.userProfile.difficultyPreference}</span>
                        </div>
                        <div class="profile-item">
                            <span>Duração:</span>
                            <span>${window.veloacademyAI.userProfile.preferredDuration}</span>
                        </div>
                        <div class="profile-item">
                            <span>Taxa de Conclusão:</span>
                            <span>${window.veloacademyAI.userProfile.completionRate.toFixed(1)}%</span>
                        </div>
                    </div>
                    
                    <div class="ai-recommendations">
                        <h4>Recomendações Atuais</h4>
                        <div class="recommendation-list">
                            ${window.veloacademyAI.generatePersonalizedRecommendations().nextCourse ? `
                                <div class="recommendation-item">
                                    <h5>🎯 Próximo Curso</h5>
                                    <p>${window.veloacademyAI.generatePersonalizedRecommendations().nextCourse.title}</p>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
    }

    // Função para mostrar painel de AR
    function showARPanel() {
        const modal = document.createElement('div');
        modal.className = 'feature-modal ar-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>🚀 Sistema de Realidade Aumentada</h3>
                    <button class="modal-close">×</button>
                </div>
                <div class="modal-body">
                    <div class="ar-status">
                        <h4>Status do Sistema</h4>
                        <div class="status-item">
                            <span>AR:</span>
                            <span class="status ${window.veloacademyAR.arEnabled ? 'active' : 'inactive'}">
                                ${window.veloacademyAR.arEnabled ? 'Ativo' : 'Inativo'}
                            </span>
                        </div>
                        <div class="status-item">
                            <span>Voz:</span>
                            <span class="status ${window.veloacademyAR.voiceActive ? 'active' : 'inactive'}">
                                ${window.veloacademyAR.voiceActive ? 'Ativa' : 'Inativa'}
                            </span>
                        </div>
                        <div class="status-item">
                            <span>Gestos:</span>
                            <span class="status active">Ativo</span>
                        </div>
                    </div>
                    
                    <div class="ar-commands">
                        <h4>Comandos Disponíveis</h4>
                        <div class="command-list">
                            <div class="command-item">
                                <span class="command">"Próximo"</span>
                                <span class="description">Ir para próximo curso</span>
                            </div>
                            <div class="command-item">
                                <span class="command">"Anterior"</span>
                                <span class="description">Voltar para curso anterior</span>
                            </div>
                            <div class="command-item">
                                <span class="command">"Dashboard"</span>
                                <span class="description">Ir para página inicial</span>
                            </div>
                            <div class="command-item">
                                <span class="command">"Tema escuro"</span>
                                <span class="description">Alternar para tema escuro</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
    }

    // Função para mostrar painel de blockchain
    function showBlockchainPanel() {
        const modal = document.createElement('div');
        modal.className = 'feature-modal blockchain-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>🔗 Sistema de Blockchain</h3>
                    <button class="modal-close">×</button>
                </div>
                <div class="modal-body">
                    <div class="blockchain-stats">
                        <h4>Estatísticas da Blockchain</h4>
                        <div class="stats-grid">
                            <div class="stat-item">
                                <span class="stat-value">${window.veloacademyBlockchain.chain.length}</span>
                                <span class="stat-label">Blocos</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-value">${window.veloacademyBlockchain.pendingCertificates.length}</span>
                                <span class="stat-label">Pendentes</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-value">${window.veloacademyBlockchain.wallets.size}</span>
                                <span class="stat-label">Carteiras</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="certificate-templates">
                        <h4>Templates de Certificados</h4>
                        <div class="template-list">
                            ${Object.entries(window.veloacademyCertificates.certificateTemplates).map(([key, template]) => `
                                <div class="template-item">
                                    <span class="template-name">${template.name}</span>
                                    <button onclick="testCertificateTemplate('${key}')">Testar</button>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="blockchain-actions">
                        <button onclick="generateTestCertificate()">Gerar Certificado de Teste</button>
                        <button onclick="showBlockchainExplorer()">Explorador de Blockchain</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
    }

    // Função para atualizar estatísticas ULTIMATE
    function updateUltimateStats() {
        if (window.veloacademyGamification) {
            document.getElementById('total-xp').textContent = window.veloacademyGamification.user.experience;
            document.getElementById('total-achievements').textContent = window.veloacademyGamification.user.achievements.length;
        }
        
        if (window.veloacademyBlockchain) {
            const stats = window.veloacademyBlockchain.getBlockchainStats();
            document.getElementById('total-certificates').textContent = stats.totalCertificates;
        }
        
        // Contador de comandos AR (simulado)
        const arCommands = parseInt(localStorage.getItem('veloacademy_arCommands') || '0');
        document.getElementById('ar-commands').textContent = arCommands;
    }

    // Função para testar template de certificado
    window.testCertificateTemplate = function(templateType) {
        const testData = {
            studentName: 'João Silva',
            courseName: 'JavaScript Avançado',
            courseId: 'JS001',
            grade: 95,
            instructor: 'Prof. Maria Santos',
            courseDuration: '20 horas',
            skills: 'ES6+, Async/Await, Promises',
            company: 'TechCorp',
            department: 'Desenvolvimento',
            role: 'Desenvolvedor Senior'
        };
        
        try {
            const certificate = window.veloacademyCertificates.generateCertificate(testData, templateType);
            
            // Mostrar certificado em modal
            const modal = document.createElement('div');
            modal.className = 'certificate-preview-modal';
            modal.innerHTML = `
                <div class="modal-content large">
                    <div class="modal-header">
                        <h3>Certificado Gerado - ${templateType.toUpperCase()}</h3>
                        <button class="modal-close">×</button>
                    </div>
                    <div class="modal-body">
                        <div class="certificate-preview">
                            ${certificate.html}
                        </div>
                        <div class="certificate-actions">
                            <button onclick="downloadCertificate(${JSON.stringify(certificate)}, 'html')">Baixar HTML</button>
                            <button onclick="downloadCertificate(${JSON.stringify(certificate)}, 'json')">Baixar JSON</button>
                            <button onclick="shareCertificate(${JSON.stringify(certificate)}, 'whatsapp')">Compartilhar WhatsApp</button>
                        </div>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
            
        } catch (error) {
            alert('Erro ao gerar certificado: ' + error.message);
        }
    };

    // Função para gerar certificado de teste
    window.generateTestCertificate = function() {
        const testData = {
            studentName: 'Ana Costa',
            courseName: 'Python para Data Science',
            courseId: 'PY001',
            grade: 88,
            instructor: 'Prof. Carlos Lima',
            courseDuration: '25 horas',
            skills: 'Pandas, NumPy, Matplotlib',
            company: 'DataCorp',
            department: 'Analytics',
            role: 'Analista de Dados'
        };
        
        try {
            const certificate = window.veloacademyCertificates.generateCertificate(testData, 'premium');
            alert('Certificado de teste gerado com sucesso! ID: ' + certificate.blockchain.id);
            
            // Atualizar estatísticas
            updateUltimateStats();
            
        } catch (error) {
            alert('Erro ao gerar certificado: ' + error.message);
        }
    };

    // Função para mostrar explorador de blockchain
    window.showBlockchainExplorer = function() {
        const modal = document.createElement('div');
        modal.className = 'blockchain-explorer-modal';
        modal.innerHTML = `
            <div class="modal-content large">
                <div class="modal-header">
                    <h3>🔍 Explorador de Blockchain</h3>
                    <button class="modal-close">×</button>
                </div>
                <div class="modal-body">
                    <div class="blockchain-chain">
                        ${window.veloacademyBlockchain.chain.map((block, index) => `
                            <div class="block-item">
                                <div class="block-header">
                                    <span class="block-number">Bloco #${block.index}</span>
                                    <span class="block-hash">${block.hash.substring(0, 8)}...</span>
                                </div>
                                <div class="block-details">
                                    <p><strong>Timestamp:</strong> ${new Date(block.timestamp).toLocaleString('pt-BR')}</p>
                                    <p><strong>Certificados:</strong> ${block.certificates.length}</p>
                                    <p><strong>Nonce:</strong> ${block.nonce}</p>
                                </div>
                                ${block.certificates.length > 0 ? `
                                    <div class="block-certificates">
                                        <h5>Certificados neste bloco:</h5>
                                        ${block.certificates.map(cert => `
                                            <div class="certificate-mini">
                                                <span>${cert.studentName} - ${cert.courseName}</span>
                                            </div>
                                        `).join('')}
                                    </div>
                                ` : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
    };

    // Integrar com sistema de gamificação existente
    function onModuleComplete(courseId, moduleIndex) {
        // Código existente...
        
        // Adicionar experiência para gamificação
        if (window.veloacademyGamification) {
            window.veloacademyGamification.onModuleComplete(courseId, moduleIndex);
        }
        
        // Registrar sessão de estudo para IA
        if (window.veloacademyAI) {
            window.veloacademyAI.onModuleComplete(courseId, moduleIndex);
        }
    }

    function onCourseComplete(courseId) {
        // Código existente...
        
        // Adicionar experiência para gamificação
        if (window.veloacademyGamification) {
            window.veloacademyGamification.onCourseComplete(courseId);
        }
        
        // Registrar conclusão para IA
        if (window.veloacademyAI) {
            window.veloacademyAI.onCourseComplete(courseId);
        }
        
        // Gerar certificado automaticamente
        if (window.veloacademyCertificates) {
            const course = window.veloacademyCourses.find(c => c.id === courseId);
            if (course) {
                const certificateData = {
                    studentName: 'Usuário Atual',
                    courseId: courseId,
                    courseName: course.title,
                    grade: 100,
                    instructor: course.instructor || 'VeloAcademy'
                };
                
                try {
                    const certificate = window.veloacademyCertificates.generateCertificate(certificateData, 'default');
                    showCertificateGenerated(certificate);
                } catch (error) {
                    console.error('Erro ao gerar certificado:', error);
                }
            }
        }
    }

    // Função para mostrar certificado gerado
    function showCertificateGenerated(certificate) {
        const modal = document.createElement('div');
        modal.className = 'certificate-generated-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header success">
                    <h3>🎉 Certificado Gerado!</h3>
                    <button class="modal-close">×</button>
                </div>
                <div class="modal-body">
                    <p>Parabéns! Você concluiu o curso e seu certificado foi gerado com sucesso.</p>
                    <div class="certificate-info">
                        <p><strong>Curso:</strong> ${certificate.data.courseName}</p>
                        <p><strong>ID do Certificado:</strong> ${certificate.blockchain.id}</p>
                        <p><strong>Hash da Blockchain:</strong> ${certificate.blockchain.hash}</p>
                    </div>
                    <div class="certificate-actions">
                        <button onclick="downloadCertificate(${JSON.stringify(certificate)}, 'html')" class="btn-primary">
                            Baixar Certificado
                        </button>
                        <button onclick="shareCertificate(${JSON.stringify(certificate)})" class="btn-secondary">
                            Compartilhar
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
    }

    // Atualizar função de download de certificado existente
    window.downloadCertificate = function(courseId) {
        // Verificar se é um curso completo
        const course = window.veloacademyCourses.find(c => c.id === courseId);
        if (!course) return;
        
        const progress = JSON.parse(localStorage.getItem('courseProgress') || '[]');
        const courseProgress = progress.find(p => p.courseId === courseId);
        
        if (courseProgress && courseProgress.modules.every(m => m.completed)) {
            // Gerar certificado
            const certificateData = {
                studentName: 'Usuário Atual',
                courseId: courseId,
                courseName: course.title,
                grade: 100,
                instructor: course.instructor || 'VeloAcademy'
            };
            
            try {
                const certificate = window.veloacademyCertificates.generateCertificate(certificateData, 'default');
                window.veloacademyCertificates.downloadCertificate(certificate, 'html');
            } catch (error) {
                alert('Erro ao gerar certificado: ' + error.message);
            }
        } else {
            alert('Você precisa completar todos os módulos para receber o certificado!');
        }
    };
});