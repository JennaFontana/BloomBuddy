import { db, auth } from "./firebase-config.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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

            // Save data to Firestore under the user's UID
            await setDoc(doc(db, "users", user.uid), { conditions: conditionsStr });

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