# 🚀 Guia de Comandos Úteis do Git & GitHub

Guia de referência rápida e prática com os comandos mais utilizados no dia a dia com Git e GitHub.

---

## 📌 Sumário

1. [Configuração Inicial](#1-configuração-inicial)
2. [Criando e Clonando Repositórios](#2-criando-e-clonando-repositórios)
3. [Ciclo Básico de Trabalho](#3-ciclo-básico-de-trabalho)
4. [Branches (Ramificações)](#4-branches-ramificações)
5. [Sincronização com o GitHub (Remoto)](#5-sincronização-com-o-github-remoto)
6. [Desfazendo Alterações e Histórico](#6-desfazendo-alterações-e-histórico)
7. [Stash (Salvar trabalho temporário)](#7-stash-salvar-trabalho-temporário)
8. [Tags e Versões](#8-tags-e-versões)
9. [GitHub CLI (`gh`)](#9-github-cli-gh)
10. [Dicas e Boas Práticas](#10-dicas-e-boas-práticas)

---

## 1. Configuração Inicial

Configurar nome, e-mail e preferências padrão do Git:

```bash
# Definir nome de usuário global
git config --global user.name "Seu Nome"

# Definir e-mail global (use o mesmo do GitHub)
git config --global user.email "seu-email@exemplo.com"

# Definir a branch padrão como 'main'
git config --global init.defaultBranch main

# Listar todas as configurações ativas
git config --list
```

---

## 2. Criando e Clonando Repositórios

```bash
# Iniciar um novo repositório Git na pasta atual
git init

# Clonar repositório remoto via HTTPS
git clone https://github.com/usuario/repositorio.git

# Clonar repositório remoto via SSH
git clone git@github.com:usuario/repositorio.git

# Clonar em uma pasta específica
git clone https://github.com/usuario/repositorio.git nome-da-pasta
```

---

## 3. Ciclo Básico de Trabalho

```bash
# Verificar status dos arquivos modificados/não rastreados
git status

# Verificar status resumido
git status -s

# Adicionar arquivo específico para a área de preparação (staging)
git add nome-do-arquivo.ext

# Adicionar todos os arquivos modificados e novos
git add .

# Criar um commit com mensagem
git commit -m "feat: adiciona funcionalidade x"

# Adicionar e commitar arquivos rastreados modificados em um único passo
git commit -am "fix: corrige problema no formulário"

# Ver diferenças antes de adicionar ao stage
git diff

# Ver diferenças já adicionadas ao stage
git diff --staged

# Histórico resumido de commits
git log --oneline --graph --decorate --all

# Ver os últimos N commits
git log -n 5 --oneline
```

---

## 4. Branches (Ramificações)

```bash
# Listar branches locais (* indica a atual)
git branch

# Listar todas as branches (locais e remotas)
git branch -a

# Criar uma nova branch
git branch feature/nova-tela

# Mudar para uma branch existente
git switch feature/nova-tela
# ou (modo clássico):
git checkout feature/nova-tela

# Criar e mudar para uma nova branch em um só comando
git switch -c feature/nova-tela
# ou (modo clássico):
git checkout -b feature/nova-tela

# Mesclar (merge) uma branch na branch atual (ex: estando na main)
git merge feature/nova-tela

# Renomear a branch atual
git branch -m novo-nome-da-branch

# Deletar uma branch local (que já foi mesclada)
git branch -d feature/nova-tela

# Forçar deleção de uma branch local
git branch -D feature/nova-tela

# Deletar branch no GitHub (remoto)
git push origin --delete feature/nova-tela
```

---

## 5. Sincronização com o GitHub (Remoto)

```bash
# Listar repositórios remotos configurados
git remote -v

# Conectar repositório local a um repositório no GitHub
git remote add origin https://github.com/usuario/repositorio.git

# Enviar commits pela primeira vez (definindo upstream)
git push -u origin main

# Enviar commits subsequentes
git push

# Enviar branch específica
git push origin feature/nova-tela

# Buscar alterações do remoto sem mesclar
git fetch origin

# Baixar e mesclar alterações da branch atual
git pull

# Baixar e aplicar com rebase (histórico linear)
git pull --rebase origin main
```

---

## 6. Desfazendo Alterações e Histórico

```bash
# Descartar alterações de um arquivo no diretório de trabalho
git restore nome-do-arquivo.ext

# Tirar um arquivo da área de staging (sem perder modificações)
git restore --staged nome-do-arquivo.ext

# Alterar a mensagem ou arquivos do último commit (antes do push)
git commit --amend -m "refactor: nova mensagem corrigida"

# Reverter um commit público criando um novo commit de cancelamento (seguro)
git revert <hash-do-commit>

# Voltar commit mantendo alterações no staging (soft)
git reset --soft HEAD~1

# Voltar commit mantendo alterações como modificações não salvas (mixed - padrão)
git reset HEAD~1

# ATENÇÃO: Descartar todo o trabalho não commitado até o último commit (destrutivo)
git reset --hard HEAD
```

---

## 7. Stash (Salvar trabalho temporário)

Útil para alternar de branch sem precisar commitar trabalho incompleto:

```bash
# Guardar alterações pendentes no stash
git stash

# Guardar com uma descrição identificadora
git stash save "WIP: trabalhando na autenticação"

# Listar todos os stashes salvos
git stash list

# Aplicar o último stash e removê-lo da lista
git stash pop

# Aplicar o último stash mantendo-o salvo na lista
git stash apply

# Aplicar um stash específico
git stash apply stash@{1}

# Limpar todos os stashes
git stash clear
```

---

## 8. Tags e Versões

```bash
# Listar todas as tags
git tag

# Criar uma tag anotada (recomendado para releases)
git tag -a v1.0.0 -m "Release versão 1.0.0"

# Criar tag leve
git tag v1.0.1

# Enviar uma tag específica para o GitHub
git push origin v1.0.0

# Enviar todas as tags para o GitHub
git push origin --tags

# Deletar tag local
git tag -d v1.0.0

# Deletar tag remota
git push origin --delete v1.0.0
```

---

## 9. GitHub CLI (`gh`)

Ferramenta oficial de linha de comando para interagir diretamente com o GitHub:

```bash
# Fazer login no GitHub CLI
gh auth login

# Criar um novo repositório no GitHub a partir do diretório atual
gh repo create meu-projeto --public --source=. --push

# Clonar repositório
gh repo clone usuario/repositorio

# Visualizar o repositório no navegador
gh repo view --web

# Criar um Pull Request interativo
gh pr create

# Criar Pull Request com título e descrição
gh pr create --title "feat: adiciona login" --body "Implementa fluxo de login com validações"

# Listar Pull Requests abertos
gh pr list

# Fazer checkout de um Pull Request
gh pr checkout 42

# Criar uma Issue
gh issue create --title "Bug na página inicial" --body "Descrição do erro encontrado"

# Listar Issues
gh issue list
```

---

## 10. Dicas e Boas Práticas

### Padrão de Mensagens de Commit (Conventional Commits)
- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Alterações na documentação
- `style:` Formatação, ponto e vírgula ausente, sem alteração de lógica
- `refactor:` Refatoração de código sem mudar comportamento
- `test:` Adição ou correção de testes
- `chore:` Tarefas de build, configurações ou dependências

### Arquivo `.gitignore`
Sempre utilize um arquivo `.gitignore` na raiz do projeto para ignorar pastas e arquivos sensíveis/temporários:
- `node_modules/`
- `.env`
- `dist/` ou `build/`
- `.DS_Store` ou `Thumbs.db`
