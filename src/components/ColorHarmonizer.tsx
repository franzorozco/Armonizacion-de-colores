import { useState } from "react";
import ColorCard from "./ColorCard";
import ContrastChecker from "./ContrastChecker";
import ColorSphere3D from "./ColorSphere3D";
import "../styles/ColorHarmonizer.scss";

interface Harmony {
  type: string;
  value: string;
}

function ColorHarmonizer() {
  const [hue, setHue] = useState<number>(180);

  const getHarmonies = (h: number): Harmony[] => {
    return [
      {
        type: "Base",
        value: `hsl(${h}, 70%, 50%)`,
      },
      {
        type: "Complementario",
        value: `hsl(${(h + 180) % 360}, 70%, 50%)`,
      },
      {
        type: "Triada A",
        value: `hsl(${(h + 120) % 360}, 70%, 50%)`,
      },
      {
        type: "Triada B",
        value: `hsl(${(h + 240) % 360}, 70%, 50%)`,
      },
      {
        type: "Análogo Izq",
        value: `hsl(${(h - 30 + 360) % 360}, 70%, 50%)`,
      },
      {
        type: "Análogo Der",
        value: `hsl(${(h + 30) % 360}, 70%, 50%)`,
      },
    ];
  };

  const harmonies = getHarmonies(hue);
  return (
    <section className="harmonies">
      <div className="controls">
        <label>
          Hue: <strong>{hue}°</strong>
        </label>

        <input
          type="range"
          min="0"
          max="360"
          value={hue}
          onChange={(e) =>
            setHue(Number(e.target.value))
          }
        />
      </div>

      <ColorSphere3D
        colors={harmonies.map((h) => h.value)}
      />
      <div className="palette">
        {harmonies.map((item) => (
          <ColorCard
            key={item.type}
            title={item.type}
            color={item.value}
          />
        ))}
      </div>

      <ContrastChecker
        color={`hsl(${hue}, 70%, 50%)`}
      />
    </section>
  );
}

export default ColorHarmonizer;