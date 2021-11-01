const dmwButtons = document.querySelectorAll(".dwm-item");
const daily = document.querySelector(".daily");
const weekly = document.querySelector(".weekly");
const monthly = document.querySelector(".monthly");

const currentTime = document.querySelectorAll("#current-time");
const previousTime = document.querySelectorAll("#previous-time");

// currentTime.forEach(item => {
//     console.log(item.innerHTML);
// })

function catchFetch() {
    return new Promise((resolve, reject) => {
        fetch("data.json")
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(err => reject(err));
    })
}


dmwButtons.forEach(btn => {
    btn.addEventListener("click", () => {

        for (var i = 0; i < 3; i++) {
            btn.parentElement.children[i].classList.remove("selected");
        }

        if (!btn.classList.contains("selected")) {
            btn.classList.add("selected");
        }
        if (btn.classList.contains("selected")) {
            if (btn.classList.contains("daily")) {
                getMessage("daily");

            } else if (btn.classList.contains("weekly")) {
                getMessage("weekly")

            } else {
                getMessage("monthly");

            }
        }
    });
});

let array = [];
let array2 = [];
let message;
let save
function getMessage(message) {
    catchFetch().then((data) => {
        data.forEach(datacik => {
            if (message === "daily") {
                newFunction(datacik.timeframes.daily.current, datacik.timeframes.daily.previous)


            } else if (message === "weekly") {
                newFunction(datacik.timeframes.weekly.current, datacik.timeframes.weekly.previous)

            } else {
                newFunction(datacik.timeframes.monthly.current, datacik.timeframes.monthly.previous)

            }
        })
    }).catch(err => console.log(err))
    array = [];
    array2 = [];
}


function newFunction(current, previous) {
    array.push(current)
    currentTime.forEach((item, key) => {
        item.innerHTML = array[key];
    });

    array2.push(previous)
    previousTime.forEach((item, key) => {
        item.innerHTML = array2[key];
    })
}