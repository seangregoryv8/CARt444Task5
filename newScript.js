function setToggleIcon(isLight) {
    const btn = document.querySelector(".lightDarkToggle");
    if (!btn) return;

    btn.style.setProperty("--x", isLight ? 2 : 3);
    btn.style.setProperty("--y", 3);

    document.querySelector(".effectsToggle").style.setProperty("--x", isLight ? 2 : 3);
    document.getElementsByClassName("sideBarHeader")[0].children[2].children[0].style.setProperty("--x", isLight ? 0 : 1);
    document.getElementsByClassName("sideBarHeader")[0].children[3].children[0].style.setProperty("--x", isLight ? 0 : 1);
    let icons = document.getElementsByClassName("inlineIcon");
    for (let i = 0; i < icons.length; i++)
    {
        let x = icons[i].style.getPropertyValue("--x");
        if (x === "0" || x === "1")
            icons[i].style.setProperty("--x", isLight ? 0 : 1);
        else if (x === "2" || x === "3")
            icons[i].style.setProperty("--x", isLight ? 2 : 3);
    }
}

function applyTheme(isLight) {
    document.body.classList.toggle("light-mode", isLight);
    localStorage.setItem("theme", isLight ? "light" : "dark");
    setToggleIcon(isLight);
}

function toggleTheme() {
    const isLight = !document.body.classList.contains("light-mode");
    applyTheme(isLight);
}

document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");
    const isLight = savedTheme === "light";

    document.body.classList.toggle("light-mode", isLight);
    setToggleIcon(isLight);
});

function setEffectsIcon(isEffectsOn) {
    const btn = document.querySelector(".effectsToggle");
    if (!btn) return;

    btn.setAttribute("aria-pressed", String(!isEffectsOn));
}

function applyEffects(isEffectsOn) {
    document.body.classList.toggle("effects-off", !isEffectsOn);
    localStorage.setItem("effects", isEffectsOn ? "on" : "off");
    setEffectsIcon(isEffectsOn);
}

function toggleEffects() {
    const isEffectsOn = !document.body.classList.contains("effects-off");
    applyEffects(!isEffectsOn);
}

document.addEventListener("DOMContentLoaded", () => {
    const savedEffects = localStorage.getItem("effects");
    const isEffectsOn = savedEffects !== "off";
    applyEffects(isEffectsOn);
});

function addBlackLoadingBox()
{
    const existing = document.getElementById("blackLoadingBox");
    if (existing) return existing;

    const blackBox = document.createElement("div");
    blackBox.classList.add("blackLoadingBox");
    blackBox.setAttribute("aria-hidden", "true");

    document.body.appendChild(blackBox);
    return blackBox;
}

function removeBlackLoadingBox() {
    const blackBox = document.getElementsByClassName("blackLoadingBox")[0];
    if (!blackBox) return;

    blackBox.style.opacity = "0";
    window.setTimeout(() => blackBox.remove(), 240);
}

addBlackLoadingBox();

setTimeout(() => 
{
    document.getElementsByClassName("blackLoadingBox")[0].style.opacity = "0.6";
    setTimeout(() =>
    {
        document.getElementsByClassName("blackLoadingBox")[0].style.opacity = "0.3";
        setTimeout(() => { removeBlackLoadingBox() }, 500)
    }, 500);
}, 500);

async function loadProjects() {
    const res = await fetch('./json/computer.json');
    const data = await res.json();

    const container = document.getElementById('projectsContainer');

    fillProjects(data, container);
}

async function loadArtProjects() {
    const res = await fetch('./json/film.json');
    const data = await res.json();

    const container = document.getElementById('filmContainer');

    fillProjects(data, container);
}

async function fillProjects(data, container)
{
    Object.entries(data).forEach(([key, project]) => {
        const section = document.createElement('section');

        // Title
        const title = document.createElement('h2');
        title.textContent = key;
        section.appendChild(title);

        // Description (EN only)
        if (project.description?.en)
        {
            project.description.en.forEach(text => {
                const p = document.createElement('p');
                p.textContent = text;
                section.appendChild(p);
            });
        }

        // Languages
        if (project.languages)
        {
            const lang = document.createElement('p');
            lang.innerHTML = `<strong>Tech:</strong> ${project.languages.join(', ')}`;
            section.appendChild(lang);
        }

        // Image (if exists)
        if (project.images)
        {
            const imgEntry = document.createElement('div');
            imgEntry.classList.add('img-entry');

            const imgLabel = document.createElement('p');
            imgLabel.classList.add('img-label');
            imgLabel.textContent = `[${project.images}]`;
            imgEntry.appendChild(imgLabel);
            const link = document.createElement('a');
            link.href = project.source;
            link.target = "_blank";

            const img = document.createElement('img');
            img.src = `./resources/images/${project.images}/main.png`;

            link.appendChild(img);
            imgEntry.appendChild(link);
            section.appendChild(imgEntry);
        }
        else
        {
            // Source link
            const source = document.createElement('a');
            source.href = project.source;
            source.target = "_blank";
            source.textContent = ">> launch.exe";
            section.appendChild(source);
        }

        container.appendChild(section);
    });
}

loadProjects();
loadArtProjects();

document.querySelectorAll('.fileDownload').forEach(btn => {
    btn.addEventListener('click', e => {
        btn.textContent = "extracting...";
        
        setTimeout(() => {
            btn.textContent = "complete";
        }, 1200);
    });
});