# 🚚 Dashboard de Gestão de Frota e Logística (Real-Time)

![Status](https://img.shields.io/badge/Status-Concluído-success)
![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?logo=supabase)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

> **Acesse o projeto online aqui:** [🔗https://giovane-pm.github.io/Painel-Frota/]

## 📋 Sobre o Projeto
Este é um sistema web de **Gerenciamento de Fila de Motoristas** desenvolvido para resolver um problema real de logística: a organização diária do fluxo de veículos de carga. 

O sistema substitui o controle manual (papel ou planilhas estáticas) por um painel interativo em **tempo real**, permitindo visualizar quem está aguardando carga, quem está em rota e quais veículos estão indisponíveis, separando estrategicamente a **Frota Própria** dos **Freteiros (Terceiros)**.

## 💡 O Problema que Resolve
Em operações logísticas dinâmicas, misturar motoristas contratados com terceirizados gera ineficiência, pois a prioridade de carregamento deve ser sempre da frota com custo fixo. Além disso, caminhões na oficina ou motoristas de folga precisam ser monitorados sem poluir a visão operacional. Este dashboard resolve isso através de uma interface de Tela Única (Single Page) orientada a eventos.

## ✨ Principais Funcionalidades
- **Gestão de Filas Independentes:** Separação automática entre *Frota Própria* e *Terceiros*, com ordenação cronológica de chegada.
- **Sincronização em Tempo Real:** Integração com **Supabase (BaaS)**, permitindo que alterações feitas no computador do gerente reflitam instantaneamente nos celulares da equipe na doca.
- **Design Compacto (Dashboard UI):** Interface baseada em CSS Grid com rolagem independente por coluna, otimizada para ficar aberta 100% do tempo sem necessidade de *scroll* global.
- **Gestão de Exceções (Widget Flutuante):** Sistema de pausa (⚠️) para veículos na oficina ou motoristas em atestado, movendo-os para um painel discreto que não polui a operação principal.
- **Batch Actions:** Botão "Finalizar Dia" que realiza um *update* em lote no banco de dados, resetando o status da equipe ativa sem afetar quem está no mecânico.

## 🛠️ Tecnologias e Arquitetura
O projeto foi construído seguindo o princípio de *Separation of Concerns* (HTML, CSS e JS isolados) para garantir escalabilidade e fácil manutenção.

- **Frontend:** HTML5 Semântico.
- **Estilização:** CSS3 puro (CSS Grid, Flexbox, Variáveis CSS, UI Compacta e Responsiva).
- **Lógica:** JavaScript Moderno (ES6+, Funções Assíncronas `async/await`, DOM Manipulation).
- **Backend / Database:** Supabase (PostgreSQL) atuando como banco de dados na nuvem e API REST.

## 📂 Estrutura de Arquivos
O sistema evoluiu de um MVP com armazenamento local (`localStorage`) para uma arquitetura cloud, resultando na seguinte estrutura profissional:

```text
📁 projeto-logistica/
 ├── 📄 index.html    # Estrutura e Interface do Usuário (UI)
 ├── 📄 style.css     # Design System, Cores e Layout Grid
 └── 📄 script.js     # Regras de Negócio e Integração com Supabase API
```
🚀 Como Executar Localmente
Clone o repositório:

```Bash
git clone https://github.com/Giovane-pm/Painel-Frota.git
```
Abra a pasta do projeto.

Para conectar ao seu próprio banco de dados, altere as variáveis supabaseUrl e supabaseKey no arquivo script.js com as suas chaves do Supabase.

Abra o arquivo index.html em qualquer navegador moderno. (Não requer build tools).

Desenvolvido com ☕ e dedicação por Giovane Pereira.

Sinta-se à vontade para entrar em contato no https://www.linkedin.com/in/giovane-pereira-mendes/!
