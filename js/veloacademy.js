/**
 * VELOACADEMY - Sistema de Treinamentos
 * Plataforma completa de cursos corporativos com gamificação
 */

class VeloAcademy {
    constructor() {
        this.courses = this.initializeCourses();
        this.currentUser = null;
        this.userProgress = {};
        this.certificates = [];
        this.achievements = [];
        this.init();
    }

    init() {
        console.log('🎓 Inicializando VeloAcademy...');
        this.loadUserProgress();
        this.loadCertificates();
        this.loadAchievements();
        this.setupEventListeners();
        this.renderCourses();
        this.renderCertificates();
        console.log('✅ VeloAcademy inicializado com sucesso!');
    }

    initializeCourses() {
        return {
            seguranca: [
                {
                    id: 'seg-001',
                    title: 'Segurança no Transporte',
                    description: 'Curso completo sobre segurança no transporte de cargas',
                    duration: '2h',
                    level: 'Básico',
                    type: 'video',
                    thumbnail: '🚛',
                    category: 'seguranca',
                    tags: ['transporte', 'segurança', 'cargas'],
                    points: 100,
                    resources: [
                        { type: 'video', url: 'videos/seguranca-transporte.mp4', title: 'Vídeo Principal', duration: '2:00:00' },
                        { type: 'document', url: 'docs/checklist-seguranca.pdf', title: 'Checklist de Segurança' },
                        { type: 'quiz', url: 'quizzes/seguranca-transporte.json', title: 'Avaliação Final', questions: 20 }
                    ],
                    modules: [
                        { id: 1, title: 'Introdução à Segurança', duration: '15min', completed: false },
                        { id: 2, title: 'Normas de Segurança', duration: '25min', completed: false },
                        { id: 3, title: 'Prevenção de Acidentes', duration: '30min', completed: false },
                        { id: 4, title: 'Primeiros Socorros', duration: '20min', completed: false },
                        { id: 5, title: 'Avaliação Final', duration: '30min', completed: false }
                    ]
                },
                {
                    id: 'seg-002',
                    title: 'Prevenção de Acidentes',
                    description: 'Módulo interativo sobre prevenção de acidentes no trabalho',
                    duration: '1.5h',
                    level: 'Intermediário',
                    type: 'interactive',
                    thumbnail: '⚠️',
                    category: 'seguranca',
                    tags: ['prevenção', 'acidentes', 'segurança'],
                    points: 150,
                    resources: [
                        { type: 'interactive', url: 'modules/prevencao-acidentes.html', title: 'Módulo Interativo' },
                        { type: 'audio', url: 'audio/prevencao-acidentes.mp3', title: 'Áudio Explicativo', duration: '1:30:00' }
                    ],
                    modules: [
                        { id: 1, title: 'Análise de Riscos', duration: '20min', completed: false },
                        { id: 2, title: 'Medidas Preventivas', duration: '25min', completed: false },
                        { id: 3, title: 'Simulação de Cenários', duration: '30min', completed: false },
                        { id: 4, title: 'Avaliação', duration: '15min', completed: false }
                    ]
                },
                {
                    id: 'seg-003',
                    title: 'Primeiros Socorros',
                    description: 'Técnicas essenciais de primeiros socorros',
                    duration: '1h',
                    level: 'Básico',
                    type: 'video',
                    thumbnail: '🩹',
                    category: 'seguranca',
                    tags: ['primeiros socorros', 'emergência', 'saúde'],
                    points: 80,
                    resources: [
                        { type: 'video', url: 'videos/primeiros-socorros.mp4', title: 'Vídeo Principal', duration: '1:00:00' },
                        { type: 'document', url: 'docs/manual-primeiros-socorros.pdf', title: 'Manual Completo' }
                    ],
                    modules: [
                        { id: 1, title: 'Avaliação da Vítima', duration: '15min', completed: false },
                        { id: 2, title: 'RCP Básico', duration: '20min', completed: false },
                        { id: 3, title: 'Tratamento de Ferimentos', duration: '15min', completed: false },
                        { id: 4, title: 'Avaliação', duration: '10min', completed: false }
                    ]
                }
            ],
            gestao: [
                {
                    id: 'ges-001',
                    title: 'Gestão de Frotas',
                    description: 'Gestão eficiente de frotas de veículos',
                    duration: '3h',
                    level: 'Intermediário',
                    type: 'video',
                    thumbnail: '🚗',
                    category: 'gestao',
                    tags: ['frotas', 'gestão', 'veículos'],
                    points: 200,
                    resources: [
                        { type: 'video', url: 'videos/gestao-frotas.mp4', title: 'Vídeo Principal', duration: '3:00:00' },
                        { type: 'interactive', url: 'modules/gestao-frotas.html', title: 'Módulo Interativo' }
                    ],
                    modules: [
                        { id: 1, title: 'Planejamento de Rotas', duration: '30min', completed: false },
                        { id: 2, title: 'Controle de Custos', duration: '35min', completed: false },
                        { id: 3, title: 'Manutenção Preventiva', duration: '40min', completed: false },
                        { id: 4, title: 'Gestão de Motoristas', duration: '35min', completed: false },
                        { id: 5, title: 'Avaliação', duration: '40min', completed: false }
                    ]
                },
                {
                    id: 'ges-002',
                    title: 'Manutenção Preventiva',
                    description: 'Sistema de manutenção preventiva para veículos',
                    duration: '2h',
                    level: 'Avançado',
                    type: 'interactive',
                    thumbnail: '🔧',
                    category: 'gestao',
                    tags: ['manutenção', 'preventiva', 'veículos'],
                    points: 180,
                    resources: [
                        { type: 'interactive', url: 'modules/manutencao-preventiva.html', title: 'Módulo Interativo' },
                        { type: 'document', url: 'docs/checklist-manutencao.pdf', title: 'Checklist' }
                    ],
                    modules: [
                        { id: 1, title: 'Inspeção Visual', duration: '25min', completed: false },
                        { id: 2, title: 'Checklist de Manutenção', duration: '30min', completed: false },
                        { id: 3, title: 'Agendamento', duration: '20min', completed: false },
                        { id: 4, title: 'Relatórios', duration: '25min', completed: false },
                        { id: 5, title: 'Avaliação', duration: '20min', completed: false }
                    ]
                }
            ],
            atendimento: [
                {
                    id: 'ate-001',
                    title: 'Atendimento ao Cliente',
                    description: 'Técnicas essenciais para excelente atendimento',
                    duration: '2h',
                    level: 'Básico',
                    type: 'video',
                    thumbnail: '🎯',
                    category: 'atendimento',
                    tags: ['atendimento', 'cliente', 'serviço'],
                    points: 120,
                    resources: [
                        { type: 'video', url: 'videos/atendimento-cliente.mp4', title: 'Vídeo Principal', duration: '2:00:00' },
                        { type: 'document', url: 'docs/tecnicas-atendimento.pdf', title: 'Manual de Técnicas' }
                    ],
                    modules: [
                        { id: 1, title: 'Comunicação Efetiva', duration: '25min', completed: false },
                        { id: 2, title: 'Resolução de Problemas', duration: '30min', completed: false },
                        { id: 3, title: 'Técnicas de Vendas', duration: '35min', completed: false },
                        { id: 4, title: 'Avaliação', duration: '30min', completed: false }
                    ]
                },
                {
                    id: 'ate-002',
                    title: 'Comunicação Efetiva',
                    description: 'Melhore suas habilidades de comunicação',
                    duration: '1.5h',
                    level: 'Intermediário',
                    type: 'interactive',
                    thumbnail: '💬',
                    category: 'atendimento',
                    tags: ['comunicação', 'habilidades', 'interação'],
                    points: 150,
                    resources: [
                        { type: 'interactive', url: 'modules/comunicacao-efetiva.html', title: 'Módulo Interativo' },
                        { type: 'audio', url: 'audio/comunicacao-efetiva.mp3', title: 'Podcast', duration: '1:30:00' }
                    ],
                    modules: [
                        { id: 1, title: 'Escuta Ativa', duration: '20min', completed: false },
                        { id: 2, title: 'Linguagem Corporal', duration: '25min', completed: false },
                        { id: 3, title: 'Feedback Construtivo', duration: '20min', completed: false },
                        { id: 4, title: 'Avaliação', duration: '25min', completed: false }
                    ]
                }
            ]
        };
    }

    setupEventListeners() {
        // Course modal events
        const courseModal = document.getElementById('courseModal');
        const closeCourseModal = document.getElementById('closeCourseModal');
        
        if (closeCourseModal) {
            closeCourseModal.addEventListener('click', () => this.closeCourseModal());
        }

        if (courseModal) {
            courseModal.addEventListener('click', (e) => {
                if (e.target === courseModal) {
                    this.closeCourseModal();
                }
            });
        }

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeCourseModal();
            }
        });
    }

    renderCourses() {
        const coursesGrid = document.getElementById('coursesGrid');
        if (!coursesGrid) return;

        let allCourses = [];
        Object.values(this.courses).forEach(category => {
            allCourses = allCourses.concat(category);
        });

        coursesGrid.innerHTML = allCourses.map(course => this.renderCourseCard(course)).join('');
    }

    renderCourseCard(course) {
        const progress = this.getCourseProgress(course.id);
        const isCompleted = progress >= 100;
        const isInProgress = progress > 0 && progress < 100;

        return `
            <div class="course-card animate-fade-in-up" onclick="veloAcademy.openCourse('${course.id}')">
                <div class="relative">
                    <div class="w-16 h-16 bg-gradient-to-r from-velo-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <span class="text-2xl">${course.thumbnail}</span>
                    </div>
                    ${isCompleted ? '<div class="absolute top-0 right-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"><i class="fas fa-check text-white text-xs"></i></div>' : ''}
                    ${isInProgress ? '<div class="absolute top-0 right-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"><i class="fas fa-play text-white text-xs"></i></div>' : ''}
                </div>
                
                <h4 class="text-lg font-semibold text-white text-center mb-2">${course.title}</h4>
                <p class="text-velo-300 text-center text-sm mb-3 line-clamp-2">${course.description}</p>
                
                <div class="flex justify-between items-center text-sm text-velo-300 mb-3">
                    <span><i class="fas fa-clock mr-1"></i>${course.duration}</span>
                    <span class="px-2 py-1 bg-velo-600 rounded-full text-xs">${course.level}</span>
                </div>
                
                <div class="text-center mb-3">
                    <span class="inline-block px-3 py-1 bg-orange-600 text-white text-xs rounded-full">${this.getContentTypeName(course.type)}</span>
                </div>
                
                <div class="mb-3">
                    <div class="flex justify-between text-xs text-velo-300 mb-1">
                        <span>Progresso</span>
                        <span>${progress}%</span>
                    </div>
                    <div class="w-full bg-slate-700 rounded-full h-2">
                        <div class="bg-gradient-to-r from-velo-500 to-green-500 h-2 rounded-full transition-all duration-500" style="width: ${progress}%"></div>
                    </div>
                </div>
                
                <div class="flex justify-between items-center mb-3">
                    <span class="text-velo-300 text-sm"><i class="fas fa-star mr-1"></i>${course.points} pts</span>
                    <span class="text-velo-300 text-sm"><i class="fas fa-list mr-1"></i>${course.modules.length} módulos</span>
                </div>
                
                <button class="w-full bg-gradient-to-r from-velo-600 to-blue-600 hover:from-velo-700 hover:to-blue-700 text-white py-2 rounded-lg transition-all duration-300 font-medium">
                    ${isCompleted ? 'Revisar Curso' : isInProgress ? 'Continuar Curso' : 'Iniciar Curso'}
                </button>
            </div>
        `;
    }

    renderCertificates() {
        const certificatesGrid = document.getElementById('certificatesGrid');
        if (!certificatesGrid) return;

        if (this.certificates.length === 0) {
            certificatesGrid.innerHTML = `
                <div class="col-span-full text-center py-12">
                    <div class="w-24 h-24 bg-gradient-to-r from-velo-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-certificate text-white text-3xl"></i>
                    </div>
                    <h3 class="text-xl font-semibold text-white mb-2">Nenhum Certificado</h3>
                    <p class="text-velo-300">Complete cursos para receber certificados</p>
                </div>
            `;
            return;
        }

        certificatesGrid.innerHTML = this.certificates.map(cert => this.renderCertificateCard(cert)).join('');
    }

    renderCertificateCard(certificate) {
        return `
            <div class="certificate-card animate-scale-in" onclick="veloAcademy.viewCertificate('${certificate.id}')">
                <div class="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <i class="fas fa-certificate text-white text-2xl"></i>
                </div>
                
                <h4 class="text-lg font-semibold text-white text-center mb-2">${certificate.courseTitle}</h4>
                <p class="text-velo-300 text-center text-sm mb-3">${certificate.description}</p>
                
                <div class="flex justify-between items-center text-sm text-velo-300 mb-3">
                    <span><i class="fas fa-calendar mr-1"></i>${this.formatDate(certificate.issuedDate)}</span>
                    <span class="px-2 py-1 bg-green-600 rounded-full text-xs">Concluído</span>
                </div>
                
                <div class="text-center">
                    <span class="text-velo-300 text-sm">${certificate.score}% de aproveitamento</span>
                </div>
                
                <button class="w-full mt-3 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white py-2 rounded-lg transition-all duration-300 font-medium">
                    <i class="fas fa-download mr-2"></i>Baixar PDF
                </button>
            </div>
        `;
    }

    openCourse(courseId) {
        const course = this.findCourseById(courseId);
        if (!course) return;

        this.showCourseModal(course);
    }

    showCourseModal(course) {
        const modal = document.getElementById('courseModal');
        const title = document.getElementById('modalCourseTitle');
        const description = document.getElementById('modalCourseDescription');
        const content = document.getElementById('modalCourseContent');

        if (modal && title && description && content) {
            title.textContent = course.title;
            description.textContent = course.description;
            content.innerHTML = this.renderCourseContent(course);
            
            modal.classList.remove('hidden');
            modal.classList.add('animate-scale-in');
        }
    }

    closeCourseModal() {
        const modal = document.getElementById('courseModal');
        if (modal) {
            modal.classList.add('hidden');
            modal.classList.remove('animate-scale-in');
        }
    }

    renderCourseContent(course) {
        const progress = this.getCourseProgress(course.id);
        
        return `
            <div class="space-y-6">
                <!-- Course Info -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div class="text-center p-4 bg-white/5 rounded-lg">
                        <i class="fas fa-clock text-velo-400 text-2xl mb-2"></i>
                        <p class="text-white font-medium">${course.duration}</p>
                        <p class="text-velo-300 text-sm">Duração</p>
                    </div>
                    <div class="text-center p-4 bg-white/5 rounded-lg">
                        <i class="fas fa-star text-velo-400 text-2xl mb-2"></i>
                        <p class="text-white font-medium">${course.points}</p>
                        <p class="text-velo-300 text-sm">Pontos</p>
                    </div>
                    <div class="text-center p-4 bg-white/5 rounded-lg">
                        <i class="fas fa-list text-velo-400 text-2xl mb-2"></i>
                        <p class="text-white font-medium">${course.modules.length}</p>
                        <p class="text-velo-300 text-sm">Módulos</p>
                    </div>
                </div>

                <!-- Progress -->
                <div class="bg-white/5 rounded-lg p-4">
                    <div class="flex justify-between items-center mb-2">
                        <h4 class="text-white font-medium">Progresso do Curso</h4>
                        <span class="text-velo-300">${progress}%</span>
                    </div>
                    <div class="w-full bg-slate-700 rounded-full h-3">
                        <div class="bg-gradient-to-r from-velo-500 to-green-500 h-3 rounded-full transition-all duration-1000" style="width: ${progress}%"></div>
                    </div>
                </div>

                <!-- Modules -->
                <div class="bg-white/5 rounded-lg p-4">
                    <h4 class="text-white font-medium mb-4">Módulos do Curso</h4>
                    <div class="space-y-3">
                        ${course.modules.map(module => `
                            <div class="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                                <div class="flex items-center space-x-3">
                                    <div class="w-8 h-8 bg-gradient-to-r from-velo-500 to-blue-600 rounded-full flex items-center justify-center">
                                        <span class="text-white text-sm font-medium">${module.id}</span>
                                    </div>
                                    <div>
                                        <p class="text-white font-medium">${module.title}</p>
                                        <p class="text-velo-300 text-sm">${module.duration}</p>
                                    </div>
                                </div>
                                <div class="flex items-center space-x-2">
                                    ${module.completed ? 
                                        '<span class="text-green-400"><i class="fas fa-check-circle"></i></span>' : 
                                        '<span class="text-velo-300"><i class="fas fa-circle"></i></span>'
                                    }
                                    <button onclick="veloAcademy.startModule('${course.id}', ${module.id})" class="px-3 py-1 bg-velo-600 hover:bg-velo-700 text-white text-sm rounded transition-colors">
                                        ${module.completed ? 'Revisar' : 'Iniciar'}
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Resources -->
                <div class="bg-white/5 rounded-lg p-4">
                    <h4 class="text-white font-medium mb-4">Recursos Complementares</h4>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                        ${course.resources.map(resource => `
                            <div class="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                                <span class="text-2xl">${this.getResourceIcon(resource.type)}</span>
                                <div class="flex-1">
                                    <p class="text-white font-medium text-sm">${resource.title}</p>
                                    ${resource.duration ? `<p class="text-velo-300 text-xs">${resource.duration}</p>` : ''}
                                </div>
                                <button onclick="veloAcademy.openResource('${resource.url}', '${resource.type}')" class="px-3 py-1 bg-velo-600 hover:bg-velo-700 text-white text-sm rounded transition-colors">
                                    Abrir
                                </button>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="flex space-x-4">
                    <button onclick="veloAcademy.startCourse('${course.id}')" class="flex-1 bg-gradient-to-r from-velo-600 to-blue-600 hover:from-velo-700 hover:to-blue-700 text-white py-3 rounded-lg transition-all duration-300 font-medium">
                        <i class="fas fa-play mr-2"></i>${progress > 0 ? 'Continuar Curso' : 'Iniciar Curso'}
                    </button>
                    <button onclick="veloAcademy.addToFavorites('${course.id}')" class="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
            </div>
        `;
    }

    startCourse(courseId) {
        const course = this.findCourseById(courseId);
        if (!course) return;

        console.log(`Iniciando curso: ${course.title}`);
        
        // Close modal
        this.closeCourseModal();
        
        // Show course player
        this.showCoursePlayer(course);
        
        // Update progress
        this.updateCourseProgress(courseId, 5);
    }

    startModule(courseId, moduleId) {
        const course = this.findCourseById(courseId);
        if (!course) return;

        const module = course.modules.find(m => m.id === moduleId);
        if (!module) return;

        console.log(`Iniciando módulo: ${module.title}`);
        
        // Show module content
        this.showModuleContent(course, module);
    }

    showCoursePlayer(course) {
        // This would show the actual course player
        // For now, we'll show a notification
        if (window.veloNet && window.veloNet.addNotification) {
            window.veloNet.addNotification(`Curso "${course.title}" iniciado!`, 'success');
        }
    }

    showModuleContent(course, module) {
        // This would show the actual module content
        // For now, we'll show a notification
        if (window.veloNet && window.veloNet.addNotification) {
            window.veloNet.addNotification(`Módulo "${module.title}" iniciado!`, 'info');
        }
    }

    openResource(url, type) {
        if (type === 'document' || type === 'pdf') {
            window.open(url, '_blank');
        } else if (type === 'video' || type === 'audio') {
            if (window.veloNet && window.veloNet.addNotification) {
                window.veloNet.addNotification('Recurso aberto em nova aba', 'info');
            }
            window.open(url, '_blank');
        } else {
            if (window.veloNet && window.veloNet.addNotification) {
                window.veloNet.addNotification('Recurso disponível para download', 'info');
            }
        }
    }

    findCourseById(courseId) {
        for (const category in this.courses) {
            const course = this.courses[category].find(c => c.id === courseId);
            if (course) return course;
        }
        return null;
    }

    getCourseProgress(courseId) {
        return this.userProgress[courseId] || 0;
    }

    updateCourseProgress(courseId, progress) {
        this.userProgress[courseId] = Math.min(100, Math.max(0, progress));
        
        // Save to localStorage
        localStorage.setItem('veloAcademyProgress', JSON.stringify(this.userProgress));
        
        // Check if course is completed
        if (this.userProgress[courseId] >= 100) {
            this.completeCourse(courseId);
        }
        
        // Update UI
        this.renderCourses();
    }

    completeCourse(courseId) {
        const course = this.findCourseById(courseId);
        if (!course) return;

        // Generate certificate
        this.generateCertificate(course);
        
        // Award points
        this.awardPoints(course.points);
        
        // Check achievements
        this.checkAchievements();
        
        // Show completion notification
        if (window.veloNet && window.veloNet.addNotification) {
            window.veloNet.addNotification(`Parabéns! Você completou o curso "${course.title}"!`, 'success');
        }
    }

    generateCertificate(course) {
        const certificate = {
            id: `cert-${Date.now()}`,
            courseId: course.id,
            courseTitle: course.title,
            description: `Certificado de conclusão do curso ${course.title}`,
            issuedDate: new Date(),
            score: 100,
            certificateNumber: `VELO-${course.id.toUpperCase()}-${Date.now()}`
        };

        this.certificates.push(certificate);
        localStorage.setItem('veloAcademyCertificates', JSON.stringify(this.certificates));
        
        // Update UI
        this.renderCertificates();
    }

    awardPoints(points) {
        if (window.veloNet && window.veloNet.user) {
            window.veloNet.user.points += points;
            window.veloNet.updateUserInterface();
        }
    }

    checkAchievements() {
        // Check for various achievements
        const completedCourses = Object.keys(this.userProgress).filter(id => this.userProgress[id] >= 100).length;
        
        if (completedCourses === 1 && !this.achievements.includes('first-course')) {
            this.unlockAchievement('first-course', 'Primeiro Curso', 'Completou seu primeiro curso');
        }
        
        if (completedCourses === 5 && !this.achievements.includes('course-master')) {
            this.unlockAchievement('course-master', 'Mestre dos Cursos', 'Completou 5 cursos');
        }
    }

    unlockAchievement(id, title, description) {
        this.achievements.push(id);
        localStorage.setItem('veloAcademyAchievements', JSON.stringify(this.achievements));
        
        if (window.veloNet && window.veloNet.addNotification) {
            window.veloNet.addNotification(`🏆 Nova conquista: ${title}!`, 'success');
        }
    }

    loadUserProgress() {
        const saved = localStorage.getItem('veloAcademyProgress');
        if (saved) {
            try {
                this.userProgress = JSON.parse(saved);
            } catch (e) {
                console.log('Erro ao carregar progresso:', e);
                this.userProgress = {};
            }
        }
    }

    loadCertificates() {
        const saved = localStorage.getItem('veloAcademyCertificates');
        if (saved) {
            try {
                this.certificates = JSON.parse(saved);
            } catch (e) {
                console.log('Erro ao carregar certificados:', e);
                this.certificates = [];
            }
        }
    }

    loadAchievements() {
        const saved = localStorage.getItem('veloAcademyAchievements');
        if (saved) {
            try {
                this.achievements = JSON.parse(saved);
            } catch (e) {
                console.log('Erro ao carregar conquistas:', e);
                this.achievements = [];
            }
        }
    }

    getContentTypeName(type) {
        const types = {
            video: 'Vídeo',
            audio: 'Áudio',
            document: 'Documento',
            interactive: 'Interativo',
            quiz: 'Quiz'
        };
        return types[type] || type;
    }

    getResourceIcon(type) {
        const icons = {
            video: '🎥',
            audio: '🎧',
            document: '📄',
            interactive: '🔄',
            quiz: '❓'
        };
        return icons[type] || '📚';
    }

    formatDate(date) {
        return new Date(date).toLocaleDateString('pt-BR');
    }

    // Public methods for external use
    loadAllCourses() {
        this.renderCourses();
    }

    loadCoursesByCategory(category) {
        const coursesGrid = document.getElementById('coursesGrid');
        if (!coursesGrid) return;

        if (category === 'all' || !this.courses[category]) {
            this.renderCourses();
            return;
        }

        coursesGrid.innerHTML = this.courses[category].map(course => this.renderCourseCard(course)).join('');
    }

    addToFavorites(courseId) {
        // Implementation for favorites
        if (window.veloNet && window.veloNet.addNotification) {
            window.veloNet.addNotification('Curso adicionado aos favoritos!', 'success');
        }
    }

    viewCertificate(certificateId) {
        const certificate = this.certificates.find(c => c.id === certificateId);
        if (!certificate) return;

        // Show certificate viewer
        console.log('Visualizando certificado:', certificate);
    }
}

// Initialize VeloAcademy when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.veloAcademy = new VeloAcademy();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VeloAcademy;
}
