// Velotax Academy - Configuração Centralizada
const VelotaxAcademyConfig = {
    // Informações da Academia
    academy: {
        name: "Velotax Academy",
        slogan: "Transformando Conhecimento em Resultados",
        description: "Plataforma de treinamento corporativo da Velotax, especializada em desenvolvimento de software, gestão de projetos e inovação tecnológica.",
        logo: {
            icon: "fas fa-graduation-cap",
            colors: {
                primary: "#1e40af",      // Azul Velotax
                secondary: "#3b82f6",    // Azul mais claro
                accent: "#f59e0b",       // Laranja para destaque
                success: "#10b981",      // Verde para sucesso
                warning: "#f59e0b",      // Laranja para alertas
                error: "#ef4444"         // Vermelho para erros
            }
        }
    },

    // Categorias de Cursos
    categories: [
        {
            id: "desenvolvimento",
            name: "Desenvolvimento de Software",
            icon: "fas fa-code",
            description: "Cursos de programação, frameworks e tecnologias modernas",
            color: "#1e40af",
            count: 12
        },
        {
            id: "gestao",
            name: "Gestão de Projetos",
            icon: "fas fa-tasks",
            description: "Metodologias ágeis, planejamento e execução de projetos",
            color: "#3b82f6",
            count: 8
        },
        {
            id: "dados",
            name: "Ciência de Dados",
            icon: "fas fa-chart-line",
            description: "Análise de dados, machine learning e business intelligence",
            color: "#10b981",
            count: 6
        },
        {
            id: "cloud",
            name: "Cloud Computing",
            icon: "fas fa-cloud",
            description: "AWS, Azure, Google Cloud e arquiteturas em nuvem",
            color: "#8b5cf6",
            count: 5
        },
        {
            id: "seguranca",
            name: "Segurança da Informação",
            icon: "fas fa-shield-alt",
            description: "Cybersecurity, proteção de dados e compliance",
            color: "#ef4444",
            count: 4
        }
    ],

    // Cursos Disponíveis
    courses: [
        {
            id: "js-avancado",
            title: "JavaScript Avançado e ES6+",
            category: "desenvolvimento",
            instructor: "Carlos Mendes",
            duration: "40 horas",
            level: "Avançado",
            rating: 4.8,
            students: 1247,
            price: "R$ 297,00",
            description: "Domine JavaScript moderno com ES6+, async/await, módulos e padrões avançados de programação.",
            modules: [
                "ES6+ Features e Sintaxe Moderna",
                "Programação Assíncrona com Promises",
                "Módulos ES6 e Bundlers",
                "Padrões de Design em JavaScript",
                "Testes e Debugging Avançado"
            ],
            skills: ["JavaScript", "ES6+", "Async Programming", "Modules", "Testing"]
        },
        {
            id: "react-completo",
            title: "React.js Completo: Do Básico ao Avançado",
            category: "desenvolvimento",
            instructor: "Ana Silva",
            duration: "60 horas",
            level: "Intermediário",
            rating: 4.9,
            students: 2156,
            price: "R$ 397,00",
            description: "Aprenda React.js desde os conceitos fundamentais até técnicas avançadas de otimização.",
            modules: [
                "Fundamentos do React e JSX",
                "Hooks e Componentes Funcionais",
                "Gerenciamento de Estado com Context e Redux",
                "Roteamento e Navegação",
                "Testes e Deploy em Produção"
            ],
            skills: ["React", "JavaScript", "JSX", "Hooks", "Redux", "Testing"]
        },
        {
            id: "node-express",
            title: "Node.js e Express.js para Backend",
            category: "desenvolvimento",
            instructor: "Roberto Lima",
            duration: "50 horas",
            level: "Intermediário",
            rating: 4.7,
            students: 892,
            price: "R$ 347,00",
            description: "Construa APIs robustas e escaláveis com Node.js, Express e MongoDB.",
            modules: [
                "Fundamentos do Node.js e NPM",
                "Express.js e Middleware",
                "Autenticação e Autorização",
                "Integração com Bancos de Dados",
                "Deploy e Monitoramento"
            ],
            skills: ["Node.js", "Express", "JavaScript", "APIs", "MongoDB"]
        },
        {
            id: "scrum-master",
            title: "Certificação Scrum Master",
            category: "gestao",
            instructor: "Patrícia Santos",
            duration: "35 horas",
            level: "Intermediário",
            rating: 4.8,
            students: 567,
            price: "R$ 497,00",
            description: "Prepare-se para a certificação Scrum Master com metodologias ágeis práticas.",
            modules: [
                "Fundamentos do Scrum Framework",
                "Papéis e Responsabilidades",
                "Cerimônias e Artefatos",
                "Implementação e Transformação",
                "Preparação para Certificação"
            ],
            skills: ["Scrum", "Agile", "Project Management", "Leadership", "Team Facilitation"]
        },
        {
            id: "python-dados",
            title: "Python para Ciência de Dados",
            category: "dados",
            instructor: "Dr. Fernando Costa",
            duration: "45 horas",
            level: "Intermediário",
            rating: 4.9,
            students: 1345,
            price: "R$ 447,00",
            description: "Análise de dados, visualização e machine learning com Python e bibliotecas especializadas.",
            modules: [
                "Python para Análise de Dados",
                "Pandas, NumPy e Matplotlib",
                "Visualização de Dados Avançada",
                "Machine Learning Básico",
                "Projetos Práticos de Análise"
            ],
            skills: ["Python", "Pandas", "NumPy", "Data Analysis", "Machine Learning"]
        }
    ],

    // Instrutores
    instructors: [
        {
            id: "carlos-mendes",
            name: "Carlos Mendes",
            title: "Senior Frontend Developer",
            company: "Velotax",
            experience: "8+ anos",
            expertise: ["JavaScript", "React", "Vue.js", "TypeScript"],
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
            rating: 4.9,
            students: 3247
        },
        {
            id: "ana-silva",
            name: "Ana Silva",
            title: "Full Stack Developer",
            company: "Velotax",
            experience: "6+ anos",
            expertise: ["React", "Node.js", "Python", "AWS"],
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
            rating: 4.8,
            students: 2156
        },
        {
            id: "roberto-lima",
            name: "Roberto Lima",
            title: "Backend Architect",
            company: "Velotax",
            experience: "10+ anos",
            expertise: ["Node.js", "Python", "Microservices", "Cloud"],
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
            rating: 4.7,
            students: 1892
        }
    ],

    // Certificados
    certificates: [
        {
            id: "js-avancado-cert",
            courseId: "js-avancado",
            title: "JavaScript Avançado e ES6+",
            issuedDate: "2024-01-15",
            validUntil: "2026-01-15",
            grade: "A+",
            skills: ["JavaScript", "ES6+", "Async Programming", "Modules"],
            certificateUrl: "#"
        },
        {
            id: "react-completo-cert",
            courseId: "react-completo",
            title: "React.js Completo",
            issuedDate: "2024-02-20",
            validUntil: "2026-02-20",
            grade: "A+",
            skills: ["React", "JavaScript", "Hooks", "Redux"],
            certificateUrl: "#"
        }
    ],

    // Configurações da Plataforma
    platform: {
        features: [
            "Aprendizado personalizado com IA",
            "Projetos práticos e hands-on",
            "Comunidade ativa de desenvolvedores",
            "Suporte técnico especializado",
            "Certificados reconhecidos pelo mercado"
        ],
        languages: ["Português", "Inglês"],
        themes: ["light", "dark", "auto"],
        notifications: {
            email: true,
            push: true,
            sms: false
        }
    },

    // Estatísticas da Academia
    stats: {
        totalStudents: 15420,
        totalCourses: 35,
        completionRate: 87.3,
        averageRating: 4.8,
        totalInstructors: 12,
        activeProjects: 89
    },

    // Configurações de UI
    ui: {
        colors: {
            primary: "#1e40af",
            secondary: "#3b82f6",
            accent: "#f59e0b",
            success: "#10b981",
            warning: "#f59e0b",
            error: "#ef4444",
            background: "#f8fafc",
            surface: "#ffffff",
            text: "#1e293b"
        },
        animations: {
            duration: "0.3s",
            easing: "cubic-bezier(0.4, 0, 0.2, 1)"
        },
        responsive: {
            mobile: "768px",
            tablet: "1024px",
            desktop: "1200px"
        }
    }
};

// Export para diferentes ambientes
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VelotaxAcademyConfig;
} else if (typeof window !== 'undefined') {
    window.VelotaxAcademyConfig = VelotaxAcademyConfig;
}
