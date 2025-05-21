# Intranet Transval

## Visão Geral
Este projeto é uma intranet corporativa desenvolvida para a Transval, oferecendo um portal interativo com autenticação de usuários, carrossel de conteúdo dinâmico e funcionalidades administrativas.

# Estrutura Completa do Projeto

## Diretório Raiz
```
├── index.html           
├── README.md             
└── src/                   
```

## Diretório src/
```
src/
├── Assets/              
│   ├── clients/         
│   │   ├── biosev.png
│   │   ├── caramuru.png
│   │   ├── cofco.png
│   │   ├── copersucar.png
│   │   ├── fertipar.png
│   │   ├── heringer.png
│   │   ├── LDC.png
│   │   └── raizen.png
│   ├── LOGO-APP.png     
│   ├── logo.png          
│   └── wp*.jpg           
│
├── downloads/             
│   └── Pastas de arquivos para downloads/              
│
├── scripts/              
│   ├── main.js          
│   └── modules/         
│       ├── auth/        
│       │   └── login.js
│       ├── carousel/    
│       │   ├── autoSlide.js
│       │   ├── carousel.js
│       │   ├── newsContent.js
│       │   └── videoPlayer.js
│       ├── content/     o
│       │   ├── about.js
│       │   ├── clients.js
│       │   ├── contact.js
│       │   ├── download.js
│       │   ├── lgpd.js
│       │   ├── locations.js
│       │   ├── quickContacts.js
│       │   └── routes.js
│       └── utils/       
│           └── domUtils.js
│
└── styles/              
    ├── base/           
    │   ├── _reset.css
    │   ├── _typography.css
    │   └── _variables.css
    ├── components/     
    │   ├── _buttons.css
    │   ├── _carousel.css
    │   ├── _footer.css
    │   ├── _header.css
    │   ├── _login.css
    │   ├── _maps.css
    │   ├── _news.css
    │   ├── _quickContacts.css
    │   └── _routes.css
    ├── layout/       
    │   ├── _container.css
    │   └── _grid.css
    ├── pages/         
    │   ├── _about.css
    │   ├── _clients.css
    │   ├── _contact.css
    │   └── _lgpd.css
    └── styles.css      
```
## Funcionalidades

### Sistema de Login
- **Credenciais padrão:**
  - Usuário: admin
  - Senha: admin123
- Gerenciamento de sessão usando sessionStorage
- Modal de login responsivo
- Redirecionamento automático após logout

### Carrossel Interativo
- Slides com imagens e vídeo do YouTube
- Navegação por botões e touch
- Autoplay configurável
- Contador de slides
- Legendas informativas

### Área Administrativa
- Conteúdo protegido por login
- Gerenciamento de documentos
- Painel de controle intuitivo
- Interface adaptativa

### Recursos Adicionais
- Mapa interativo com localização das unidades
- Calculadora de rotas
- Seção de downloads
- Informações LGPD
- Diretório de contatos rápidos

## Como Usar

### Instalação
1. Clone o repositório
2. Configure um servidor local (recomendado Live Server do VS Code)
3. Abra o arquivo index.html

### Acesso
1. Clique no botão "Login"
2. Insira as credenciais (admin/admin123)
3. Acesse o conteúdo administrativo

### Navegação
- Use os botões do carrossel para navegar entre slides
- Acesse diferentes seções pelos botões do menu
- Faça download de documentos na área específica

## Desenvolvimento

### Arquivos Principais
- `login.js`: Gerenciamento de autenticação
- `carousel.js`: Controle do carrossel
- `videoPlayer.js`: Integração com YouTube
- `styles.css`: Estilos principais

### Tecnologias Utilizadas
- JavaScript ES6+
- HTML5
- CSS3
- Google Maps API
- YouTube iFrame API

## Segurança
- Autenticação atual é client-side (não recomendado para produção)
- Necessário implementar autenticação server-side
- Proteção de rotas e conteúdo sensível

## Melhorias Futuras
- [ ] Implementar backend com autenticação segura
- [ ] Adicionar sistema de notificações
- [ ] Implementar busca global
- [ ] Desenvolver área de uploads
- [ ] Adicionar sistema de perfis de usuário

## Suporte
Para suporte técnico ou dúvidas:
- Email: suporte@transval.com.br
- Telefone: (XX) XXXX-XXXX

## Observações
- Projeto em desenvolvimento contínuo
- Compatível com principais navegadores
- Responsivo para diferentes dispositivos

## Descrição dos Componentes Principais

### Scripts (src/scripts/)
- **main.js**: Inicialização e configuração principal da aplicação
- **auth/login.js**: Sistema de autenticação e gerenciamento de sessão
- **carousel/**: Módulos relacionados ao carrossel de conteúdo
- **content/**: Gerenciadores de conteúdo específico
- **utils/**: Funções utilitárias reutilizáveis

### Estilos (src/styles/)
- **base/**: Configurações base do CSS (reset, tipografia, variáveis)
- **components/**: Estilos de componentes reutilizáveis
- **layout/**: Estruturas de layout e grid
- **pages/**: Estilos específicos para cada página

### Assets (src/Assets/)
- **clients/**: Logos e imagens dos clientes
- **Imagens do carrossel**: Arquivos wp*.jpg
- **Logos**: Arquivos de identidade visual

### Downloads (src/downloads/)
- **R.H/**: Documentos e formulários de recursos humanos