// Sistema de Gamificação VeloAcademy ULTIMATE
class VeloAcademyGamification {
    constructor() {
        this.user = {
            level: 1,
            experience: 0,
            points: 0,
            achievements: [],
            streak: 0,
            lastLogin: null,
            badges: [],
            rank: 'Iniciante'
        };
        
        this.achievements = {
            firstCourse: { id: 'firstCourse', name: 'Primeiro Passo', description: 'Complete seu primeiro curso', points: 100, icon: 'bx-trophy' },
            perfectScore: { id: 'perfectScore', name: 'Perfeição', description: 'Complete um curso com 100%', points: 200, icon: 'bx-star' },
            streak7: { id: 'streak7', name: 'Consistente', description: '7 dias seguidos de estudo', points: 150, icon: 'bx-fire' },
            speedLearner: { id: 'speedLearner', name: 'Aprendiz Rápido', description: 'Complete 3 cursos em uma semana', points: 300, icon: 'bx-rocket' },
            mentor: { id: 'mentor', name: 'Mentor', description: 'Ajude 5 outros alunos', points: 500, icon: 'bx-user-check' },
            nightOwl: { id: 'nightOwl', name: 'Coruja Noturna', description: 'Estude após 22h por 5 dias', points: 200, icon: 'bx-moon' },
            earlyBird: { id: 'earlyBird', name: 'Madrugador', description: 'Estude antes das 8h por 5 dias', points: 200, icon: 'bx-sun' },
            weekendWarrior: { id: 'weekendWarrior', name: 'Guerreiro do Fim de Semana', description: 'Complete módulos em 3 fins de semana', points: 250, icon: 'bx-calendar-check' },
            socialButterfly: { id: 'socialButterfly', name: 'Borboleta Social', description: 'Compartilhe 10 cursos', points: 150, icon: 'bx-share-alt' },
            perfectionist: { id: 'perfectionist', name: 'Perfeccionista', description: 'Complete todos os cursos disponíveis', points: 1000, icon: 'bx-crown' }
        };
        
        this.ranks = [
            { name: 'Iniciante', minPoints: 0, color: '#6c757d', icon: 'bx-user' },
            { name: 'Estudante', minPoints: 500, color: '#28a745', icon: 'bx-book-open' },
            { name: 'Aprendiz', minPoints: 1000, color: '#17a2b8', icon: 'bx-graduation' },
            { name: 'Especialista', minPoints: 2000, color: '#ffc107', icon: 'bx-medal' },
            { name: 'Mestre', minPoints: 3500, color: '#fd7e14', icon: 'bx-trophy' },
            { name: 'Lenda', minPoints: 5000, color: '#dc3545', icon: 'bx-crown' },
            { name: 'Deus do Conhecimento', minPoints: 10000, color: '#6f42c1', icon: 'bx-diamond' }
        ];
        
        this.init();
    }
    
    init() {
        this.loadUserData();
        this.checkDailyStreak();
        this.renderGamificationUI();
        this.startProgressTracking();
    }
    
    loadUserData() {
        const savedData = localStorage.getItem('veloacademy_gamification');
        if (savedData) {
            this.user = { ...this.user, ...JSON.parse(savedData) };
        }
    }
    
    saveUserData() {
        localStorage.setItem('veloacademy_gamification', JSON.stringify(this.user));
    }
    
    addExperience(amount, reason = '') {
        this.user.experience += amount;
        this.user.points += amount;
        
        // Verificar level up
        const newLevel = Math.floor(this.user.experience / 100) + 1;
        if (newLevel > this.user.level) {
            this.levelUp(newLevel);
        }
        
        // Verificar rank up
        this.checkRankUp();
        
        // Salvar dados
        this.saveUserData();
        
        // Mostrar notificação
        this.showExperienceNotification(amount, reason);
        
        // Atualizar UI
        this.updateGamificationUI();
    }
    
    levelUp(newLevel) {
        const oldLevel = this.user.level;
        this.user.level = newLevel;
        
        // Mostrar animação de level up
        this.showLevelUpAnimation(oldLevel, newLevel);
        
        // Verificar conquistas relacionadas ao nível
        this.checkLevelAchievements(newLevel);
    }
    
    checkRankUp() {
        const currentRank = this.ranks.find(rank => rank.minPoints <= this.user.points && 
            (rank.minPoints === this.user.points || 
             this.ranks.indexOf(rank) === this.ranks.length - 1 || 
             this.ranks[this.ranks.indexOf(rank) + 1].minPoints > this.user.points));
        
        if (currentRank && currentRank.name !== this.user.rank) {
            const oldRank = this.user.rank;
            this.user.rank = currentRank.name;
            this.showRankUpAnimation(oldRank, currentRank.name);
        }
    }
    
    unlockAchievement(achievementId) {
        if (!this.user.achievements.includes(achievementId)) {
            this.user.achievements.push(achievementId);
            const achievement = this.achievements[achievementId];
            
            // Adicionar pontos da conquista
            this.addExperience(achievement.points, `Conquista: ${achievement.name}`);
            
            // Mostrar animação da conquista
            this.showAchievementUnlock(achievement);
            
            // Salvar dados
            this.saveUserData();
        }
    }
    
    checkDailyStreak() {
        const today = new Date().toDateString();
        const lastLogin = this.user.lastLogin ? new Date(this.user.lastLogin).toDateString() : null;
        
        if (lastLogin !== today) {
            if (lastLogin === new Date(Date.now() - 24 * 60 * 60 * 1000).toDateString()) {
                // Login consecutivo
                this.user.streak++;
                if (this.user.streak === 7) {
                    this.unlockAchievement('streak7');
                }
            } else if (lastLogin !== today) {
                // Quebra da sequência
                this.user.streak = 1;
            }
            
            this.user.lastLogin = new Date().toISOString();
            this.saveUserData();
        }
    }
    
    renderGamificationUI() {
        const header = document.querySelector('header');
        if (header && !document.querySelector('.gamification-header')) {
            const gamificationHeader = document.createElement('div');
            gamificationHeader.className = 'gamification-header';
            gamificationHeader.innerHTML = `
                <div class="gamification-stats">
                    <div class="level-info">
                        <div class="level-circle">
                            <span class="level-number">${this.user.level}</span>
                        </div>
                        <div class="level-details">
                            <span class="rank-name">${this.user.rank}</span>
                            <div class="experience-bar">
                                <div class="experience-fill" style="width: ${(this.user.experience % 100)}%"></div>
                            </div>
                            <span class="experience-text">${this.user.experience % 100}/100 XP</span>
                        </div>
                    </div>
                    <div class="points-info">
                        <i class='bx bx-coins'></i>
                        <span>${this.user.points}</span>
                    </div>
                    <div class="streak-info">
                        <i class='bx bx-fire'></i>
                        <span>${this.user.streak}</span>
                    </div>
                </div>
            `;
            
            header.appendChild(gamificationHeader);
        }
    }
    
    updateGamificationUI() {
        const levelNumber = document.querySelector('.level-number');
        const rankName = document.querySelector('.rank-name');
        const experienceFill = document.querySelector('.experience-fill');
        const experienceText = document.querySelector('.experience-text');
        const pointsInfo = document.querySelector('.points-info span');
        const streakInfo = document.querySelector('.streak-info span');
        
        if (levelNumber) levelNumber.textContent = this.user.level;
        if (rankName) rankName.textContent = this.user.rank;
        if (experienceFill) experienceFill.style.width = `${(this.user.experience % 100)}%`;
        if (experienceText) experienceText.textContent = `${this.user.experience % 100}/100 XP`;
        if (pointsInfo) pointsInfo.textContent = this.user.points;
        if (streakInfo) streakInfo.textContent = this.user.streak;
    }
    
    showExperienceNotification(amount, reason) {
        const notification = document.createElement('div');
        notification.className = 'experience-notification';
        notification.innerHTML = `
            <div class="exp-content">
                <i class='bx bx-plus-circle'></i>
                <div class="exp-details">
                    <span class="exp-amount">+${amount} XP</span>
                    <span class="exp-reason">${reason}</span>
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => notification.classList.add('show'), 100);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    showLevelUpAnimation(oldLevel, newLevel) {
        const levelUpModal = document.createElement('div');
        levelUpModal.className = 'level-up-modal';
        levelUpModal.innerHTML = `
            <div class="level-up-content">
                <div class="level-up-icon">
                    <i class='bx bx-trophy'></i>
                </div>
                <h2>🎉 LEVEL UP! 🎉</h2>
                <p>Você subiu do nível <strong>${oldLevel}</strong> para o nível <strong>${newLevel}</strong>!</p>
                <div class="level-up-rewards">
                    <div class="reward-item">
                        <i class='bx bx-star'></i>
                        <span>Novas conquistas disponíveis!</span>
                    </div>
                    <div class="reward-item">
                        <i class='bx bx-gift'></i>
                        <span>+50 pontos bônus!</span>
                    </div>
                </div>
                <button class="btn-continue">Continuar</button>
            </div>
        `;
        
        document.body.appendChild(levelUpModal);
        
        // Adicionar pontos bônus
        this.addExperience(50, 'Bônus de Level Up');
        
        // Event listener para fechar
        levelUpModal.querySelector('.btn-continue').addEventListener('click', () => {
            levelUpModal.classList.add('fade-out');
            setTimeout(() => levelUpModal.remove(), 300);
        });
        
        // Auto-close após 5 segundos
        setTimeout(() => {
            if (levelUpModal.parentNode) {
                levelUpModal.classList.add('fade-out');
                setTimeout(() => levelUpModal.remove(), 300);
            }
        }, 5000);
    }
    
    showRankUpAnimation(oldRank, newRank) {
        const rankUpModal = document.createElement('div');
        rankUpModal.className = 'rank-up-modal';
        rankUpModal.innerHTML = `
            <div class="rank-up-content">
                <div class="rank-up-icon">
                    <i class='bx bx-crown'></i>
                </div>
                <h2>👑 NOVO RANK! 👑</h2>
                <p>Parabéns! Você foi promovido de <strong>${oldRank}</strong> para <strong>${newRank}</strong>!</p>
                <div class="rank-up-benefits">
                    <div class="benefit-item">
                        <i class='bx bx-medal'></i>
                        <span>Novos badges disponíveis</span>
                    </div>
                    <div class="benefit-item">
                        <i class='bx bx-gift'></i>
                        <span>+100 pontos bônus!</span>
                    </div>
                </div>
                <button class="btn-continue">Continuar</button>
            </div>
        `;
        
        document.body.appendChild(rankUpModal);
        
        // Adicionar pontos bônus
        this.addExperience(100, 'Bônus de Rank Up');
        
        // Event listener para fechar
        rankUpModal.querySelector('.btn-continue').addEventListener('click', () => {
            rankUpModal.classList.add('fade-out');
            setTimeout(() => rankUpModal.remove(), 300);
        });
        
        // Auto-close após 6 segundos
        setTimeout(() => {
            if (rankUpModal.parentNode) {
                rankUpModal.classList.add('fade-out');
                setTimeout(() => rankUpModal.remove(), 300);
            }
        }, 6000);
    }
    
    showAchievementUnlock(achievement) {
        const achievementModal = document.createElement('div');
        achievementModal.className = 'achievement-modal';
        achievementModal.innerHTML = `
            <div class="achievement-content">
                <div class="achievement-icon">
                    <i class='bx ${achievement.icon}'></i>
                </div>
                <h3>🏆 Nova Conquista!</h3>
                <h4>${achievement.name}</h4>
                <p>${achievement.description}</p>
                <div class="achievement-reward">
                    <i class='bx bx-coins'></i>
                    <span>+${achievement.points} pontos</span>
                </div>
                <button class="btn-continue">Continuar</button>
            </div>
        `;
        
        document.body.appendChild(achievementModal);
        
        // Event listener para fechar
        achievementModal.querySelector('.btn-continue').addEventListener('click', () => {
            achievementModal.classList.add('fade-out');
            setTimeout(() => achievementModal.remove(), 300);
        });
        
        // Auto-close após 4 segundos
        setTimeout(() => {
            if (achievementModal.parentNode) {
                achievementModal.classList.add('fade-out');
                setTimeout(() => achievementModal.remove(), 300);
            }
        }, 4000);
    }
    
    startProgressTracking() {
        // Verificar conquistas baseadas em progresso
        setInterval(() => {
            this.checkProgressAchievements();
        }, 30000); // Verificar a cada 30 segundos
    }
    
    checkProgressAchievements() {
        // Verificar conquistas baseadas no progresso dos cursos
        const courseProgress = JSON.parse(localStorage.getItem('courseProgress') || '[]');
        
        if (courseProgress.length > 0 && !this.user.achievements.includes('firstCourse')) {
            this.unlockAchievement('firstCourse');
        }
        
        // Verificar conquista de perfeição
        const perfectCourses = courseProgress.filter(course => {
            const totalModules = course.modules.length;
            const completedModules = course.modules.filter(m => m.completed).length;
            return totalModules > 0 && totalModules === completedModules;
        });
        
        if (perfectCourses.length > 0 && !this.user.achievements.includes('perfectScore')) {
            this.unlockAchievement('perfectScore');
        }
    }
    
    // Métodos para integração com o sistema principal
    onCourseComplete(courseId) {
        this.addExperience(50, 'Curso Completo');
        this.checkProgressAchievements();
    }
    
    onModuleComplete(courseId, moduleIndex) {
        this.addExperience(10, 'Módulo Completo');
    }
    
    onCourseShare(courseId) {
        this.addExperience(5, 'Compartilhamento');
        this.checkSocialAchievements();
    }
    
    checkSocialAchievements() {
        // Verificar conquistas sociais
        const shareCount = parseInt(localStorage.getItem('veloacademy_shareCount') || '0');
        if (shareCount >= 10 && !this.user.achievements.includes('socialButterfly')) {
            this.unlockAchievement('socialButterfly');
        }
    }
}

// Exportar para uso global
window.VeloAcademyGamification = VeloAcademyGamification;
