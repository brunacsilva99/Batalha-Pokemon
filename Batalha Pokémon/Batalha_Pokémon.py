import math #Biblioteca para operações matemáticas

class pokemon():
   
    def __init__(self,name,nivel,BS,IV,EV):
        self.nome = name
        self.l = nivel
        self.bs = BS
        self.iv = IV
        self.ev = EV
        self.hp = 0
        self.at = 0
        self.df = 0
        self.sp = 0  

    #Faz o cálculo de HP levando em conta a fórmula dada na especificação do projeto
    def calculaHP(self):
        HP = (((self.iv[0]+self.bs[0]+((math.sqrt(self.ev[0]))/8)+50)*self.l)/50) + 10  
        return HP

    #Faz o cálculo de cada atributo utilizando a fórmula dada na especificação do projeto
    def calculaAtributos(self,n):
        S = (((self.iv[n]+self.bs[n]+((math.sqrt(self.ev[n]))/8))*self.l)/50) + 5  
        return S
    pass


#Verifica se os dados lidos respeitam as restrições impostas e se estiver errado solicita a correção
def verificaDados(dados,indice):     
    
    print('Verificando dados do {}º Pokémon... '.format(indice))
    x = True
    name = False
    nivel = False
    while (x):
        if(not dados[0].isalpha()):
            print('Desculpe o nome do {}º Pokémon precisa ter somente caracteres alfanuméricos'.format(indice))
            dados[0] = input('Digite o nome do {}º Pokemon novamente: '.format(indice))
        else:
            name=True

        if(dados[1]<1 or dados[1]>99):
            print('Desculpe mas o nível informado para o {}º Pokémon não é válido, precisa estar no intervalo de 1 até 99'.format(indice))
            dados[1] = int(input('Digite um valor válido para o nível do {}º Pokémon: '.format(indice)))
        else:
            nivel = True
        
        if(indice==2):
            add = 7
        else:
            add = 2
        contCertos=0
        for n in range(0,4):
            
            if(dados[2][n]<1 or dados[2][n]>255):
                print('Desculpe mas o valor de base(BS) da linha {} informado não é válido, precisa estar no intervalo de 1 até 255\n'.format(n+add))
                dados[2][n] = int(input('Digite um valor válido para o BS da linha {} que é informação do {}º Pokémon : '.format(n+add,indice)))
            elif(dados[3][n]<1 or dados[3][n]>15):
                print('Desculpe mas o valor individual(IV) da linha {} informado não é válido, precisa estar no intervalo de 1 até 15\n'.format(n+add))
                dados[3][n] = int(input('Digite um valor válido para o IV da linha {} que é informação do {}º Pokémon: '.format(n+add,indice)))
            elif(dados[3][n]<1 or dados[3][n]>262140):
                print('Desculpe mas o valor dos esforços(EV) da linha {} informado não é válido, precisa estar no intervalo de 1 até 262140\n'.format(n+add))
                dados[4][n] = int(input('Digite um valor válido para o EV da linha {} que é informação do {}º Pokémon: '.format(n+add,indice)))
            else:
                contCertos=contCertos+1
        if(contCertos == 4 and name and nivel):
            x=False
            print('Os dados do {}º Pokémon são válidos!\n'.format(indice))


#Função pra ler os dados inseridos pelo usuário e armazenar os dados
def pegaDados():
    primeiraLinha = input()
    linhaHP = input()
    linhaAT = input()
    linhaDF = input()
    linhaSP = input()

    nome = primeiraLinha.split()[0] 
    L = int(primeiraLinha.split()[1])
   
    #Formando os vetores das variáveis dos atributos
    #Usando o metodo .split() das variáveis para separar as informações quando existe um espaço entre os caracteres
    BS = [int(linhaHP.split()[0]),int(linhaAT.split()[0]),int(linhaDF.split()[0]),int(linhaSP.split()[0])]
    IV = [int(linhaHP.split()[1]),int(linhaAT.split()[1]),int(linhaDF.split()[1]),int(linhaSP.split()[1])]
    EV = [int(linhaHP.split()[2]),int(linhaAT.split()[2]),int(linhaDF.split()[2]),int(linhaSP.split()[2])]
    dados = [nome,L,BS,IV,EV]    
    return dados


#Faz as contas de quanto de vida é perdida ao sofrer um ataque e atualiza o valor de HP para os próximos turnos
def ataque(HPalvo,ATatacante,DFalvo):
    dano = ATatacante - DFalvo
    if(dano>0):
        HPatualizado = HPalvo - dano  
    else:
        HPatualizado = HPalvo
    return HPatualizado

i = True
while(i):
    #Leitura e verificação dos dados dos Pokémons
    print('Entre com os dados dos dois Pokémons no formato padrão: \n')
    dados1 = pegaDados()
    dados2 = pegaDados()
    verificaDados(dados1,1)
    verificaDados(dados2,2)

    #Estabelecendo o objeto Pokémon 1 e definindo seus atributos
    #dados1[0] : refere-se ao nome
    #dados1[1] : refere-se ao nível L 
    #dados1[2] : refere-se ao vetor dos valores de base BS's
    #dados1[3] : refere-se ao vetor dos valores individuais IV's
    #dados1[4] : refere-se ao vetor dos valores de esforço EV's
    P1 = pokemon(dados1[0],dados1[1],dados1[2],dados1[3],dados1[4])   
    P1.hp = P1.calculaHP()   
    P1.at = P1.calculaAtributos(1)    
    P1.df = P1.calculaAtributos(2)   
    P1.sp = P1.calculaAtributos(3)
    

    #Estabelecendo o objeto Pokémon 2 e definindo seus atributos
    #dados2[0] : refere-se ao nome
    #dados2[1] : refere-se ao nível L 
    #dados2[2] : refere-se ao vetor dos valores de base BS's
    #dados2[3] : refere-se ao vetor dos valores individuais IV's
    #dados2[4] : refere-se ao vetor dos valores de esforço EV's
    P2 = pokemon(dados2[0],dados2[1],dados2[2],dados2[3],dados2[4])
    P2.hp = P2.calculaHP()
    P2.at = P2.calculaAtributos(1)
    P2.df = P2.calculaAtributos(2)
    P2.sp = P2.calculaAtributos(3)

    #Rotina da batalha, considerando um ataque de cada Pokémon por turno
    HPat1 = P1.hp
    HPat2 = P2.hp
    turnos=0    
    while(HPat1>0 and HPat2>0):
        HPat2 = ataque(HPat2,P1.at,P2.df)
        HPat1 = ataque(HPat1,P2.at,P1.df)
        turnos = turnos + 1
        if(HPat1==P1.hp and HPat2==P2.hp):
            print('Desculpe mas nenhum dos pokémons consegue infligir um ataque que cause dano maior que a defesa do oponente, luta encerrada sem vencedor')
            break       
       
    #Impressão dos dados iniciais do Pokémon 1
    print('Pokémon: {} de nível {}'.format(P1.nome,int(P1.l)))
    print('HP: ',int(P1.hp))
    print('AT: ',int(P1.at))
    print('DF: ',int(P1.df))
    print('SP: ',int(P1.sp))

    #Impressão dos dados iniciais do Pokémon 2
    print('Pokémon: {} de nível {}'.format(P2.nome,int(P2.l)))
    print('HP: ',int(P2.hp))
    print('AT: ',int(P2.at))
    print('DF: ',int(P2.df))
    print('SP: ',int(P2.sp))

    #Definição do ganhador e impressão do resultado
    if(HPat1<=0 and HPat2>0):
        print('A batalha acaba em {} turnos, Vencedor: {}'.format(turnos,P2.nome))
    elif(HPat2<=0 and HPat1>0):
        print('A batalha acaba em {} turnos, Vencedor: {}'.format(turnos,P1.nome))
    elif(HPat1<=0 and HPat2<=0):
       if(P1.sp>P2.sp):
          print('A batalha acaba em {} turnos, Vencedor: {}'.format(turnos,P1.nome))
       if(P2.sp>P1.sp):
          print('A batalha acaba em {} turnos, Vencedor: {}'.format(turnos,P2.nome))
       if(P1.sp==P2.sp):
          print('A batalha acaba em {} turnos, Não foi possível determinar um vencedor'.format(turnos))

    #Possibilidade de Repetição
    escolha = input('Se deseja repetir o processo digite y , caso contrário aperte alguma outra tecla ')
    if(not escolha=="y"):     
        i = False
    else: 
        print('Vamos para a próxima batalha Pokémon! \n')
        


   

    

