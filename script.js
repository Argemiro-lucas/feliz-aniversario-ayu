document.addEventListener("DOMContentLoaded", () => {
    // Modais padrão
    const popupTriggers = document.querySelectorAll(".js-popup");
    const modals = document.querySelectorAll(".modal");
    const closeButtons = document.querySelectorAll(".close-btn");

    // Botão proibido e jumpscare
    const btnNaoAperteHeader = document.getElementById("btn-contato");
    const btnNaoAperteHero = document.getElementById("btn-secundario-perigo");
    const jumpscareOverlay = document.getElementById("jumpscare-overlay");
    const countdownElement = document.getElementById("jumpscare-countdown");
    const jumpscareContent = document.getElementById("jumpscare-content");
    const btnFecharSusto = document.getElementById("btn-fechar-susto");

    // Fotos borradas
    const cantosInterativos = document.querySelectorAll(".js-revelar-canto");

    // NOVO: Controle de abrir/fechar o menu responsivo no celular
    const btnMenuMobile = document.getElementById("btn-menu-mobile");
    const btnFecharMenu = document.getElementById("btn-fechar-menu");
    const sidebarMenu = document.getElementById("sidebar-menu");

    let cliqueCount = 0;

    // Função para abrir o menu lateral no celular
    if (btnMenuMobile && sidebarMenu) {
        btnMenuMobile.addEventListener("click", () => {
            sidebarMenu.classList.add("active");
        });
    }

    // Função para fechar o menu lateral no celular
    if (btnFecharMenu && sidebarMenu) {
        btnFecharMenu.addEventListener("click", () => {
            sidebarMenu.classList.remove("active");
        });
    }

    // Gerenciador dos Pop-ups normais (adicionado fechar menu celular após clicar na aba)
    popupTriggers.forEach(trigger => {
        trigger.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = trigger.getAttribute("data-target");
            const modal = document.getElementById(targetId);
            if (modal) {
                modal.style.display = "flex";
            }
            // Fecha a barra lateral automaticamente no celular após abrir um pop-up
            if (sidebarMenu) {
                sidebarMenu.classList.remove("active");
            }
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener("click", () => {
            button.closest(".modal").style.display = "none";
        });
    });

    window.addEventListener("click", (e) => {
        modals.forEach(modal => {
            if (e.target === modal) {
                modal.style.display = "none";
            }
        });
    });

    // JUMPSCARE
    function dispararSistemaSusto() {
        cliqueCount++;
        if (cliqueCount === 1) {
            alert("⚠️ Você tem certeza disso? Clique novamente por sua conta e risco...");
        } else if (cliqueCount === 2) {
            cliqueCount = 0; 
            if (sidebarMenu) sidebarMenu.classList.remove("active"); // Esconde o menu se tiver no celular
            
            jumpscareOverlay.style.display = "flex";
            countdownElement.classList.remove("hidden");
            jumpscareContent.classList.add("hidden");

            let tempoRestante = 5;
            countdownElement.innerText = tempoRestante;

            const contagemIntervalo = setInterval(() => {
                tempoRestante--;
                if (tempoRestante > 0) {
                    countdownElement.innerText = tempoRestante;
                } else {
                    clearInterval(contagemIntervalo);
                    countdownElement.classList.add("hidden");
                    jumpscareContent.classList.remove("hidden");
                }
            }, 1000);
        }
    }

    if(btnNaoAperteHeader) btnNaoAperteHeader.addEventListener("click", dispararSistemaSusto);
    if(btnNaoAperteHero) btnNaoAperteHero.addEventListener("click", dispararSistemaSusto);

    if(btnFecharSusto) {
        btnFecharSusto.addEventListener("click", () => {
            jumpscareOverlay.style.display = "none";
        });
    }

    // Revelar fotos
    cantosInterativos.forEach(canto => {
        canto.addEventListener("click", () => {
            canto.classList.add("revelado");
        });
    });
});
