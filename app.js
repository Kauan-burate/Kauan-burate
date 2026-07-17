import pg from "pg";
import promptSync from "prompt-sync";

const prompt = promptSync();
const { Client } = pg;

const client = new Client({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "root",
    database: "Almoxarifado"
});


async function ListarProdutosCadastrados(){
    try {
        await client.connect();

        const produtosCadastrados = await client.query(`SELECT * FROM produtos`);

        console.log("PRODUTOS CADASTRADOS: ");
        console.table(produtosCadastrados.rows);

        
    } catch (error) {
        console.log(error.message);
    }
    finally{
        await client.end();
    }

}

async function CadastrarProdutos(){
    try {
        await client.connect();

        console.log("CADASTRO DE PRODUTOS: ");
        const nome = prompt("Digite o nome do produto: ");
        const categoria = prompt("Digite a categoria do produto: ");
        const quantidade = prompt("Digite a quantidade do produto: ");
        const valor_unitario = prompt("Digite o valor do produto: ");

        if (nome == "" && categoria == ""){
            console.log("Nome e categoria não pode ser nulo!")
        } else if (quantidade <= 0 && valor_unitario <= 0){
            console.log("Quantidade e valor unitário não pode ser 0 ou negativa!");
        } else{
            const cadastro = await client.query(
                `UPDATE produtos
                SET nome = $1,
               categoria = $2,
               quantidade = $3,
               valor_unitario = $4`,
               [nome, categoria, quantidade, valor_unitario]);     
              
               console.log("Cadastro realizado com sucesso!!");

        }

        
    } catch (error) {
        console.log(error.message);
    }
    finally{
        await client.end();
    }

}

async function ListarSaidas(){
    try {
        await client.connect();

        const valor = "Saida";
        const saidas = await client.query(`SELECT id_produto, tipo_movimentacao, quantidade, data_movimentacao FROM movimentacoes WHERE tipo_movimentacao = $1`, [valor]);

        console.log("SAÍDAS REGISTRADAS: ");
        console.log(saidas.rows);
        
    } catch (error) {
        console.log(error.message);
    }
    finally{
        await client.end();
    }
   


}


async function RegistrarEntradas(){
    try {
        await client.connect();

        console.log("REGISTRAR ENTRADAS: ");
        const id_produto = prompt("Digite o id produto: ");
        const tipo_movimentacao = prompt("Digite o tipo da movimentacao (Saida ou Entrada): ");
        const quantidade = prompt("Digite a quantidade: ");
        const data_movimentacao = prompt("Digite o valor unitário:  ");
        const observação = prompt("Digite a observação: ");


       

            

        
    } catch (error) {
        console.log(error.message);
    } finally{
        await client.connect();
    }




}


async function menu(){

    let ativo = true;
    while(ativo){

        console.log("=====MENU=====");
        console.log("1 - Listar Produtos cadastrados");
        console.log("2 - Cadastrar Produtos");
        console.log("3 - Listar Saidas");
        console.log("0 - Sair");
        const comando = prompt("Digite o que Deseja fazer: ");

        switch (comando) {
            case '1': await ListarProdutosCadastrados();  break;
            case '2': await CadastrarProdutos();          break;
            case '3': await ListarSaidas();               break;
        
            case '0':
                ativo = false;
                console.log('\n Até a próxima, saindo do sitema....\n');
                break;
            default:
                console.log('❌ Opção inválida. Tente novamente.');
        }


    }




}

await menu();





















