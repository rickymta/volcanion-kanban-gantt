import React from "react";
import { Column } from "../types/kanban";
import TaskComponent from "../task/TaskComponent.tsx";

interface ColumnComponentProps {
  column: Column;
  onDragEnd: (taskId: string, sourceColumnId: string, targetColumnId: string) => void;
  onEditTask: (taskId: string, newTitle: string) => void;
  onDeleteTask: (taskId: string, columnId: string) => void;
}

const ColumnComponent: React.FC<ColumnComponentProps> = ({
                                                           column,
                                                           onDragEnd,
                                                           onEditTask,
                                                           onDeleteTask,
                                                         }) => {
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    const taskId = event.dataTransfer.getData("taskId");
    onDragEnd(taskId, event.dataTransfer.getData("sourceColumnId"), column.id);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div
      style={{
        border: "1px solid gray",
        borderRadius: "5px",
        width: "300px",
        display: "flex",
        flexDirection: "column",
      }}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {/* Div chứa tiêu đề của cột */}
      <div
        style={{
          padding: "10px",
          backgroundColor: "#f0f0f0",
          borderRadius: "5px 5px 0 0",
          fontWeight: "bold",
          textAlign: "center",
          borderBottom: "1px solid lightgray",
        }}
      >
        {column.title}
      </div>

      {/* Div chứa danh sách task */}
      <div
      style={{padding: '0 10px 10px'}}>
        <div
          style={{
            minHeight: "400px",
            backgroundColor: "#fafafa",
            borderTop: "none",
            borderRadius: "0 0 5px 5px",
            padding: "10px 0",
            overflowY: "auto",
          }}
        >
          {column.tasks.map((task) => (
            <TaskComponent
              key={task.id}
              task={task}
              columnId={column.id}
              onEditTask={onEditTask}
              onDeleteTask={(taskId) => onDeleteTask(taskId, column.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColumnComponent;
