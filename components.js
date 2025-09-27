document.addEventListener("DOMContentLoaded", () => {
    const pageProfile = document.querySelector(".profile-page");
    const pageSighup = document.querySelector(".sighup-page");
    const pageSighin = document.querySelector(".sighin-page");
    const giftCardPage = document.querySelector(".gift-card-page");
    const brandsPage = document.querySelector(".brands-page");
    if (pageProfile) {
        switcherLogic();
        dropdownLogic();
        profilePageButtonLogic();
        // Запускаем при загрузке и при ресайзе
        window.addEventListener("load", updateVisiblePhotosLogic);
        window.addEventListener("resize", updateVisiblePhotosLogic);
    }
    if (pageSighup && !pageSighin) {
        sighupPageButtonLogic();
        sighupPAgeInputSmsLogic();
    }
    if (pageSighin) {
        sighinPageEyePasswordLogic();
    }
    if (giftCardPage) {
        inputCardLogic();
        selectLogic();
    }
    if (brandsPage) {
        sliderLogic();
    }
});
function switcherLogic() {
    const attrTabKey = "tab-key";
    const attrTabContent = "tab-content";
    const attrTabKeyActive = "active-tab__key";
    const attrTabContentActive = "active-tab__content";

    const switcherContentBlocksNode =
        document.querySelectorAll(".switcher-content");
    const switchersBlocksNode = document.querySelectorAll(".switcher");
    switchersBlocksNode.forEach((switcherBlockNode) => {
        const switcherItemsNode =
            switcherBlockNode.querySelectorAll(".switcher-item");
        let prevIndexActiveTabKey = 0;
        switcherItemsNode.forEach((switcherItemNode, index) => {
            switcherItemNode.addEventListener("click", () => {
                switcherItemsNode[prevIndexActiveTabKey].removeAttribute(
                    attrTabKeyActive
                );
                switcherItemNode.setAttribute(attrTabKeyActive, "");
                prevIndexActiveTabKey = index;
                setActiveSwitcherContent(
                    switcherItemNode.getAttribute(attrTabKey)
                );
            });
        });
    });
    function setActiveSwitcherContent(activeTab) {
        switcherContentBlocksNode.forEach((contentNode) => {
            contentNode.removeAttribute(attrTabContentActive);

            if (contentNode.getAttribute(attrTabContent) === activeTab) {
                contentNode.setAttribute(attrTabContentActive, "");
            }
        });
    }
}
function dropdownLogic() {
    const attrDropdownActive = "dropdown-active";
    const dropdownBlockNodes = document.querySelectorAll(".dropdown");
    dropdownBlockNodes.forEach((dropdownNode) => {
        const buttonOpenNode = dropdownNode.querySelector(".dropdown__open");

        buttonOpenNode.addEventListener("click", () => {
            const stateDropdown = dropdownNode.getAttribute(attrDropdownActive);

            if (stateDropdown === "") {
                dropdownNode.removeAttribute(attrDropdownActive);
            } else {
                dropdownNode.setAttribute(attrDropdownActive, "");
            }
        });
    });
}
function profilePageButtonLogic() {
    const blockProfileMain = document.querySelector(".profile__main");
    const blockForm = document.querySelector(".profile-page_form");
    const buttonChangeInfo = document.querySelector(".button__change-info");

    const buttonCancelForm = document.querySelector(".button-cancel__form");
    const buttonSaveForm = document.querySelector(".button-save__form");

    buttonChangeInfo.addEventListener("click", () => {
        blockForm.setAttribute("active", "");
        blockProfileMain.removeAttribute("active");
    });
    buttonCancelForm.addEventListener("click", () => {
        blockProfileMain.setAttribute("active", "");
        blockForm.removeAttribute("active");
    });
    buttonSaveForm.addEventListener("click", () => {
        blockProfileMain.setAttribute("active", "");
        blockForm.removeAttribute("active");
    });
}
function sighupPageButtonLogic() {
    const buttonContinue = document.querySelector(".sighup-button__continue");
    const buttonConfirm = document.querySelector(".sighup-button__confirm");
    const sighupLogicBlocks = document.querySelectorAll(".sighup__logic");
    const inputSmsFirst = document.querySelector("#sms-code input");
    const stepFirstBlock = sighupLogicBlocks[0];
    const stepSecondBlock = sighupLogicBlocks[1];
    buttonContinue.addEventListener("click", () => {
        stepFirstBlock.removeAttribute("active");
        stepSecondBlock.setAttribute("active", "");
        inputSmsFirst.focus();
    });
    buttonConfirm.addEventListener("click", () => {
        stepSecondBlock.removeAttribute("active");
        stepFirstBlock.setAttribute("active", "");
    });
}
function sighupPAgeInputSmsLogic() {
    const inputs = document.querySelectorAll("#sms-code input");
    const buttonSubmit = document.querySelector(".sighup-button__confirm");
    inputs.forEach((input, index) => {
        input.addEventListener("input", () => {
            input.value = input.value.replace(/[^0-9]/g, "").slice(0, 1);
            if (input.value && index < inputs.length) {
                if (index < inputs.length - 1) {
                    inputs[index + 1].focus();
                } else {
                    buttonSubmit.focus();
                }
            }
        });

        input.addEventListener("keydown", (e) => {
            if (e.key === "Backspace" && !input.value && index > 0) {
                inputs[index - 1].focus();
            }
        });
    });
}

function sighinPageEyePasswordLogic() {
    const inputPassword = document.querySelector(
        ".sighup-block__password input"
    );
    const buttonSeePassword = document.querySelector(
        ".sighup-block__password .button-see-password"
    );
    buttonSeePassword.addEventListener("click", () => {
        const isPassword = inputPassword.type === "password";
        inputPassword.type = isPassword ? "text" : "password";
    });
}
function inputCardLogic() {
    // Маска для номера карты
    const cardInput = document.getElementById("card-number");
    cardInput.addEventListener("input", () => {
        let value = cardInput.value.replace(/\D/g, "");
        value = value.slice(0, 16);
        cardInput.value = value.replace(/(.{4})/g, "$1 ").trim();
    });

    // Маска для срока действия
    const expiryInput = document.getElementById("card-expiry");
    expiryInput.addEventListener("input", () => {
        let value = expiryInput.value.replace(/\D/g, "");
        if (value.length >= 3) {
            value = value.slice(0, 4);
            value = value.replace(/(\d{2})(\d{1,2})/, "$1/$2");
        }
        expiryInput.value = value;
    });

    // Ограничение CVC только цифрами
    const cvcInput = document.getElementById("card-cvc");
    cvcInput.addEventListener("input", () => {
        cvcInput.value = cvcInput.value.replace(/\D/g, "").slice(0, 4);
    });
}
function selectLogic() {
    const selectBlocks = document.querySelectorAll(".select-custom");

    selectBlocks.forEach((select) => {
        const selected = document.querySelector(".select-selected");
        const selectedSpan = selected.querySelector("span");
        const optionsList = document.querySelector(".select-items");
        selected.addEventListener("click", () => {
            select.classList.toggle("select-active");
        });

        optionsList.addEventListener("click", (e) => {
            if (e.target.matches("div[data-value]")) {
                selectedSpan.textContent = e.target.textContent;
                selected.setAttribute(
                    "data-value",
                    e.target.getAttribute("data-value")
                );
                select.classList.remove("select-active");
            }
        });

        document.addEventListener("click", (e) => {
            if (!select.contains(e.target)) {
                select.classList.remove("select-active");
            }
        });
    });
}
function sliderLogic() {
    const swiperStaff = new Swiper(".swiper-brands", {
        direction: "horizontal",
        loop: true,
        slidesPerView: 4,
        spaceBetween: 32,
        speed: 500,
        breakpoints: {
            560: {
                slidesPerView: 1,
                // spaceBetween: 40,
            },
            1000: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            1440: {
                slidesPerView: 3,
                spaceBetween: 22,
            },
        },
        navigation: {
            nextEl: ".swiper-brands-button-next",
            prevEl: ".swiper-brands-button-prev",
        },
    });
}
//
function updateVisiblePhotosLogic() {
    const rows = document.querySelectorAll(".photo-row");

    rows.forEach((row) => {
        const maxVisible = parseInt(row.getAttribute("data-max-visible")) || 8;
        // Ищем только изображения с классом order-item__history-image
        const photos = row.querySelectorAll("img.order-item__history-image");
        const countElement = row.querySelector(".remaining-count");

        // Если элемент для отображения количества не найден, ищем альтернативные варианты
        const remainingCountElement =
            countElement || row.querySelector(".order-item__history-count");

        if (photos.length <= maxVisible) {
            if (remainingCountElement)
                remainingCountElement.style.display = "none";
            // Показываем все фото, если они вмещаются
            photos.forEach((photo) => {
                photo.style.display = "block";
            });
            return;
        }

        // Скрываем лишние фото и показываем только нужное количество
        photos.forEach((photo, index) => {
            photo.style.display = index < maxVisible ? "block" : "none";
        });

        if (remainingCountElement) {
            remainingCountElement.textContent = `+${
                photos.length - maxVisible
            }`;
            remainingCountElement.style.display = "flex"; // или "block" в зависимости от вашего CSS
        }
    });
}
