// ======================================================
// Day 26: Basic Level Asynchronous JavaScript
// 100 Days Frontend Challenge by Harish (@harish-0987)
// ======================================================

// ------------------------------------------------------
// 1. TIMERS: setTimeout & setInterval
// ------------------------------------------------------

let timeoutTimerId = null;
let intervalTimerId = null;
let intervalCounterSeconds = 0;

/**
 * setTimeout demo: Executes a function once after a specified delay.
 */
function handleStartTimeout() {
    const display = document.getElementById("timeout-display");
    const button = document.getElementById("btn-start-timeout");

    if (timeoutTimerId) {
        clearTimeout(timeoutTimerId);
    }

    button.disabled = true;
    display.textContent = "⏳ Timer scheduled! Executing in 2 seconds...";
    display.style.borderColor = "#f59e0b";
    display.style.color = "#fbbf24";

    const startTime = Date.now();

    // Browser Web API setTimeout
    timeoutTimerId = setTimeout(() => {
        const elapsedMs = Date.now() - startTime;
        display.textContent = `✅ Executed callback! Elapsed time: ${(elapsedMs / 1000).toFixed(2)}s`;
        display.style.borderColor = "#10b981";
        display.style.color = "#6ee7b7";
        button.disabled = false;
        timeoutTimerId = null;
    }, 2000);
}

/**
 * setInterval demo: Starts a repeating timer every 1000ms.
 */
function handleStartInterval() {
    if (intervalTimerId !== null) return; // Already running

    const countElement = document.getElementById("interval-count");
    
    intervalTimerId = setInterval(() => {
        intervalCounterSeconds++;
        countElement.textContent = intervalCounterSeconds;
    }, 1000);
}

/**
 * clearInterval demo: Pauses the active interval.
 */
function handleStopInterval() {
    if (intervalTimerId !== null) {
        clearInterval(intervalTimerId);
        intervalTimerId = null;
    }
}

/**
 * Resets interval counter to zero.
 */
function handleResetInterval() {
    handleStopInterval();
    intervalCounterSeconds = 0;
    const countElement = document.getElementById("interval-count");
    if (countElement) {
        countElement.textContent = "0";
    }
}

// ------------------------------------------------------
// 2. CALLBACKS: Sequential Asynchronous Flow
// ------------------------------------------------------

/**
 * Simulates multi-step workflow using traditional callbacks.
 */
function handlePizzaOrderCallback() {
    const btn = document.getElementById("btn-run-callbacks");
    const resultBox = document.getElementById("callback-result");
    const step1 = document.getElementById("cb-step-1");
    const step2 = document.getElementById("cb-step-2");
    const step3 = document.getElementById("cb-step-3");
    const step4 = document.getElementById("cb-step-4");

    btn.disabled = true;

    // Reset steps display
    [step1, step2, step3, step4].forEach((s, idx) => {
        s.className = "step-line";
        s.textContent = `${idx + 1}. Pending...`;
    });

    resultBox.textContent = "Order pipeline initiated via callbacks...";

    // Step 1: Place Order
    step1.className = "step-line active";
    step1.textContent = "1. Placing order with restaurant...";

    setTimeout(() => {
        step1.className = "step-line completed";
        step1.textContent = "1. Order Placed! (800ms) ✅";

        // Step 2 Callback: Prepare Dough
        step2.className = "step-line active";
        step2.textContent = "2. Preparing fresh dough & sauce...";

        setTimeout(() => {
            step2.className = "step-line completed";
            step2.textContent = "2. Dough Prepared! (800ms) ✅";

            // Step 3 Callback: Bake in Oven
            step3.className = "step-line active";
            step3.textContent = "3. Baking in wood-fired oven...";

            setTimeout(() => {
                step3.className = "step-line completed";
                step3.textContent = "3. Pizza Baked Crispy! (800ms) ✅";

                // Step 4 Callback: Deliver
                step4.className = "step-line active";
                step4.textContent = "4. Handing over to delivery rider...";

                setTimeout(() => {
                    step4.className = "step-line completed";
                    step4.textContent = "4. Delivered Hot & Fresh! (800ms) 🍕🎉";
                    resultBox.textContent = "All 4 asynchronous callbacks completed in sequence!";
                    btn.disabled = false;
                }, 800);

            }, 800);

        }, 800);

    }, 800);
}

// ------------------------------------------------------
// 3. PROMISES: new Promise, .then(), .catch(), .finally()
// ------------------------------------------------------

/**
 * Creates a Promise that simulates an asynchronous operation.
 */
function createSimulatedPromise(mode) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (mode === "success") {
                resolve({ status: 200, message: "User data successfully retrieved from server! 📦" });
            } else if (mode === "error") {
                reject(new Error("Database connection timeout (504 Gateway Timeout) 💥"));
            } else {
                // Random 50/50
                const isLucky = Math.random() >= 0.5;
                if (isLucky) {
                    resolve({ status: 200, message: "Random coin toss resulted in SUCCESS! 🪙✅" });
                } else {
                    reject(new Error("Random coin toss resulted in FAILURE! 🪙❌"));
                }
            }
        }, 1200);
    });
}

/**
 * Demonstrates Promise lifecycle (.then, .catch, .finally).
 */
function handlePromiseDemo(mode) {
    const badge = document.getElementById("promise-badge");
    const details = document.getElementById("promise-details");
    const result = document.getElementById("promise-result");

    // 1. Initial State: PENDING
    badge.className = "badge-status badge-pending";
    badge.textContent = "PENDING ⏳";
    details.innerHTML = `Promise is currently pending... Waiting for resolution (1200ms).`;
    result.textContent = "Promise pending: neither fulfilled nor rejected yet.";

    const promise = createSimulatedPromise(mode);

    promise
        // 2. FULFILLED State
        .then((data) => {
            badge.className = "badge-status badge-fulfilled";
            badge.textContent = "FULFILLED ✅";
            details.innerHTML = `<strong>Result:</strong> ${data.message} (HTTP ${data.status})`;
        })
        // 3. REJECTED State
        .catch((error) => {
            badge.className = "badge-status badge-rejected";
            badge.textContent = "REJECTED ❌";
            details.innerHTML = `<strong>Error Caught:</strong> ${error.message}`;
        })
        // 4. FINALLY (Always runs regardless of outcome)
        .finally(() => {
            const time = new Date().toLocaleTimeString();
            result.innerHTML = `<code>.finally()</code> executed at <strong>${time}</strong> (cleanup complete).`;
        });
}

// ------------------------------------------------------
// 4. ASYNC / AWAIT with try...catch
// ------------------------------------------------------

/**
 * Helper that simulates asynchronous API fetch using Promise.
 */
function mockApiFetchUser(shouldFail) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldFail) {
                reject(new Error("Failed to load user: Network connection lost (404)"));
            } else {
                resolve({
                    id: 26,
                    username: "harish-0987",
                    fullName: "Harish Peddapelly",
                    role: "Frontend Developer",
                    challenge: "100 Days Frontend"
                });
            }
        }, 1200);
    });
}

/**
 * Asynchronous function using async/await and try-catch-finally.
 */
async function handleAsyncAwaitDemo(shouldFail) {
    const badge = document.getElementById("async-badge");
    const details = document.getElementById("async-details");
    const result = document.getElementById("async-result");

    badge.className = "badge-status badge-pending";
    badge.textContent = "AWAITING ⏳";
    details.textContent = "Executing async function... Waiting on 'await' keyword.";
    result.textContent = "Execution paused at await mockApiFetchUser()...";

    try {
        // Pauses execution of this async function until promise settles
        const user = await mockApiFetchUser(shouldFail);

        badge.className = "badge-status badge-success";
        badge.textContent = "SUCCESS ✅";
        details.innerHTML = `
            <div><strong>User ID:</strong> #${user.id}</div>
            <div><strong>Name:</strong> ${user.fullName} (@${user.username})</div>
            <div><strong>Role:</strong> ${user.role} • <em>${user.challenge}</em></div>
        `;
        result.textContent = "async function resolved successfully without throwing.";
    } catch (error) {
        // Catches any rejected promises or runtime exceptions
        badge.className = "badge-status badge-error";
        badge.textContent = "CAUGHT ❌";
        details.innerHTML = `<strong>catch block triggered:</strong> ${error.message}`;
        result.textContent = "Error caught gracefully by try...catch block.";
    } finally {
        // Always executes
        console.log("async/await demonstration completed.");
    }
}

// ------------------------------------------------------
// 5. FETCH API: Real-world HTTP Requests
// ------------------------------------------------------

/**
 * Fetches a random quote from public API with graceful fallback.
 */
async function handleFetchQuote() {
    const badge = document.getElementById("fetch-badge");
    const details = document.getElementById("fetch-details");
    const result = document.getElementById("fetch-result");
    const btn = document.getElementById("btn-fetch-quote");

    btn.disabled = true;
    badge.className = "badge-status badge-pending";
    badge.textContent = "FETCHING ⏳";
    details.textContent = "Sending HTTP GET request to API...";

    const startTime = performance.now();

    try {
        // Using real public API with fallback
        const response = await fetch("https://dummyjson.com/quotes/random");
        
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const duration = (performance.now() - startTime).toFixed(0);

        badge.className = "badge-status badge-success";
        badge.textContent = "200 OK ✅";
        details.innerHTML = `
            <blockquote style="font-style: italic; color: #f3f4f6; margin-bottom: 6px;">"${data.quote}"</blockquote>
            <div style="color: #9ca3af; font-size: 0.82rem;">— ${data.author}</div>
        `;
        result.innerHTML = `Data fetched in <strong>${duration}ms</strong> via <code>fetch()</code> & <code>response.json()</code>`;
    } catch (err) {
        // Offline / CORS fallback for reliable demo experience
        const duration = (performance.now() - startTime).toFixed(0);
        badge.className = "badge-status badge-success";
        badge.textContent = "DEMO DATA ✅";
        details.innerHTML = `
            <blockquote style="font-style: italic; color: #f3f4f6; margin-bottom: 6px;">"First, solve the problem. Then, write the code."</blockquote>
            <div style="color: #9ca3af; font-size: 0.82rem;">— John Johnson (Offline Fallback)</div>
        `;
        result.innerHTML = `Simulated response in <strong>${duration}ms</strong> (Network error: ${err.message})`;
    } finally {
        btn.disabled = false;
    }
}

/**
 * Fetches a sample Todo item from jsonplaceholder.
 */
async function handleFetchTodo() {
    const badge = document.getElementById("fetch-badge");
    const details = document.getElementById("fetch-details");
    const result = document.getElementById("fetch-result");
    const btn = document.getElementById("btn-fetch-todo");

    btn.disabled = true;
    badge.className = "badge-status badge-pending";
    badge.textContent = "FETCHING ⏳";
    details.textContent = "Fetching todo from jsonplaceholder.typicode.com...";

    const startTime = performance.now();

    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
        
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const todo = await response.json();
        const duration = (performance.now() - startTime).toFixed(0);

        badge.className = "badge-status badge-success";
        badge.textContent = "200 OK ✅";
        details.innerHTML = `
            <div><strong>Todo #${todo.id}:</strong> ${todo.title}</div>
            <div><strong>Status:</strong> ${todo.completed ? "Completed ✅" : "In Progress ⏳"}</div>
        `;
        result.innerHTML = `Todo retrieved in <strong>${duration}ms</strong>.`;
    } catch (err) {
        const duration = (performance.now() - startTime).toFixed(0);
        badge.className = "badge-status badge-success";
        badge.textContent = "DEMO TODO ✅";
        details.innerHTML = `
            <div><strong>Todo #1:</strong> Master Asynchronous JavaScript</div>
            <div><strong>Status:</strong> In Progress ⏳ (Demo Mode)</div>
        `;
        result.innerHTML = `Simulated response in <strong>${duration}ms</strong>.`;
    } finally {
        btn.disabled = false;
    }
}

// ------------------------------------------------------
// 6. EVENT LOOP: Execution Order Demonstration
// ------------------------------------------------------

/**
 * Appends a log line to the interactive terminal.
 */
function logToTerminal(tagType, tagText, message) {
    const terminal = document.getElementById("terminal-output");
    if (!terminal) return;

    const line = document.createElement("div");
    line.className = "terminal-line";

    const tag = document.createElement("span");
    tag.className = tagType;
    tag.textContent = tagText;

    const text = document.createElement("span");
    text.textContent = message;

    line.appendChild(tag);
    line.appendChild(text);
    terminal.appendChild(line);

    terminal.scrollTop = terminal.scrollHeight;
}

/**
 * Clears terminal messages.
 */
function handleClearTerminal() {
    const terminal = document.getElementById("terminal-output");
    if (terminal) {
        terminal.innerHTML = `<div class="terminal-line"><span class="tag-meta">[SYSTEM]</span> Terminal cleared. Ready for next race.</div>`;
    }
}

/**
 * Demonstrates the Event Loop priority:
 * 1. Synchronous code (Call Stack)
 * 2. Microtasks (Promise.then)
 * 3. Macrotasks (setTimeout)
 */
function handleRunEventLoopRace() {
    const btn = document.getElementById("btn-run-race");
    btn.disabled = true;

    handleClearTerminal();

    logToTerminal("tag-meta", "[START]", "Starting Event Loop race...");

    // 1. Synchronous log 1
    logToTerminal("tag-sync", "[1. SYNC]", "Immediate synchronous execution (Call Stack start)");

    // 2. Macrotask (setTimeout with 0ms delay)
    setTimeout(() => {
        logToTerminal("tag-macro", "[4. MACROTASK]", "setTimeout callback executed from Macrotask Queue (0ms delay)");
        btn.disabled = false;
    }, 0);

    // 3. Microtask (Promise resolution)
    Promise.resolve().then(() => {
        logToTerminal("tag-micro", "[3. MICROTASK]", "Promise .then() callback executed from Microtask Queue");
    });

    // 4. Synchronous log 2
    logToTerminal("tag-sync", "[2. SYNC]", "Immediate synchronous execution (Call Stack end)");
}
