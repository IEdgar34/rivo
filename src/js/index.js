window.addEventListener("DOMContentLoaded", () => {
    const menu = document.querySelector(".menu");
    const menuWrap = document.querySelector('[data-meny-open="menu"]'),
        menuIcon = menuWrap.querySelector(".dib"),
        menyburger = menuWrap.querySelector(".header__menu_burger ");
    /* const days = document.querySelector(".time_days"); */
    addTime();
    function openMenu() {
        if (!menu.classList.contains("menu_active")) {
            addClass();
        } else {
            delClass();
        }
    }
    function addClass() {
        menuIcon.classList.add("dib_active");
        menu.classList.add("menu_active");
        menyburger.textContent = "CLOSE";
    }
    function delClass() {
        menuIcon.classList.remove("dib_active");
        menu.classList.remove("menu_active");
        menyburger.textContent = "MENU";
    }
    menuWrap.addEventListener("click", (e) => {
        let target = e.target;
        if (target === menuIcon || target === menyburger) {
            openMenu();
        }
    });

    function date() {
        let t = Date.parse("2024 03 13") - Date.parse(new Date());
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

    function addTime() {
        let days = document.querySelector(".time_days");
        let hours = document.querySelector(".time_hours");
        let minutes = document.querySelector(".time_minutes");
        let seconds = document.querySelector(".time_seconds");
        function updateTime() {
            let time = date();
            endOfTimer(time);
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
    function endOfTimer(time) {
        if (time === 0) {
            clearInterval(set);
        }
    }
    let set = setInterval(() => {
        addTime();
    }, 1000);
});
