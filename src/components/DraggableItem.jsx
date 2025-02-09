import { useDrag } from "react-dnd";

const DraggableItem = ({ item }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "ITEM",
    item,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`p-2 w-fit h-fit bg-blue-500 text-white rounded cursor-move touch-none ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      {item.name}
    </div>
  );
};

export default DraggableItem;