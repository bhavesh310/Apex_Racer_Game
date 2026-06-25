# 🏎️ Apex Racer

<div align="center">

### A High-Performance Formula Racing Simulation Featuring Dynamic Weather, Procedural Track Generation, and Real-Time Physics

Built with modern web technologies to demonstrate advanced game development concepts including procedural generation, physics simulation, particle systems, state management, and performance optimization.

![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge\&logo=javascript\&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-Canvas-E34F26?style=for-the-badge\&logo=html5\&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-Modern_UI-1572B6?style=for-the-badge\&logo=css3\&logoColor=white)
![Game Development](https://img.shields.io/badge/Game_Engine-Custom-black?style=for-the-badge)
![Performance](https://img.shields.io/badge/Performance-60FPS-success?style=for-the-badge)

</div>

---

## 🚀 Project Overview

Apex Racer is a browser-based Formula-style racing game engineered to showcase real-world software engineering concepts through an interactive gaming experience.

The project combines procedural terrain generation, dynamic weather simulation, real-time vehicle physics, and advanced rendering techniques to create an engaging racing environment where gameplay conditions evolve continuously.

Unlike traditional racing games with static tracks and predictable environments, Apex Racer introduces adaptive racing conditions through a six-stage weather engine that directly influences vehicle handling, traction, visibility, and race strategy.

---

## ✨ Key Engineering Highlights

### Procedural Track Generation

* Infinite hill-climb track generation
* Runtime terrain synthesis
* Dynamic elevation modeling
* Smooth spline-based road creation
* Difficulty scaling algorithms
* Deterministic segment generation

### Real-Time Physics Engine

* Vehicle acceleration simulation
* Surface traction calculations
* Momentum preservation system
* Hill-climb force calculations
* Dynamic grip management
* Weather-dependent handling behavior

### Dynamic Weather Engine

Six fully simulated weather states:

```text
Sunny → Cloudy → Drizzle → Rain → Heavy Rain → Storm
```

Each weather condition dynamically affects:

* Vehicle grip coefficients
* Surface friction values
* Visibility levels
* Particle rendering intensity
* Environmental lighting
* Driver strategy requirements

### Advanced Rendering Systems

* HTML5 Canvas rendering pipeline
* Real-time particle systems
* Dynamic cloud layers
* Rain simulation
* Fog rendering
* Lightning effects
* Wet surface reflections
* Brake temperature visualization
* Exhaust particle effects

---

## 🏎️ Formula-Inspired Vehicle System

The player vehicle is designed using modern Formula racing principles.

### Vehicle Features

* Aerodynamic bodywork
* Rear wing with endplates
* Functional sidepod design
* HALO safety structure
* Performance racing tyres
* Brake heat visualization
* Driver cockpit rendering
* Steering wheel animation
* Exhaust glow system

### Driver Model

* Racing helmet
* Reflective visor effects
* Animated steering input
* Driver hand positioning
* Dynamic visual feedback

---

## 🌦️ Adaptive Weather Physics

| Weather State | Grip Multiplier |
| ------------- | --------------- |
| Sunny         | 1.00            |
| Cloudy        | 0.95            |
| Drizzle       | 0.85            |
| Rain          | 0.70            |
| Heavy Rain    | 0.55            |
| Storm         | 0.45            |

Weather transitions occur automatically during gameplay and immediately impact racing dynamics.

---

## 🎙️ Crew Chief Communication System

An event-driven radio system provides contextual race updates.

Examples:

```text
Track conditions changing. Light drizzle detected.

Heavy rain approaching. Grip levels decreasing.

Storm conditions active. Exercise caution.

Visibility reduced. Adapt braking zones.
```

---

## 🛠️ Technical Skills Demonstrated

This project showcases proficiency in:

* Object-Oriented JavaScript
* Game Loop Architecture
* State Management
* Procedural Content Generation
* Physics Simulation
* Event-Driven Programming
* Performance Optimization
* Canvas API Rendering
* Animation Systems
* Mathematical Modeling
* Software Architecture Design
* Responsive UI Development

---

## 📂 Project Structure

```text
Apex_Racer/
│
├── src/
│   ├── core/
│   │   ├── GameEngine.js
│   │   ├── PhysicsEngine.js
│   │   ├── WeatherEngine.js
│   │   └── EventManager.js
│   │
│   ├── systems/
│   │   ├── TrackGenerator.js
│   │   ├── ParticleSystem.js
│   │   ├── AudioSystem.js
│   │   └── RenderingSystem.js
│   │
│   ├── entities/
│   │   ├── Car.js
│   │   ├── Driver.js
│   │   └── Track.js
│   │
│   ├── ui/
│   │   ├── HUD.js
│   │   ├── Speedometer.js
│   │   └── WeatherDisplay.js
│   │
│   └── main.js
│
├── tests/
├── index.html
├── package.json
└── README.md
```

---

## ⚡ Performance Goals

* Consistent 60 FPS Rendering
* Optimized Animation Pipeline
* Efficient Memory Usage
* Low-Latency Input Handling
* Scalable Particle Systems
* Browser Compatibility

---

## 🎯 Why This Project Matters

Apex Racer was developed to explore advanced frontend engineering concepts beyond traditional CRUD applications.

The project demonstrates the ability to:

* Build complex interactive systems
* Design scalable software architecture
* Optimize rendering performance
* Implement mathematical algorithms
* Create immersive user experiences
* Develop real-time simulation systems

These are the same engineering principles commonly applied in modern product-based companies building interactive platforms, visualization tools, simulations, and high-performance web applications.

---

## 👨‍💻 Author

**Bhavesh Ghatode**

Full Stack Developer | Frontend Engineer | Problem Solver

GitHub: https://github.com/bhavesh310

LinkedIn: https://www.linkedin.com/in/bhavesh-kumar-4466a3276/

---

<div align="center">

### "Engineering immersive experiences through code, physics, and design."

</div>
