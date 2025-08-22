// Configurações do Sistema VeloAcademy
const VELOACADEMY_CONFIG = {
    // Configurações da aplicação
    app: {
        name: "VeloAcademy",
        version: "2.0.0",
        description: "Sistema de Treinamento Corporativo",
        company: "Velotax",
        website: "https://velotax.com.br"
    },

    // Configurações de tema
    theme: {
        default: "light", // light ou dark
        autoSwitch: false, // alternância automática baseada na hora
        autoSwitchTime: {
            light: "06:00", // hora para mudar para tema claro
            dark: "18:00"   // hora para mudar para tema escuro
        }
    },

    // Configurações de filtros
    filters: {
        searchDelay: 300, // delay em ms para busca
        maxResults: 50,    // máximo de resultados exibidos
        defaultCategory: "all",
        defaultLevel: "all",
        defaultDuration: "all",
        defaultRating: "all"
    },

    // Configurações de cursos
    courses: {
        itemsPerPage: 12,
        showProgress: true,
        showRatings: true,
        showEnrollment: true,
        showInstructor: true
    },

    // Configurações de módulos
    modules: {
        showDuration: true,
        showProgress: true,
        autoSave: true,
        saveInterval: 5000 // salvar progresso a cada 5 segundos
    },

    // Configurações de localStorage
    storage: {
        prefix: "veloacademy_",
        expiration: 30 * 24 * 60 * 60 * 1000, // 30 dias em ms
        keys: {
            theme: "theme",
            progress: "courseProgress",
            preferences: "userPreferences",
            lastVisit: "lastVisit"
        }
    },

    // Configurações de animações
    animations: {
        enabled: true,
        duration: 300,
        easing: "ease-in-out",
        hoverEffects: true,
        transitions: true
    },

    // Configurações de responsividade
    responsive: {
        breakpoints: {
            mobile: 480,
            tablet: 768,
            desktop: 1024,
            large: 1200
        },
        mobileFirst: true
    },

    // Configurações de acessibilidade
    accessibility: {
        enableARIA: true,
        keyboardNavigation: true,
        screenReaderSupport: true,
        highContrast: false,
        fontSize: "medium" // small, medium, large
    },

    // Configurações de performance
    performance: {
        lazyLoading: true,
        imageOptimization: true,
        cacheEnabled: true,
        debounceSearch: true
    },

    // Configurações de analytics
    analytics: {
        enabled: false,
        trackPageViews: true,
        trackUserActions: true,
        trackProgress: true
    },

    // Mensagens do sistema
    messages: {
        errors: {
            loadCourses: "Erro ao carregar os cursos. Tente novamente.",
            saveProgress: "Erro ao salvar o progresso.",
            networkError: "Erro de conexão. Verifique sua internet.",
            general: "Ocorreu um erro inesperado."
        },
        success: {
            progressSaved: "Progresso salvo com sucesso!",
            courseShared: "Curso compartilhado com sucesso!",
            themeChanged: "Tema alterado com sucesso!"
        },
        info: {
            noCourses: "Nenhum curso encontrado.",
            noResults: "Nenhum resultado para sua busca.",
            loading: "Carregando cursos..."
        }
    },

    // Configurações de idioma
    language: {
        default: "pt-BR",
        supported: ["pt-BR", "en-US", "es-ES"],
        fallback: "pt-BR"
    },

    // Configurações de compartilhamento
    sharing: {
        enabled: true,
        platforms: ["whatsapp", "telegram", "email", "copy"],
        defaultPlatform: "copy"
    }
};

// Função para obter configuração
function getConfig(key) {
    const keys = key.split('.');
    let value = VELOACADEMY_CONFIG;
    
    for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
            value = value[k];
        } else {
            return undefined;
        }
    }
    
    return value;
}

// Função para definir configuração
function setConfig(key, value) {
    const keys = key.split('.');
    let config = VELOACADEMY_CONFIG;
    
    for (let i = 0; i < keys.length - 1; i++) {
        if (!(keys[i] in config)) {
            config[keys[i]] = {};
        }
        config = config[keys[i]];
    }
    
    config[keys[keys.length - 1]] = value;
}

// Função para resetar configurações
function resetConfig() {
    // Recarrega as configurações padrão
    location.reload();
}

// Função para salvar configurações no localStorage
function saveConfigToStorage() {
    try {
        localStorage.setItem(
            VELOACADEMY_CONFIG.storage.prefix + 'config',
            JSON.stringify(VELOACADEMY_CONFIG)
        );
        return true;
    } catch (error) {
        console.error('Erro ao salvar configurações:', error);
        return false;
    }
}

// Função para carregar configurações do localStorage
function loadConfigFromStorage() {
    try {
        const savedConfig = localStorage.getItem(
            VELOACADEMY_CONFIG.storage.prefix + 'config'
        );
        if (savedConfig) {
            const parsed = JSON.parse(savedConfig);
            Object.assign(VELOACADEMY_CONFIG, parsed);
            return true;
        }
        return false;
    } catch (error) {
        console.error('Erro ao carregar configurações:', error);
        return false;
    }
}

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.VELOACADEMY_CONFIG = VELOACADEMY_CONFIG;
    window.getConfig = getConfig;
    window.setConfig = setConfig;
    window.resetConfig = resetConfig;
    window.saveConfigToStorage = saveConfigToStorage;
    window.loadConfigFromStorage = loadConfigFromStorage;
}
