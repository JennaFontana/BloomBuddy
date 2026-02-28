import { get_workout } from "./gemini.js";

const other = document.getElementById("other");
const field = document.getElementById("other-field");
const saveBtn = document.getElementById("save-btn");
const loadingIndicator = document.getElementById("loading-indicator");

function show_other_input() {
    if (other.checked) {
        field.style.display = "block";
    } else {
        field.style.display = "none";
    }
}

// Ensure both elements exist before adding event listeners
if (other && field) {
    other.addEventListener("change", show_other_input);
    // Set the initial state when the page loads
    show_other_input();
}

if (saveBtn) {
    saveBtn.addEventListener("click", async () => {
        const data = {};
        
        // Save checkbox states
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            data[checkbox.name] = checkbox.checked;
        });

        // Save text field value
        data['otherText'] = field.value;

        localStorage.setItem('bloomBuddyConditions', JSON.stringify(data));
        
        // Show loading state
        if (loadingIndicator) loadingIndicator.style.display = "block";
        saveBtn.disabled = true;
        saveBtn.textContent = "Generating...";

        try {
            // Generate workout based on data
            const workoutPlan = await get_workout(data);
            console.log("Generated Workout:", workoutPlan);
            alert('Conditions saved and workout generated!');
            window.location.href = 'index.html';
        } finally {
            if (loadingIndicator) loadingIndicator.style.display = "none";
            saveBtn.disabled = false;
            saveBtn.textContent = "Save Conditions";
        }
    });
}