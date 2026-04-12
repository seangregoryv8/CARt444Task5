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
    let titles = ["CART_444", "sean_gregory", "design_systems"];
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
    
        a.innerHTML = `${text}<span>${spanText}</span>`;
        nav.appendChild(a);
    }

    function addBreak() { nav.appendChild(document.createElement("br")); }

    addParagraph("overview.all");
    addLink("index.html", "home", "brd");
    addLink("philosophy.html", "philosophy", "pla")

    addBreak();
    addParagraph("foundation (1).col");
    addLink("types/grid.html", "grid_system", "mnl");
    addLink("types/spacing.html", "spacing_scale", "maa");
    addLink("types/breakpoints.html", "breakpoints", "log");
    addLink("types/layers.html", "layer_stack", "str");
    addLink("types/color.html", "colour_palette", "sig");
    addLink("types/typography.html", "typography_specimen", "typ");
    addLink("types/ratios.html", "image_ratios", "fra");
    addLink("types/icons.html", "icon_library", "sym");

    div.appendChild(nav);
    aside.appendChild(div);

    document.body.appendChild(aside);
}

setSidebar();