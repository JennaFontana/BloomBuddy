const other = document.getElementById("other");
const field = document.getElementById("other-field");
const saveBtn = document.getElementById("save-btn");

function show_other_input() {
    // Use .checked for checkboxes or radio buttons, not .clicked
    if (other.checked) {
        field.style.display = "block";
    } else {
        field.style.display = "none";
    }
    console.log(other.checked);
}

// Ensure both elements exist before adding event listeners
if (other && field) {
    other.addEventListener("change", show_other_input);
    // Set the initial state when the page loads
    show_other_input();
}

if (saveBtn) {
    saveBtn.addEventListener("click", () => {
        const data = {};
        
        // Save checkbox states
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            data[checkbox.name] = checkbox.checked;
        });

        // Save text field value
        data['otherText'] = field.value;

        localStorage.setItem('bloomBuddyConditions', JSON.stringify(data));
        alert('Conditions saved!');
    });
}