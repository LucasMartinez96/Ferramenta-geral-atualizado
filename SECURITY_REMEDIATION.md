# Plano de blindagem do Firebase e GitHub — 22/10/2026

## Aplicado no codigo
- Removida a criação automática de administrador no login.
- Ocultado o painel de usuários para usuários sem perfil administrativo já cadastrado.
- Bloqueadas criação e exclusão de contas pelo navegador.
- Desativado o formulário público de cadastro nas duas telas de login.
- Adicionado .gitignore para evitar novos uploads acidentais de arquivos locais e planilhas.

## Pendente: controles obrigatorios no backend
1. Revisar Firestore Rules da coleção usuarios: permitir ao usuário consultar apenas seu próprio perfil e ao administrador consultar as contas, mas proibir escritas de privilégios pelo cliente.
2. Gerenciar contas e perfis exclusivamente no servidor com Firebase Admin SDK, verificando a identidade e autorização do solicitante.
3. Revisar a configuração de cadastro do Firebase Authentication. Bloquear o botão no navegador não impede chamadas diretas à API.
4. Revisar dados operacionais Excel/CSV já versionados. .gitignore não remove arquivos existentes, nem o histórico.
5. Habilitar Secret Scanning e Push Protection na configuração do repositório, quando disponível.
6. Revogar e rotacionar qualquer credencial secreta efetivamente comprometida.
7. Verificar as restrições da chave web Firebase em Google Cloud API Keys e todas as regras de Firestore/Storage.
8. Executar teste de autorização com usuário sem permissão administrativa e verificar se a API rejeita criação/alteração de perfis.

ATENÇÃO: Não implantar regras genéricas no Firestore sem revisar a estrutura do projeto e o impacto nos usuários atuais.
