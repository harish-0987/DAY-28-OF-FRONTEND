# ⚡ Day 26 of Frontend: Basic Level Asynchronous JavaScript

Welcome to **Day 26 of the 100 Days Frontend Challenge**! Today's project focuses on understanding and practicing fundamental **Asynchronous JavaScript** concepts with clean, beginner-friendly examples, interactive visualizations, and explanations.

🔗 **Repository:** [harish-0987/DAY-26-OF-FRONTEND](https://github.com/harish-0987/DAY-26-OF-FRONTEND)

---

## 📌 What is Asynchronous JavaScript?

JavaScript is a **single-threaded** programming language, meaning it has only one Call Stack and can execute only one instruction at a time.

However, modern web applications constantly need to perform time-consuming operations, such as:
- Fetching data from an API across the network
- Reading files or querying databases
- Waiting for timers or delays (`setTimeout`)
- Listening for user events (clicks, typing)

If JavaScript were strictly synchronous, the entire browser page would freeze and become unresponsive while waiting for an API response. **Asynchronous JavaScript** allows these long-running tasks to execute in the background via browser **Web APIs**, keeping the UI smooth and responsive.

---

## 💻 Core Asynchronous JavaScript Concepts & Code Snippets

### 1. Timers: `setTimeout` and `setInterval`

- **`setTimeout(fn, delayMs)`**: Executes a function once after a specified delay in milliseconds.
- **`setInterval(fn, intervalMs)`**: Continuously executes a function at regular time intervals.
- **`clearTimeout(id)` / `clearInterval(id)`**: Cancels a scheduled timer using its timer ID.

```javascript
// 1. Run once after 2 seconds (2000ms)
const timeoutId = setTimeout(() => {
    console.log("Executed after 2 seconds! ⏳");
}, 2000);

// 2. Run repeatedly every 1 second
let count = 0;
const intervalId = setInterval(() => {
    count++;
    console.log(`Timer: ${count}s`);
    
    // Stop after 5 seconds
    if (count === 5) {
        clearInterval(intervalId);
    }
}, 1000);
```

---

### 2. Callback Functions & The Problem of "Callback Hell"

A **callback function** is a function passed as an argument to another function, which is invoked once an asynchronous action completes:

```javascript
function fetchUserData(userId, callback) {
    setTimeout(() => {
        console.log(`Fetched user #${userId}`);
        callback({ id: userId, name: "Harish" });
    }, 1000);
}

fetchUserData(26, (user) => {
    console.log("User received:", user.name);
});
```

#### The Problem: "Callback Hell" (Pyramid of Doom)
When multiple asynchronous actions depend on one another, deeply nested callbacks make code difficult to read, maintain, and debug:

```javascript
// Nested Callbacks ("Callback Hell"):
loginUser(email, password, (user) => {
    getUserPosts(user.id, (posts) => {
        getPostComments(posts[0].id, (comments) => {
            console.log("Comments:", comments);
        });
    });
});
```
To solve this problem, modern JavaScript introduced **Promises** and **`async` / `await`**!

---

### 3. JavaScript Promises

A **Promise** is an object representing the eventual completion or failure of an asynchronous operation.

#### A Promise has 3 states:
1. **Pending**: Initial state; neither fulfilled nor rejected.
2. **Fulfilled (`resolve`)**: Operation completed successfully.
3. **Rejected (`reject`)**: Operation failed or threw an error.

```javascript
const orderPizza = new Promise((resolve, reject) => {
    const restaurantOpen = true;

    setTimeout(() => {
        if (restaurantOpen) {
            resolve("Delicious pizza is ready! 🍕");
        } else {
            reject("Sorry, the restaurant is closed! ❌");
        }
    }, 1200);
});

// Handling Promises with .then(), .catch(), and .finally():
orderPizza
    .then((message) => {
        console.log("Success:", message);
    })
    .catch((error) => {
        console.error("Error:", error);
    })
    .finally(() => {
        console.log("Order attempt complete (cleanup).");
    });
```

---

### 4. Modern `async` and `await`

Introduced in ES2017, `async` and `await` provide syntactic sugar on top of Promises, allowing asynchronous code to look and feel like standard synchronous code:

- Add `async` before a function declaration to make it return a Promise automatically.
- Use `await` inside an `async` function to pause execution until the Promise resolves or rejects.
- Use standard `try...catch` blocks for clean, readable error handling.

```javascript
async function getUserProfile(userId) {
    try {
        console.log("Loading user profile...");
        const response = await fetchUserData(userId); // Pauses until resolved
        console.log("User profile loaded:", response.name);
    } catch (error) {
        console.error("Failed to load user:", error.message);
    } finally {
        console.log("Request finished.");
    }
}
```

---

### 5. Fetch API for HTTP Network Requests

The built-in `fetch()` function sends HTTP requests across the network. It returns a Promise that resolves with the `Response` object:

```javascript
async function getDailyQuote() {
    try {
        const response = await fetch("https://dummyjson.com/quotes/random");
        
        // Always check if the HTTP request was successful (status 200-299)
        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        
        // Parse the JSON body
        const data = await response.json();
        console.log(`"${data.quote}" — ${data.author}`);
    } catch (error) {
        console.error("Fetch failed:", error.message);
    }
}
```

---

### 6. The JavaScript Event Loop & Execution Order

How does JavaScript handle asynchronous code under the hood?

1. **Call Stack**: Executes synchronous functions line-by-line (LIFO: Last In, First Out).
2. **Web APIs**: Browser handles timers, DOM events, and network requests outside the JS thread.
3. **Microtask Queue**: Holds Promise callbacks (`.then()`, `.catch()`, `queueMicrotask`). **Higher priority!**
4. **Macrotask Queue (Callback Queue)**: Holds timer callbacks (`setTimeout`, `setInterval`).

#### Execution Order Example:
```javascript
console.log("1. Synchronous Start");

setTimeout(() => {
    console.log("4. Macrotask (setTimeout 0ms)");
}, 0);

Promise.resolve().then(() => {
    console.log("3. Microtask (Promise .then)");
});

console.log("2. Synchronous End");
```

**Console Output:**
```
1. Synchronous Start
2. Synchronous End
3. Microtask (Promise .then)
4. Macrotask (setTimeout 0ms)
```
> Notice that even with a `0ms` delay, `setTimeout` runs after synchronous code and after microtask Promises!

---

## 📊 Summary Quick Reference Table

| Feature / Concept | Syntax | Purpose / Behavior |
| :--- | :--- | :--- |
| `setTimeout()` | `setTimeout(fn, delay)` | Runs callback once after delay in ms |
| `setInterval()` | `setInterval(fn, interval)` | Runs callback repeatedly every interval ms |
| `clearInterval()` | `clearInterval(timerId)` | Stops a running `setInterval` timer |
| `Promise` | `new Promise((resolve, reject) => {})` | Represents an async operation with 3 states |
| `.then()` | `promise.then(data => {})` | Handles fulfilled (successful) promise value |
| `.catch()` | `promise.catch(err => {})` | Catches and handles rejected promise errors |
| `.finally()` | `promise.finally(() => {})` | Runs after promise settles, regardless of outcome |
| `async` | `async function myFunc() {}` | Declares a function that returns a Promise |
| `await` | `const data = await myPromise;` | Pauses execution until promise resolves |
| `fetch()` | `fetch(url)` | Performs HTTP network requests returning a Promise |

---

## 🚀 Interactive Features Included in This Project

- **Timer Lab:** Live 2-second `setTimeout` execution and interactive start/pause/reset `setInterval` stopwatch counter.
- **Sequential Callback Pipeline:** 4-stage animated pizza ordering pipeline demonstrating sequential asynchronous callbacks.
- **Promise Playground:** Test Resolve, Reject, and random 50/50 outcomes with real-time state badge transitions (`PENDING` ⏳, `FULFILLED` ✅, `REJECTED` ❌).
- **`async` / `await` Simulator:** Simulated asynchronous user profile loading with 1.2s network latency and `try...catch` error handling.
- **Live Fetch API Explorer:** Real network requests to public JSON APIs with HTTP status codes and response timing.
- **Event Loop Terminal:** Visual execution order console comparing Call Stack synchronous code, Microtask Promises, and Macrotask `setTimeout(..., 0)`.

---

## 🛠️ How to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/harish-0987/DAY-26-OF-FRONTEND.git
   ```
2. Open the project folder:
   ```bash
   cd DAY-26-OF-FRONTEND
   ```
3. Open `index.html` in any modern web browser (Google Chrome, Firefox, Safari, Microsoft Edge).

---

## 👤 Author
- **Harish** - [@harish-0987](https://github.com/harish-0987)
- 100 Days Frontend Challenge
