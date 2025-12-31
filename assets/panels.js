// -------------------------------
// UNIVERSAL PANEL OPEN FUNCTION
// -------------------------------
function openPanel(panelId, contentId, file) {
    fetch(file)
        .then(response => response.text())
        .then(html => {
            document.getElementById(contentId).innerHTML = html;
            const panel = document.getElementById(panelId);
            panel.style.display = "block";
            panel.style.left = "50px";   // optional reset
            panel.style.top = "50px";    // optional reset
        });
}

// -------------------------------
// UNIVERSAL DRAGGING FUNCTION
// -------------------------------
function makePanelDraggable(panelId, headerId) {
    const panel = document.getElementById(panelId);
    const header = document.getElementById(headerId);

    let offsetX = 0;
    let offsetY = 0;
    let isDragging = false;

    header.addEventListener("mousedown", (e) => {
        if (e.target.classList.contains("close-panel")) return;

        isDragging = true;
        offsetX = e.clientX - panel.offsetLeft;
        offsetY = e.clientY - panel.offsetTop;
        header.style.cursor = "grabbing";
    });

    document.addEventListener("mousemove", (e) => {
        if (isDragging) {
            panel.style.left = (e.clientX - offsetX) + "px";
            panel.style.top = (e.clientY - offsetY) + "px";
        }
    });

    document.addEventListener("mouseup", () => {
        isDragging = false;
        header.style.cursor = "grab";
    });

    // Close button
    const closeBtn = panel.querySelector(".close-panel");
    closeBtn.addEventListener("click", () => {
        panel.style.display = "none";
    });
}

// -------------------------------
// INITIALIZE ALL PANELS
// -------------------------------
makePanelDraggable("about-me-panel", "about-me-header");
makePanelDraggable("experiences-panel", "experiences-header");
makePanelDraggable("projects-panel", "projects-header");
makePanelDraggable("skills-panel", "skills-header");
makePanelDraggable("contact-panel", "contact-header");