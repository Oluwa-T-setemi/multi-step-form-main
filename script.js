// Core DOM elements
const yourInfo = document.querySelector("#your-info");
const selectPlan = document.querySelector("#select-plan");
const addons = document.querySelector("#add-ons");
const summary = document.querySelector("#summary");
const thankYou = document.querySelector("#thank-you");

// Navigation buttons
const btnOne = document.querySelector("#btn-one");
const backOne = document.querySelector("#back-one");
const btnTwo = document.querySelector("#btn-two");
const backTwo = document.querySelector("#back-two");
const btnThree = document.querySelector("#btn-three");
const backThree = document.querySelector("#back-three");
const confirmbtn = document.querySelector("#confirm-btn");

// Steps
const stepOne = document.querySelector("#step-one");
const stepTwo = document.querySelector("#step-two");
const stepThree = document.querySelector("#step-three");
const stepFour = document.querySelector("#step-four");

// Input and warnings
const inputPhoneNumber = document.querySelector("#phone-number");
const warningMessage = document.querySelector("#warning-message");

// Plan selection
const arcadePlan = document.querySelector("#arcade-plan");
const advancedPlan = document.querySelector("#advanced-plan");
const proPlan = document.querySelector("#pro-plan");
const billingToggle = document.querySelector("#toggle");
const timeFree = document.querySelectorAll(".time-free");
const monthlyAmount = document.querySelectorAll(".monthly-amount");
const yearlyAmount = document.querySelectorAll(".yearly-amount");
const monthlyText = document.querySelector("#monthly-text");
const yearlyText = document.querySelector("#yearly-text");

// Addons and summary details
const onlineService = document.querySelector("#online-service");
const largerStorage = document.querySelector("#larger-storage");
const customProfile = document.querySelector("#custom-profile");
const onlineServiceCheckbox = document.querySelector("#online-service-checkbox");
const largerStorageCheckbox = document.querySelector("#larger-storage-checkbox");
const customProfileCheckbox = document.querySelector("#custom-profile-checkbox");

const changePlan = document.querySelector("#change");
const spanText = document.querySelector("#span-text");
const spanPlan = document.querySelector("#span-plan");
const planPrice = document.querySelector("#plan-price");

const onlineServiceText = document.querySelector("#online-service-text");
const onlineServicePrice = document.querySelector(".online-service-price");
const largerStorageText = document.querySelector("#larger-storage-text");
const largerStoragePrice = document.querySelector(".larger-storage-price");
const customProfileText = document.querySelector("#custom-profile-text");
const customProfilePrice = document.querySelector(".custom-profile-price");
const onlineServiceAmount = document.querySelector(".online-service-amount");
const largerStorageAmount = document.querySelector(".larger-storage-amount");
const customProfileAmount = document.querySelector(".custom-profile-amount");
const totalText = document.querySelector("#total-text");
const totalAmount = document.querySelector(".total-amount");

let selectedPlanIndex = null;

function showSection(show, hide1, hide2, hide3) {
    show.classList.remove("hidden");
    show.classList.add("block");
    [hide1, hide2, hide3].forEach(item => {
        item.classList.remove("block");
        item.classList.add("hidden");
    });
}

function activateStep(active, ...others) {
    active.classList.add("bg-blue-300", "text-blue-950");
    active.classList.remove("bg-transparent", "text-white");
    others.forEach(step => {
        step.classList.remove("bg-blue-300", "text-blue-950");
        step.classList.add("bg-transparent", "text-white");
    });
}

function enableBtnTwo() {
    btnTwo.removeAttribute("disabled");
    btnTwo.classList.remove("bg-gray-300", "cursor-not-allowed", "text-gray-500");
    btnTwo.classList.add("bg-blue-700", "hover:bg-blue-800", "text-white", "cursor-pointer");
}

function disableBtnTwo() {
    btnTwo.setAttribute("disabled", true);
    btnTwo.classList.add("bg-gray-300", "cursor-not-allowed", "text-gray-500");
    btnTwo.classList.remove("bg-blue-700", "hover:bg-blue-800", "text-white", "cursor-pointer");
}

disableBtnTwo();

function selectPlanFn(planElement, planName, priceIndex) {
    [arcadePlan, advancedPlan, proPlan].forEach(plan => {
        plan.classList.remove("bg-purple-50", "text-blue-950", "border-purple-700");
        plan.classList.add("bg-transparent", "text-white", "border-gray-300");
    });

    planElement.classList.add("bg-purple-50", "text-blue-950", "border-purple-700");
    planElement.classList.remove("bg-transparent", "text-white", "border-gray-300");

    spanPlan.innerText = planName;
    selectedPlanIndex = priceIndex;

    planPrice.innerText = billingToggle.checked
        ? yearlyAmount[priceIndex].innerText
        : monthlyAmount[priceIndex].innerText;

    enableBtnTwo();
    calculateTotal();
}

arcadePlan.addEventListener("click", () => selectPlanFn(arcadePlan, "Arcade", 0));
advancedPlan.addEventListener("click", () => selectPlanFn(advancedPlan, "Advanced", 1));
proPlan.addEventListener("click", () => selectPlanFn(proPlan, "Pro", 2));

btnOne.setAttribute("disabled", true);
inputPhoneNumber.addEventListener("input", function(event) {
    let inputValue = event.target.value.replace(/\D/g, "");
    inputPhoneNumber.value = "+" + inputValue;

    if (inputValue === "") {
        inputPhoneNumber.style.border = "1px solid red";
        warningMessage.style.display = "block";
        btnOne.setAttribute("disabled", true);
    } else {
        inputPhoneNumber.style.border = "1px solid gray";
        warningMessage.style.display = "none";
        btnOne.removeAttribute("disabled");
    }
});

btnOne.addEventListener("click", function(event) {
    let inputValue = inputPhoneNumber.value.replace(/\D/g, "");
    if (inputValue === "") {
        event.preventDefault();
        inputPhoneNumber.style.border = "1px solid red";
        warningMessage.style.display = "block";
        btnOne.setAttribute("disabled", true);
        return;
    }
    showSection(selectPlan, yourInfo, addons, summary);
    activateStep(stepTwo, stepOne, stepThree, stepFour);
});

backOne.addEventListener("click", () => {
    showSection(yourInfo, selectPlan, addons, summary);
    activateStep(stepOne, stepTwo, stepThree, stepFour);
});

btnTwo.addEventListener("click", () => {
    if (selectedPlanIndex === null) return;
    showSection(addons, yourInfo, selectPlan, summary);
    activateStep(stepThree, stepOne, stepTwo, stepFour);
});

backTwo.addEventListener("click", () => {
    showSection(selectPlan, yourInfo, addons, summary);
    activateStep(stepTwo, stepOne, stepThree, stepFour);
});

btnThree.addEventListener("click", () => {
    showSection(summary, yourInfo, selectPlan, addons);
    activateStep(stepFour, stepOne, stepTwo, stepThree);
});

backThree.addEventListener("click", () => {
    showSection(addons, yourInfo, selectPlan, summary);
    activateStep(stepThree, stepOne, stepTwo, stepFour);
});

confirmbtn.addEventListener("click", () => {
    summary.classList.remove("block");
    summary.classList.add("hidden");
    thankYou.classList.remove("hidden");
    thankYou.classList.add("block");
});

billingToggle.addEventListener("change", function () {
    timeFree.forEach(element => {
        element.classList.toggle("hidden", !billingToggle.checked);
        element.classList.toggle("block", billingToggle.checked);
    });

    yearlyAmount.forEach(el => {
        el.classList.toggle("block", billingToggle.checked);
        el.classList.toggle("hidden", !billingToggle.checked);
    });

    monthlyAmount.forEach(el => {
        el.classList.toggle("hidden", billingToggle.checked);
        el.classList.toggle("block", !billingToggle.checked);
    });

    monthlyText.classList.toggle("text-gray-400", billingToggle.checked);
    yearlyText.classList.toggle("text-gray-400", !billingToggle.checked);
    monthlyText.classList.toggle("text-blue-950", !billingToggle.checked);
    yearlyText.classList.toggle("text-blue-950", billingToggle.checked);
    totalText.innerText = billingToggle.checked ? "per year" : "per month";
    spanText.innerText = billingToggle.checked ? "Yearly" : "Monthly";

    if (selectedPlanIndex !== null) {
        planPrice.innerText = billingToggle.checked
            ? yearlyAmount[selectedPlanIndex].innerText
            : monthlyAmount[selectedPlanIndex].innerText;
    }

    onlineServiceAmount.innerText = billingToggle.checked ? "+$10/yr" : "+$1/mo";
    largerStorageAmount.innerText = billingToggle.checked ? "+$20/yr" : "+$2/mo";
    customProfileAmount.innerText = billingToggle.checked ? "+$20/yr" : "+$2/mo";

    calculateTotal();
});

function toggleAddon(addonElement, isChecked) {
    addonElement.classList.toggle("bg-purple-50", isChecked);
    addonElement.classList.toggle("text-blue-950", isChecked);
    addonElement.classList.toggle("border-purple-700", isChecked);
    addonElement.classList.toggle("bg-transparent", !isChecked);
    addonElement.classList.toggle("text-white", !isChecked);
    addonElement.classList.toggle("border-gray-300", !isChecked);
}

onlineServiceCheckbox.addEventListener("change", () => {
    toggleAddon(onlineService, onlineServiceCheckbox.checked);
    onlineServicePrice.innerText = onlineServiceAmount.innerText;
    onlineServiceText.classList.toggle("block", onlineServiceCheckbox.checked);
    onlineServiceText.classList.toggle("hidden", !onlineServiceCheckbox.checked);
    onlineServicePrice.classList.toggle("block", onlineServiceCheckbox.checked);
    onlineServicePrice.classList.toggle("hidden", !onlineServiceCheckbox.checked);
    calculateTotal();
});

largerStorageCheckbox.addEventListener("change", () => {
    toggleAddon(largerStorage, largerStorageCheckbox.checked);
    largerStoragePrice.innerText = largerStorageAmount.innerText;
    largerStorageText.classList.toggle("block", largerStorageCheckbox.checked);
    largerStorageText.classList.toggle("hidden", !largerStorageCheckbox.checked);
    largerStoragePrice.classList.toggle("block", largerStorageCheckbox.checked);
    largerStoragePrice.classList.toggle("hidden", !largerStorageCheckbox.checked);
    calculateTotal();
});

customProfileCheckbox.addEventListener("change", () => {
    toggleAddon(customProfile, customProfileCheckbox.checked);
    customProfilePrice.innerText = customProfileAmount.innerText;
    customProfileText.classList.toggle("block", customProfileCheckbox.checked);
    customProfileText.classList.toggle("hidden", !customProfileCheckbox.checked);
    customProfilePrice.classList.toggle("block", customProfileCheckbox.checked);
    customProfilePrice.classList.toggle("hidden", !customProfileCheckbox.checked);
    calculateTotal();
});

changePlan.addEventListener("click", () => {
    showSection(selectPlan, yourInfo, addons, summary);
    activateStep(stepTwo, stepOne, stepThree, stepFour);
});

function calculateTotal() {
    let planCostText = planPrice.innerText.replace(/[^0-9]/g, "");
    let total = parseInt(planCostText) || 0;

    if (onlineServiceCheckbox.checked) {
        total += parseInt(onlineServiceAmount.innerText.replace(/[^0-9]/g, ""));
    }
    if (largerStorageCheckbox.checked) {
        total += parseInt(largerStorageAmount.innerText.replace(/[^0-9]/g, ""));
    }
    if (customProfileCheckbox.checked) {
        total += parseInt(customProfileAmount.innerText.replace(/[^0-9]/g, ""));
    }

    totalAmount.innerText = `$${total}${billingToggle.checked ? "/yr" : "/mo"}`;
}

calculateTotal();
