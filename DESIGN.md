# DESIGN — ATO DEV CORE V2.4

Este arquivo existe apenas para manutenção futura do ATO. Ele não é necessário
para executar tarefas e não é carregado automaticamente como instrução
permanente.

## Objetivo

Combinar:

- qualidade de raciocínio do Claude;
- execução econômica;
- routing por complexidade;
- provas determinísticas antes de PASS;
- ausência de perguntas durante trabalho normal;
- sandbox nativo quando a plataforma suporta.

## No-prompt

O ATO separa "não perguntar" de "liberar tudo".

`dontAsk` significa que uma operação que exigiria aprovação humana é negada
automaticamente. O agente recebe a negação e deve escolher uma alternativa
segura.

As ferramentas normais estão pré-aprovadas. `AskUserQuestion` é removido. Shell
complexo deve ser evitado quando native Read/Edit/Write resolve.

O comando de inicialização inclui `--permission-mode dontAsk` porque a flag de
CLI tem precedência superior às configurações normais do projeto.

## Windows

Windows nativo não possui o sandbox de kernel do Claude Code. O profile Windows
mantém automação sem perguntas, mas depende de permissões e hooks.

## macOS / Linux / WSL2

O profile sandbox exige o sandbox nativo:

- macOS: Seatbelt;
- Linux/WSL2: bubblewrap.

`allowUnsandboxedCommands=false` impede o agente de escapar do sandbox.
`failIfUnavailable=true` impede uma falsa sensação de isolamento.

## Por que não usar process substitution

Construções como `<(...)` podem ser difíceis para o analisador estático de
permissões. O agente deve usar caminhos literais, comandos simples ou ferramentas
nativas. Isso reduz prompts, falhas de parser e tool retries.

## Arquivos de documentação

`START.md` é voltado ao operador.

`DESIGN.md` existe para manutenção arquitetural e pode ser removido se ninguém
for modificar o ATO.

`README.md`, `INSTALL.md` e `install.py` foram removidos do template para evitar
duplicação.
