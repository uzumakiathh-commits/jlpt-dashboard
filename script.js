// =========================
// Elements
// =========================

const tasks = document.querySelectorAll(".task");

const progressBar =
document.getElementById("progressBar");

const themeBtn =
document.getElementById("themeBtn");

const completeLessonBtn =
document.getElementById("completeLessonBtn");

// =========================
// Progress Bar
// =========================

tasks.forEach(task => {
    task.addEventListener(
        "change",
        updateProgress
    );
});

function updateProgress(){

    let completed = 0;

    tasks.forEach(task => {

        if(task.checked){
            completed++;
        }

    });

    let percent =
    (completed / tasks.length) * 100;

    progressBar.style.width =
    percent + "%";

    progressBar.innerText =
    Math.round(percent) + "%";

    localStorage.setItem(
        "progress",
        JSON.stringify(
            [...tasks].map(
                task => task.checked
            )
        )
    );

    // Enable lesson button only at 100%

    if(percent === 100){

        completeLessonBtn.disabled =
        false;

        completeLessonBtn.style.opacity =
        "1";

    }
    else{

        completeLessonBtn.disabled =
        true;

        completeLessonBtn.style.opacity =
        "0.5";

    }

}

// =========================
// Load Saved Checklist
// =========================

function loadProgress(){

    const saved =
    JSON.parse(
        localStorage.getItem(
            "progress"
        )
    );

    if(saved){

        tasks.forEach(
            (task,index)=>{

                task.checked =
                saved[index];

            }
        );

        updateProgress();
    }

}

// =========================
// Lesson Progress
// =========================

function saveLessons(){

    const lessons =
    document.getElementById(
        "lessonInput"
    ).value;

    localStorage.setItem(
        "lessons",
        lessons
    );

    document.getElementById(
        "lessonCount"
    ).innerText =
    lessons + " / 25 Lessons";

}

// =========================
// Load Lessons
// =========================

function loadLessons(){

    const lessons =
    localStorage.getItem(
        "lessons"
    ) || 0;

    document.getElementById(
        "lessonCount"
    ).innerText =
    lessons + " / 25 Lessons";

}

// =========================
// Complete Lesson
// =========================

function completeLesson(){

    let lessons =
    parseInt(
        localStorage.getItem(
            "lessons"
        ) || 0
    );

    if(lessons < 25){

        lessons++;

    }

    localStorage.setItem(
        "lessons",
        lessons
    );

    document.getElementById(
        "lessonCount"
    ).innerText =
    lessons + " / 25 Lessons";

    // Reset Checklist

    tasks.forEach(task => {

        task.checked = false;

    });

    localStorage.setItem(
        "progress",
        JSON.stringify(
            [...tasks].map(
                () => false
            )
        )
    );

    updateProgress();

    alert(
        "🎉 Lesson Completed! +1 Lesson Added"
    );

}

// =========================
// Theme Toggle
// =========================

themeBtn.addEventListener(
    "click",
    ()=>{

        document.body.classList.toggle(
            "light"
        );

    }
);

// =========================
// Button Event
// =========================

completeLessonBtn.addEventListener(
    "click",
    completeLesson
);

// =========================
// Initial Load
// =========================

loadProgress();
loadLessons();
updateProgress();