import { useDrop } from "react-dnd";
import DraggableItem from "./DraggableItem";

const DraggableContainer = ({ type, onDrop, items }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "ITEM",
    drop: (item) => onDrop(item, type),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`w-full h-[55vh] p-2 border-4 rounded ${
        isOver ? "bg-green-300" : ""
      }`}
    >
      <h2 className="text-center font-bold">{type.toUpperCase()}</h2>
      
      <div className="w-full h-full flex flex-wrap items-start justify-start gap-2">
      {items.map((item) => (
        <DraggableItem key={item.id} item={item} />
      ))}
      </div>
    </div>
  );
};

export default DraggableContainer;
