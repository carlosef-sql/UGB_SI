Algoritmo "semnome"
// Disciplina   : [Projeto de desenvolvimento de algoritmos]
// Professor   : Rosenclever Lopes Gazoni
// Descri��o   : Efetuar a leitura de tr�s valores inteiros desconhecidos representados pelas vari�veis A, B e C. Somar os valores fornecidos e apresentar o resultado somente se for maior ou igual a 100.
// Data atual  : 03/04/2022
Var
// Se��o de Declara��es das vari�veis 
A, B, C, SOMA:real
Inicio
// Se��o de Comandos, procedimento, fun��es, operadores, etc... 
escreval("Digite o valor de A:")
leia(A)
escreval("Digite o valor de B:")
leia(B)
escreval("Digite o valor de C:")
leia(C)
SOMA <- (A + B + C)
se SOMA >= 100 entao
        escreval("A soma dos valores A,B e C � igual a: ", SOMA)
fimse
Fimalgoritmo