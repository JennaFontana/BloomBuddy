import { db, auth } from "./firebase-config.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const saveBtn = document.getElementById("save-btn");
const loadingIndicator = document.getElementById("loading-indicator");

const setupToggle = (checkboxId, fieldId) => {
    const checkbox = document.getElementById(checkboxId);
    const field = document.getElementById(fieldId);
    if (checkbox && field) {
        const toggle = () => {
            field.style.display = checkbox.checked ? 'block' : 'none';
        };
        checkbox.addEventListener('change', toggle);
        toggle(); // Set initial state
    }
};

setupToggle('other-goal', 'other-goal-field');
setupToggle('other', 'other-field');

if (saveBtn) {
    saveBtn.addEventListener("click", async () => {
        const data = {};
        
        // Save checkbox states
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            data[checkbox.name] = checkbox.checked;
        });

        // Save text field value
        data['otherText'] = document.getElementById("other-field").value;

        localStorage.setItem('bloomBuddyConditions', JSON.stringify(data));
        
        // Show loading state
        if (loadingIndicator) loadingIndicator.style.display = "block";
        saveBtn.disabled = true;
        saveBtn.textContent = "Saving...";

        try {
            const user = auth.currentUser;
            if (!user) {
                throw new Error("User not authenticated. Please wait a moment and try again.");
            }

            // Create a string of conditions
            const conditions = Object.keys(data).filter(key => data[key] === true);
            if (data.otherText) {
                conditions.push(data.otherText);
            }
            const conditionsStr = conditions.join(', ');

            // Collect fitness goals
            const goals = [];
            document.querySelectorAll('input[name="goal"]:checked').forEach(checkbox => {
                if (checkbox.value !== 'Other') {
                    goals.push(checkbox.value);
                }
            });
            const otherGoalCheckbox = document.getElementById('other-goal');
            const otherGoalInput = document.getElementById('other-goal-field');
            if (otherGoalCheckbox && otherGoalCheckbox.checked && otherGoalInput.value.trim()) {
                goals.push(otherGoalInput.value.trim());
            }
            const goalsStr = goals.join(', ');

            // Save data to Firestore under the user's UID
            await setDoc(doc(db, "users", user.uid), { conditions: conditionsStr, goals: goalsStr });

            console.log("Conditions saved to Firestore");
            alert('Conditions saved!');
            window.location.href = 'index.html';
        } finally {
            if (loadingIndicator) loadingIndicator.style.display = "none";
            saveBtn.disabled = false;
            saveBtn.textContent = "Save Conditions";
        }
    });
}