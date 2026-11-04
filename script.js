// ======================================================
// Day 28: React Hooks, Event Handling, Lists & Forms
// 100 Days Frontend Challenge by Harish (@harish-0987)
// ======================================================

// ------------------------------------------------------
// 1. REACT HOOK: useEffect (Lifecycle & Side Effects)
// ------------------------------------------------------
let timerCount = 0;
let timerInterval = null;
let isTimerActive = false;

// Simulating useEffect(() => { ... return () => cleanup; }, [])
function toggleTimerEffect() {
    const btn = document.getElementById("btn-toggle-effect");
    const display = document.getElementById("effect-timer-display");
    const chips = document.getElementById("effect-chips");

    if (!isTimerActive) {
        // Mount Effect: Set up interval
        isTimerActive = true;
        btn.textContent = "Unmount Effect (Cleanup)";
        btn.className = "btn-warning";

        timerInterval = setInterval(() => {
            timerCount++;
            if (display) display.textContent = `${timerCount}s`;
        }, 1000);

        if (chips) {
            chips.innerHTML = `
                <span class="step-chip">useEffect mounted 🟢</span>
                <span class="step-chip">Dependency: [] (runs on mount)</span>
            `;
        }
    } else {
        // Cleanup Effect: Clear interval (return () => clearInterval)
        isTimerActive = false;
        clearInterval(timerInterval);
        btn.textContent = "Mount Effect (Start Timer)";
        btn.className = "";

        if (chips) {
            chips.innerHTML = `
                <span class="step-chip">Cleanup executed 🛑 (clearInterval)</span>
                <span class="step-chip">Component unmounted</span>
            `;
        }
    }
}

function resetTimerEffect() {
    if (timerInterval) clearInterval(timerInterval);
    isTimerActive = false;
    timerCount = 0;
    const display = document.getElementById("effect-timer-display");
    const btn = document.getElementById("btn-toggle-effect");
    if (display) display.textContent = "0s";
    if (btn) {
        btn.textContent = "Mount Effect (Start Timer)";
        btn.className = "";
    }
}

// ------------------------------------------------------
// 2. EVENT HANDLING (Synthetic Events & Arguments)
// ------------------------------------------------------
function handleButtonClick(message, event) {
    const output = document.getElementById("event-result-chips");
    if (!output) return;

    output.innerHTML = `
        <span class="step-chip">Message: "${message}"</span>
        <span class="step-chip">e.type: "${event ? event.type : 'click'}"</span>
        <span class="step-chip">Syntax: onClick={() => fn(arg)} ✅</span>
    `;
}

// ------------------------------------------------------
// 3. LISTS & KEYS (array.map with unique key prop)
// ------------------------------------------------------
let techList = [
    { id: 101, name: "React.js", category: "Library" },
    { id: 102, name: "JavaScript", category: "Language" },
    { id: 103, name: "HTML & CSS", category: "Markup & Styling" }
];
let nextId = 104;

function renderKeyedList() {
    const listContainer = document.getElementById("keyed-list-container");
    if (!listContainer) return;

    if (techList.length === 0) {
        listContainer.innerHTML = '<div style="color: #9ca3af; padding: 12px; text-align: center;">List is empty. Add an item below!</div>';
        return;
    }

    listContainer.innerHTML = techList.map(item => `
        <div class="key-list-item" id="item-${item.id}">
            <div>
                <span class="key-badge">key="${item.id}"</span>
                <strong>${item.name}</strong> 
                <span style="color: #9ca3af; font-size: 0.8rem;">(${item.category})</span>
            </div>
            <button class="item-delete-btn" onclick="handleRemoveListItem(${item.id})">Delete ✕</button>
        </div>
    `).join("");
}

function handleAddListItem() {
    const nameInput = document.getElementById("list-item-name");
    const catInput = document.getElementById("list-item-category");

    const name = nameInput ? nameInput.value.trim() : "";
    const category = catInput ? catInput.value.trim() : "";

    if (!name) return;

    techList.push({ id: nextId++, name, category: category || "General" });
    if (nameInput) nameInput.value = "";
    renderKeyedList();

    const chips = document.getElementById("list-chips");
    if (chips) {
        chips.innerHTML = `
            <span class="step-chip">Added item with key="${nextId - 1}"</span>
            <span class="step-chip">Total items: ${techList.length}</span>
        `;
    }
}

function handleRemoveListItem(id) {
    techList = techList.filter(item => item.id !== id);
    renderKeyedList();

    const chips = document.getElementById("list-chips");
    if (chips) {
        chips.innerHTML = `
            <span class="step-chip">Removed item key="${id}"</span>
            <span class="step-chip">React efficiently updates only this DOM node</span>
        `;
    }
}

// ------------------------------------------------------
// 4. FORMS & CONTROLLED COMPONENTS (value + onChange + e.preventDefault)
// ------------------------------------------------------
const formState = {
    username: "Harish",
    role: "Frontend Developer",
    email: "harish@example.com"
};

function handleFormInputChange(fieldName, value) {
    formState[fieldName] = value;
    updateFormJSONDisplay();
}

function updateFormJSONDisplay() {
    const preview = document.getElementById("form-state-json");
    if (preview) {
        preview.textContent = JSON.stringify(formState, null, 2);
    }
}

function handleControlledFormSubmit(event) {
    if (event) event.preventDefault(); // Stop default browser page reload!

    const chips = document.getElementById("form-result-chips");
    if (chips) {
        chips.innerHTML = `
            <span class="step-chip">e.preventDefault() called 🛑</span>
            <span class="step-chip">Submitted: "${formState.username}" (${formState.role})</span>
            <span class="step-chip">Single Source of Truth: State ✅</span>
        `;
    }
}

// ------------------------------------------------------
// Initial triggers on DOM load
// ------------------------------------------------------
window.addEventListener("DOMContentLoaded", () => {
    renderKeyedList();
    updateFormJSONDisplay();
    handleButtonClick("Initial Mount", null);
});
