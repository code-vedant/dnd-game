import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";
import { HTML5Backend } from "react-dnd-html5-backend";
import { isMobile } from "react-device-detect";
import DraggableItem from "./DraggableItem";
import DraggableContainer from "./DraggableContainer";
import DropArea from "./DropArea";
import itemsData from "../data/itemsData.json";

const getRandomItems = (num) => {
  const shuffled = [...itemsData].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
};

const GameBoard = () => {
  const [placedItems, setPlacedItems] = useState({
    solid: [],
    liquid: [],
    gas: [],
  });
  const [gameOver, setGameOver] = useState(false);
  const XP = 15;

  const [remainingItems, setRemainingItems] = useState(itemsData);

  useEffect(() => {
    setRemainingItems(getRandomItems(18));
  }, []);

  const handleDrop = (item, targetType) => {
    setPlacedItems((prev) => {
      const updatedPlacedItems = {
        solid: prev.solid.filter((i) => i.id !== item.id),
        liquid: prev.liquid.filter((i) => i.id !== item.id),
        gas: prev.gas.filter((i) => i.id !== item.id),
      };

      updatedPlacedItems[targetType] = [
        ...updatedPlacedItems[targetType],
        item,
      ];

      return updatedPlacedItems;
    });

    setRemainingItems((prev) => {
      const updatedRemaining = prev.filter((i) => i.id !== item.id);

      if (updatedRemaining.length === 0){
        setGameOver(true);
      }

      return updatedRemaining;
    });
  };
  useEffect(()=>{
    if (gameOver === true) {
    alert("Game Over "  + XP + " gained")
    }
  },[gameOver])

  return (
    <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
      <div className="flex flex-col items-center gap-5 p-10">
        <h1 className="text-2xl font-bold">Drag & Drop Game</h1>

        {/* Main container with draggable items */}
        <div className="flex flex-wrap h-40 px-2 py-1 border-2 rounded-xl border-black w-[90vw] bg-gray-100">
          <h2 className="text-center w-full font-bold mb-2">Items</h2>
          <div className="w-full h-full flex flex-wrap items-start justify-center gap-2">
          {remainingItems.map((item) => (
            <DraggableItem key={item.id} item={item} />
          ))}
          </div>
        </div>

        {/* Drop areas */}
        <DropArea>
          <DraggableContainer
            type="solid"
            onDrop={handleDrop}
            items={placedItems.solid}
          />
          <DraggableContainer
            type="liquid"
            onDrop={handleDrop}
            items={placedItems.liquid}
          />
          <DraggableContainer
            type="gas"
            onDrop={handleDrop}
            items={placedItems.gas}
          />
        </DropArea>
      </div>
    </DndProvider>
  );
};

export default GameBoard;
