import ReactDOM from 'react-dom';

function App() {
    return (
        <div>
					<Topo />
					<Menu />
				</div>
    );
}

function Topo() {
    return (
        <div>
            <h1>Meu título</h1>
        </div>
    );
}

function Menu() {
    return (
			<ul>
				<li><a href="...">Home</a></li>
				<li><a href="...">Sobre nós</a></li>
				<li><a href="...">Contato</a></li>
			</ul>
    );
}

const app = App();
ReactDOM.render(app, document.querySelector(".root"));