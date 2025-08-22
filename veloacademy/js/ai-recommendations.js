// Sistema de IA para Recomendações Inteligentes - VeloAcademy ULTIMATE
class VeloAcademyAI {
    constructor() {
        this.userProfile = {
            interests: [],
            learningStyle: 'visual', // visual, auditory, kinesthetic
            preferredDuration: 'medium',
            difficultyPreference: 'balanced',
            studyTime: 'evening',
            completionRate: 0,
            favoriteCategories: [],
            learningGoals: []
        };
        
        this.recommendationEngine = {
            weights: {
                category: 0.3,
                difficulty: 0.25,
                duration: 0.2,
                rating: 0.15,
                popularity: 0.1
            },
            algorithms: {
                collaborative: true,
                contentBased: true,
                hybrid: true
            }
        };
        
        this.init();
    }
    
    init() {
        this.loadUserProfile();
        this.analyzeUserBehavior();
        this.startLearningPatternAnalysis();
    }
    
    loadUserProfile() {
        const savedProfile = localStorage.getItem('veloacademy_userProfile');
        if (savedProfile) {
            this.userProfile = { ...this.userProfile, ...JSON.parse(savedProfile) };
        }
    }
    
    saveUserProfile() {
        localStorage.setItem('veloacademy_userProfile', JSON.stringify(this.userProfile));
    }
    
    analyzeUserBehavior() {
        // Analisar progresso dos cursos
        const courseProgress = JSON.parse(localStorage.getItem('courseProgress') || '[]');
        const completedCourses = courseProgress.filter(course => 
            course.modules.every(module => module.completed)
        );
        
        // Calcular taxa de conclusão
        this.userProfile.completionRate = courseProgress.length > 0 ? 
            (completedCourses.length / courseProgress.length) * 100 : 0;
        
        // Analisar categorias favoritas
        this.analyzeCategoryPreferences();
        
        // Analisar padrões de estudo
        this.analyzeStudyPatterns();
        
        // Salvar perfil atualizado
        this.saveUserProfile();
    }
    
    analyzeCategoryPreferences() {
        const courseProgress = JSON.parse(localStorage.getItem('courseProgress') || '[]');
        const categoryStats = {};
        
        courseProgress.forEach(course => {
            const category = course.category;
            if (!categoryStats[category]) {
                categoryStats[category] = { total: 0, completed: 0, timeSpent: 0 };
            }
            
            categoryStats[category].total++;
            if (course.modules.every(m => m.completed)) {
                categoryStats[category].completed++;
            }
        });
        
        // Ordenar por taxa de conclusão
        const sortedCategories = Object.entries(categoryStats)
            .sort(([,a], [,b]) => (b.completed / b.total) - (a.completed / a.total));
        
        this.userProfile.favoriteCategories = sortedCategories.slice(0, 3).map(([category]) => category);
    }
    
    analyzeStudyPatterns() {
        const studySessions = JSON.parse(localStorage.getItem('veloacademy_studySessions') || '[]');
        
        if (studySessions.length > 0) {
            const timeDistribution = {};
            
            studySessions.forEach(session => {
                const hour = new Date(session.startTime).getHours();
                const timeSlot = this.getTimeSlot(hour);
                timeDistribution[timeSlot] = (timeDistribution[timeSlot] || 0) + session.duration;
            });
            
            // Determinar horário preferido
            const preferredTime = Object.entries(timeDistribution)
                .sort(([,a], [,b]) => b - a)[0][0];
            
            this.userProfile.studyTime = preferredTime;
        }
    }
    
    getTimeSlot(hour) {
        if (hour >= 5 && hour < 12) return 'morning';
        if (hour >= 12 && hour < 17) return 'afternoon';
        if (hour >= 17 && hour < 22) return 'evening';
        return 'night';
    }
    
    startLearningPatternAnalysis() {
        // Analisar padrões de aprendizado em tempo real
        setInterval(() => {
            this.updateLearningRecommendations();
        }, 60000); // A cada minuto
    }
    
    updateLearningRecommendations() {
        // Atualizar recomendações baseadas no comportamento atual
        this.analyzeUserBehavior();
        this.generatePersonalizedRecommendations();
    }
    
    generatePersonalizedRecommendations() {
        const recommendations = {
            nextCourse: this.recommendNextCourse(),
            studyTips: this.generateStudyTips(),
            learningPath: this.suggestLearningPath(),
            timeOptimization: this.suggestOptimalStudyTime()
        };
        
        this.displayRecommendations(recommendations);
        return recommendations;
    }
    
    recommendNextCourse() {
        const allCourses = window.veloacademyCourses || [];
        if (!allCourses.length) return null;
        
        const scoredCourses = allCourses.map(course => {
            let score = 0;
            
            // Score baseado na categoria favorita
            if (this.userProfile.favoriteCategories.includes(course.category)) {
                score += this.recommendationEngine.weights.category * 100;
            }
            
            // Score baseado na dificuldade
            const difficultyScore = this.calculateDifficultyScore(course.level);
            score += this.recommendationEngine.weights.difficulty * difficultyScore;
            
            // Score baseado na duração
            const durationScore = this.calculateDurationScore(course.duration);
            score += this.recommendationEngine.weights.duration * durationScore;
            
            // Score baseado na avaliação
            score += this.recommendationEngine.weights.rating * (course.rating * 20);
            
            // Score baseado na popularidade
            score += this.recommendationEngine.weights.popularity * (course.enrolled / 100);
            
            return { course, score };
        });
        
        // Ordenar por score e retornar o melhor
        scoredCourses.sort((a, b) => b.score - a.score);
        return scoredCourses[0]?.course || null;
    }
    
    calculateDifficultyScore(level) {
        const difficultyMap = { 'Iniciante': 100, 'Intermediário': 80, 'Avançado': 60 };
        const userLevel = this.userProfile.difficultyPreference;
        
        if (userLevel === 'balanced') return difficultyMap[level];
        if (userLevel === 'challenging' && level === 'Avançado') return 100;
        if (userLevel === 'comfortable' && level === 'Iniciante') return 100;
        
        return difficultyMap[level] * 0.7;
    }
    
    calculateDurationScore(duration) {
        const hours = parseInt(duration);
        const preference = this.userProfile.preferredDuration;
        
        if (preference === 'short' && hours <= 8) return 100;
        if (preference === 'medium' && hours > 8 && hours <= 15) return 100;
        if (preference === 'long' && hours > 15) return 100;
        
        return 60; // Score base para duração não preferida
    }
    
    generateStudyTips() {
        const tips = [];
        
        // Dicas baseadas no estilo de aprendizado
        if (this.userProfile.learningStyle === 'visual') {
            tips.push('Use mapas mentais para organizar conceitos');
            tips.push('Assista vídeos explicativos antes de ler');
            tips.push('Crie diagramas para processos complexos');
        } else if (this.userProfile.learningStyle === 'auditory') {
            tips.push('Leia em voz alta para melhor compreensão');
            tips.push('Use podcasts relacionados ao tema');
            tips.push('Discuta conceitos com colegas');
        } else {
            tips.push('Pratique com exercícios hands-on');
            tips.push('Crie projetos práticos');
            tips.push('Use flashcards para memorização');
        }
        
        // Dicas baseadas na taxa de conclusão
        if (this.userProfile.completionRate < 50) {
            tips.push('Estabeleça metas menores e mais realistas');
            tips.push('Estude em sessões mais curtas');
            tips.push('Celebre pequenas conquistas');
        }
        
        return tips;
    }
    
    suggestLearningPath() {
        const paths = {
            'Programação': ['JavaScript Básico', 'HTML/CSS', 'Python', 'Node.js', 'React'],
            'Design': ['UX/UI Básico', 'Figma', 'Prototipagem', 'Design System', 'User Research'],
            'Data Science': ['Python Básico', 'Pandas', 'Machine Learning', 'Deep Learning', 'Big Data'],
            'DevOps': ['Git', 'Docker', 'CI/CD', 'Kubernetes', 'Cloud Computing']
        };
        
        const userPath = this.userProfile.favoriteCategories[0];
        return paths[userPath] || paths['Programação'];
    }
    
    suggestOptimalStudyTime() {
        const timeSlots = {
            'morning': '5h - 12h',
            'afternoon': '12h - 17h',
            'evening': '17h - 22h',
            'night': '22h - 5h'
        };
        
        const optimalTime = timeSlots[this.userProfile.studyTime];
        return `Seu horário de estudo mais produtivo é: ${optimalTime}`;
    }
    
    displayRecommendations(recommendations) {
        // Criar ou atualizar painel de recomendações
        let recommendationPanel = document.querySelector('.ai-recommendations');
        
        if (!recommendationPanel) {
            recommendationPanel = document.createElement('div');
            recommendationPanel.className = 'ai-recommendations';
            document.querySelector('#dashboard-view').appendChild(recommendationPanel);
        }
        
        recommendationPanel.innerHTML = `
            <div class="ai-header">
                <i class='bx bx-brain'></i>
                <h3>Recomendações Inteligentes</h3>
            </div>
            
            <div class="ai-content">
                ${recommendations.nextCourse ? `
                    <div class="recommendation-card next-course">
                        <h4>🎯 Próximo Curso Recomendado</h4>
                        <div class="course-suggestion">
                            <h5>${recommendations.nextCourse.title}</h5>
                            <p>${recommendations.nextCourse.description}</p>
                            <div class="course-meta">
                                <span class="level">${recommendations.nextCourse.level}</span>
                                <span class="duration">${recommendations.nextCourse.duration}</span>
                                <span class="rating">⭐ ${recommendations.nextCourse.rating}</span>
                            </div>
                            <button onclick="startRecommendedCourse(${recommendations.nextCourse.id})" class="btn-start-course">
                                Começar Agora
                            </button>
                        </div>
                    </div>
                ` : ''}
                
                <div class="recommendation-card study-tips">
                    <h4>💡 Dicas de Estudo Personalizadas</h4>
                    <ul>
                        ${recommendations.studyTips.map(tip => `<li>${tip}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="recommendation-card learning-path">
                    <h4>🗺️ Caminho de Aprendizado Sugerido</h4>
                    <div class="path-steps">
                        ${recommendations.learningPath.map((step, index) => `
                            <div class="path-step ${index === 0 ? 'current' : ''}">
                                <span class="step-number">${index + 1}</span>
                                <span class="step-name">${step}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="recommendation-card time-optimization">
                    <h4>⏰ Otimização de Tempo</h4>
                    <p>${recommendations.timeOptimization}</p>
                </div>
            </div>
        `;
    }
    
    // Métodos para integração com o sistema principal
    onCourseStart(courseId) {
        this.recordStudySession(courseId, 'start');
    }
    
    onCourseComplete(courseId) {
        this.recordStudySession(courseId, 'complete');
        this.updateLearningGoals(courseId);
    }
    
    onModuleComplete(courseId, moduleIndex) {
        this.recordStudySession(courseId, 'module');
    }
    
    recordStudySession(courseId, action) {
        const sessions = JSON.parse(localStorage.getItem('veloacademy_studySessions') || '[]');
        const currentTime = new Date().toISOString();
        
        if (action === 'start') {
            sessions.push({
                courseId,
                startTime: currentTime,
                action: 'start'
            });
        } else if (action === 'complete' || action === 'module') {
            const lastSession = sessions.find(s => s.courseId === courseId && s.action === 'start');
            if (lastSession) {
                lastSession.endTime = currentTime;
                lastSession.duration = new Date(currentTime) - new Date(lastSession.startTime);
                lastSession.action = action;
            }
        }
        
        localStorage.setItem('veloacademy_studySessions', JSON.stringify(sessions));
    }
    
    updateLearningGoals(courseId) {
        const goals = this.userProfile.learningGoals;
        const completedGoal = goals.find(goal => goal.courseId === courseId);
        
        if (completedGoal) {
            completedGoal.completed = true;
            completedGoal.completionDate = new Date().toISOString();
            this.saveUserProfile();
        }
    }
    
    // Métodos para configuração do usuário
    setLearningStyle(style) {
        this.userProfile.learningStyle = style;
        this.saveUserProfile();
        this.generatePersonalizedRecommendations();
    }
    
    setDifficultyPreference(preference) {
        this.userProfile.difficultyPreference = preference;
        this.saveUserProfile();
        this.generatePersonalizedRecommendations();
    }
    
    setPreferredDuration(duration) {
        this.userProfile.preferredDuration = duration;
        this.saveUserProfile();
        this.generatePersonalizedRecommendations();
    }
    
    addLearningGoal(goal) {
        this.userProfile.learningGoals.push({
            id: Date.now(),
            description: goal,
            courseId: null,
            completed: false,
            createdAt: new Date().toISOString()
        });
        this.saveUserProfile();
    }
}

// Função global para iniciar curso recomendado
window.startRecommendedCourse = function(courseId) {
    // Implementar lógica para iniciar o curso recomendado
    console.log('Iniciando curso recomendado:', courseId);
    // Aqui você pode integrar com o sistema principal
};

// Exportar para uso global
window.VeloAcademyAI = VeloAcademyAI;
