/*=============== BATTERY ===============*/

const initBattery = () => {
  const batteryLiquid = document.querySelector(".battery__liquid"),
    batteryStatus = document.querySelector(".battery__status"),
    batteryPercentage = document.querySelector(".battery__percentage");

  navigator.getBattery().then((batt) => {
    updateBattery = () => {
      // Update the number level of the battery
      //   console.log(batt);
      let level = Math.floor(batt.level * 100);

      batteryPercentage.innerHTML = level + "%";

      //   Update the background level of the battery battery
      batteryLiquid.style.height = `${parseInt(batt.level * 100)}%`;

      //   Valide full battery, low battery and if it is charging or not
      if (level === 100) {
        // if the battery is full
        batteryStatus.innerHTML = `Full Battery <i class="ri-battery-2-fill green-color"></i> `;
        batteryLiquid.style.height = "103%"; // for  hide the elipse
      } else if (level <= 20 && !batt.charging) {
        batteryStatus.innerHTML = `Low Battery <i class="ri-plug-2-line animated-red"></i>`;
      } else if (batt.charging) {
        batteryStatus.innerHTML = `Charging... <i class="ri-battery-2-charge-line animated-green"></i>`;
      } else {
        batteryStatus.innerHTML = "";
      }

      //   Change the color of the battery and remove the other colors

      if (level <= 20) {
        batteryLiquid.classList.add("gradient-color-green");
        batteryLiquid.classList.remove(
          "gradient-color-orange",
          "gradient-color-yellow",
          "gradient-color-red"
        );
      } else if (level <= 40) {
        batteryLiquid.classList.add("gradient-color-orange");
        batteryLiquid.classList.remove(
          "gradient-color-red",
          "gradient-color-yellow",
          "gradient-color-green"
        );
      } else if (level <= 80) {
        batteryLiquid.classList.add("gradient-color-yellow");
        batteryLiquid.classList.remove(
          "gradient-color-orange",
          "gradient-color-red",
          "gradient-color-green"
        );
      } else {
        batteryLiquid.classList.add("gradient-color-green");
        batteryLiquid.classList.remove(
          "gradient-color-orange",
          "gradient-color-yellow",
          "gradient-color-red"
        );
      }
    };
    updateBattery();

    // Battery Status event
    batt.addEventListener("chargingchange", () => {
      updateBattery();
    });
    batt.addEventListener("levelchange", () => {
      updateBattery();
    });
  });
};

initBattery();
