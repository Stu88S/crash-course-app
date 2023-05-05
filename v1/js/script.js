"use strict";

import { CATEGORIES, initialFacts } from "/js/data.js";
import { api, authorization } from "/js/api.js";

const btnShare = document.querySelector(".btn-share");
const form = document.querySelector(".fact-form");
const factsList = document.querySelector(".facts-list");

// Create DOM elements: Render fats in list
factsList.innerHTML = "";

// Load data from Supabase
loadFacts();
async function loadFacts() {
	const res = await fetch("https://fheflbplfxywccnqahvk.supabase.co/rest/v1/facts", {
		headers: {
			apikey: api,
			authorization: authorization,
		},
	});
	const data = await res.json();

	// const filteredData = data.filter(fact => fact.category ===);

	createFactList(data);
}

function createFactList(dataArray) {
	const htmlArr = dataArray.map(
		fact =>
			`<li class="fact">
      <p>
        ${fact.text}
          <a class="source" href="${fact.source}" target="_blank">(Source)</a>
      </p>
          <span class="tag" style="background-color: ${CATEGORIES.find(cat => cat.name === fact.category).color}">${fact.category}</span>
    </li>`
	);
	const html = htmlArr.join("");
	factsList.insertAdjacentHTML("afterbegin", html);
}

// Toggle form visibility
btnShare.addEventListener("click", function () {
	form.classList.toggle("hidden");

	if (form.classList.contains("hidden")) {
		btnShare.textContent = "Share a fact";
	} else {
		btnShare.textContent = "Close";
	}
});
