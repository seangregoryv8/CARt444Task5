function setSidebar()
{
    let effects = ["scanlines", "scanline", "flicker"];
    let ddiv;
    for (let i = 0; i < effects.length; i++)
    {
        ddiv = document.createElement("div");
        ddiv.classList.add(effects[i]);
        document.body.appendChild(ddiv);
    }
    
    let aside = document.createElement("aside");
    aside.classList.add("sideBar");
    aside.style.gridColumn = 1;

    let div = document.createElement("div");
    div.classList.add("sideBarHeader");

    let indexTitle = document.createElement("a");
    indexTitle.classList.add("indexTitle");
    indexTitle.href = "index.html";
    let titles = ["sean_gregory", "computer_scientist", "filmmaker"];
    let p;
    for (let i = 0; i < titles.length; i++)
    {
        p = document.createElement("p");
        p.innerHTML = titles[i];
        indexTitle.appendChild(p);
    }
    div.appendChild(indexTitle);

    let nav = document.createElement("nav");
    nav.classList.add("checklist");
    nav.setAttribute("aria-label", "Foundation");

    function addParagraph(text)
    {
        let p = document.createElement("p");
        p.textContent = text;
        nav.appendChild(p);
    }
    function addLink(href, text, spanText) {
        let a = document.createElement("a");
        a.href = href; // browser resolves relative paths here
    
        const currentPath = window.location.pathname;
        const linkPath = a.pathname; // this is the resolved absolute path
    
        // Normalize trailing slashes (index.html → /)
        const normalize = path => path.replace(/\/index\.html$/, "/");
    
        if (normalize(linkPath) === normalize(currentPath)) {
            a.setAttribute("aria-current", "page");
        }
    
        a.innerHTML = `${text}<span>.${spanText}</span>`;
        nav.appendChild(a);
    }

    function addBreak() { nav.appendChild(document.createElement("br")); }

    addParagraph("overview.all");
    addLink("index.html", "home", "brd");
    addLink("philosophy.html", "philosophy", "pla");
    addLink("contact.html", "contact", "con");

    addBreak();
    addParagraph("projects (1).col");
    addLink("projectsComp.html", "computers", "exe");
    addLink("projectsArt.html", "art", "jpg");

    div.appendChild(nav);
    
    // Create the social links with icons
    let socialLinks = [
        { href: "mailto:seangregoryv8@gmail.com", x: 1, y: 4 },
        { href: "https://github.com/seangregoryv8", x: 1, y: 1 },
        { href: "https://www.linkedin.com/in/sean-gregory-v8/", x: 0, y: 0 }
    ];

    // Loop through the social links and create the corresponding elements
    socialLinks.forEach(link => {
        let anchor = document.createElement("a");
        anchor.href = link.href;
        anchor.target = "_blank";
        anchor.rel = "noopener noreferrer";

        let iconDiv = document.createElement("div");
        iconDiv.classList.add("icon");
        iconDiv.style.marginLeft = "var(--space-4)";
        iconDiv.style.marginBottom = "var(--space-3)";
        iconDiv.style.setProperty('--x', link.x);
        iconDiv.style.setProperty('--y', link.y);

        anchor.appendChild(iconDiv);  // Append icon to anchor
        div.appendChild(anchor);      // Append anchor to sidebar
    });

    let viewModeLabel = document.createElement("div");
    viewModeLabel.id = "viewModeLabel"
    div.appendChild(viewModeLabel);
    aside.appendChild(div);

    document.body.appendChild(aside);

    let jade = document.createElement("img");
    jade.classList.add("jade");
    jade.src = "./resources/images/jade.webp";
    document.body.appendChild(jade);

    let jadeText = document.createElement("p");
    jadeText.classList.add("jadeText");
    jadeText.textContent = "god_loves_you";
    document.body.appendChild(jadeText);
}

setSidebar();

function updateViewMode() {
    const width = window.innerWidth;
    const label = document.getElementById("viewModeLabel");

    if (width <= 600) {
        label.textContent = "VIEW: MOBILE";
    }
    else if (width <= 768) {
        label.textContent = "VIEW: MOBILE LANDSCAPE";
    }
    else if (width <= 1024) {
        label.textContent = "VIEW: TABLET";
    }
    else if (width <= 1280) {
        label.textContent = "VIEW: CRT MODE";
    }
    else if (width <= 1920) {
        label.textContent = "VIEW: DESKTOP";
    }
    else {
        label.textContent = "VIEW: WIDE";
    }
}

window.addEventListener("resize", updateViewMode);
window.addEventListener("load", updateViewMode);