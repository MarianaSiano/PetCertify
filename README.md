# PetCertify - Gerador de Certificados para Pets

PetCertify é uma aplicação web moderna e vibrante projetada para criar, gerenciar e exportar certificados de conclusão para cursos e treinamentos de animais de estimação. Com uma interface elegante em tons de roxo pastel e 4 estilos distintos de documentos, o sistema permite uma personalização completa para cada conquista pet.

## 🚀 Funcionamento

- **4 Estilos únicos:** Divertido, Elegante e Divertido e Acadêmico;
- **Cadastro Flexível:** Formulário individual detalhado ou importação em massa via CSV;
- **Exportação Profissional:** Gere e baixe certificados em formato PNG (alta resolução) ou PDF;
- **Gestão de Dados:** Painel para visualizar, filtrar e excluir certificados emitidos;
- **Persistência Local:** Seus dados são salvos automaticamente no navegador (Local Storage);
- **Design Moderno:** Interface responsive com paleta roxo pastel, animações suaves e efeitos visuais.

## 🛠️ Tecnologias Utilizadas

- **React 19** com **TypeScript**
- **Vite** (Build Tool)
- **Tailwind CSS 4** (Estilização)
- **Lucide React** (Ícones)
- **Motion** (Animações)
- **html2canvas** & **jsPDF** (Geração de documentos)
- **PapaParse** (Processamento de CSV)
- **Canvas Confetti** (Efeitos de celebração)

## 📋 Como Rodar o Projeto

### Pré-requisitos

Certifique-se de ter o **Node.js** instalado em sua máquina.

### Passos para Instalação

1. **Clone o repositório ou baixe os arquivos.**

2. **Abra o terminal na pasta raiz do projeto.**

3. **Instale as dependências:**

```bash
npm install
```

4. **Inicie o servidor de desenvolvimento:**

```bash
npm run dev
```

5. **Acesse a aplicação no navegador:**

A aplicação estará disponível em `http://localhost:3000`.

### Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento;
- `npm run build`: Cria a versão de produção otimizada na pasta `dist`;
- `npm run preview`: Visualiza localmente a build de produção;
- `npm run lint`: Executa a verificação de tipos do TypeScript.

## 📄 Estrutura de Importação CSV

Para cadastros em massa, utilize um arquivo CSV com as seguintes colunas:
`petName, ownerName, courseName, merits, skills, achievements, date, type`

*Estilos disponíveis (coluna type):* `playful`, `elegant`, `adventurous`, `academic`.