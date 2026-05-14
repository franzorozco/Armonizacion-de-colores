import "./styles/App.scss";
import ColorHarmonizer from "./components/ColorHarmonizer";

function App() {
  return (
    <main className="app">
      <h1>Armonización de Colores HSL</h1>
      <p>
        Generador de paletas usando teoría del color:
        triada, complementario y análogos.
      </p>

      <ColorHarmonizer />
    </main>
  );
}

export default App;