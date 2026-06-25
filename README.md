# 🏎️ Apex Racer

<div align="center">

### A High-Performance Formula Racing Simulation Featuring Dynamic Weather, Real-Time Physics, and Procedural Hill-Climb Track Generation

Built to demonstrate advanced frontend engineering concepts including game-loop architecture, physics simulation, procedural generation, event-driven systems, performance optimization, and browser-based game development.

![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge\&logo=javascript\&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-Canvas-E34F26?style=for-the-badge\&logo=html5\&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-Modern_UI-1572B6?style=for-the-badge\&logo=css3\&logoColor=white)
![Game Development](https://img.shields.io/badge/Game_Engine-Custom-black?style=for-the-badge)
![Performance](https://img.shields.io/badge/Performance-60FPS-success?style=for-the-badge)

</div>

---

## 🚀 Overview

Apex Racer is a browser-based Formula-style racing simulation designed to showcase real-world software engineering principles through an interactive gaming experience.

The project combines dynamic weather systems, real-time vehicle physics, procedural track generation, AI-driven race communication, and immersive visual effects to create a continuously evolving racing environment.

Unlike traditional racing games with fixed tracks and static conditions, Apex Racer introduces adaptive gameplay where weather conditions directly influence vehicle grip, visibility, handling characteristics, and racing strategy.

The project serves as a demonstration of advanced JavaScript engineering, system design, and browser performance optimization.

---

## ✨ Core Features

### 🏎️ Formula-Inspired Racing Vehicle

The player controls a fully detailed Formula-style race car featuring:

* Aerodynamic bodywork
* Rear wing with endplates
* Functional sidepods
* HALO safety structure
* High-performance racing tyres
* Brake glow visualization
* Exhaust glow effects
* Detailed driver cockpit
* Steering wheel animations
* Dynamic vehicle movement

### 👨‍✈️ Driver Rendering System

* Racing helmet with visor effects
* Helmet stripe detailing
* Driver hand animations
* Steering synchronization
* Dynamic cockpit visuals

---

## ⛰️ Procedural Hill-Climb Racing

Tracks are generated dynamically during gameplay and feature:

* Infinite road generation
* Dynamic elevation changes
* Hills and valleys
* Sharp climbs and descents
* Smooth terrain interpolation
* Difficulty scaling
* Procedural track segments
* Roadside kerbs
* Center lane markings
* Tyre mark rendering

Every race presents a unique challenge.

---

## 🌦️ Dynamic Weather Simulation

Apex Racer features a six-stage weather engine that evolves during gameplay.

### Weather States

```text
Sunny → Cloudy → Drizzle → Rain → Heavy Rain → Storm
```

### Weather Effects

Each weather state dynamically impacts:

* Surface grip
* Vehicle traction
* Visibility
* Particle intensity
* Environmental lighting
* Driving difficulty
* Road appearance

### Grip System

| Weather State | Grip Multiplier |
| ------------- | --------------- |
| Sunny         | 1.00            |
| Cloudy        | 0.95            |
| Drizzle       | 0.85            |
| Rain          | 0.70            |
| Heavy Rain    | 0.55            |
| Storm         | 0.45            |

Weather transitions occur automatically during gameplay and immediately influence vehicle handling.

---

## 🎙️ AI Crew Chief System

A dynamic crew chief provides contextual race updates throughout gameplay.

Examples:

```text
Track conditions changing. Light drizzle detected.

Heavy rain approaching. Grip levels decreasing.

Storm conditions active. Exercise caution.

Visibility reduced. Adapt braking zones.
```

The system reacts to weather changes and gameplay events in real time.

---

## 🔊 Audio Engine

The custom audio system enhances immersion through:

* Engine sound effects
* Environmental audio cues
* Dynamic weather notifications
* Crew chief announcements
* Event-based sound triggers

---

## ⚡ Real-Time Physics Engine

The physics system is responsible for:

* Vehicle acceleration
* Speed calculations
* Traction modeling
* Surface grip simulation
* Momentum preservation
* Hill-climb interaction
* Weather-dependent handling
* Dynamic resistance calculations

The physics engine adapts vehicle behavior according to environmental conditions and terrain changes.

---

## 🎨 Rendering Systems

Visual systems implemented include:

* HTML5 Canvas rendering
* Rain particle simulation
* Dynamic cloud layers
* Fog effects
* Storm lightning effects
* Wet asphalt rendering
* Brake heat visualization
* Exhaust glow rendering
* Environmental transitions

---

## 🛠️ Technical Skills Demonstrated

This project showcases proficiency in:

* JavaScript (ES6+)
* Object-Oriented Programming
* Game Loop Architecture
* State Management
* Event-Driven Programming
* Procedural Content Generation
* Physics-Based Simulation
* Dynamic Weather Modeling
* Browser Game Development
* HTML5 Canvas Rendering
* Performance Optimization
* Software Architecture Design
* Responsive UI Development
* Unit Testing

---

## 📂 Project Structure

```text
Apex_Racer/
│
├── src/
│   ├── AICrewChief.js
│   ├── AudioEngine.js
│   ├── LevelManager.js
│   ├── Physics.js
│   └── Weather.js
│
├── tests/
│   └── physics.test.js
│
├── index.html
├── package.json
├── HOW_TO_RUN.md
└── README.md
```

---

## 🎯 Engineering Challenges Solved

### Dynamic Weather Simulation

Implemented a weather engine capable of modifying gameplay behavior through environmental state transitions, grip calculations, and visual effects.

### Real-Time Physics Modeling

Designed a lightweight physics system supporting acceleration, momentum, traction, and terrain interaction.

### Procedural Track Generation

Created dynamically generated hill-climb terrain that produces unique racing experiences without predefined maps.

### Event-Driven AI Communication

Developed a contextual crew-chief system that reacts intelligently to gameplay events and weather changes.

### Performance-Oriented Rendering

Optimized browser rendering and game-loop execution to maintain smooth gameplay while supporting multiple concurrent systems.

---

## ✅ Testing

The project includes automated testing for validating gameplay calculations and physics behavior.

Run tests using:

```bash
npm test
```

Current validation coverage includes:

* Acceleration calculations
* Grip coefficient verification
* Weather impact calculations
* Vehicle physics consistency
* Terrain interaction checks

---

## ⚡ Performance Goals

* Consistent 60 FPS Rendering
* Optimized Animation Pipeline
* Efficient Memory Usage
* Low-Latency Input Handling
* Scalable Weather Systems
* Smooth Canvas Rendering
* Cross-Browser Compatibility

---

## 🚀 Getting Started

### Prerequisites

* Node.js 18+
* npm

### Installation

```bash
git clone https://github.com/bhavesh310/Apex_Racer_Game.git

cd Apex_Racer_Game

npm install
```

### Run Locally

```bash
npm start
```

### Run Tests

```bash
npm test
```

---

## 🎯 Why This Project Matters

Apex Racer was built to explore engineering challenges beyond traditional CRUD applications.

The project demonstrates the ability to:

* Build complex interactive systems
* Design modular software architecture
* Implement mathematical simulations
* Optimize rendering performance
* Create event-driven applications
* Develop real-time game systems
* Manage state across multiple subsystems

These are the same foundational engineering principles used in high-performance web applications, visualization platforms, simulations, and interactive products developed by modern product-based companies.

---

## 👨‍💻 Author

### Bhavesh Ghatode

Full Stack Developer | Frontend Engineer | Problem Solver

**GitHub**
https://github.com/bhavesh310

**LinkedIn**
https://www.linkedin.com/in/bhavesh-kumar-4466a3276/

---

<div align="center">

### Engineering immersive experiences through code, physics, and design.

</div>
