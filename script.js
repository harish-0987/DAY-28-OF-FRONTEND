// ======================================================
// Day 27: React.js Fundamentals (Basic Level)
// 100 Days Frontend Challenge by Harish (@harish-0987)
// ======================================================

// ------------------------------------------------------
// 1. WHAT IS REACT: Virtual DOM Diffing Simulator
// ------------------------------------------------------
// React creates an in-memory Virtual DOM. When data changes,
// it computes the diff and updates ONLY the modified node.
function simulateVDOMUpdate() {
    const timeString = new Date().toLocaleTimeString();
    const target = document.getElementById("vdom-time-node");
    const chipsTarget = document.getElementById("vdom-result-chips");

    if (target) {
        target.textContent = `Timestamp: ${timeString}`;
        target.classList.add("updated");
        setTimeout(() => target.classList.remove("updated"), 500);
    }

    if (chipsTarget) {
        chipsTarget.innerHTML = `
            <span class="step-chip">Diffing: 1 text node changed</span>
            <span class="step-chip">Repainted: ${timeString}</span>
        `;
    }
}

// ------------------------------------------------------
// 2. FUNCTIONAL COMPONENT (Few Lines of Code)
// ------------------------------------------------------
// A functional component is a function returning UI markup.
function HeaderComponent(props) {
    return `
        <div class="component-badge">
            <span class="component-icon">⚛️</span>
            <div>
                <div class="component-title">${props.title}</div>
                <div class="component-subtitle">${props.subtitle}</div>
            </div>
        </div>
    `;
}

function renderFunctionalComponent() {
    const container = document.getElementById("component-render-target");
    if (container) {
        container.innerHTML = HeaderComponent({
            title: "HeaderComponent() Rendered",
            subtitle: "A clean functional component returning UI in 5 lines."
        });
    }
}

// ------------------------------------------------------
// 3. JSX: JavaScript XML Expressions ({})
// ------------------------------------------------------
// In JSX, wrap any dynamic JavaScript expression in curly braces {}.
function evaluateJSXExpression() {
    const nameInput = document.getElementById("jsx-name-input").value || "Harish";
    const num1 = parseInt(document.getElementById("jsx-num1").value, 10) || 5;
    const num2 = parseInt(document.getElementById("jsx-num2").value, 10) || 5;

    const output = document.getElementById("jsx-preview-output");
    if (output) {
        output.innerHTML = `
            <div style="display: flex; flex-direction: column; gap: 4px; text-align: left;">
                <div>🔤 <strong>{name.toUpperCase()}:</strong> <span style="color: #61dafb;">${nameInput.toUpperCase()}</span></div>
                <div>🔢 <strong>{${num1} * ${num2}}:</strong> <span style="color: #10b981;">${num1 * num2}</span></div>
            </div>
        `;
    }
}

// ------------------------------------------------------
// 4. PROPS: Passing Data to Child Components
// ------------------------------------------------------
// Props are read-only properties passed from parent to child.
function UserCardComponent(props) {
    return `
        <div class="component-badge">
            <span class="component-icon">${props.emoji || "🚀"}</span>
            <div>
                <div class="component-title">${props.name} <span class="step-chip">${props.badge}</span></div>
                <div class="component-subtitle">${props.role}</div>
            </div>
        </div>
    `;
}

function handlePropsUpdate() {
    const name = document.getElementById("prop-name").value || "Harish";
    const role = document.getElementById("prop-role").value || "Frontend Developer";
    const badge = document.getElementById("prop-badge").value || "Day 27";

    const container = document.getElementById("props-render-target");
    if (container) {
        container.innerHTML = UserCardComponent({ name, role, badge, emoji: "⚛️" });
    }
}

// ------------------------------------------------------
// 5. STATE (useState): Component Memory & Reactivity
// ------------------------------------------------------
// State holds dynamic values; updating state re-renders the UI.
let counterState = 0;

function updateCounter(delta = null, reset = false) {
    if (reset) {
        counterState = 0;
    } else if (delta !== null) {
        counterState += delta;
    }

    const numberDisplay = document.getElementById("state-counter-number");
    const chipsDisplay = document.getElementById("state-result-chips");

    if (numberDisplay) {
        numberDisplay.textContent = counterState;
    }

    if (chipsDisplay) {
        chipsDisplay.innerHTML = `
            <span class="step-chip">Current state: ${counterState}</span>
            <span class="step-chip">Triggered UI re-render 🔄</span>
        `;
    }
}

// ------------------------------------------------------
// Initial triggers on DOM load
// ------------------------------------------------------
window.addEventListener("DOMContentLoaded", () => {
    renderFunctionalComponent();
    evaluateJSXExpression();
    handlePropsUpdate();
    updateCounter(0);
    simulateVDOMUpdate();
});
