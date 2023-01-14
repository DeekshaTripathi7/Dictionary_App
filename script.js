const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

const result = document.querySelector("#result");
const sound = document.querySelector("#sound");
const btn = document.querySelector("#search-btn");

btn.addEventListener("click", () => {
  let inputWord = document.querySelector("#input-word").value;
  fetch(`${url}${inputWord}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      result.innerHTML = `
            <div class="word" id="word">
            <h3>${inputWord}</h3>
            <button onClick="playSound()">
            <i class="fa fa-light fa-volume-high"></i>

            </button>
            </div>
            <div class="details">
                <p>${data[0].meanings[0].partOfSpeech}</p>
                <p>${data[0].phonetic}</p>
            </div>
            <p class="word-meaning">
                ${data[0].meanings[0].definitions[0].definition}
            </p>
            <p class="word-example">
                ${data[0].meanings[1].definitions[0].example || ""}
            </p>`;
        sound.setAttribute("src",`${data[0].phonetics[1].audio}`);
    })
    .catch(() => {
        result.innerHTML = `<h3 class="error">Couldn't find the word</h3>`
    })
});
function playSound(){
    sound.play();
}