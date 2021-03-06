(function() {
    const transitionTime = {
        "section.the-start": .2,
        ".options__item.options__item--tools": .2,
        ".options__item.options__item--sessions": .2,
        ".options__sessions--3-bonus-button": .2,
        ".options__sessions--1-button": .2,
        ".options__sessions--2-button": .2,
        ".options__sessions--3-button": .2
    }

    const sections = Array.from(document.querySelectorAll("section"));

    const [
        start,
        options,
        options__tools,
        options__sessions
    ] = sections;

    [
        options,
        options__tools,
        options__sessions
    ].forEach(s => {
        s.classList.toggle("hide", true);
    });

    const connectElements = (el1, el2, sectionsToHide, bg) => {
        const e1 = document.querySelector(el1); //options__item options__item--tools
        const e2 = document.querySelector(el2); //options__tools
        e1.addEventListener("click", () => {
            setTimeout(() => {
                if (el1 === "section.the-start") {
                  document.querySelector(".chatty-kathy").classList.toggle("hide", false);
                }
                e2.classList.toggle("hide", false);
                sectionsToHide.forEach(el => el.classList.toggle("hide", true));
                document.querySelector("main").className = bg
            }, transitionTime[e1] * 1000)
        })
    }

    connectElements(
        "section.the-start",
        ".options", [start, options__tools, options__sessions],
        "") // start to options
    connectElements(
        ".options__item.options__item--tools",
        ".options__tools", [start, options, options__sessions],
        "")
    connectElements(
        ".options__item.options__item--sessions",
        ".options__sessions", [start, options, options__tools],
        "hourglass-bg")
    connectElements(
        ".options__sessions--bonus-button",
        ".options__sessions--session-3-bonus", [start, options, options__tools, options__sessions],
        "hourglass-bg")

    connectElements(
        "nav.options.back",
        ".the-start", [options, options__tools, options__sessions],
        "")
    connectElements(
        "nav.options__tools.back",
        ".options", [start, options__tools, options__sessions],
        "")
    connectElements(
        "nav.options__sessions.back",
        ".options", [start, options__tools, options__sessions],
        "")

    // connectElements(
    //   "bonus-back", 
    //   ".sessions", [start, options__tools],
    //   "") 

    const sessionButtonSelector = (session) =>
        `.options__sessions--${session}-button`;
    const sessionDisplaySelector = (session) =>
        `.options__sessions--session-${session}`;
    const connectSessionElements = (session, others) => {
        const button = document.querySelector(sessionButtonSelector(session));
        const display = document.querySelector(sessionDisplaySelector(session));
        const nav = document.querySelector("section.options__sessions hgroup");
        button.addEventListener("click", () => {
            setTimeout(() => {
                nav.classList.toggle("minimize", true)
                display.classList.toggle("hide", false)
                display.classList.toggle("show-session", true)
                button.classList.toggle("highlight", true)
                others.forEach(o => {
                    const b = document.querySelector(sessionButtonSelector(o));
                    const d = document.querySelector(sessionDisplaySelector(o));
                    d.classList.toggle("hide", true)
                    d.classList.toggle("show-session", false)
                    b.classList.toggle("highlight", false)
                })
            }, transitionTime[`.options__sessions--${session}-button`] * 1000)
        })
    }

    connectSessionElements(1, [2, 3])
    connectSessionElements(2, [1, 3])
    connectSessionElements(3, [1, 2])
    
    let is_chatting = false;
    document.querySelector(".chatty-kathy").addEventListener("click", () => {
      const chatty_kathy = document.querySelector(".chatty-kathy")
      const chat = document.querySelector("#chat")
      is_chatting = !is_chatting
      chatty_kathy.classList.toggle("on", is_chatting)
      chat.classList.toggle("on", is_chatting)
      chat.classList.toggle("hide", !is_chatting)
    })
    
    document.querySelector("button.options__sessions--bonus-button").addEventListener("click", () => {
        document.querySelector("main").className = "pray-bg"
        document.querySelector("div.bonus").classList.toggle("overlay", true)
        document.querySelector("div.bonus").classList.toggle("hide", false)
        document.querySelector(".bonus__prayer-req--input").focus()
    })
    document.querySelector(".bonus__exit").addEventListener("click", () => {
        document.querySelector("main").className = "hourglass-bg"
        document.querySelector("div.bonus").classList.toggle("overlay", false)
        document.querySelector("div.bonus").classList.toggle("hide", true)
    })

    const addItemToList = () => {
      const input = document.querySelector(".bonus__prayer-req--input");
      const list = document.querySelector(".bonus__prayer-req--list ul");
      
      if (!input.value) return

      list.insertAdjacentHTML('beforeend',`<li></li>`);
      list.lastChild.textContent = input.value;
      input.value = "";
      input.focus();
    }

    document.querySelector(".bonus__prayer-req--add-button").addEventListener("click", addItemToList)

    document.querySelector(".bonus__prayer-req--input").addEventListener('keyup', (e) => {
      if (e.keyCode === 13) {
        addItemToList()
      }
    });
})();