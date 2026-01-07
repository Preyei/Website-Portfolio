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
            if (panelId === "about-me-panel") {
                panel.style.left = "40vw";
                panel.style.top = "10vh";
            }
            else if (panelId === "experiences-panel") {
                panel.style.left = "10vw";
                panel.style.top = "18vh";
            }
            else if (panelId === "projects-panel") {
                panel.style.left = "10vw";
                panel.style.top = "10vh";
            }
            else if (panelId === "skills-panel") {
                panel.style.left = "50vw";
                panel.style.top = "10vh";
            }
            else {
                panel.style.left = "70vw";
                panel.style.top = "60vh";
            }
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
            let newLeft = e.clientX - offsetX;
            let newTop = e.clientY - offsetY;

            const maxLeft = window.innerWidth - panel.offsetWidth;
            const maxTop = window.innerHeight - panel.offsetHeight;

            newLeft = Math.max(0, Math.min(newLeft, maxLeft));
            newTop = Math.max(0, Math.min(newTop, maxTop));

            panel.style.left = newLeft + "px";
            panel.style.top = newTop + "px";
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