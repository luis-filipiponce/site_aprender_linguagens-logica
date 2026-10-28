# Relatório — Questões sem base no conteúdo do curso

**Critério:** uma questão só permanece no banco se o assunto que ela cobra consta no curso (`curso-logica.html`: 22 módulos em `content/modulos/*.json` e `js/curso-logica-extras.js`). Foi verificado também se o assunto aparece em outras páginas do site.

**Método:** busca por termos-chave em todos os módulos, leitura do trecho encontrado e comparação com o que a questão exige. Não foi uma revisão semântica completa de cada alternativa.

## Resultado

| Nível | Antes | Removidas | Adicionadas | Agora |
|---|---|---|---|---|
| Iniciante | 25 | 1 | 0 | 24 |
| Intermediário | 25 | 1 | 0 | 24 |
| Avançado | 25 | 6 | 6 | 25 |
| Expert | 25 | 8 | 8 | 25 |
| **Total** | 100 | **16** | **14** | **98** |

## 1. Questões removidas (sem informação no curso)

### Iniciante
| Questão | Assunto | Situação no site |
|---|---|---|
| Q21 | Para que servem os comentários em um código | Curso: só menção incidental (dica do Módulo 12). Não é ensinado. |

### Intermediário
| Questão | Assunto | Situação no site |
|---|---|---|
| Q22 | Fila (FIFO): enqueue / dequeue | Curso: não há. Existe em `aprenda-programacao/pages/estruturas.html`. |

### Avançado
| Questão | Assunto | Situação no site |
|---|---|---|
| Q07 | Negação de ∀x P(x) (quantificadores) | Não consta em lugar nenhum. |
| Q11 | Pior caso do Quick Sort, O(n²) | Curso: Quick Sort é só citado como exemplo no Módulo 19. O pior caso está em `js/app.js` e `aprenda/algoritmos.html`. |
| Q14 | Estrutura usada na busca em largura (BFS) | Curso: não há. `aprenda/estruturas.html` cita BFS de passagem. |
| Q15 | Estrutura usada na busca em profundidade (DFS) | Curso: só o glossário do Módulo 19 ("backtracking = busca em profundidade"), sem a estrutura. |
| Q18 | Nº de comparações da busca binária em 1024 itens (⌊log₂n⌋+1) | Curso: tem O(log n) e "30 comparações para 1 bilhão", mas não a fórmula. |
| Q22 | Ordenação estável | Curso: não há. `js/app.js` chama o Merge Sort de "estável". |

### Expert
| Questão | Assunto | Situação no site |
|---|---|---|
| Q13 | {aⁿbⁿ} não é regular (lema do bombeamento) | Curso: só {aⁿbⁿcⁿ} (Módulo 21), sem bombeamento. |
| Q17 | Limite inferior Ω(n log n) da ordenação por comparação | Curso: só define Ω no glossário. |
| Q18 | Mochila 0/1 é pseudopolinomial | Curso: mochila por PD sim (Módulo 19). "Pseudopolinomial" não. |
| Q20 | Modus tollens | Curso: só cita modus ponens (Módulo 1). |
| Q21 | Argumento diagonal de Cantor | Curso: só a diagonalização de Turing (Módulo 21). |
| Q23 | Complexidade de Floyd-Warshall | Não consta em lugar nenhum. |
| Q24 | Complexidade de Dijkstra com heap | Dijkstra aparece só como autor da pré-condição mais fraca (Módulo 20). |
| Q25 | 2-SAT em P e 3-SAT NP-completo | Curso: cita SAT e 3-SAT (Módulo 22), mas não 2-SAT. |

## 2. Questões ajustadas (mantidas, com texto corrigido)

| Nível | Questão | Ajuste |
|---|---|---|
| Iniciante | Q18 | "Teste de mesa" virou "tabela de trace". O curso usa *trace table* (Módulo 5). |
| Intermediário | Q09 | Composição f(f(2)) não consta no curso. Trocada por uma função `eh_par(n)` (Módulo 12). |
| Expert | NP-difícil | Retirei da explicação a frase sobre o Problema da Parada ser NP-difícil. O curso não afirma isso. |

## 3. Questões adicionadas (com base direta no curso)

**Avançado:** ordem das classes assintóticas (Módulo 15); duplicatas com hash, O(n) tempo e espaço (Módulo 15); três fases da prova de invariante (Módulo 14); n(n−1)/2 comparações (Módulo 15); redução ao absurdo (Módulo 16); invariante do máximo (Módulo 14).

**Expert:** recursão de cauda (Módulo 18); subestrutura ótima e subproblemas sobrepostos (Módulo 19); Huffman como guloso (Módulo 19); mochila 0/1 por PD (Módulo 19); regra do laço de Hoare (Módulo 20); pré-condição mais fraca de x := x + 2 (Módulo 20); autômato de pilha e linguagens livres de contexto (Módulo 21); consequência de um algoritmo polinomial para um NP-completo (Módulo 22).

## 4. Cobertura parcial (mantidas, mas atenção)

- **Iniciante Q02 (proposição):** o curso define proposição, mas não cita "ordens e perguntas não são proposições".
- **Iniciante Q03 (silogismo):** o padrão "Todo M é P; x é M; logo x é P" está no Módulo 1. A palavra "silogismo" não.
- **Intermediário Q21 (pilha):** o curso só define pilha como LIFO no glossário do Módulo 17. As operações push/pop não são ensinadas.

## 5. Inconsistência encontrada no site (não corrigida)

Na busca do portal, `js/app.js` (linhas 597–601) lista módulos que não correspondem aos módulos reais:

| Entrada na busca | Módulo real no curso |
|---|---|
| Módulo 18: Estruturas de Dados Abstratas (Pilhas, Filas, Grafos) | Módulo 18 é Recursão e Teorema Mestre. **Não existe módulo de estruturas de dados.** |
| Módulo 19: Recursão... | Módulo 19 é Paradigmas Avançados. |
| Módulo 20: Paradigmas... | Módulo 20 é Lógica de Hoare. |
| Módulo 21: Computabilidade | Confere. |
| Módulo 22: P vs NP | Confere. |

Os módulos 16 e 17 também não aparecem nessa busca.
