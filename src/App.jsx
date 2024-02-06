import { useEffect, useState } from "react";
import "./App.css";
import { Card } from "./components/Card";

const cardImages = [
  { src: "/img/giannis-antetokounmpo.png" },
  { src: "/img/kareem-jabbar.png" },
  { src: "/img/kevin-durant.png" },
  { src: "/img/larry-bird.png" },
  { src: "/img/lebron-james.png" },
  { src: "/img/magic-johnson.png" },
  { src: "/img/michael-jordan.png" },
  { src: "/img/ray-allen.png" },
  { src: "/img/shaquille-oneal.png" },
  { src: "/img/stephen-curry.png" },
  { src: "/img/vince-carter.png" },
  { src: "/img/wilt-chamberlain.png" },
];
function App() {
  const [cards, setCards] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [selectedIds, setSelectedIds] = useState([]);
  const [prevCard, setPrevCard] = useState(null);

  useEffect(() => {
    initializeCards();
  }, []);

  const initializeCards = () => {
    const initializedCards = cardImages.map((card, index) => ({
      ...card,
      id: index,
      clicked: false,
    }));
    setCards(shuffleCards(initializedCards));
    setSelectedIds([]);
    setScore(0);
    setPrevCard(null);
  };

  const shuffleCards = (cardsArray) => {
    return [...cardsArray].sort(() => Math.random() - 0.5);
  };

  const handleChoice = (id) => {
    if (selectedIds.includes(id)) {
      handleBestScore();
      initializeCards();
    } else {
      setSelectedIds([...selectedIds, id]);
      const updatedCards = cards.map((card) =>
        card.id === id ? { ...card, clicked: true } : card
      );
      setCards(shuffleCards(updatedCards));
      checkMatch(id);
      setScore(score + 1);
    }
  };

  const handleBestScore = () => {
    if (bestScore < score) {
      setBestScore(score);
    }
  };

  const checkMatch = (id) => {
    if (prevCard !== null) {
      const prevCardIndex = cards.findIndex((card) => card.id === prevCard);
      const currentCardIndex = cards.findIndex((card) => card.id === id);
      if (cards[prevCardIndex].src === cards[currentCardIndex].src) {
        setScore(score + 1);
      }
      setPrevCard(null);
    } else {
      setPrevCard(id);
    }
  };

  return (
    <>
      <div className="container">
        <h1>basketball players memory card game</h1>
        <h2>
          Get points by clicking on an image but don't click on any more than
          once!
        </h2>
        <div className="score">score: {score}</div>
        <div className="score">Best score: {bestScore}</div>
        <div className="game-board">
          {Object.values(cards).map((card) => (
            <Card key={card.id} card={card} handleChoice={handleChoice} />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
