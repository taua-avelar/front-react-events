import "./App.css";
import { useState } from "react";

function Tarefa(props) {
  return (
    <li>
      <span
        onClick={() => props.handleCompleta(props.id)}
        style={props.completa ? { textDecoration: "line-through" } : {}}
      >
        {props.children}
      </span>
      <button onClick={() => props.handleDelete(props.id)}>X</button>
    </li>
  );
}

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [filtro, setFiltro] = useState("todas");

  const tarefasFiltradas = tarefas.filter((t) =>
    filtro === "ativa" ? !t.completa : filtro === "completa" ? t.completa : t
  );

  function handleKeyDown(event) {
    if (event.key !== "Enter") return;

    const novasTarefas = [
      ...tarefas,
      { id: Math.random(), texto: event.target.value, completa: false },
    ];
    event.target.value = "";

    setTarefas(novasTarefas);
  }

  function handleCompleta(id) {
    const novasTarefas = [...tarefas];
    const tarefaClicada = novasTarefas.find((tarefa) => tarefa.id === id);
    tarefaClicada.completa = !tarefaClicada.completa;

    setTarefas(novasTarefas);
  }

  function handleDelete(id) {
    const novasTarefas = tarefas.filter((tarefa) => tarefa.id !== id);

    setTarefas(novasTarefas);
  }

  function limparCompletadas() {
    const novasTarefas = tarefas.filter((tarefa) => !tarefa.completa);
    setTarefas(novasTarefas);
  }

  return (
    <div className="App">
      <h1>TAREFAS</h1>
      <input type="text" onKeyDown={handleKeyDown} />
      <ul>
        {tarefasFiltradas.map(function (tarefa) {
          return (
            <Tarefa
              key={tarefa.id}
              id={tarefa.id}
              completa={tarefa.completa}
              handleDelete={handleDelete}
              handleCompleta={handleCompleta}
            >
              {tarefa.texto}
            </Tarefa>
          );
        })}
      </ul>
      <h2>
        Não Finalizadas {tarefas.filter((tarefa) => !tarefa.completa).length}
      </h2>
      <button onClick={() => setFiltro("todas")}>TODAS</button>
      <button onClick={() => setFiltro("ativa")}>ATIVAS</button>
      <button onClick={() => setFiltro("completa")}>COMPLETADAS</button>
      <button onClick={limparCompletadas}>LIMPAR COMPLETADAS</button>
    </div>
  );
}

export default App;
