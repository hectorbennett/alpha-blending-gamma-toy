import { useEffect, useRef, useState } from "react";
import ColourPicker from "./ColourPicker";
import alpha_blend from "./alpha_blend";
import { parse_rgba_array_to_string } from "./utils";
import { Box, NumberInput, Title } from "@mantine/core";

function Canvas({
  colour1,
  colour2,
  gamma,
}: {
  colour1: Array<number>;
  colour2: Array<number>;
  gamma: number;
}) {
  const white_opaque = [255, 255, 255, 255];
  const colour1_opaque = alpha_blend(white_opaque, colour1, 2.2);
  const colour2_opaque = alpha_blend(white_opaque, colour2, 1);
  const background = alpha_blend(colour1, colour2, gamma);
  const background_opaque = alpha_blend(white_opaque, background, gamma);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    ctx.fillStyle = parse_rgba_array_to_string(colour1_opaque);
    ctx.fillRect(50, 50, 100, 100);

    ctx.fillStyle = parse_rgba_array_to_string(colour2_opaque);
    ctx.fillRect(100, 100, 100, 100);

    ctx.fillStyle = parse_rgba_array_to_string(background_opaque);
    ctx.fillRect(100, 100, 50, 50);
  }, [colour1_opaque, colour2_opaque, background_opaque]);

  return (
    <canvas
      ref={canvasRef}
      style={{ background: "white" }}
      width={250}
      height={250}
    />
  );
}

function App() {
  const [colour1, setColour1] = useState([255, 0, 0, 127]);
  const [colour2, setColour2] = useState([0, 0, 255, 127]);
  const [gamma, setGamma] = useState<number | "">(2.2);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Title order={3}>Linear rgb alpha blending with gamma correction</Title>
      <Canvas colour1={colour1} colour2={colour2} gamma={gamma || 0} />
      <div>
        <ColourPicker value={colour1} onChange={setColour1} label="Colour 1" />
        <ColourPicker value={colour2} onChange={setColour2} label="Colour 2" />
        <NumberInput
          value={gamma}
          onChange={setGamma}
          label="gamma"
          min={0.1}
          max={10}
          step={0.1}
          precision={1}
        />
      </div>
    </Box>
  );
}

export default App;
