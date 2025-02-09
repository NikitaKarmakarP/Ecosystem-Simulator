import React, { useEffect, useRef, useState } from "react";

const App = () => {
  const canvasRef = useRef(null);
  const [weather, setWeather] = useState("sunny");
  const [animals, setAnimals] = useState([]);

  // Add animal randomly to the ecosystem
  const addAnimal = () => {
    const newAnimal = {
      x: Math.random() * 400,
      y: Math.random() * 300,
      size: 10 + Math.random() * 10,
      color: "#" + ((1 << 24) * Math.random() | 0).toString(16),
    };
    setAnimals([...animals, newAnimal]);
  };

  // Draw environment on canvas
  const drawEnvironment = (ctx) => {
    ctx.clearRect(0, 0, 400, 300);

    // Draw weather effects
    if (weather === "rainy") {
      ctx.fillStyle = "rgba(0, 191, 255, 0.3)";
      for (let i = 0; i < 20; i++) {
        ctx.fillRect(Math.random() * 400, Math.random() * 300, 2, 10);
      }
    }

    // Draw animals
    animals.forEach((animal) => {
      ctx.beginPath();
      ctx.arc(animal.x, animal.y, animal.size, 0, Math.PI * 2);
      ctx.fillStyle = animal.color;
      ctx.fill();
    });

    // Draw sun for sunny weather
    if (weather === "sunny") {
      ctx.beginPath();
      ctx.arc(50, 50, 30, 0, Math.PI * 2);
      ctx.fillStyle = "yellow";
      ctx.fill();
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const render = () => {
      drawEnvironment(ctx);
      requestAnimationFrame(render);
    };

    render();
  }, [weather, animals]);

  return (
    <div>
      <h1>Ecosystem Simulator 🌿</h1>
      <canvas ref={canvasRef} width={400} height={300}></canvas>
      <div>
        <button onClick={() => setWeather("sunny")}>☀️ Sunny</button>
        <button onClick={() => setWeather("rainy")}>🌧️ Rainy</button>
        <button onClick={addAnimal}>🐾 Add Animal</button>
      </div>
    </div>
  );
};

export default App;
