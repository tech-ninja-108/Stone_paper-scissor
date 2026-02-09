let btns = document.querySelectorAll(".btn");
let refresh = document.querySelector("#btn");
let win = document.querySelector(".winner");
let p = document.querySelector("#p");

let total = document.querySelector(".total")
let play = document.querySelector("#news")

let round = document.querySelector(".round")

let x = document.querySelector("#x");
let o = document.querySelector("#o");


let winround = document.querySelector('.winround');


let trun = true;
let count = 1;
let xup = 0;
let oup = 0;


let winpetern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
btns.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("Box was click !")
        if (trun) {
            box.innerHTML = "X";
            x.classList.remove("hl")
            o.classList.add("hl")
            trun = false;
        } else {
            box.innerHTML = "O";
            o.classList.remove("hl")
            x.classList.add("hl")
            trun = true;
        }
        box.disabled = true;
        box.style.opacity = 0.5;

        winnercheck();
    })
})


function showwinner(wins) {
    winround.style.display = "none";
    p.innerHTML = `congratulations ! Winner ${wins}`;
    win.style.display = "flex";
}

function clean() {
    setTimeout(() => {
        winround.style.display = "none";
    }, 2000);
    for (let bt of btns) {
        bt.innerText = "";
        bt.disabled = false;
        trun = true;
        bt.style.opacity = 1;
    }
    x.classList.add("hl")
    o.classList.remove("hl")
}
function addwinner(msg) {
    if (msg === "X") {
        xup++;
        x.innerText = `x wins : ${xup}`;
        if (xup == 5) {
            showwinner(msg)
        } else {
            clean();
        }
    } else {
        oup++;
        o.innerText = `O wins : ${oup}`;
        if (oup == 5) {
            showwinner(msg);
        } else {
            clean();
        }
    }
}
function rounds(msg) {
    round.innerText = `Round : ${count}`;

    let r = document.querySelector('#r');
    r.innerText = `${count}st Rounds win ${msg}`;
    winround.style.display = "flex";
    count++;
    addwinner(msg);
}
function winnercheck() {
    for (let pattern of winpetern) {
        let val1 = btns[pattern[0]].innerText;
        let val2 = btns[pattern[1]].innerText;
        let val3 = btns[pattern[2]].innerText;

        if (val1 != "" && val2 != "" && val3 != "") {
            if (val1 == val2 && val2 == val3) {
                console.log("winner");
                for (let bb of btns) {
                    bb.disabled = true;
                    bb.style.opacity = 0.5;
                }
                rounds(val1)

            }
        }

    }
}


// disabled function

function disables() {
    for (let all of btns) {
        all.disabled = true;
    }
    x.classList.add("hl")
}

// refresh btn

refresh.addEventListener("click", () => {

    let ask = document.querySelector(".ref");
    ask.style.display = "flex";

    let allask = document.querySelectorAll(".ok")
    allask.forEach((all) => {
        all.addEventListener("click", (e) => {
            if (e.target.classList[0] == "yes") {
                trun = true;
                count = 1;
                xup = 0;
                oup = 0;
                round.innerText = `Round : ${count}`;
                x.innerText = `x wins : ${xup}`;
                o.innerText = `O wins : ${oup}`;
                for (let all of btns) {
                    all.innerHTML = "";
                    all.disabled = false;
                    all.style.opacity = 1;
                }
                ask.style.display = "none";
                total.style.display = "flex";
            } else if (e.target.classList[0] == "no") {
                ask.style.display = "none";
            }
        })
    })


})
play.addEventListener("click", () => {
    total.style.display = "none";
    for (let all of btns) {
        all.disabled = false;
    }
})

disables();
