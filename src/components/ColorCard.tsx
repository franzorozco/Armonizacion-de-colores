import "../styles/ColorCard.scss";

interface Props {
  title: string;
  color: string;
}

function ColorCard({ title, color }: Props) {
  const textColor = getContrastColor(color);

  return (
    <div
      className="color-card"
      style={{
        backgroundColor: color,
        color: textColor,
      }}
    >
      <h3>{title}</h3>
      <p>{color}</p>
    </div>
  );
}

function getContrastColor(hsl: string) {
  const lightness =
    Number(hsl.match(/\d+%?\)$/)?.[0].replace("%", "").replace(")", "")) || 50;

  return lightness > 60 ? "#000" : "#fff";
}

export default ColorCard;