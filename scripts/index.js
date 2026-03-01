import { auth, db } from "./firebase-config.js";
import { doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { get_workout } from "./gemini.js";

const generateBtn = document.getElementById('generate-btn');
const resultDiv = document.getElementById('workout-result');
const loadingIndicator = document.getElementById('loading-indicator');

// Logic moved from index.html.
// Assumes flowerJava.js is loaded globally, making these functions available.
setInterval(CheckifDead, 1 * 1000);

if (generateBtn) {
    generateBtn.addEventListener('click', async () => {
        // Flower animation logic from inline script
        revive_flower();
        grow_flower();
        saveActivity();
        const user = auth.currentUser;
        if (!user) {
            alert("Please wait for sign-in...");
            return;
        }

        generateBtn.disabled = true;
        generateBtn.textContent = "Generating...";
        resultDiv.textContent = "";
        loadingIndicator.style.display = "block";

        try {
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const conditions = docSnap.data().conditions;
                const goals = docSnap.data().goals;
                const workoutPlan = await get_workout(conditions, goals);
                resultDiv.innerHTML = workoutPlan;

                // Save the generated plan to Firestore
                await updateDoc(docRef, { plan: workoutPlan });
                console.log("Workout plan saved to Firestore.");
            } else {
                resultDiv.textContent = "No conditions found. Please click 'Set Up' to configure your profile.";
            }
        } catch (error) {
            console.error("Error generating workout:", error);
            resultDiv.textContent = "Error generating workout: " + error.message;
        } finally {
            generateBtn.disabled = false;
            generateBtn.textContent = "Generate Exercise";
            loadingIndicator.style.display = "none";
        }
    });
}