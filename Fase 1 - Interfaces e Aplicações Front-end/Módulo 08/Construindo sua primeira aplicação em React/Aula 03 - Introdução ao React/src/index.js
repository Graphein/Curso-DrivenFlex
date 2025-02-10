import reactDom from "react-dom";

function exibir()
{
    return (
        <div>
        <h1>Lista de Compras</h1>
        <ul>
            <li>Pão</li>
            <li>Banana</li>
            <li>Milk Shake de Doce de Leite</li>
            <li>Nutella</li>
            <li>Sorvete</li>
        </ul>
    </div>
    )
}
const listaReact = exibir();
const elemento = document.querySelector(".root");
reactDom.render(listaReact, elemento);