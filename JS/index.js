const faqBtn = document.getElementById("faq-btn");
const learnBtn = document.getElementById("learn-btn");

faqBtn.addEventListener("click", () => {
  document.getElementById("faq-section").scrollIntoView({ behavior: "smooth" });
});

learnBtn.addEventListener("click", () => {
  document
    .getElementById("vocabularies-section")
    .scrollIntoView({ behavior: "smooth" });
});

function loadCatagory() {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => displayCatagory(data.data));
}

const removeActiveClass = () => {
  const activeBtn = document.getElementsByClassName("active");
  for (let btn of activeBtn) {
    btn.classList.remove("active");
  }
};

const displayCatagory = (categories) => {
  const btnContainer = document.getElementById("btn-container");
  for (let cat of categories) {
    // console.log(cat);
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
    <button onClick="loadCatagoryCard(${cat.level_no})" id="btn-${cat.level_no}"
      class="py-[10px] px-4 border-2 border-[#422AD5]  rounded btn-outline hover:bg-[#422AD5] hover:border-[#422AD5] hover:text-white font-semibold poppins-font duration-300"><i
      class="fa-brands fa-leanpub"></i> Lesson -${cat.level_no}</button>
    <button
    `;
    btnContainer.appendChild(btnDiv);
  }
};

const loadCatagoryCard = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActiveClass();
      const clickBtn = document.getElementById(`btn-${id}`);
      clickBtn.classList.add("active");
      displayCard(data.data);
    });
};

const displayCard = (cards) => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";

  if (cards.length == 0) {
    cardContainer.innerHTML = `
    <div class="w-[1720px] bg-[#F8F8F8] py-[74px] mx-auto rounded-3xl">
               <div class="flex justify-center mb-4">
                <img src="assets/alert-error.png" alt="">
               </div>
               <p class="text-center mb-4">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
               <h1 class="text-center text-[34px] font-medium">নেক্সট Lesson এ যান</h1>
            </div>
    `;
    return;
  }
  cards.forEach((card) => {
    const lessonCard = document.createElement("div");
    lessonCard.innerHTML = `
     <div class=" text-center p-11 bg-white rounded-xl">
       <div class="mb-14">
          <h1 class="text-[32px] font-bold inter-font mb-6">${card.word}</h1>
          <p class="inter-font text-xl font-medium mb-6">Meaning /Pronounciation</p>
          <h1 class="siliguri-font text-[32px] font-semibold">"${card.meaning} / ${card.pronunciation}"</h1>
        </div>
        <div class="flex justify-between">
          <button onclick="loadCardDetails(${card.id})" class="bg-[#1A91FF10] p-4 rounded-lg"><i class="fa-solid fa-circle-info"></i></button>
          <button class="bg-[#1A91FF10] p-4 rounded-lg"><i class="fa-solid fa-volume-high"></i></button>
        </div>
      </div>
    `;
    cardContainer.appendChild(lessonCard);
  });
};

const loadCardDetails = (cardId) => {
  const url = `https://openapi.programming-hero.com/api/word/${cardId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayCardDetails(data.data));
};

const displayCardDetails = (card) => {
  console.log(card);
  document.getElementById("card_details").showModal();
  const detailsContainer = document.getElementById("details_container");
  detailsContainer.innerHTML = `
    <div class="w-[687px] p-6 border-2 border-[#EDF7FF] rounded-xl">
      <h1 class="poppins-font text-3xl font-semibold mb-8">${card.word} (<i
      class="fa-solid fa-microphone-lines"></i> :${card.pronunciation})</h1>
      <h2 class="poppins-font text-2xl font-semibold mb-[10px]">Meaning</h2>
      <h2 class="siliguri-font text-2xl font-semibold mb-8">${card.meaning}</h2>
      <div class="mb-8">
        <h1 class="poppins-font text-2xl font-semibold mb-2">Example</h1>
        <h1 class="poppins-font text-2xl">${card.sentence}</h1>
      </div>
      <h1 class="siliguri-font text-2xl font-medium mb-[10px]">সমার্থক শব্দ গুলো</h1>
      <div class="flex space-x-[18px]">
        <button
          class="bg-[#EDF7FF] py-3 px-3 poppins-font text-xl border border-[#D7E4EF] rounded-md">${card.synonyms[0]}</button>
        <button
          class="bg-[#EDF7FF] py-3 px-3 poppins-font text-xl border border-[#D7E4EF] rounded-md">${card.synonyms[1]}</button>
        <button
          class="bg-[#EDF7FF] py-3 px-3 poppins-font text-xl border border-[#D7E4EF] rounded-md">${card.synonyms[2]}</button>
      </div>
    </div>
  `;
};

loadCatagory();
