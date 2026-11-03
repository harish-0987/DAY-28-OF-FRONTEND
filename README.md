# ⚡ Day 27 of Frontend: React.js Fundamentals (Basic Level)

Welcome to **Day 27 of the 100 Days Frontend Challenge**! Today's project introduces **React.js**, the most popular front-end JavaScript library in the world. We cover the core fundamentals with minimal, concise code: **What is React**, **Functional Components**, **JSX**, **Props**, and **State (`useState`)**.

🔗 **Repository:** [harish-0987/DAY-27-OF-FRONTEND](https://github.com/harish-0987/DAY-27-OF-FRONTEND)

---

## 📌 Priority Topics Breakdown

| No. | Topic | Priority | Description |
| :---: | :--- | :---: | :--- |
| **1** | **What is React.js?** | ⭐⭐⭐ | JavaScript library for building fast, declarative user interfaces using a Virtual DOM |
| **2** | **Functional Components** | ⭐⭐⭐ | JavaScript functions that return UI elements (reusable building blocks) |
| **3** | **JSX** | ⭐⭐⭐ | HTML-like syntax inside JavaScript with dynamic `{}` expressions |
| **4** | **Props** | ⭐⭐⭐ | Read-only inputs passed from parent components to child components |
| **5** | **State (`useState`)** | ⭐⭐⭐ | Built-in React Hook representing a component's memory for dynamic, reactive data |

---

## 💻 Core React Concepts & Minimal Code Snippets

### 1. What is React.js?
**React** is an open-source JavaScript library developed by Meta for building modern user interfaces.

- **Declarative**: You describe *what* the UI should look like for a given state, and React handles updating the browser DOM.
- **Component-Based**: You build small, self-contained components and combine them to create complex apps.
- **Virtual DOM**: React keeps a lightweight copy of the DOM in memory. When data changes, it compares (diffs) the Virtual DOM with the real DOM and updates **only the elements that actually changed**, making rendering fast and efficient.

```javascript
// Minimal React Root rendering
import React from 'react';
import ReactDOM from 'react-dom/client';

function App() {
  return <h1>Hello, React! 👋</h1>;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```

---

### 2. Functional Components
A **Functional Component** is simply a JavaScript function that returns JSX. It must start with a **capital letter** so React can distinguish it from standard HTML elements.

```javascript
// Definition (Just a few lines!)
function WelcomeMessage() {
  return (
    <div className="welcome-card">
      <h2>Welcome to Day 27! 🚀</h2>
      <p>Functional components are simple and reusable.</p>
    </div>
  );
}

// Usage
<WelcomeMessage />
```

---

### 3. JSX (JavaScript XML)
**JSX** is a syntax extension that lets you write HTML-like markup directly inside your JavaScript code.

- Wrap JavaScript expressions inside curly braces `{}`.
- Use `className` instead of `class`.
- Every tag must be properly closed (e.g. `<img />`, `<br />`).
- Must return a single root parent element (or a `<React.Fragment>` / `<>` `<>`).

```javascript
const name = "Harish";
const isOnline = true;

function Profile() {
  return (
    <div>
      <h3>Hello, {name.toUpperCase()}!</h3>
      <p>Status: {isOnline ? "🟢 Online" : "🔴 Offline"}</p>
      <p>Calculation: 5 × 5 = {5 * 5}</p>
    </div>
  );
}
```

---

### 4. Props (Properties)
**Props** are arguments passed into React components from their parent component. They are **read-only** (immutable)—a child component should never modify the props it receives.

```javascript
// Child Component accepting props
function UserCard(props) {
  return (
    <div className="user-card">
      <h3>{props.name}</h3>
      <p>Role: {props.role}</p>
      <span>Badge: {props.badge}</span>
    </div>
  );
}

// Parent Component passing props
function App() {
  return (
    <div>
      <UserCard name="Harish" role="Frontend Developer" badge="⭐ Day 27" />
      <UserCard name="Alex" role="UI/UX Designer" badge="🎨 Pro" />
    </div>
  );
}
```

---

### 5. State (`useState` Hook)
While props pass data down from parents, **State** is a component's personal memory. When state updates via its setter function, React automatically re-renders the component to display the new data.

```javascript
import React, { useState } from 'react';

function Counter() {
  // Declare state: [currentValue, updateFunction]
  const [count, setCount] = useState(0);

  return (
    <div className="counter-box">
      <h3>Count: {count}</h3>
      <button onClick={() => setCount(count + 1)}>+ Increment</button>
      <button onClick={() => setCount(count - 1)}>- Decrement</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}
```

---

## 📊 Summary: Props vs. State

| Feature | Props | State |
| :--- | :--- | :--- |
| **Origin** | Passed from parent component | Initialized inside the component |
| **Modifiable?** | ❌ Read-Only (Immutable) | ✅ Mutable via setter function (`setState`) |
| **Purpose** | Configure child component | Manage interactive, changing data |
| **Causes Re-render?** | Yes (when parent passes new props) | Yes (when `setCount` / setter is called) |

---

## 🚀 Interactive Features Included in This Project

- **Virtual DOM Visualizer:** Visual demonstration showing how React updates only modified nodes rather than repainting the entire page.
- **Live Functional Component:** Direct React functional component rendering in the browser.
- **Dynamic JSX Expression Tester:** Live `{}` expression evaluator for text transformations and calculations.
- **Customizable Props Card:** Dynamic parent-to-child data flow with customizable `name`, `role`, and `badge` props.
- **Interactive State Counter:** Real-time `useState` counter with increment, decrement, and reset actions.

---

## 🛠️ How to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/harish-0987/DAY-27-OF-FRONTEND.git
   ```
2. Open the project folder:
   ```bash
   cd DAY-27-OF-FRONTEND
   ```
3. Open `index.html` in any modern web browser.

---

## 👤 Author
- **Harish** - [@harish-0987](https://github.com/harish-0987)
- 100 Days Frontend Challenge
