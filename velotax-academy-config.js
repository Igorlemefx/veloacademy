// Velotax Academy - Configuração da Academia
const VelotaxAcademyConfig = {
    // Informações da Academia
    academy: {
        name: "Velotax Academy",
        slogan: "Transformando conhecimento em carreira",
        description: "Plataforma de aprendizado corporativo da Velotax, oferecendo cursos de alta qualidade para desenvolvimento profissional.",
        logo: {
            icon: "fas fa-graduation-cap",
            colors: {
                primary: "#667eea",
                secondary: "#764ba2",
                accent: "#10b981"
            }
        }
    },

    // Categorias de Cursos
    categories: [
        {
            id: "frontend",
            name: "Desenvolvimento Frontend",
            icon: "fas fa-code",
            description: "Cursos de HTML, CSS, JavaScript, React e outras tecnologias frontend",
            color: "#667eea"
        },
        {
            id: "backend",
            name: "Desenvolvimento Backend",
            icon: "fas fa-server",
            description: "Cursos de Node.js, Python, Java, banco de dados e APIs",
            color: "#10b981"
        },
        {
            id: "mobile",
            name: "Desenvolvimento Mobile",
            icon: "fas fa-mobile-alt",
            description: "Cursos de React Native, Flutter, iOS e Android",
            color: "#f59e0b"
        },
        {
            id: "devops",
            name: "DevOps & Infraestrutura",
            icon: "fas fa-cloud",
            description: "Cursos de Docker, Kubernetes, AWS e CI/CD",
            color: "#8b5cf6"
        },
        {
            id: "design",
            name: "Design & UX/UI",
            icon: "fas fa-palette",
            description: "Cursos de Figma, Adobe XD, design responsivo e experiência do usuário",
            color: "#ec4899"
        },
        {
            id: "business",
            name: "Negócios & Gestão",
            icon: "fas fa-chart-line",
            description: "Cursos de gestão de projetos, metodologias ágeis e liderança",
            color: "#06b6d4"
        }
    ],

    // Cursos Disponíveis
    courses: [
        {
            id: "html-css-basico",
            title: "HTML5 e CSS3 - Fundamentos",
            category: "frontend",
            instructor: "Maria Santos",
            duration: "20 horas",
            level: "Iniciante",
            rating: 4.8,
            students: 1247,
            price: "Gratuito",
            description: "Aprenda os fundamentos de desenvolvimento web com HTML5 e CSS3. Crie páginas responsivas e modernas.",
            modules: [
                "Introdução ao HTML5",
                "Estrutura e Semântica",
                "CSS3 Básico",
                "Layout com Flexbox",
                "Design Responsivo",
                "Projeto Final"
            ],
            skills: ["HTML5", "CSS3", "Responsivo", "Flexbox", "Grid"]
        },
        {
            id: "javascript-moderno",
            title: "JavaScript Moderno ES6+",
            category: "frontend",
            instructor: "Carlos Oliveira",
            duration: "35 horas",
            level: "Intermediário",
            rating: 4.9,
            students: 892,
            price: "R$ 97,00",
            description: "Domine JavaScript moderno com ES6+, async/await, módulos e as melhores práticas de desenvolvimento.",
            modules: [
                "Fundamentos JavaScript",
                "ES6+ Features",
                "Async/Await",
                "Módulos ES6",
                "Programação Funcional",
                "Projeto E-commerce"
            ],
            skills: ["JavaScript", "ES6+", "Async/Await", "Módulos", "Promises"]
        },
        {
            id: "react-avancado",
            title: "React.js Avançado",
            category: "frontend",
            instructor: "Ana Costa",
            duration: "40 horas",
            level: "Avançado",
            rating: 4.7,
            students: 567,
            price: "R$ 147,00",
            description: "Aprenda React.js avançado com hooks, context API, performance optimization e padrões de projeto.",
            modules: [
                "Hooks Avançados",
                "Context API",
                "Performance Optimization",
                "Padrões de Projeto",
                "Testing com Jest",
                "Projeto Dashboard"
            ],
            skills: ["React", "Hooks", "Context API", "Performance", "Testing"]
        },
        {
            id: "nodejs-backend",
            title: "Node.js - Backend Completo",
            category: "backend",
            instructor: "Pedro Silva",
            duration: "45 horas",
            level: "Intermediário",
            rating: 4.6,
            students: 423,
            price: "R$ 127,00",
            description: "Desenvolva APIs robustas com Node.js, Express, MongoDB e autenticação JWT.",
            modules: [
                "Fundamentos Node.js",
                "Express Framework",
                "MongoDB e Mongoose",
                "Autenticação JWT",
                "Validação de Dados",
                "Deploy e Produção"
            ],
            skills: ["Node.js", "Express", "MongoDB", "JWT", "APIs"]
        },
        {
            id: "react-native",
            title: "React Native - Apps Mobile",
            category: "mobile",
            instructor: "Fernanda Lima",
            duration: "50 horas",
            level: "Intermediário",
            rating: 4.5,
            students: 298,
            price: "R$ 167,00",
            description: "Crie aplicativos mobile nativos para iOS e Android usando React Native.",
            modules: [
                "Introdução React Native",
                "Navegação e Roteamento",
                "APIs Nativas",
                "Estado e Gerenciamento",
                "Performance e Otimização",
                "Publicação nas Stores"
            ],
            skills: ["React Native", "Mobile", "iOS", "Android", "APIs"]
        }
    ],

    // Instrutores
    instructors: [
        {
            id: "maria-santos",
            name: "Maria Santos",
            role: "Senior Frontend Developer",
            company: "Velotax",
            experience: "8 anos",
            specialties: ["HTML", "CSS", "JavaScript", "React"],
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=120&h=120&fit=crop&crop=face",
            rating: 4.9,
            courses: 12,
            students: 5000
        },
        {
            id: "carlos-oliveira",
            name: "Carlos Oliveira",
            role: "Full Stack Developer",
            company: "Velotax",
            experience: "10 anos",
            specialties: ["JavaScript", "Node.js", "React", "Python"],
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face",
            rating: 4.8,
            courses: 8,
            students: 3500
        },
        {
            id: "ana-costa",
            name: "Ana Costa",
            role: "React Specialist",
            company: "Velotax",
            experience: "6 anos",
            specialties: ["React", "TypeScript", "Testing", "Performance"],
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&crop=face",
            rating: 4.7,
            courses: 6,
            students: 2200
        }
    ],

    // Certificados
    certificates: [
        {
            id: "html-css-cert",
            courseId: "html-css-basico",
            title: "HTML5 e CSS3 - Fundamentos",
            issuedDate: "2024-11-15",
            expiryDate: null,
            grade: "A+",
            instructor: "Maria Santos",
            skills: ["HTML5", "CSS3", "Responsivo", "Flexbox", "Grid"]
        },
        {
            id: "js-basico-cert",
            courseId: "javascript-basico",
            title: "JavaScript Básico",
            issuedDate: "2024-10-20",
            expiryDate: null,
            grade: "A",
            instructor: "Carlos Oliveira",
            skills: ["JavaScript", "ES6", "DOM", "Events", "AJAX"]
        }
    ],

    // Configurações da Plataforma
    platform: {
        features: [
            "Aprendizado em ritmo próprio",
            "Certificados reconhecidos",
            "Projetos práticos",
            "Suporte da comunidade",
            "Acesso vitalício aos cursos",
            "Atualizações gratuitas"
        ],
        languages: ["pt-BR", "en", "es"],
        themes: ["light", "dark", "auto"],
        notifications: {
            email: true,
            push: true,
            sms: false
        }
    },

    // Métricas e Estatísticas
    stats: {
        totalStudents: 15000,
        totalCourses: 50,
        totalInstructors: 15,
        completionRate: 78,
        satisfactionRate: 4.7,
        countries: 25
    },

    // Configurações de UI
    ui: {
        colors: {
            primary: "#667eea",
            secondary: "#764ba2",
            success: "#10b981",
            warning: "#f59e0b",
            error: "#ef4444",
            info: "#3b82f6"
        },
        animations: {
            enabled: true,
            duration: 300,
            easing: "cubic-bezier(0.4, 0, 0.2, 1)"
        },
        responsive: {
            breakpoints: {
                mobile: 768,
                tablet: 1024,
                desktop: 1200
            }
        }
    }
};

// Exportar configuração
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VelotaxAcademyConfig;
} else {
    window.VelotaxAcademyConfig = VelotaxAcademyConfig;
}
