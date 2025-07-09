document.addEventListener("DOMContentLoaded", () => {
    const pageProfile = document.querySelector(".profile-page");
    if (pageProfile) {
        switcherLogic();
        dropdownLogic();
        profilePageButtonLogic();
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
