document.addEventListener("DOMContentLoaded", () => {
    // Seleciona os modais padrão
    const popupTriggers = document.querySelectorAll(".js-popup");
    const modals = document.querySelectorAll(".modal");
    const closeButtons = document.querySelectorAll(".close-btn");

    // Seleciona os elementos do botão proibido e jumpscare
    const btnNaoAperteHeader = document.getElementById("btn-contato");
    const btnNaoAperteHero = document.getElementById("btn-secundario-perigo");
    const jumpscareOverlay = document.getElementById("jumpscare-overlay");
    const countdownElement = document.getElementById("jumpscare-countdown");
    const jumpscareContent = document.getElementById("jumpscare-content");
    const btnFecharSusto = document.getElementById("btn-fechar-susto");

    // Seleciona as caixas dos cantos esquerdo que escondem fotos
    const cantosInterativos = document.querySelectorAll(".js-revelar-canto");

    let cliqueCount = 0;

    // Gerenciador dos Pop-ups normais
    popupTriggers.forEach(trigger => {
        trigger.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = trigger.getAttribute("data-target");
            const modal = document.getElementById(targetId);
            if (modal) {
                modal.style.display = "flex";
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

    // SISTEMA DE DOIS CLIQUES + JUMPSCARE
    function dispararSistemaSusto() {
        cliqueCount++;

        if (cliqueCount === 1) {
            alert("⚠️ Você tem certeza disso? Clique novamente por sua conta e risco...");
        } else if (cliqueCount === 2) {
            cliqueCount = 0; 
            
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

    // CORREÇÃO NO JS: Garante a aplicação correta da classe para remover o desfoque
    cantosInterativos.forEach(canto => {
        canto.addEventListener("click", () => {
            canto.classList.add("revelado");
        });
    });
});
