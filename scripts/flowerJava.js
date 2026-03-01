//const InActivity_time = 60 * 60 * 12 * 48; //48 hours in seconds 
//const InActivity_time = 15; //test


function saveActivity() {
    console.log('saving activity');
    localStorage.setItem('lastActivity', Date.now());
}
function kill_flower () {
    console.log('killing flower');
    document.querySelectorAll('.petal').forEach(petal => {
        petal.style.background = 'sienna';
    });
    document.querySelectorAll('.petal').forEach(petal => {
        petal.style.opacity = '0.9';
    });
    
   
    document.querySelector('.center').style.background = 'saddlebrown';
    document.querySelector(".center").style.filter = "blur(2px)";
    document.querySelector(".center").style.transform = "rotate(10deg) translateY(5px)"; 

    document.querySelector('.stem').style.background = '#5a2e0c';

document.querySelector('.flower').style.transform = "scale(0.8) rotate(-5deg)"; 
}
    function revive_flower() {
    console.log('reviving flower');
    document.querySelectorAll('.petal').forEach(petal => {
        petal.style.background = 'radial-gradient(circle at 20% 20%, #ff9da5, #ff5a7e)';
    });
    document.querySelector('.center').style.background = 'radial-gradient(circle at center, gold 60%, orange 100%, transparent 110%)';
    document.querySelector('.stem').style.background = 'linear-gradient(to top, #6bbf59, #2f7a32)';
    
    
}
const min_scale = 0.5;      
const step = 0.2;           
const max_count = 4;

function applyScaleCount(count) {
    const scale = min_scale + count * step;
    const el = document.querySelector('.flower');
    if (el) el.style.transform = `scale(${scale})`;
}
function loadCount() {
    const v = localStorage.getItem('flowerCount');
    return v === null ? 0 : parseInt(v, 10);
}
function saveCount(c) {
    localStorage.setItem('flowerCount', String(c));
}

let scaleCount = loadCount();
applyScaleCount(scaleCount);

const shrink_delay = 60000; // 60ms before a shrink occurs
let lastClick = null;

function grow_flower() {
    console.log('growing flower');
    if (scaleCount < max_count) {
        scaleCount += 1;
        saveCount(scaleCount);
        applyScaleCount(scaleCount);
    }
    lastClick = Date.now();
}

function maybeShrink() {
    if (scaleCount <= 0 || lastClick === null) return;
    const now = Date.now();
    if (now - lastClick >= shrink_delay) {
        scaleCount -= 1;
        saveCount(scaleCount);
        applyScaleCount(scaleCount);
        lastClick = now; 
        if (scaleCount <= 0) {
            // once it shrinks to 0, kill the flower
            kill_flower();
        }
    }
}
// check shrink condition every second
setInterval(maybeShrink, 1000);

function CheckifDead() {
    console.log('checking if dead');
    const lastActivity = localStorage.getItem('lastActivity');
    if (lastActivity) {
        const time_difference = Date.now() - lastActivity;
        const timePassed = time_difference / 1000; // Convert to seconds
        console.log('timePassed', timePassed);
        //if (scaleCount <= 0) {
          //  kill_flower();
        //} //else {
            //saveActivity();
        //}
    } 
    else {
        console.log('no lastActivity stored');
    }
}

CheckifDead();

setInterval(CheckifDead, 60 * 1000); // Check every 60 seconds




