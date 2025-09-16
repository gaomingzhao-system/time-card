# Time Card

**AI Time Card Application** with modern design and great performance.

---

## Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Running Locally](#running-locally)
- [Usage](#usage)
- [Configuration](#configuration)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## About

**Time Card** is a desktop application designed for ISM Corporation to handle time-card tracking, built with a focus on AI integration, modern UI, and excellent performance. The user interface is largely completed.

---

## Features

- Clean, modern design
- Fast and responsive UI
- AI-powered features (you may describe which ones here)
- Cross-platform support via Tauri (desktop)
- Offline capability (if applicable)
- Easy configuration and customization

---

## Tech Stack

| Layer                  | Technologies                                         |
| ---------------------- | ---------------------------------------------------- |
| UI / Frontend          | Svelte, SvelteKit                                    |
| Styling                | TailwindCSS, shadcn (UI components)                  |
| Desktop App Shell      | Tauri                                                |
| Language               | TypeScript                                           |
| Build Tools            | Vite, pnpm                                           |
| Configuration & Others | tailwind.config.ts, svelte.config.js, vite.config.js |

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (version 16 or above recommended)
- pnpm (or npm/yarn, but this project uses pnpm)
- Rust (for Tauri, if building the desktop part)
- Tauri prerequisites (see [Tauri docs](https://tauri.app/) for your OS)

### Installation

```bash
# Clone the repo
git clone https://github.com/gaomingzhao-system/time-card.git
cd time-card

# Install dependencies
pnpm install
```
