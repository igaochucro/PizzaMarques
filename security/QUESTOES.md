# Respostas da atividade

## Questão 1

```javascript
onAuthStateChanged(auth, (user) => {
  if (!user || !user.uid) {
    window.location.replace("login.html");
    return;
  }
});
```

## Questão 2

```text
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /pedidos/{pedidoId} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
  }
}
```

## Questão 3

A `apiKey`, `projectId` e demais dados de configuração do Firebase usados pelo Front-End não são senhas. Se a aplicação roda no navegador, a configuração necessária para inicializar o Firebase precisa chegar ao navegador e pode ser encontrada pelo DevTools. Colocar esses dados em `.env` durante o desenvolvimento não os transforma em segredo no site publicado.

A proteção real está nas regras de segurança do Firestore e no Firebase Authentication. Assim, mesmo que alguém descubra a configuração do projeto, o banco decide quais operações aquela pessoa pode executar.
