//const InActivity_time = 60 * 60 * 12 * 48; //48 hours in seconds 
const InActivity_time = 1; //test

function saveActivity() {
    console.log('saving activity');
    localStorage.setItem('lastActivity', Date.now());
}
function kill_flower () {
    console.log('killing flower');
    document.querySelectorAll('.petal').forEach(petal => {
        petal.style.backgroundColor = 'grey';
    });
    document.querySelector('.center').style.backgroundColor = 'darkgrey';
    document.querySelector('.stem').style.backgroundColor = 'darkgreen';
}
function CheckifDead() {
    console.log('checking if dead');
    const lastActivity = localStorage.getItem('lastActivity');
    if (lastActivity) {
        const time_difference = Date.now() - lastActivity;
        const timePassed = time_difference / 1000; // Convert to seconds
        console.log('timePassed', timePassed);
        if (timePassed > InActivity_time) {
            kill_flower();
        } else {
            saveActivity();
        }
    } else {
        console.log('no lastActivity stored');
    }
}

CheckifDead();
saveActivity();
setInterval(CheckifDead, 5 * 1000);