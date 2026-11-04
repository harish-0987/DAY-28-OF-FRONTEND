# ⚡ Day 28 of Frontend: React Hooks, Event Handling, Lists & Keys, and Forms

Welcome to **Day 28 of the 100 Days Frontend Challenge**! Today's project dives deeper into essential React concepts: **React Hooks (`useEffect`)**, **Event Handling**, **Rendering Lists with Keys**, and **Controlled Form Components** with clean, beginner-friendly code.

🔗 **Repository:** [harish-0987/DAY-28-OF-FRONTEND](https://github.com/harish-0987/DAY-28-OF-FRONTEND)

---

## 📌 Core Topics Overview

| No. | Topic | Key Concept | Practical Use Case |
| :---: | :--- | :--- | :--- |
| **1** | **React Hooks (`useEffect`)** | Side effects, lifecycle, dependency array | Timers, document title updates, data fetching |
| **2** | **Event Handling** | Synthetic Events (`onClick`, `onChange`) | Responding to button clicks, keypresses, user input |
| **3** | **Lists & Keys** | Array `.map()` + unique `key` prop | Rendering dynamic lists, tables, and card collections |
| **4** | **Forms (Controlled)** | State as single source of truth | Capturing inputs, validating fields, `e.preventDefault()` |

---

## 💻 Essential Concepts & Code Snippets

### 1. React Hook: `useEffect`
`useEffect` allows functional components to perform **side effects** (operations outside the normal render flow, like fetching data, timers, or subscribing to events).

#### Dependency Array Rules:
- `useEffect(() => { ... })`: Runs after **every** render.
- `useEffect(() => { ... }, [])`: Runs **only once** when component mounts.
- `useEffect(() => { ... }, [count])`: Runs on mount and whenever `count` changes.
- Return function: Optional **cleanup** function that runs before unmounting.

```javascript
import React, { useState, useEffect } from 'react';

function LiveTimer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    // 1. Setup side effect (interval timer)
    const timerId = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    // 2. Cleanup side effect when unmounting
    return () => clearInterval(timerId);
  }, []); // Empty array = run once on mount

  return <p>Elapsed Time: {seconds}s</p>;
}
```

---

### 2. Event Handling in React
React events use **camelCase** naming (`onClick`, `onChange`, `onSubmit`) and pass a JavaScript function rather than a string.

```javascript
function ActionButtons() {
  // Simple event handler
  const handleClick = (e) => {
    console.log("Event type:", e.type);
  };

  // Handler accepting custom arguments
  const handleCustomAction = (itemName) => {
    alert(`Selected: ${itemName}`);
  };

  return (
    <div>
      {/* Passing function reference */}
      <button onClick={handleClick}>Standard Click</button>

      {/* Passing arguments via arrow function */}
      <button onClick={() => handleCustomAction("React ⚛️")}>
        Pass Argument
      </button>
    </div>
  );
}
```

---

### 3. Lists and Keys
In React, lists are rendered by transforming arrays into JSX elements using JavaScript's `.map()` method.

#### Why is `key` essential?
The `key` prop gives each item a stable identity. During Virtual DOM diffing, keys help React identify which items have changed, been added, or been removed, avoiding expensive full re-renders.

```javascript
const frameworkList = [
  { id: "react", name: "React.js", category: "Library" },
  { id: "vue", name: "Vue.js", category: "Framework" },
  { id: "next", name: "Next.js", category: "Full-Stack" }
];

function FrameworkDirectory() {
  return (
    <ul>
      {frameworkList.map(item => (
        // Always assign a unique key at the outermost mapped element!
        <li key={item.id}>
          <strong>{item.name}</strong> - <span>{item.category}</span>
        </li>
      ))}
    </ul>
  );
}
```

---

### 4. Controlled Forms & `e.preventDefault()`
In HTML, form elements manage their own internal state. In React, **Controlled Components** make React state the single source of truth:
1. `value={stateVariable}`: Sets the input display value from state.
2. `onChange={(e) => setState(e.target.value)}`: Syncs typing back into state.
3. `e.preventDefault()`: Prevents browser full-page reload on form submission.

```javascript
import React, { useState } from 'react';

function SimpleContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Stop default browser reload
    alert(`Submitted Name: ${formData.name}, Email: ${formData.email}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        name="name" 
        value={formData.name} 
        onChange={handleChange} 
        placeholder="Enter your name" 
      />
      <input 
        name="email" 
        value={formData.email} 
        onChange={handleChange} 
        placeholder="Enter your email" 
      />
      <button type="submit">Submit Form</button>
    </form>
  );
}
```

---

## 📊 Summary Comparison

| Concept | Key Syntax | Purpose | Best Practice |
| :--- | :--- | :--- | :--- |
| **`useEffect`** | `useEffect(fn, [deps])` | Side effects & lifecycle | Always specify correct dependencies; include cleanup for timers |
| **Event Handling** | `onClick={(e) => fn(e)}` | Interactivity | Use arrow functions to pass arguments cleanly |
| **Lists & Keys** | `{items.map(i => <el key={i.id} />)}` | Dynamic rendering | Always use stable, unique IDs as keys (avoid array index when items can reorder) |
| **Controlled Form** | `value={state} onChange={fn}` | Form management | Prevent reload with `e.preventDefault()`, store state in React |

---

## 🚀 Interactive Features Included in This Project

- **Hook Simulator (`useEffect`):** Interactive timer and document title updater demonstrating mount, dependency triggers, and cleanup.
- **Event Explorer:** Live testing of `onClick`, custom argument passing, and synthetic event object inspection.
- **Interactive List Studio:** Add, remove, and filter list items dynamically with visual `key` identifiers highlighted.
- **Controlled Form Playground:** Real-time dual-binding input fields with live JSON state preview and submit validation.
- **Combined Task Manager:** Live mini-app demonstrating all four concepts working together in harmony.

---

## 🛠️ How to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/harish-0987/DAY-28-OF-FRONTEND.git
   ```
2. Open the project folder:
   ```bash
   cd DAY-28-OF-FRONTEND
   ```
3. Open `index.html` in any modern web browser.

---

## 👤 Author
- **Harish** - [@harish-0987](https://github.com/harish-0987)
- 100 Days Frontend Challenge
