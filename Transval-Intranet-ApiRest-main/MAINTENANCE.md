# Guia de Manutenção do Código

Este documento contém orientações para manter o código organizado e evitar problemas comuns.

## Estrutura de Arquivos

- **api/** - Backend da aplicação
- **src/** - Frontend da aplicação
  - **Assets/** - Imagens e mídia
  - **downloads/** - Arquivos para download
  - **scripts/** - JavaScript
  - **styles/** - CSS

## Boas Práticas

### Arquivos de Assets
- Evite manter cópias de arquivos com nomes como "cópia" ou "(1)"
- Mantenha nomes de arquivos sem espaços (use underline ou hífen)
- Evite armazenar arquivos de vídeo grandes no repositório

### JavaScript
- Evite funções redundantes que realizam tarefas similares
- Documente funções complexas com comentários JSDoc
- Nomeie as funções de forma clara indicando seu propósito
- Evite exportar funções que não são utilizadas em outros módulos

### Upload de Arquivos
- Use a função `uploadFile()` para todos os uploads, indicando se deve usar simulação
- Todas as uploads são automaticamente registrados no objeto `folderContents`

### Manutenção
- Execute regularmente `npm prune` para remover dependências não utilizadas
- Verifique a existência de arquivos duplicados nas pastas de download
### npm run dev-win