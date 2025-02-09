import { useDrop } from "react-dnd";

const DropArea = ({ children }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "CONTAINER",
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`flex w-[90vw] items-center gap-2 p-1 rounded ${
        isOver ? "bg-yellow-300" : ""
      }`}
    >
      {children}
    </div>
  );
};

export default DropArea;