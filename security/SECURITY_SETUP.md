# Segurança — Bella Massa

## 1. Firebase Authentication

No Firebase Console:
1. Authentication > Sign-in method.
2. Ative Email/Password.
3. Crie pelo menos um usuário de funcionário.
4. Em Configurações do projeto > Seus apps, crie/abra um app Web e copie a configuração para `js/firebase-config.js`.

Enquanto os valores forem placeholders, o site informa que o Firebase não está configurado e não envia pedidos.

## 2. Route Guard

`caixa.html` e `cozinha.html` carregam `auth-guard.js`. No sistema principal, clientes podem enviar pedidos sem entrar; cozinha, garçom e caixa só aparecem depois do login da equipe.

O trecho responsável pelo redirecionamento é:

```javascript
onAuthStateChanged(auth, (user) => {
  if (!user || !user.uid) {
    window.location.replace("login.html");
    return;
  }
});
```

## 3. Firestore Rules

Crie o Firestore Database e publique o conteúdo de `security/firestore.rules` em:

Firestore Database > Rules.

A regra permite criar pedidos de clientes sem login, exige autenticação para consultar e atualizar pedidos, e restringe contas e transações à equipe autenticada. Pedidos não podem ser excluídos.

## 4. API Key do Firebase

A configuração do Firebase Web não é um segredo. Em Front-End puro, qualquer configuração enviada ao navegador pode ser encontrada pelo usuário. A proteção deve estar no Authentication e nas Security Rules.

## 5. Dados sincronizados

O sistema usa as coleções `pedidos`, `contas` e `transacoes`. A fila, as contas e o caixa atualizam em tempo real para funcionários autenticados. O envio de pedidos usa `addDoc`; mudanças de status e fechamento de conta usam atualizações/transações do Firestore.

Depois de configurar o Web App e publicar as Rules, sirva a pasta por HTTP (por exemplo, Live Server). Abrir os HTMLs diretamente como `file://` pode bloquear os módulos JavaScript.
