// Sistema de Blockchain e Certificados Digitais - VeloAcademy ULTIMATE
class VeloAcademyBlockchain {
    constructor() {
        this.chain = [];
        this.pendingCertificates = [];
        this.difficulty = 2;
        this.miningReward = 100;
        this.wallets = new Map();
        
        this.init();
    }
    
    init() {
        this.loadBlockchain();
        this.createGenesisBlock();
        this.startMining();
        this.initializeWallets();
    }
    
    createGenesisBlock() {
        if (this.chain.length === 0) {
            const genesisBlock = {
                index: 0,
                timestamp: Date.now(),
                certificates: [],
                previousHash: '0',
                hash: this.calculateHash({
                    index: 0,
                    timestamp: Date.now(),
                    certificates: [],
                    previousHash: '0'
                }),
                nonce: 0
            };
            
            this.chain.push(genesisBlock);
            this.saveBlockchain();
        }
    }
    
    calculateHash(block) {
        const blockString = JSON.stringify(block);
        let hash = 0;
        
        for (let i = 0; i < blockString.length; i++) {
            const char = blockString.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        
        return hash.toString(16);
    }
    
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }
    
    mineBlock() {
        const block = {
            index: this.chain.length,
            timestamp: Date.now(),
            certificates: this.pendingCertificates,
            previousHash: this.getLatestBlock().hash,
            nonce: 0
        };
        
        while (block.hash.substring(0, this.difficulty) !== '0'.repeat(this.difficulty)) {
            block.nonce++;
            block.hash = this.calculateHash(block);
        }
        
        console.log('Bloco minerado:', block.hash);
        
        this.chain.push(block);
        this.pendingCertificates = [];
        this.saveBlockchain();
        
        return block;
    }
    
    addCertificate(certificate) {
        const certificateData = {
            id: this.generateCertificateId(),
            studentId: certificate.studentId,
            studentName: certificate.studentName,
            courseId: certificate.courseId,
            courseName: certificate.courseName,
            completionDate: Date.now(),
            grade: certificate.grade,
            instructor: certificate.instructor,
            hash: this.calculateCertificateHash(certificate),
            timestamp: Date.now(),
            status: 'pending'
        };
        
        this.pendingCertificates.push(certificateData);
        this.saveBlockchain();
        
        return certificateData;
    }
    
    generateCertificateId() {
        return 'CERT_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    calculateCertificateHash(certificate) {
        const data = `${certificate.studentId}${certificate.courseId}${certificate.completionDate}${certificate.grade}`;
        let hash = 0;
        
        for (let i = 0; i < data.length; i++) {
            const char = data.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        
        return hash.toString(16);
    }
    
    verifyCertificate(certificateId) {
        for (const block of this.chain) {
            for (const cert of block.certificates) {
                if (cert.id === certificateId) {
                    return {
                        valid: true,
                        block: block,
                        certificate: cert,
                        verificationDate: Date.now()
                    };
                }
            }
        }
        
        return { valid: false, error: 'Certificado não encontrado na blockchain' };
    }
    
    getCertificateHistory(studentId) {
        const history = [];
        
        for (const block of this.chain) {
            for (const cert of block.certificates) {
                if (cert.studentId === studentId) {
                    history.push({
                        ...cert,
                        blockIndex: block.index,
                        blockHash: block.hash,
                        blockTimestamp: block.timestamp
                    });
                }
            }
        }
        
        return history.sort((a, b) => b.blockTimestamp - a.blockTimestamp);
    }
    
    startMining() {
        setInterval(() => {
            if (this.pendingCertificates.length > 0) {
                this.mineBlock();
            }
        }, 10000); // Minerar a cada 10 segundos se houver certificados pendentes
    }
    
    initializeWallets() {
        // Criar carteiras para usuários do sistema
        const users = ['student', 'instructor', 'admin', 'system'];
        
        users.forEach(user => {
            const wallet = this.createWallet(user);
            this.wallets.set(user, wallet);
        });
    }
    
    createWallet(userId) {
        const privateKey = this.generatePrivateKey();
        const publicKey = this.generatePublicKey(privateKey);
        
        return {
            userId,
            privateKey,
            publicKey,
            balance: 1000, // Saldo inicial
            transactions: []
        };
    }
    
    generatePrivateKey() {
        return 'PRIV_' + Math.random().toString(36).substr(2, 15) + Date.now().toString(36);
    }
    
    generatePublicKey(privateKey) {
        return 'PUB_' + privateKey.substr(-10) + Math.random().toString(36).substr(2, 5);
    }
    
    transferTokens(from, to, amount) {
        const fromWallet = this.wallets.get(from);
        const toWallet = this.wallets.get(to);
        
        if (!fromWallet || !toWallet) {
            return { success: false, error: 'Carteira não encontrada' };
        }
        
        if (fromWallet.balance < amount) {
            return { success: false, error: 'Saldo insuficiente' };
        }
        
        // Executar transferência
        fromWallet.balance -= amount;
        toWallet.balance += amount;
        
        // Registrar transação
        const transaction = {
            from,
            to,
            amount,
            timestamp: Date.now(),
            hash: this.calculateTransactionHash(from, to, amount)
        };
        
        fromWallet.transactions.push(transaction);
        toWallet.transactions.push(transaction);
        
        this.saveBlockchain();
        
        return { success: true, transaction };
    }
    
    calculateTransactionHash(from, to, amount) {
        const data = `${from}${to}${amount}${Date.now()}`;
        let hash = 0;
        
        for (let i = 0; i < data.length; i++) {
            const char = data.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        
        return hash.toString(16);
    }
    
    getBlockchainStats() {
        return {
            totalBlocks: this.chain.length,
            totalCertificates: this.chain.reduce((total, block) => total + block.certificates.length, 0),
            pendingCertificates: this.pendingCertificates.length,
            difficulty: this.difficulty,
            lastBlockHash: this.getLatestBlock().hash,
            totalWallets: this.wallets.size,
            totalTokens: Array.from(this.wallets.values()).reduce((total, wallet) => total + wallet.balance, 0)
        };
    }
    
    saveBlockchain() {
        localStorage.setItem('veloacademy_blockchain', JSON.stringify({
            chain: this.chain,
            pendingCertificates: this.pendingCertificates,
            wallets: Array.from(this.wallets.entries())
        }));
    }
    
    loadBlockchain() {
        const saved = localStorage.getItem('veloacademy_blockchain');
        if (saved) {
            const data = JSON.parse(saved);
            this.chain = data.chain || [];
            this.pendingCertificates = data.pendingCertificates || [];
            
            // Restaurar carteiras
            if (data.wallets) {
                this.wallets = new Map(data.wallets);
            }
        }
    }
}

// Sistema de Certificados Digitais
class VeloAcademyCertificates {
    constructor(blockchain) {
        this.blockchain = blockchain;
        this.certificateTemplates = {};
        this.verificationQueue = [];
        
        this.init();
    }
    
    init() {
        this.loadCertificateTemplates();
        this.setupEventListeners();
        this.startVerificationProcess();
    }
    
    loadCertificateTemplates() {
        this.certificateTemplates = {
            'default': {
                name: 'Certificado Padrão',
                template: this.createDefaultTemplate(),
                fields: ['studentName', 'courseName', 'completionDate', 'grade', 'instructor']
            },
            'premium': {
                name: 'Certificado Premium',
                template: this.createPremiumTemplate(),
                fields: ['studentName', 'courseName', 'completionDate', 'grade', 'instructor', 'courseDuration', 'skills']
            },
            'enterprise': {
                name: 'Certificado Enterprise',
                template: this.createEnterpriseTemplate(),
                fields: ['studentName', 'courseName', 'completionDate', 'grade', 'instructor', 'company', 'department', 'role']
            }
        };
    }
    
    createDefaultTemplate() {
        return `
            <div class="certificate default">
                <div class="certificate-header">
                    <h1>Certificado de Conclusão</h1>
                    <div class="logo">VeloAcademy</div>
                </div>
                <div class="certificate-body">
                    <p>Certificamos que <strong>{{studentName}}</strong> concluiu com sucesso o curso:</p>
                    <h2>{{courseName}}</h2>
                    <p>Concluído em: {{completionDate}}</p>
                    <p>Nota: {{grade}}/100</p>
                    <p>Instrutor: {{instructor}}</p>
                </div>
                <div class="certificate-footer">
                    <div class="signature">Assinado digitalmente</div>
                    <div class="blockchain-hash">Hash: {{blockchainHash}}</div>
                </div>
            </div>
        `;
    }
    
    createPremiumTemplate() {
        return `
            <div class="certificate premium">
                <div class="certificate-header">
                    <h1>Certificado Premium de Excelência</h1>
                    <div class="logo">VeloAcademy PRO</div>
                </div>
                <div class="certificate-body">
                    <p>Certificamos que <strong>{{studentName}}</strong> demonstrou excelência ao concluir:</p>
                    <h2>{{courseName}}</h2>
                    <p>Concluído em: {{completionDate}}</p>
                    <p>Nota: {{grade}}/100</p>
                    <p>Instrutor: {{instructor}}</p>
                    <p>Duração do curso: {{courseDuration}}</p>
                    <p>Habilidades desenvolvidas: {{skills}}</p>
                </div>
                <div class="certificate-footer">
                    <div class="signature">Assinado digitalmente com blockchain</div>
                    <div class="blockchain-hash">Hash: {{blockchainHash}}</div>
                    <div class="verification-url">Verificar: {{verificationUrl}}</div>
                </div>
            </div>
        `;
    }
    
    createEnterpriseTemplate() {
        return `
            <div class="certificate enterprise">
                <div class="certificate-header">
                    <h1>Certificado Enterprise</h1>
                    <div class="logo">VeloAcademy ENTERPRISE</div>
                </div>
                <div class="certificate-body">
                    <p>Certificamos que <strong>{{studentName}}</strong> da empresa <strong>{{company}}</strong></p>
                    <p>Departamento: {{department}} | Cargo: {{role}}</p>
                    <p>Concluiu com excelência o curso:</p>
                    <h2>{{courseName}}</h2>
                    <p>Concluído em: {{completionDate}}</p>
                    <p>Nota: {{grade}}/100</p>
                    <p>Instrutor: {{instructor}}</p>
                </div>
                <div class="certificate-footer">
                    <div class="signature">Assinado digitalmente com blockchain</div>
                    <div class="blockchain-hash">Hash: {{blockchainHash}}</div>
                    <div class="verification-url">Verificar: {{verificationUrl}}</div>
                    <div class="company-stamp">Carimbo da empresa</div>
                </div>
            </div>
        `;
    }
    
    generateCertificate(studentData, templateType = 'default') {
        const template = this.certificateTemplates[templateType];
        if (!template) {
            throw new Error('Template de certificado não encontrado');
        }
        
        // Preparar dados do certificado
        const certificateData = {
            studentId: studentData.studentId || 'STUDENT_' + Date.now(),
            studentName: studentData.studentName,
            courseId: studentData.courseId,
            courseName: studentData.courseName,
            completionDate: new Date().toLocaleDateString('pt-BR'),
            grade: studentData.grade || 100,
            instructor: studentData.instructor || 'VeloAcademy',
            courseDuration: studentData.courseDuration || 'N/A',
            skills: studentData.skills || 'N/A',
            company: studentData.company || 'N/A',
            department: studentData.department || 'N/A',
            role: studentData.role || 'N/A'
        };
        
        // Adicionar à blockchain
        const blockchainCertificate = this.blockchain.addCertificate(certificateData);
        
        // Gerar HTML do certificado
        let certificateHTML = template.template;
        
        // Substituir placeholders
        Object.keys(certificateData).forEach(key => {
            const placeholder = `{{${key}}}`;
            certificateHTML = certificateHTML.replace(new RegExp(placeholder, 'g'), certificateData[key]);
        });
        
        // Adicionar informações da blockchain
        certificateHTML = certificateHTML
            .replace('{{blockchainHash}}', blockchainCertificate.hash)
            .replace('{{verificationUrl}}', this.generateVerificationUrl(blockchainCertificate.id));
        
        return {
            html: certificateHTML,
            data: certificateData,
            blockchain: blockchainCertificate,
            template: templateType
        };
    }
    
    generateVerificationUrl(certificateId) {
        return `${window.location.origin}${window.location.pathname}?verify=${certificateId}`;
    }
    
    verifyCertificate(certificateId) {
        const verification = this.blockchain.verifyCertificate(certificateId);
        
        if (verification.valid) {
            this.addToVerificationQueue(verification);
            return verification;
        }
        
        return verification;
    }
    
    addToVerificationQueue(verification) {
        this.verificationQueue.push(verification);
        
        // Limitar fila a 100 verificações
        if (this.verificationQueue.length > 100) {
            this.verificationQueue.shift();
        }
    }
    
    startVerificationProcess() {
        setInterval(() => {
            if (this.verificationQueue.length > 0) {
                const verification = this.verificationQueue.shift();
                this.processVerification(verification);
            }
        }, 5000); // Processar verificações a cada 5 segundos
    }
    
    processVerification(verification) {
        // Processar verificação (pode incluir notificações, logs, etc.)
        console.log('Verificação processada:', verification);
        
        // Integrar com sistema de gamificação se disponível
        if (window.veloacademyGamification) {
            window.veloacademyGamification.addExperience(10, 'Verificação de certificado');
        }
    }
    
    downloadCertificate(certificate, format = 'html') {
        switch (format) {
            case 'html':
                this.downloadHTML(certificate);
                break;
            case 'pdf':
                this.downloadPDF(certificate);
                break;
            case 'json':
                this.downloadJSON(certificate);
                break;
            default:
                this.downloadHTML(certificate);
        }
    }
    
    downloadHTML(certificate) {
        const blob = new Blob([certificate.html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `certificado_${certificate.data.studentName}_${certificate.data.courseName}.html`;
        a.click();
        URL.revokeObjectURL(url);
    }
    
    downloadPDF(certificate) {
        // Simular download de PDF (em produção, usar biblioteca como jsPDF)
        alert('Download de PDF em desenvolvimento. Use HTML por enquanto.');
    }
    
    downloadJSON(certificate) {
        const data = {
            certificate: certificate.data,
            blockchain: certificate.blockchain,
            verification: this.verifyCertificate(certificate.blockchain.id)
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `certificado_${certificate.data.studentName}_${certificate.data.courseName}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }
    
    shareCertificate(certificate, platform = 'default') {
        const verificationUrl = this.generateVerificationUrl(certificate.blockchain.id);
        const shareData = {
            title: `Certificado: ${certificate.data.courseName}`,
            text: `${certificate.data.studentName} concluiu ${certificate.data.courseName} na VeloAcademy!`,
            url: verificationUrl
        };
        
        switch (platform) {
            case 'whatsapp':
                window.open(`https://wa.me/?text=${encodeURIComponent(shareData.text + ' ' + verificationUrl)}`);
                break;
            case 'linkedin':
                window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(verificationUrl)}`);
                break;
            case 'twitter':
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareData.text)}&url=${encodeURIComponent(verificationUrl)}`);
                break;
            default:
                if (navigator.share) {
                    navigator.share(shareData);
                } else {
                    // Fallback para copiar link
                    navigator.clipboard.writeText(verificationUrl);
                    alert('Link do certificado copiado para a área de transferência!');
                }
        }
    }
    
    setupEventListeners() {
        // Event listener para verificação de certificados via URL
        const urlParams = new URLSearchParams(window.location.search);
        const verifyParam = urlParams.get('verify');
        
        if (verifyParam) {
            this.handleCertificateVerification(verifyParam);
        }
    }
    
    handleCertificateVerification(certificateId) {
        const verification = this.verifyCertificate(certificateId);
        
        if (verification.valid) {
            this.showVerificationResult(verification);
        } else {
            this.showVerificationError(verification.error);
        }
    }
    
    showVerificationResult(verification) {
        const modal = document.createElement('div');
        modal.className = 'verification-modal';
        modal.innerHTML = `
            <div class="verification-content">
                <div class="verification-header success">
                    <i class='bx bx-check-circle'></i>
                    <h3>✅ Certificado Verificado!</h3>
                </div>
                <div class="verification-body">
                    <h4>${verification.certificate.courseName}</h4>
                    <p><strong>Estudante:</strong> ${verification.certificate.studentName}</p>
                    <p><strong>Concluído em:</strong> ${new Date(verification.certificate.completionDate).toLocaleDateString('pt-BR')}</p>
                    <p><strong>Nota:</strong> ${verification.certificate.grade}/100</p>
                    <p><strong>Instrutor:</strong> ${verification.certificate.instructor}</p>
                    <p><strong>Bloco:</strong> ${verification.block.index}</p>
                    <p><strong>Hash:</strong> <code>${verification.certificate.hash}</code></p>
                    <p><strong>Verificado em:</strong> ${new Date(verification.verificationDate).toLocaleString('pt-BR')}</p>
                </div>
                <div class="verification-footer">
                    <button class="btn-close-verification">Fechar</button>
                    <button class="btn-download-verification">Baixar Comprovante</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Event listeners
        modal.querySelector('.btn-close-verification').addEventListener('click', () => {
            modal.remove();
        });
        
        modal.querySelector('.btn-download-verification').addEventListener('click', () => {
            this.downloadVerificationProof(verification);
            modal.remove();
        });
    }
    
    showVerificationError(error) {
        const modal = document.createElement('div');
        modal.className = 'verification-modal error';
        modal.innerHTML = `
            <div class="verification-content">
                <div class="verification-header error">
                    <i class='bx bx-x-circle'></i>
                    <h3>❌ Erro na Verificação</h3>
                </div>
                <div class="verification-body">
                    <p><strong>Erro:</strong> ${error}</p>
                    <p>Este certificado não foi encontrado na blockchain ou é inválido.</p>
                </div>
                <div class="verification-footer">
                    <button class="btn-close-verification">Fechar</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        modal.querySelector('.btn-close-verification').addEventListener('click', () => {
            modal.remove();
        });
    }
    
    downloadVerificationProof(verification) {
        const proof = {
            certificateId: verification.certificate.id,
            verificationDate: verification.verificationDate,
            blockchainBlock: verification.block.index,
            blockchainHash: verification.block.hash,
            certificateHash: verification.certificate.hash,
            status: 'VERIFIED',
            verifier: 'VeloAcademy Blockchain'
        };
        
        const blob = new Blob([JSON.stringify(proof, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `comprovante_verificacao_${verification.certificate.id}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }
    
    getCertificateStats() {
        const stats = this.blockchain.getBlockchainStats();
        const verificationStats = {
            totalVerifications: this.verificationQueue.length,
            verificationHistory: this.verificationQueue.slice(-10), // Últimas 10 verificações
            certificateTemplates: Object.keys(this.certificateTemplates).length
        };
        
        return { ...stats, ...verificationStats };
    }
}

// Funções globais para integração
window.generateCertificate = function(studentData, templateType) {
    if (window.veloacademyCertificates) {
        return window.veloacademyCertificates.generateCertificate(studentData, templateType);
    }
    return null;
};

window.verifyCertificate = function(certificateId) {
    if (window.veloacademyCertificates) {
        return window.veloacademyCertificates.verifyCertificate(certificateId);
    }
    return null;
};

window.downloadCertificate = function(certificate, format) {
    if (window.veloacademyCertificates) {
        window.veloacademyCertificates.downloadCertificate(certificate, format);
    }
};

window.shareCertificate = function(certificate, platform) {
    if (window.veloacademyCertificates) {
        window.veloacademyCertificates.shareCertificate(certificate, platform);
    }
};

// Exportar para uso global
window.VeloAcademyBlockchain = VeloAcademyBlockchain;
window.VeloAcademyCertificates = VeloAcademyCertificates;
