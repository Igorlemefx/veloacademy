<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VeloAcademy Pro - Sistema Avançado de Treinamento Corporativo</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        :root {
            --bg-primary: #272A30;
            --text-primary: #ECECEC;
            --text-secondary: #a0aec0;
            --glass-bg: rgba(0, 0, 88, 0.15);
            --glass-border: 1px solid rgba(0, 0, 88, 0.3);
            --primary-accent: #1634FF;
            --primary-dark: #000058;
            --xp-color: #1DFDB9;
            --accent-orange: #FF8400;
            --accent-pink: #FF00D7;
            --accent-purple: #791DD0;
        }

        .theme-light {
            --bg-primary: #ECECEC;
            --text-primary: #272A30;
            --text-secondary: #65676b;
            --glass-bg: rgba(0, 0, 88, 0.08);
            --glass-border: 1px solid rgba(0, 0, 88, 0.15);
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: var(--bg-primary);
            color: var(--text-primary);
            transition: background 0.3s ease, color 0.3s ease;
            margin: 0; padding: 0;
            overflow-x: hidden;
        }
        
        .glass-panel {
            background: var(--glass-bg);
            backdrop-filter: blur(20px);
            border: var(--glass-border);
            border-radius: 16px;
            transition: all 0.3s ease;
        }

        .btn { border-radius: 12px; padding: 10px 20px; border: none; font-weight: 600; transition: all 0.3s ease; cursor: pointer; }
        .btn-primary { background: linear-gradient(135deg, var(--primary-dark) 0%, var(--primary-accent) 100%); color: white; }
        .btn-primary:hover { transform: translateY(-3px); box-shadow: 0 10px 20px rgba(0, 0, 88, 0.5); }
        .btn-primary:disabled { background: #555; cursor: not-allowed; transform: none; box-shadow: none; }
        
        .btn-secondary { background: rgba(255, 255, 255, 0.1); color: var(--text-primary); border: 1px solid rgba(255, 255, 255, 0.2); }
        .theme-light .btn-secondary { background: rgba(0, 0, 0, 0.05); border-color: rgba(0, 0, 0, 0.1); }
        .btn-secondary:hover { background: rgba(255, 255, 255, 0.2); }
        .theme-light .btn-secondary:hover { background: rgba(0, 0, 0, 0.1); }
        
        /* Estilos específicos para o botão de tema */
        #theme-switcher {
            background: rgba(22, 52, 255, 0.15) !important;
            border: 2px solid #1634FF !important;
            color: #1634FF !important;
            box-shadow: 0 4px 12px rgba(22, 52, 255, 0.3);
            transition: all 0.3s ease;
        }
        
        #theme-switcher:hover {
            background: rgba(22, 52, 255, 0.25) !important;
            border-color: #1DFDB9 !important;
            color: #1DFDB9 !important;
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(22, 52, 255, 0.4);
        }
        
        .theme-light #theme-switcher {
            background: rgba(22, 52, 255, 0.1) !important;
            border-color: #1634FF !important;
            color: #1634FF !important;
        }
        
        .theme-light #theme-switcher:hover {
            background: rgba(22, 52, 255, 0.2) !important;
            border-color: #1DFDB9 !important;
            color: #1DFDB9 !important;
        }

        .btn-danger { background: #FF3B30; color: white; }
        
        .progress-bar { height: 6px; background: rgba(255, 255, 255, 0.1); border-radius: 3px; overflow: hidden; }
        .theme-light .progress-bar { background: rgba(0, 0, 0, 0.1); }
        .progress-fill { height: 100%; background: var(--primary-accent); border-radius: 3px; transition: width 0.5s ease; }
        
        .xp-bar { height: 8px; background: rgba(52, 211, 153, 0.2); border-radius: 4px; overflow: hidden; }
        .xp-fill { height: 100%; background: var(--xp-color); border-radius: 4px; transition: width 0.5s ease; }

        .view { display: none; animation: fadeIn 0.5s ease; }
        .view.active { display: block; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

        .lesson-item.completed .lesson-title { text-decoration: line-through; color: #888; }
        .theme-light .lesson-item.completed .lesson-title { color: #aaa; }
        .lesson-item.active { background-color: rgba(0, 122, 255, 0.2); border-left: 3px solid var(--primary-accent); }
        
        .toast-notification { animation: slideInRight 0.5s ease, fadeOut 0.5s ease 4.5s forwards; }
        @keyframes slideInRight { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }
        
        .achievement-icon { filter: grayscale(80%); transition: all 0.3s ease; }
        .achievement-icon.unlocked { filter: grayscale(0%); transform: scale(1.1); }

        /* General text color overrides for light theme */
        .theme-light h1, .theme-light h2, .theme-light h3, .theme-light h4, .theme-light p, .theme-light span, .theme-light div {
            color: var(--text-primary);
        }
        .theme-light .text-gray-400 { color: var(--text-secondary) !important; }
        .theme-light .text-gray-300 { color: #4a5568 !important; }
        .theme-light .text-white { color: var(--text-primary) !important; }
        .theme-light .border-gray-800 { border-color: #e2e8f0 !important; }
    </style>
</head>
<body class="p-4 sm:p-8">

    <!-- Container de Notificações -->
    <div id="notification-container" class="fixed top-5 right-5 z-50 space-y-3"></div>
    
    <!-- Sistema de Login/Registro -->
    <div id="auth-modal" class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 hidden items-center justify-center">
        <div class="glass-panel p-8 max-w-md w-full m-4">
            <div id="login-form" class="space-y-4">
                <h2 class="text-2xl font-bold text-center mb-6">Acesso VeloAcademy</h2>
                <input type="text" id="login-email" placeholder="Email" class="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white">
                <input type="password" id="login-password" placeholder="Senha" class="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white">
                <button onclick="veloAcademyApp.login()" class="btn btn-primary w-full">Entrar</button>
                <p class="text-center text-sm">
                    <a href="#" onclick="veloAcademyApp.showRegisterForm()" class="text-blue-400 hover:underline">Criar conta</a>
                </p>
            </div>
            <div id="register-form" class="space-y-4 hidden">
                <h2 class="text-2xl font-bold text-center mb-6">Nova Conta</h2>
                <input type="text" id="register-name" placeholder="Nome completo" class="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white">
                <input type="email" id="register-email" placeholder="Email" class="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white">
                <input type="password" id="register-password" placeholder="Senha" class="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white">
                <button onclick="veloAcademyApp.register()" class="btn btn-primary w-full">Criar Conta</button>
                <p class="text-center text-sm">
                    <a href="#" onclick="veloAcademyApp.showLoginForm()" class="text-blue-400 hover:underline">Já tenho conta</a>
                </p>
            </div>
        </div>
    </div>

    <!-- Cabeçalho Principal da Aplicação -->
    <header class="flex flex-wrap justify-between items-center mb-8 pb-4 border-b border-gray-800 gap-4">
        <div class="flex items-center space-x-4">
            <div class="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg" style="background: linear-gradient(135deg, #000058 0%, #1634FF 100%);">
                <i class="fas fa-graduation-cap text-white text-xl"></i>
            </div>
            <div>
                <h1 class="text-3xl font-bold">VeloAcademy</h1>
                <p class="text-gray-400">Sistema Principal de Treinamento</p>
            </div>
        </div>
        <div class="flex items-center space-x-4">
            <button id="theme-switcher" onclick="veloAcademyApp.toggleTheme()" class="btn btn-secondary p-2 h-12 w-12 flex items-center justify-center text-xl border-2 border-blue-400 hover:border-blue-300 transition-all duration-300" style="background: rgba(22, 52, 255, 0.1); color: #1634FF;">
                <i class="fas fa-sun"></i>
            </button>
            <div class="flex-grow">
                <div class="flex justify-between items-center mb-1">
                    <span id="user-level" class="font-bold text-sm" style="color: #1DFDB9;">Nível 1</span>
                    <span id="user-xp" class="text-xs text-gray-400">0/100 XP</span>
                </div>
                <div class="xp-bar">
                    <div id="xp-fill" class="xp-fill" style="width: 0%;"></div>
                </div>
            </div>
                         <div class="flex items-center space-x-3">
                 <div class="text-right">
                     <p id="user-name" class="font-semibold">Usuário Demo</p>
                     <p id="user-title" class="text-sm" style="color: #1634FF;">Aprendiz</p>
                 </div>
                 <img id="user-avatar" src="https://i.pravatar.cc/150?u=demo" alt="Avatar" class="w-12 h-12 rounded-full border-2 cursor-pointer hover:scale-110 transition-transform" style="border-color: #1634FF;" onclick="veloAcademyApp.showUserMenu()">
                 <div id="user-menu" class="absolute top-20 right-4 glass-panel p-4 hidden">
                     <div class="space-y-2">
                         <button onclick="veloAcademyApp.showProfile()" class="w-full text-left p-2 hover:bg-white/10 rounded">👤 Perfil</button>
                         <button onclick="veloAcademyApp.showSettings()" class="w-full text-left p-2 hover:bg-white/10 rounded">⚙️ Configurações</button>
                         <button onclick="veloAcademyApp.logout()" class="w-full text-left p-2 hover:bg-white/10 rounded text-red-400">🚪 Sair</button>
                     </div>
                 </div>
             </div>
        </div>
    </header>

    <main>
        <!-- View: Dashboard de Cursos -->
        <div id="dashboard-view" class="view active">
            <!-- Curso em Destaque -->
            <div id="featured-course-section" class="glass-panel p-6 mb-8 flex flex-col md:flex-row items-center gap-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
                <!-- Conteúdo do Curso em Destaque -->
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div class="lg:col-span-2">
                    <!-- Estatísticas -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                        <div class="glass-panel p-4 flex items-center space-x-4">
                            <i class="fas fa-layer-group text-2xl" style="color: #791DD0;"></i>
                            <div>
                                <h3 class="text-gray-400 text-sm">Cursos Disponíveis</h3>
                                <p id="stats-total-courses" class="text-2xl font-bold">0</p>
                            </div>
                        </div>
                        <div class="glass-panel p-4 flex items-center space-x-4">
                            <i class="fas fa-book text-2xl" style="color: #1634FF;"></i>
                            <div>
                                <h3 class="text-gray-400 text-sm">Cursos Concluídos</h3>
                                <p id="stats-completed-courses" class="text-2xl font-bold">0</p>
                            </div>
                        </div>
                        <div class="glass-panel p-4 flex items-center space-x-4">
                            <i class="fas fa-trophy text-2xl" style="color: #FF8400;"></i>
                            <div>
                                <h3 class="text-gray-400 text-sm">Conquistas</h3>
                                <p id="stats-achievements" class="text-2xl font-bold">0</p>
                            </div>
                        </div>
                        <div class="glass-panel p-4 flex items-center space-x-4">
                            <i class="fas fa-tasks text-2xl" style="color: #1DFDB9;"></i>
                            <div>
                                <h3 class="text-gray-400 text-sm">Progresso Total</h3>
                                <p id="stats-overall-progress" class="text-2xl font-bold text-green-400">0%</p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Seção Continuar de Onde Parou -->
                    <div id="resume-section" class="mb-8 hidden">
                         <h2 class="text-2xl font-bold mb-4">Continuar de Onde Parou</h2>
                         <div id="resume-card" class="glass-panel p-4 flex items-center justify-between hover:border-blue-500 cursor-pointer"></div>
                    </div>

                    <h2 class="text-2xl font-bold mb-6">Trilhas de Aprendizagem</h2>
                    <div id="courses-grid" class="grid grid-cols-1 md:grid-cols-2 gap-6"></div>
                </div>

                <!-- Barra Lateral do Dashboard -->
                <aside class="lg:col-span-1">
                    <div class="glass-panel p-6 h-fit sticky top-8">
                        <h3 class="text-xl font-bold mb-4">Minhas Conquistas</h3>
                        <div id="achievements-grid" class="grid grid-cols-3 gap-4 text-center">
                            <!-- Conquistas serão inseridas aqui -->
                        </div>
                    </div>
                </aside>
            </div>
        </div>

        <!-- View: Visualizador de Curso Detalhado -->
        <div id="course-view" class="view"></div>
    </main>

    <!-- Modal Universal -->
    <div id="modal" class="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 hidden items-center justify-center">
        <div id="modal-content" class="glass-panel p-8 max-w-lg w-full m-4 text-center relative">
            <!-- Conteúdo do Modal será inserido aqui -->
        </div>
    </div>


    <script>
    // --- BANCO DE DADOS DE CURSOS E CONTEÚDO ---
    const courseDatabase = {
        'cs004': {
            title: 'Segurança da Informação para Colaboradores',
            description: 'Aprenda a proteger os dados da empresa e dos clientes contra ameaças digitais.',
            isFeatured: true, // Novo curso em destaque
            modules: [
                {
                    title: 'Módulo 1: Conceitos Fundamentais',
                    lessons: [
                        { id: 'l7-1', title: 'O que é Segurança da Informação?', type: 'video', duration: '10 min', filePath: 'https://www.w3schools.com/html/mov_bbb.mp4', xp: 15 },
                        { id: 'l7-2', title: 'Tipos de Ameaças (Phishing, Malware)', type: 'audio', duration: '15 min', filePath: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav', xp: 20 },
                        { id: 'l7-3', title: 'Política de Senhas Seguras', type: 'pdf', duration: 'Leitura', filePath: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', xp: 10 },
                    ]
                },
                {
                    title: 'Módulo 2: Boas Práticas no Dia a Dia',
                    lessons: [
                        { id: 'l8-1', title: 'Navegação Segura e E-mails Confiáveis', type: 'video', duration: '12 min', filePath: 'https://www.w3schools.com/html/mov_bbb.mp4', xp: 20 },
                        { id: 'l8-2', title: 'Protegendo seu Ambiente de Trabalho', type: 'pdf', duration: 'Leitura', filePath: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', xp: 15 },
                        { id: 'l8-3', title: 'O que fazer em caso de incidente?', type: 'audio', duration: '10 min', filePath: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav', xp: 20 },
                    ]
                }
            ]
        },
        'cs003': {
            title: 'Excelência no Atendimento ao Cliente',
            description: 'Transforme cada interação em uma oportunidade de encantar e fidelizar clientes.',
            isFeatured: false,
            modules: [
                {
                    title: 'Módulo 1: A Mentalidade do Atendimento de Elite',
                    lessons: [
                        { id: 'l4-1', title: 'Comunicação Empática', type: 'audio', duration: '18 min', filePath: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav', xp: 25 },
                        { id: 'l4-2', title: 'Linguagem Positiva e Eficaz', type: 'video', duration: '12 min', filePath: 'https://www.w3schools.com/html/mov_bbb.mp4', xp: 20 },
                        { id: 'l4-3', title: 'Guia Rápido de Tom de Voz', type: 'pdf', duration: 'Leitura', filePath: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', xp: 15 },
                    ]
                },
                {
                    title: 'Módulo 2: Lidando com Situações Desafiadoras',
                    lessons: [
                        { id: 'l5-1', title: 'Técnicas de Resolução de Conflitos', type: 'video', duration: '22 min', filePath: 'https://www.w3schools.com/html/mov_bbb.mp4', xp: 30 },
                        { id: 'l5-2', title: 'Como Lidar com Clientes Irritados', type: 'audio', duration: '20 min', filePath: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav', xp: 25 },
                        { id: 'l5-3', title: 'Dizendo "Não" com Profissionalismo', type: 'video', duration: '10 min', filePath: 'https://www.w3schools.com/html/mov_bbb.mp4', xp: 20 },
                    ]
                }
            ]
        },
        'cs001': {
            title: 'Onboarding de Atendimento VeloTax',
            description: 'Aprenda os processos essenciais para um atendimento de excelência.',
            isFeatured: false,
            modules: [
                {
                    title: 'Módulo 1: Fundamentos',
                    lessons: [
                        { id: 'l1-1', title: 'Boas-vindas e Introdução', type: 'video', duration: '5 min', filePath: 'https://www.w3schools.com/html/mov_bbb.mp4', xp: 10 },
                        { id: 'l1-2', title: 'Guia de Processos Iniciais', type: 'pdf', duration: 'Leitura', filePath: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', xp: 15 },
                    ]
                }
            ]
        },
    };

    const achievementDatabase = {
        'first_lesson': { title: 'Primeiros Passos', icon: '👟', description: 'Você completou sua primeira aula!', unlocked: false },
        'first_course': { title: 'Certificado!', icon: '🎓', description: 'Você concluiu seu primeiro curso!', unlocked: false },
        'level_5': { title: 'Nível 5', icon: '⭐', description: 'Alcançou o nível 5!', unlocked: false },
        'security_badge': { title: 'Guardião Digital', icon: '🛡️', description: 'Concluiu o curso de Segurança!', unlocked: false },
    };

    // --- NÚCLEO DA APLICAÇÃO ---
         const veloAcademyApp = {
         userData: {
             name: 'Usuário Demo',
             email: '',
             level: 1,
             xp: 0,
             title: 'Aprendiz',
             lastCourse: null,
             progress: {},
             achievements: {},
             theme: 'dark',
             avatar: 'https://i.pravatar.cc/150?u=demo',
             joinDate: new Date().toISOString(),
             totalStudyTime: 0,
             certificates: []
         },
        
                 init() {
             this.loadData();
             this.applyTheme();
             this.checkAuth();
             this.startStudyTimer();
             this.renderDashboard();
         },

        loadData() {
            const savedData = localStorage.getItem('veloAcademyUserData');
            if (savedData) this.userData = JSON.parse(savedData);
            // Garantir que a propriedade 'theme' exista
            if (!this.userData.theme) this.userData.theme = 'dark';
            for (const key in achievementDatabase) {
                if (!this.userData.achievements[key]) this.userData.achievements[key] = { unlocked: false };
            }
        },

        saveData() {
            localStorage.setItem('veloAcademyUserData', JSON.stringify(this.userData));
        },

        toggleTheme() {
            this.userData.theme = this.userData.theme === 'dark' ? 'light' : 'dark';
            this.applyTheme();
            this.saveData();
        },

        applyTheme() {
            const body = document.body;
            const switcher = document.getElementById('theme-switcher');
            if (this.userData.theme === 'light') {
                body.classList.add('theme-light');
                switcher.innerHTML = `<i class="fas fa-moon"></i>`;
            } else {
                body.classList.remove('theme-light');
                switcher.innerHTML = `<i class="fas fa-sun"></i>`;
            }
        },
        
        switchView(viewId) {
            document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
            document.getElementById(viewId).classList.add('active');
            window.scrollTo(0, 0);
        },

        renderDashboard() {
            this.updateHeader();
            this.updateDashboardStats();
            this.renderResumeCard();
            this.renderFeaturedCourse();
            this.renderAchievements();
            
            const grid = document.getElementById('courses-grid');
            grid.innerHTML = '';
            for (const courseId in courseDatabase) {
                if (courseDatabase[courseId].isFeatured) continue;
                const course = courseDatabase[courseId];
                const progress = this.calculateCourseProgress(courseId);
                
                grid.innerHTML += `
                    <div class="glass-panel p-4 flex flex-col hover:border-blue-500 cursor-pointer transition-all duration-300 hover:shadow-2xl" style="--hover-border-color: #1634FF;" onclick="veloAcademyApp.openCourse('${courseId}')">
                        <div class="flex-grow">
                            <h3 class="text-lg font-bold">${course.title}</h3>
                            <p class="text-sm text-gray-400 mb-4">${course.description}</p>
                        </div>
                        <div class="mt-auto">
                            <div class="flex justify-between items-center text-xs text-gray-400 mb-1">
                                <span>Progresso</span>
                                <span>${progress.toFixed(0)}%</span>
                            </div>
                            <div class="progress-bar"><div class="progress-fill" style="width: ${progress}%;"></div></div>
                        </div>
                    </div>
                `;
            }
            this.switchView('dashboard-view');
        },

        updateHeader() {
            const xpForNextLevel = this.userData.level * 100;
            const xpPercentage = (this.userData.xp / xpForNextLevel) * 100;
            document.getElementById('user-name').textContent = this.userData.name;
            document.getElementById('user-title').textContent = this.userData.title;
            document.getElementById('user-level').textContent = `Nível ${this.userData.level}`;
            document.getElementById('user-xp').textContent = `${this.userData.xp}/${xpForNextLevel} XP`;
            document.getElementById('xp-fill').style.width = `${xpPercentage}%`;
        },

        updateDashboardStats() {
            const totalCourses = Object.keys(courseDatabase).length;
            const completedCourses = Object.keys(this.userData.progress).filter(id => this.calculateCourseProgress(id) === 100).length;
            const unlockedAchievements = Object.values(this.userData.achievements).filter(a => a.unlocked).length;
            
            let totalLessons = 0, completedLessons = 0;
            for (const courseId in courseDatabase) {
                const course = courseDatabase[courseId];
                totalLessons += course.modules.reduce((acc, mod) => acc + mod.lessons.length, 0);
                completedLessons += this.userData.progress[courseId]?.completedLessons.length || 0;
            }
            const overallProgress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

            document.getElementById('stats-total-courses').textContent = totalCourses;
            document.getElementById('stats-completed-courses').textContent = `${completedCourses}/${totalCourses}`;
            document.getElementById('stats-overall-progress').textContent = `${overallProgress.toFixed(0)}%`;
            document.getElementById('stats-achievements').textContent = `${unlockedAchievements}/${Object.keys(achievementDatabase).length}`;
        },
        
        renderResumeCard() {
            const resumeSection = document.getElementById('resume-section');
            const resumeCard = document.getElementById('resume-card');
            const lastCourseId = this.userData.lastCourse;

            if (lastCourseId && courseDatabase[lastCourseId] && this.calculateCourseProgress(lastCourseId) < 100) {
                const course = courseDatabase[lastCourseId];
                resumeCard.innerHTML = `<div class="flex items-center space-x-4"><i class="fas fa-play-circle text-4xl text-blue-400"></i><div><p class="font-bold">${course.title}</p><p class="text-sm text-gray-400">Continue seu aprendizado agora mesmo.</p></div></div><i class="fas fa-arrow-right text-gray-500"></i>`;
                resumeCard.onclick = () => this.openCourse(lastCourseId);
                resumeSection.classList.remove('hidden');
            } else {
                resumeSection.classList.add('hidden');
            }
        },

        renderFeaturedCourse() {
            const featuredSection = document.getElementById('featured-course-section');
            const featuredCourseEntry = Object.entries(courseDatabase).find(([id, course]) => course.isFeatured);
            if (!featuredCourseEntry) {
                featuredSection.classList.add('hidden');
                return;
            }
            const [courseId, course] = featuredCourseEntry;
            featuredSection.innerHTML = `
                <div class="flex-shrink-0"><i class="fas fa-star text-6xl" style="color: #FF8400;"></i></div>
                <div class="flex-grow">
                    <p class="text-sm font-bold" style="color: #FF8400;">CURSO EM DESTAQUE</p>
                    <h3 class="text-2xl font-bold">${course.title}</h3>
                    <p class="text-gray-300">${course.description}</p>
                </div>
                <button class="btn btn-primary w-full md:w-auto" onclick="veloAcademyApp.openCourse('${courseId}')">Começar Agora</button>
            `;
        },

        renderAchievements() {
            const grid = document.getElementById('achievements-grid');
            grid.innerHTML = '';
            for (const id in achievementDatabase) {
                const achievement = achievementDatabase[id];
                const isUnlocked = this.userData.achievements[id]?.unlocked;
                grid.innerHTML += `
                    <div class="flex flex-col items-center p-2 rounded-lg ${isUnlocked ? '' : 'opacity-50'}" title="${achievement.title}: ${achievement.description}">
                        <span class="achievement-icon text-4xl ${isUnlocked ? 'unlocked' : ''}">${achievement.icon}</span>
                        <p class="text-xs mt-2 text-gray-300">${achievement.title}</p>
                    </div>
                `;
            }
        },
        
        openCourse(courseId) {
            this.userData.lastCourse = courseId;
            this.saveData();
            const course = courseDatabase[courseId];
            const courseView = document.getElementById('course-view');
            
            const modulesHtml = course.modules.map((module, moduleIndex) => {
                const lessonsHtml = module.lessons.map((lesson, lessonIndex) => {
                    const isCompleted = this.userData.progress[courseId]?.completedLessons.includes(lesson.id);
                    const lessonTypeIcon = { video: 'fa-video', pdf: 'fa-file-pdf', audio: 'fa-headphones' }[lesson.type] || 'fa-question-circle';
                    return `
                        <div class="lesson-item flex items-center justify-between p-3 rounded-lg hover:bg-gray-700/50 cursor-pointer ${isCompleted ? 'completed' : ''}"
                             onclick="veloAcademyApp.renderLessonContent('${courseId}', ${moduleIndex}, ${lessonIndex})">
                            <div class="flex items-center space-x-3">
                                <i class="fa-regular ${isCompleted ? 'fa-check-circle text-green-400' : 'fa-circle text-gray-500'}"></i>
                                <i class="fas ${lessonTypeIcon} text-gray-400 w-4 text-center"></i>
                                <span class="lesson-title">${lesson.title}</span>
                            </div>
                            <span class="text-xs text-gray-400">${lesson.duration}</span>
                        </div>
                    `;
                }).join('');
                return `<div class="mb-4"><h4 class="font-semibold text-gray-300 mb-2">${module.title}</h4><div class="space-y-1">${lessonsHtml}</div></div>`;
            }).join('');

            courseView.innerHTML = `
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div class="lg:col-span-2">
                        <div class="flex items-center justify-between mb-4">
                             <button class="btn btn-secondary" onclick="veloAcademyApp.renderDashboard()"><i class="fas fa-arrow-left mr-2"></i>Meu Dashboard</button>
                             <button id="certificate-button" class="btn btn-primary" onclick="veloAcademyApp.showModal('certificate', '${courseId}')" disabled>
                                <i class="fas fa-certificate mr-2"></i>Gerar Certificado
                             </button>
                        </div>
                        <div id="lesson-content-area" class="glass-panel p-6 min-h-[60vh] flex items-center justify-center text-gray-400">
                            Selecione uma aula para começar.
                        </div>
                    </div>
                    <aside class="glass-panel p-6 h-fit lg:sticky top-8">
                        <div class="flex justify-between items-center">
                            <h3 class="text-xl font-bold mb-1">${course.title}</h3>
                            <button class="btn btn-secondary btn-sm" onclick="veloAcademyApp.showModal('reset', '${courseId}')"><i class="fas fa-undo"></i></button>
                        </div>
                        <div class="progress-bar my-4"><div class="progress-fill" style="width: ${this.calculateCourseProgress(courseId)}%;"></div></div>
                        <div id="modules-list" class="max-h-[60vh] overflow-y-auto pr-2">${modulesHtml}</div>
                    </aside>
                </div>
            `;

            this.switchView('course-view');
            this.loadFirstIncompleteLesson(courseId);
            this.updateCertificateButton(courseId);
        },

        renderLessonContent(courseId, moduleIndex, lessonIndex) {
            const lesson = courseDatabase[courseId].modules[moduleIndex].lessons[lessonIndex];
            const contentArea = document.getElementById('lesson-content-area');
            
            contentArea.innerHTML = `
                <div class="w-full">
                    <h2 class="text-2xl font-bold mb-4">${lesson.title}</h2>
                    <div class="aspect-video bg-black rounded-lg mb-6 flex items-center justify-center text-gray-500">
                        ${this.getPlayerHtml(lesson)}
                    </div>
                    <div class="flex justify-between items-center">
                         <button class="btn btn-secondary" onclick="veloAcademyApp.goToPreviousLesson('${courseId}', ${moduleIndex}, ${lessonIndex})">Anterior</button>
                         <button class="btn btn-primary" onclick="veloAcademyApp.markLessonAsComplete('${courseId}', ${moduleIndex}, ${lessonIndex})"><i class="fas fa-check mr-2"></i>Marcar como Concluída</button>
                         <button class="btn btn-secondary" onclick="veloAcademyApp.goToNextLesson('${courseId}', ${moduleIndex}, ${lessonIndex})">Próxima</button>
                    </div>
                </div>
            `;
            
            document.querySelectorAll('.lesson-item').forEach(el => el.classList.remove('active'));
            document.querySelector(`[onclick*="renderLessonContent('${courseId}', ${moduleIndex}, ${lessonIndex})"]`)?.classList.add('active');
        },
        
        getPlayerHtml(lesson) {
            const errorHtml = `<div class='p-4 text-center'><i class='fas fa-exclamation-triangle text-yellow-400 text-2xl mb-2'></i><p>Não foi possível carregar o conteúdo.</p><p class='text-xs'>Verifique o ID do arquivo no Google Drive</p></div>`;
            
            // Verifica se o arquivo tem um ID válido do Google Drive
            if (lesson.filePath.includes('1-VIDEO_ID_AQUI') || lesson.filePath.includes('1-AUDIO_ID_AQUI') || lesson.filePath.includes('1-PDF_ID_AQUI')) {
                return `<div class='p-8 text-center'><i class='fas fa-exclamation-triangle text-yellow-400 text-4xl mb-4'></i><p class='text-lg font-bold mb-2'>Arquivo não configurado</p><p class='text-gray-400'>Substitua os IDs de exemplo pelos IDs reais dos seus arquivos no Google Drive</p><p class='text-xs mt-4'>Exemplo: 1-VIDEO_ID_AQUI → 1ABC123DEF456</p></div>`;
            }
            
            switch(lesson.type) {
                case 'video': 
                    return `<video src="${lesson.filePath}" class="w-full h-full" controls preload="metadata" onerror="this.outerHTML = \`${errorHtml}\`"></video>`;
                case 'pdf': 
                    return `<iframe src="${lesson.filePath}" class="w-full h-full border-0" title="${lesson.title}" onerror="this.outerHTML = \`${errorHtml}\`"></iframe>`;
                case 'audio': 
                    return `<div class="p-8 text-center"><i class="fas fa-headphones-alt text-6xl mb-4 text-blue-400"></i><audio src="${lesson.filePath}" class="w-full" controls preload="metadata" onerror="this.parentElement.innerHTML = \`${errorHtml}\`"></audio></div>`;
                default: 
                    return `<p>Tipo de conteúdo inválido.</p>`;
            }
        },

        markLessonAsComplete(courseId, moduleIndex, lessonIndex) {
            const lesson = courseDatabase[courseId].modules[moduleIndex].lessons[lessonIndex];
            if (!this.userData.progress[courseId]) this.userData.progress[courseId] = { completedLessons: [] };
            
            if (!this.userData.progress[courseId].completedLessons.includes(lesson.id)) {
                this.userData.progress[courseId].completedLessons.push(lesson.id);
                this.addXP(lesson.xp, lesson.title);

                if (Object.keys(this.userData.progress).length === 1 && this.userData.progress[courseId].completedLessons.length === 1) {
                    this.unlockAchievement('first_lesson');
                }
                
                this.saveData();
                this.openCourse(courseId);
                setTimeout(() => this.goToNextLesson(courseId, moduleIndex, lessonIndex), 100);
            } else {
                this.goToNextLesson(courseId, moduleIndex, lessonIndex);
            }
        },
        
        addXP(amount, reason) {
            this.userData.xp += amount;
            this.showNotification(`+${amount} XP`, reason, 'xp');
            
            const xpForNextLevel = this.userData.level * 100;
            if (this.userData.xp >= xpForNextLevel) {
                this.userData.level++;
                this.userData.xp -= xpForNextLevel;
                this.userData.title = {2: 'Iniciado', 5: 'Veterano'}[this.userData.level] || this.userData.title;
                this.showNotification(`Nível ${this.userData.level}!`, 'Você subiu de nível!', 'level-up');
                if (this.userData.level === 5) this.unlockAchievement('level_5');
            }
            this.updateHeader();
        },

        unlockAchievement(id) {
            if (!this.userData.achievements[id]?.unlocked) {
                this.userData.achievements[id] = { unlocked: true };
                const achievement = achievementDatabase[id];
                this.showNotification(`Conquista: ${achievement.title}`, achievement.description, 'achievement');
                this.addXP(50, 'Conquista Desbloqueada');
            }
        },
        
        goToNextLesson(courseId, moduleIndex, lessonIndex) {
            const course = courseDatabase[courseId];
            if (lessonIndex < course.modules[moduleIndex].lessons.length - 1) {
                this.renderLessonContent(courseId, moduleIndex, lessonIndex + 1);
            } else if (moduleIndex < course.modules.length - 1) {
                this.renderLessonContent(courseId, moduleIndex + 1, 0);
            } else {
                this.showModal('completion', courseId);
                if (this.calculateCourseProgress(courseId) === 100) {
                    this.unlockAchievement('first_course');
                    if(courseId === 'cs004') this.unlockAchievement('security_badge');
                }
            }
        },
        
        goToPreviousLesson(courseId, moduleIndex, lessonIndex) {
            const course = courseDatabase[courseId];
            if (lessonIndex > 0) {
                this.renderLessonContent(courseId, moduleIndex, lessonIndex - 1);
            } else if (moduleIndex > 0) {
                const prevModule = course.modules[moduleIndex - 1];
                this.renderLessonContent(courseId, moduleIndex - 1, prevModule.lessons.length - 1);
            }
        },

        loadFirstIncompleteLesson(courseId) {
            const course = courseDatabase[courseId];
            for (let m = 0; m < course.modules.length; m++) {
                for (let l = 0; l < course.modules[m].lessons.length; l++) {
                    const lessonId = course.modules[m].lessons[l].id;
                    if (!this.userData.progress[courseId]?.completedLessons.includes(lessonId)) {
                        this.renderLessonContent(courseId, m, l);
                        return;
                    }
                }
            }
            this.renderLessonContent(courseId, 0, 0);
        },
        
        updateCertificateButton(courseId) {
            const button = document.getElementById('certificate-button');
            if (button) button.disabled = this.calculateCourseProgress(courseId) < 100;
        },

        showModal(type, courseId) {
            const modal = document.getElementById('modal');
            const content = document.getElementById('modal-content');
            const course = courseDatabase[courseId];
            
            if (type === 'certificate') {
                const completionDate = new Date().toLocaleDateString('pt-BR');
                content.innerHTML = `<button onclick="veloAcademyApp.closeModal()" class="absolute top-4 right-4 text-gray-400 hover:text-white">&times;</button><div class="mb-4"><i class="fas fa-award text-5xl" style="color: #FF8400;"></i><h2 class="text-3xl font-bold mt-2">Certificado de Conclusão</h2></div><p class="text-gray-300">Este certificado é concedido a</p><p class="text-2xl font-semibold my-4" style="color: #1634FF;">${this.userData.name}</p><p class="text-gray-300">pela conclusão bem-sucedida do curso</p><p class="text-xl font-bold my-4">${course.title}</p><p class="text-sm text-gray-400">Concluído em: ${completionDate}</p>`;
            } else if (type === 'completion') {
                content.innerHTML = `<div class="mb-4"><i class="fas fa-party-horn text-5xl" style="color: #1DFDB9;"></i><h2 class="text-3xl font-bold mt-2">Parabéns!</h2></div><p class="text-gray-300 mb-6">Você concluiu todas as aulas do curso "${course.title}".</p><div class="flex justify-center gap-4"><button class="btn btn-secondary" onclick="veloAcademyApp.closeModal()">Continuar Estudando</button><button class="btn btn-primary" onclick="veloAcademyApp.renderDashboard()">Voltar ao Dashboard</button></div>`;
            } else if (type === 'reset') {
                 content.innerHTML = `<div class="mb-4"><i class="fas fa-exclamation-triangle text-5xl" style="color: #FF8400;"></i><h2 class="text-3xl font-bold mt-2">Atenção</h2></div><p class="text-gray-300 mb-6">Tem a certeza de que deseja reiniciar o progresso do curso "${course.title}"? Esta ação não pode ser desfeita.</p><div class="flex justify-center gap-4"><button class="btn btn-secondary" onclick="veloAcademyApp.closeModal()">Cancelar</button><button class="btn btn-danger" onclick="veloAcademyApp.resetCourseProgress('${courseId}')">Sim, Reiniciar</button></div>`;
            }
            modal.classList.remove('hidden');
            modal.classList.add('flex');
        },

        closeModal() {
            document.getElementById('modal').classList.add('hidden');
        },

        resetCourseProgress(courseId) {
            if (this.userData.progress[courseId]) {
                delete this.userData.progress[courseId];
                this.saveData();
                this.renderDashboard();
                this.closeModal();
                this.showNotification('Progresso reiniciado', `O curso "${courseDatabase[courseId].title}" foi reiniciado.`, 'info');
            }
        },

        calculateCourseProgress(courseId) {
            const course = courseDatabase[courseId];
            const totalLessons = course.modules.reduce((sum, module) => sum + module.lessons.length, 0);
            const completedLessons = this.userData.progress[courseId]?.completedLessons.length || 0;
            return totalLessons === 0 ? 0 : (completedLessons / totalLessons) * 100;
        },

                 showNotification(title, message, type = 'info') {
             const container = document.getElementById('notification-container');
             const icons = { info: 'fas fa-info-circle', success: 'fas fa-check-circle', xp: 'fas fa-star', 'level-up': 'fas fa-arrow-up', achievement: 'fas fa-trophy' };
             const colors = { 
                 info: '#000058', 
                 success: '#1DFDB9', 
                 xp: '#FF8400', 
                 'level-up': '#791DD0', 
                 achievement: '#FF00D7' 
             };
             
             const notif = document.createElement('div');
             notif.style.borderLeftColor = colors[type];
             notif.className = `toast-notification glass-panel p-4 rounded-lg shadow-lg border-l-4 w-80`;
             notif.innerHTML = `<div class="flex items-start space-x-3"><i class="${icons[type]} text-xl mt-1" style="color: ${colors[type]};"></i><div><p class="font-bold">${title}</p><p class="text-sm text-gray-300">${message}</p></div></div>`;
             container.appendChild(notif);
             setTimeout(() => notif.remove(), 5000);
         },

         // === NOVAS FUNCIONALIDADES AVANÇADAS ===
         
         checkAuth() {
             if (!this.userData.email) {
                 this.showAuthModal();
             }
         },

         showAuthModal() {
             document.getElementById('auth-modal').classList.remove('hidden');
             document.getElementById('auth-modal').classList.add('flex');
         },

         hideAuthModal() {
             document.getElementById('auth-modal').classList.add('hidden');
             document.getElementById('auth-modal').classList.remove('flex');
         },

         showLoginForm() {
             document.getElementById('login-form').classList.remove('hidden');
             document.getElementById('register-form').classList.add('hidden');
         },

         showRegisterForm() {
             document.getElementById('login-form').classList.add('hidden');
             document.getElementById('register-form').classList.remove('hidden');
         },

         login() {
             const email = document.getElementById('login-email').value;
             const password = document.getElementById('login-password').value;
             
             if (email && password) {
                 this.userData.email = email;
                 this.userData.name = email.split('@')[0];
                 this.saveData();
                 this.hideAuthModal();
                 this.showNotification('Bem-vindo!', 'Login realizado com sucesso!', 'success');
                 this.renderDashboard();
             } else {
                 this.showNotification('Erro', 'Preencha todos os campos!', 'info');
             }
         },

         register() {
             const name = document.getElementById('register-name').value;
             const email = document.getElementById('register-email').value;
             const password = document.getElementById('register-password').value;
             
             if (name && email && password) {
                 this.userData.name = name;
                 this.userData.email = email;
                 this.userData.joinDate = new Date().toISOString();
                 this.saveData();
                 this.hideAuthModal();
                 this.showNotification('Conta criada!', 'Bem-vindo à VeloAcademy!', 'success');
                 this.renderDashboard();
             } else {
                 this.showNotification('Erro', 'Preencha todos os campos!', 'info');
             }
         },

         logout() {
             this.userData = {
                 name: 'Usuário Demo',
                 email: '',
                 level: 1,
                 xp: 0,
                 title: 'Aprendiz',
                 lastCourse: null,
                 progress: {},
                 achievements: {},
                 theme: 'dark',
                 avatar: 'https://i.pravatar.cc/150?u=demo',
                 joinDate: new Date().toISOString(),
                 totalStudyTime: 0,
                 certificates: []
             };
             this.saveData();
             this.showAuthModal();
             this.showNotification('Logout', 'Você saiu da conta!', 'info');
         },

         showUserMenu() {
             const menu = document.getElementById('user-menu');
             menu.classList.toggle('hidden');
         },

         showProfile() {
             this.showNotification('Perfil', 'Funcionalidade em desenvolvimento!', 'info');
         },

         showSettings() {
             this.showNotification('Configurações', 'Funcionalidade em desenvolvimento!', 'info');
         },

         startStudyTimer() {
             setInterval(() => {
                 if (this.userData.lastCourse) {
                     this.userData.totalStudyTime += 1;
                     this.saveData();
                 }
             }, 60000); // 1 minuto
         },

         generateCertificate(courseId) {
             const course = courseDatabase[courseId];
             const certificate = {
                 id: `cert_${Date.now()}`,
                 courseId: courseId,
                 courseName: course.title,
                 userName: this.userData.name,
                 issueDate: new Date().toISOString(),
                 certificateNumber: `VELO-${Date.now().toString().slice(-6)}`
             };
             
             this.userData.certificates.push(certificate);
             this.saveData();
             
             // Gerar PDF do certificado
             this.downloadCertificate(certificate);
         },

         downloadCertificate(certificate) {
             const content = `
                 <html>
                 <head>
                     <title>Certificado VeloAcademy</title>
                     <style>
                         body { font-family: Arial, sans-serif; text-align: center; padding: 40px; }
                         .certificate { border: 3px solid #1634FF; padding: 40px; max-width: 800px; margin: 0 auto; }
                         .logo { font-size: 48px; color: #1634FF; margin-bottom: 20px; }
                         .title { font-size: 36px; color: #000058; margin-bottom: 30px; }
                         .name { font-size: 28px; color: #1634FF; margin-bottom: 20px; }
                         .course { font-size: 24px; color: #272A30; margin-bottom: 30px; }
                         .date { font-size: 18px; color: #666; }
                         .number { font-size: 14px; color: #999; margin-top: 20px; }
                     </style>
                 </head>
                 <body>
                     <div class="certificate">
                         <div class="logo">🎓</div>
                         <div class="title">Certificado de Conclusão</div>
                         <div class="name">${certificate.userName}</div>
                         <div class="course">${certificate.courseName}</div>
                         <div class="date">Concluído em: ${new Date(certificate.issueDate).toLocaleDateString('pt-BR')}</div>
                         <div class="number">Número: ${certificate.certificateNumber}</div>
                     </div>
                 </body>
                 </html>
             `;
             
             const blob = new Blob([content], { type: 'text/html' });
             const url = URL.createObjectURL(blob);
             const a = document.createElement('a');
             a.href = url;
             a.download = `certificado_${certificate.courseName.replace(/\s+/g, '_')}.html`;
             a.click();
             URL.revokeObjectURL(url);
         }
    };

    veloAcademyApp.init();
    </script>
</body>
</html>
