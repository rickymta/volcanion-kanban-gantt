import React from 'react'
import { Task } from '../types/kanban'
import './TaskComponent.scss'

interface TaskComponentProps {
  task: Task;
  columnId: string;
  onEditTask: (taskId: string, newTitle: string) => void;
  onDeleteTask: (taskId: string) => void;
}

const TaskComponent: React.FC<TaskComponentProps> = ({ task, columnId }) => {
  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData('taskId', task.id)
    event.dataTransfer.setData('sourceColumnId', columnId)
  }

  return (
    <div
      className="task-wrapper"
      draggable
      onDragStart={handleDragStart}
    >
      <div className="task-title">
        <h4>{task.title}</h4>
      </div>

      <div className='task-body'>
        <div className="task-plan late">
          <span>&#9202;</span>
          <span>{task.planEndDate}</span>
        </div>

        <div className='task-notification'>
          <span data-badge='10'>&#8617;</span>
          <span data-badge='10'>&#128276;</span>
        </div>
      </div>

      <div className="task-footer">
        <div className='task-code'>
          <span>{task.code}</span>
        </div>
        <div className="task-assignee">{task.assignee}</div>
      </div>
    </div>
  )
}

export default TaskComponent
