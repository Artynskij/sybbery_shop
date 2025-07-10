document.addEventListener("DOMContentLoaded", () => {
    const pageProfile = document.querySelector(".profile-page");
    const pageSighup = document.querySelector(".sighup-page");
    const pageSighin = document.querySelector(".sighin-page");
    if (pageProfile) {
        switcherLogic();
        dropdownLogic();
        profilePageButtonLogic();
    }
    if (pageSighup && !pageSighin) {
        sighupPageButtonLogic();
        sighupPAgeInputSmsLogic();
    }
    if (pageSighin) {
        sighinPageEyePasswordLogic();
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
