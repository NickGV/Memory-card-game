import "./CardStyles.css";

export const Card = ({ card, handleChoice }) => {
  const handleClick = () => {
    handleChoice(card.id);
    handleBestScore();
  };

  return (
    <div className="card" onClick={handleClick}>
      <img src={card.src} alt="" />
    </div>
  );
};
