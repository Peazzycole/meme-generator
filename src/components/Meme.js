import React from "react";

export default function Meme() {
  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    randomImage: "https://i.imgflip.com/1ur9b0.jpg",
  });

  const [text, setText] = React.useState({
    topText: "",
    bottomText: "",
  });

  function changed(e) {
    const { name, value } = e.target;
    setText((prevText) => {
      return {
        ...prevText,
        [name]: value,
      };
    });
  }

  React.useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setAllMemes(data.data.memes));
  }, []);

  const [allMemes, setAllMemes] = React.useState([]);

  function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randomNumber].url;
    setMeme((prevMeme) => {
      return {
        ...prevMeme,
        randomImage: url,
      };
    });
  }

  return (
    <main>
      <div className="form">
        <input
          onChange={changed}
          type="text"
          placeholder="Top text"
          className="form--input"
          name="topText"
          // value={text.topText}
        />
        <input
          onChange={changed}
          type="text"
          placeholder="Bottom text"
          className="form--input"
          name="bottomText"
          value={text.bottomText}
        />
        <button onClick={getMemeImage} className="form--button">
          Get a new meme image 🖼
        </button>

        <img src={meme.randomImage} className="memeImage" alt="Meme" />
        <h2 className="meme--text top">{text.topText}</h2>
        <h2 className="meme--text bottom">{text.bottomText}</h2>
      </div>
    </main>
  );
}
