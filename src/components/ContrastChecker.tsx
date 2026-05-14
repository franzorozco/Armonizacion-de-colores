import "../styles/ContrastChecker.scss";

interface Props {
  color: string;
}

function ContrastChecker({ color }: Props) {
  return (
    <section className="contrast-box">
      <h2>Contraste</h2>

      <div
        className="preview"
        style={{
          background: color,
        }}
      >
        <p style={{ color: "#fff" }}>Texto Blanco</p>
        <p style={{ color: "#000" }}>Texto Negro</p>
      </div>

      <small>
        Fórmula usada:
        contraste según luminosidad (L de HSL)
      </small>
    </section>
  );
}

export default ContrastChecker;