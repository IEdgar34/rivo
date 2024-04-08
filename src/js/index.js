window.addEventListener("DOMContentLoaded", () => {
    const menu = document.querySelector(".menu");
    const menuWrap = document.querySelector('[data-meny-open="menu"]'),
        menuIcon = menuWrap.querySelector(".dib"),
        menyburger = menuWrap.querySelector(".header__menu_burger ");
    const btn = document.querySelector(".timer__btn");
    //предварительный запуск таймера
    addTime();
    //функция открытия меню
    function openMenu() {
        if (!menu.classList.contains("menu_active")) {
            addClass();
        } else {
            delClass();
        }
    }
    //функция добавления классов
    function addClass() {
        menuIcon.classList.add("dib_active");
        menu.classList.add("menu_active");
        menyburger.textContent = "CLOSE";
    }
    //функция удаления классов
    function delClass() {
        menuIcon.classList.remove("dib_active");
        menu.classList.remove("menu_active");
        menyburger.textContent = "MENU";
    }
    //событие клика для открытия меню
    menuWrap.addEventListener("click", (e) => {
        let target = e.target;
        if (target === menuIcon || target === menyburger) {
            openMenu();
        }
    });
    //таймер
    function date() {
        let t = Date.parse("2024-05-13") - Date.parse(new Date());
        let days = Math.floor((t / (1000 * 60 * 60 * 24)) % 30);
        let hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        let minutes = Math.floor((t / (1000 * 60)) % 60);
        let seconds = Math.floor((t / 1000) % 60);

        return {
            t: t,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
        };
    }
    let set = setInterval(() => {
        addTime();
    }, 1000);

    function endOfTime(time) {
        if (time < 0) {
            clearInterval(set);
        }
    }
    function addTime() {
        let days = document.querySelector(".time_days");
        let hours = document.querySelector(".time_hours");
        let minutes = document.querySelector(".time_minutes");
        let seconds = document.querySelector(".time_seconds");
        function updateTime() {
            let time = date();
            endOfTime(time.t);
            days.textContent = addZero(time.days);
            hours.textContent = addZero(time.hours);
            minutes.textContent = addZero(time.minutes);
            seconds.textContent = addZero(time.seconds);
        }
        updateTime();
    }
    function addZero(time) {
        if (time < 10) {
            return "0" + time;
        } else {
            return time;
        }
    }

    //modal signup
    const signupModal = document.querySelector(".signup");
    const signupModalClose = document.querySelector(".signup__close");

    btn.addEventListener("mousedown", () => {
        btn.classList.add("timer__btn_active");
    });
    btn.addEventListener("mouseup", () => {
        btn.classList.remove("timer__btn_active");
        signupModal.classList.add("signup_active");
        document.body.style.overflow = "hidden";
    });

    signupModalClose.addEventListener("click", () => {
        signupModal.classList.remove("signup_active");
        document.body.style.overflow = "";
        reset();
        cleanMessages();
    });

    //signup modalForm
    const formModal = document.querySelectorAll(".signup__modal");
    const modalNext = document.querySelectorAll(".signup__modal_next");
    const formNext = document.querySelectorAll(".signup__modal_next-wrap");
    const border = document.querySelectorAll(".width");
    const input = document.querySelectorAll("input");
    const send = document.querySelector(".signup__modal_send");

    //свитчер вперед
    let b = 0;
    let c = 1;
    modalNext.forEach((item) => {
        item.addEventListener("click", (e) => {
            e.stopPropagation();
            if (input[b].value === "" || input[c].value === "") {
                error();
            } else {
                b += 2;
                c += 2;
                borDer();
                if (i < 2) {
                    del();
                    plus();
                    creatElem();
                }
            }
        });
    });
    //validate
    function error() {
        switch ("") {
            case input[b].value:
                input[b].style.cssText = "border: 2px solid red;";
                errorMessages(input[b]);
            // fall through
            case input[c].value:
                input[c].style.cssText = "border: 2px solid red; ";
                errorMessages(input[c]);
        }
    }

    function errorMessages(inp) {
        const div = document.createElement("div");
        div.classList.add("error");
        div.classList.add(inp.placeholder);
        div.textContent = `enter your ${inp.placeholder}`;
        let elem = document.querySelector(`.${inp.placeholder}`);
        if (!elem) {
            inp.after(div);
        }
    }
    function cleanMessages() {
        const elem = document.querySelectorAll(".error");
        elem.forEach((item) => {
            item.remove();
        });
        input.forEach((item) => {
            item.style.cssText = "";
        });
    }

    //функция вперед
    let i = 0;
    function plus() {
        ++i;
        formModal[i].classList.add("signup__modal_active");
    }
    //функйия назад
    function minus() {
        cleanMessages();
        b -= 2;
        c -= 2;
        border[i].classList.remove("width_active");
        --i;
        del();
        formModal[i].classList.add("signup__modal_active");
    }
    //анимация загрузки
    function borDer() {
        border[i].classList.add("width_active");
    }
    //удаление классов
    function del() {
        cleanMessages();
        formModal.forEach((item) => {
            item.classList.remove("signup__modal_active");
        });
    }
    //создание свитчера назад и событие на функцию
    function creatElem() {
        const p = document.createElement("p");
        p.classList.add("signup__modal_next");
        p.classList.add("signup__modal_prev");
        p.textContent = "←";
        formNext[i].prepend(p);

        p.addEventListener("click", () => {
            minus();
        });
    }
    //SEND
    async function post(url, content) {
        const promis = await fetch(url, {
            method: "POST",
            headers: {
                "Conetnt-type": "application/json",
            },
            body: content,
        });

        try {
            return promis;
        } catch (err) {
            console.log(err);
        }
    }
    send.addEventListener("click", (e) => {
        e.preventDefault();
        borDer();

        //объект инпутов
        const dat = {};
        input.forEach((item) => {
            dat[item.placeholder] = item.value;
        });
        console.log(JSON.stringify(dat));
        post("server.php", JSON.stringify(dat))
            .then((dat) => dat.text())
            .then(() => {
                console.log(dat);
            })
            .then(() => {
                setTimeout(() => {
                    reset();
                }, 2000);
            })
            .catch(() => {
                console.error(`Произошла ошибка, объект ${dat} не отрпавился `);
            });
    });

    function reset() {
        cleanMessages();
        del();
        formModal[0].classList.add("signup__modal_active");
        i = 0;
        b = 0;
        c = 1;
        border.forEach((item) => {
            item.classList.remove("width_active");
        });
        input.forEach((item) => {
            item.value = "";
        });
    }

    //slider

    const width = document.querySelector(".slider__wrapper");
    const globalWrapper = document.querySelector(".slider__pr");
    const slide = document.querySelector(".slider__inner");
    const itemlist = document.querySelectorAll(".slider__item");
    let size = window.getComputedStyle(width).width;
    let counter = 0;

    window.addEventListener("resize", () => {
        size = window.getComputedStyle(width).width;
    });

    globalWrapper.addEventListener("click", (e) => {
        e.preventDefault();
        if (e.target.classList.contains("slider__next")) {
            counter === parseInt(size) * (itemlist.length - 1) ? (counter = 0) : (counter += parseInt(size));
            console.log(counter);
            slide.style.transform = `translateX(-${counter}px)`;
        } else if (e.target.classList.contains("slider__prev")) {
            counter === 0 ? (counter = parseInt(size) * (itemlist.length - 1)) : (counter -= parseInt(size));
            console.log(counter);
            slide.style.transform = `translateX(-${counter}px)`;
        }
    });
});
