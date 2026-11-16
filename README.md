# ApegoSpectrum

Aplicação web em HTML/CSS/JavaScript para avaliar o estilo de apego e a posição no espectro relacional, inspirada na escala ECR-R e em ideias do MBTI.

## O que é o projeto

Este projeto apresenta uma jornada interativa:

- tela inicial editorial;
- questionário com escala Likert de 7 pontos;
- etapa reflexiva com perguntas qualitativas;
- cálculo de índices de ansiedade de apego e evitação de intimidade;
- mapa cartesiano 2D e síntese de perfis emocionais;
- análise opcional via IA, usando token de API configurado pelo usuário.

## Estrutura do projeto

- `index.html` — estrutura principal da aplicação
- `styles.css` — estilos da interface
- `script.js` — lógica da avaliação, cálculos e interações
- `avalia_o_profunda_de_apego_espectro_relacional_estilo_mbti_ia.html` — arquivo original da avaliação
- `README.md` — documentação do projeto

## Como executar

### 1) Instale as dependências de build

```bash
npm install
```

### 2) Gere o CSS do Tailwind localmente

```bash
npm run build:css
```

### 3) sirva a aplicação

```bash
python -m http.server 8000
```

Depois acesse:

```text
http://localhost:8000/
```

> A interface deixa de depender do CDN do Tailwind em produção, usando um build local gerado pelo projeto.

## Observações

- A integração com IA é opcional e usa um token fornecido pelo usuário na própria interface.
- Sem token, a aplicação ainda funciona em modo de demonstração, exibindo uma síntese local estruturada.
- Os estilos de apego e relatórios são ilustrativos e não substituem avaliação profissional.

## Autor

Souga Dev
