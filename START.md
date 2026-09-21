# START — ATO DEV CORE V2.4

Este arquivo é o guia prático para iniciar o Claude.  
Você não precisa de `install.py`, `README.md` ou `INSTALL.md`.

O projeto deve ter esta estrutura na própria raiz:

```text
seu-projeto/
├── CLAUDE.md
├── .claude/
├── src/ ...
└── .git/
```

Sempre abra o terminal **na raiz do projeto que o Claude deve editar**.

---

# 1. Regra principal: não fazer perguntas durante a tarefa

O ATO V2.4 usa duas camadas para isso:

1. `--permission-mode dontAsk` no comando de inicialização;
2. `AskUserQuestion` fica removido pelas permissões.

Na prática:

- se uma ação já é permitida, Claude executa;
- se uma ação seria uma pergunta de permissão, ela é negada automaticamente;
- Claude deve reescrever a operação de forma segura e continuar;
- Claude não deve transformar uma negação em pergunta;
- Claude só termina como `BLOCKED` quando realmente não existe alternativa segura.

`dontAsk` é importante porque vem pela linha de comando e, por isso, prevalece
sobre as configurações normais do projeto e do usuário.

## O que ainda pode aparecer fora de uma tarefa normal

Nenhuma configuração de projeto consegue eliminar alguns diálogos do próprio
produto/sistema, principalmente:

- login da conta;
- confiança inicial no workspace;
- permissões do próprio macOS/Windows;
- política obrigatória de uma organização.

Depois de o workspace estar confiável, o ATO foi configurado para não depender de
aprovações humanas durante o trabalho normal.

---

# 2. WINDOWS NATIVO — PowerShell, CMD ou Git Bash

Windows nativo **não possui o sandbox de kernel do Claude Code**.

Use este modo se estiver em PowerShell, CMD ou Git Bash/MINGW64.

## PowerShell

Entre no projeto:

```powershell
cd C:\Users\xgame\prompt
```

Inicie:

```powershell
claude --permission-mode dontAsk --settings ".claude/profiles/windows.json" --strict-mcp-config --mcp-config ".claude/mcp/empty.json" --append-system-prompt-file ".claude/prompts/dev-session.md" --name "ato-dev"
```

## CMD

```cmd
cd /d C:\Users\xgame\prompt
claude --permission-mode dontAsk --settings ".claude/profiles/windows.json" --strict-mcp-config --mcp-config ".claude/mcp/empty.json" --append-system-prompt-file ".claude/prompts/dev-session.md" --name "ato-dev"
```

## Git Bash

```bash
cd /c/Users/xgame/prompt
claude --permission-mode dontAsk --settings ".claude/profiles/windows.json" --strict-mcp-config --mcp-config ".claude/mcp/empty.json" --append-system-prompt-file ".claude/prompts/dev-session.md" --name "ato-dev"
```

### O que este modo faz

- Sonnet é o executor principal.
- Não usa MCP por padrão.
- Não pergunta permissão durante o trabalho normal.
- Read/Edit/Write/Bash/PowerShell já estão liberados pelo ATO.
- Comandos perigosos continuam passando pelos guards.
- `AskUserQuestion` fica indisponível.
- Não existe sandbox de kernel; os guards e as permissões são a proteção local.

Se você quer o isolamento mais forte possível no Windows, use WSL2 conforme a
próxima seção.

---

# 3. WSL2, LINUX E macOS — SANDBOX NATIVO

Esse é o modo recomendado quando você quer autonomia **e** isolamento do sistema
operacional.

- macOS: Claude Code usa Seatbelt.
- Linux: usa bubblewrap.
- WSL2: usa bubblewrap.
- Windows nativo: não suporta esse sandbox.

## Linux / WSL2 — dependências

Ubuntu/Debian:

```bash
sudo apt-get update
sudo apt-get install -y bubblewrap socat
```

Depois abra o projeto dentro do ambiente Linux/WSL2.

Exemplo WSL2:

```bash
cd /mnt/c/Users/xgame/prompt
```

Inicie:

```bash
claude --permission-mode dontAsk --settings ".claude/profiles/sandbox.json" --strict-mcp-config --mcp-config ".claude/mcp/empty.json" --append-system-prompt-file ".claude/prompts/dev-session.md" --name "ato-dev-sandbox"
```

## macOS / Linux

Entre na raiz do projeto:

```bash
cd /caminho/do/projeto
```

Depois:

```bash
claude --permission-mode dontAsk --settings ".claude/profiles/sandbox.json" --strict-mcp-config --mcp-config ".claude/mcp/empty.json" --append-system-prompt-file ".claude/prompts/dev-session.md" --name "ato-dev-sandbox"
```

O profile `sandbox.json` usa `failIfUnavailable=true`.

Isso significa:

```text
sandbox disponível     → Claude inicia
sandbox indisponível   → Claude não inicia sem isolamento
```

Ele também impede Claude de sair do sandbox com
`dangerouslyDisableSandbox`.

---

# 4. Por que apareceu aquela pergunta com `<(...)`?

O comando era parecido com:

```bash
diff <(cat arquivoA) arquivoB
```

`<(...)` é chamado **process substitution**.

O analisador de permissões do Claude Code pode não conseguir provar quais
arquivos esse tipo de construção vai abrir. Quando isso acontece, ele pode
acionar o fluxo de aprovação.

No V2.4 o `CLAUDE.md` manda Claude não gerar esse tipo de shell quando existe uma
forma simples equivalente.

Para comparar arquivos, ele deve preferir:

```bash
diff arquivoA arquivoB
```

ou ler os dois arquivos com a ferramenta nativa `Read` e comparar o conteúdo.

Também deve evitar, quando desnecessários:

```text
$(...)
`comando`
<(...)  >(...)
heredoc
eval
bash -c
sh -c
cmd /c
PowerShell dentro de PowerShell
pipelines enormes
paths calculados dinamicamente
```

Essas construções não são "erradas". Elas só tornam a análise estática de
permissão mais difícil e aumentam a chance de bloqueio.

---

# 5. Como confirmar que o modo sem perguntas está ativo

Dentro do Claude:

```text
/status
```

Confira as fontes de settings carregadas.

Depois:

```text
/permissions
```

O modo da sessão deve ser equivalente a:

```text
dontAsk
```

Você também pode verificar antes de iniciar:

```bash
claude doctor
```

Se houver erro de JSON ou regra inválida, corrija antes de usar o ATO.

---

# 6. O que fazer se Claude encontrar uma operação negada

Você não precisa fazer nada.

O contrato do V2.4 é:

```text
tentativa negada
      ↓
Claude NÃO pergunta
      ↓
simplifica o comando
      ↓
usa path literal
      ↓
prefere Read/Edit/Write nativos
      ↓
tenta novamente
      ↓
continua a tarefa
```

Exemplo:

```text
ERRADO:
diff <(cat "$HOME/Downloads/a.json") b.json

MELHOR:
Read C:\Users\xgame\Downloads\a.json
Read .\b.json
comparar os conteúdos
```

ou, quando o shell simples é suficiente:

```bash
diff "$HOME/Downloads/a.json" "b.json"
```

---

# 7. Arquivos que permanecem no pacote

## CLAUDE.md

É o contrato permanente do agente.

Ele contém as regras de:

- economia de contexto;
- roteamento;
- verdade/PASS;
- ausência de perguntas;
- Git;
- scope;
- compactação;
- como reagir a um comando negado.

Claude lê esse arquivo automaticamente.

## .claude/settings.json

É a configuração base:

- Sonnet;
- effort medium;
- hooks;
- permissões;
- agents;
- compactação;
- status line;
- guards.

## .claude/profiles/windows.json

Configuração para Windows nativo.

Não tenta usar sandbox de kernel.

## .claude/profiles/sandbox.json

Configuração para macOS, Linux e WSL2.

Exige que o sandbox nativo realmente esteja funcionando.

## DESIGN.md

É documentação humana da arquitetura do ATO.

**Não é carregado automaticamente em toda sessão**, então não custa contexto
normal. Vale manter porque explica por que as decisões de segurança, routing,
truth gate e no-prompt existem. Se você nunca pretende manter/modificar o ATO,
pode apagá-lo sem afetar a execução.

## START.md

É este guia.

Também não é carregado automaticamente pelo Claude. Serve para você lembrar como
iniciar e entender o pacote.

---

# 8. Arquivos removidos

O V2.4 não precisa destes arquivos na raiz:

```text
README.md
INSTALL.md
install.py
```

Motivo:

- `README.md`: duplicava o `START.md`;
- `INSTALL.md`: duplicava instruções;
- `install.py`: depois que `.claude/` está diretamente dentro do projeto, não
  participa do runtime.

Se o seu projeto já possui um `README.md` próprio, obviamente mantenha o README
do **projeto**. A remoção aqui se refere apenas ao README que vinha junto com o
template ATO.

---

# 9. Comando que eu recomendo para você

Como você usa Windows nativo hoje:

```powershell
cd C:\Users\xgame\prompt
claude --permission-mode dontAsk --settings ".claude/profiles/windows.json" --strict-mcp-config --mcp-config ".claude/mcp/empty.json" --append-system-prompt-file ".claude/prompts/dev-session.md" --name "ato-dev"
```

Se migrar o Claude Code para WSL2:

```bash
cd /mnt/c/Users/xgame/prompt
claude --permission-mode dontAsk --settings ".claude/profiles/sandbox.json" --strict-mcp-config --mcp-config ".claude/mcp/empty.json" --append-system-prompt-file ".claude/prompts/dev-session.md" --name "ato-dev-sandbox"
```

O segundo é o modo com isolamento de kernel.
