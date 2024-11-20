import React, { useEffect, useState } from 'react'
import { Column } from './types/kanban'
import ColumnComponent from './column/ColumnComponent.tsx'
import './KanbanBoard.scss'

const KanbanBoard: React.FC = () => {
  const [columns, setColumns] = useState<Column[]>(() => {
    // Lấy dữ liệu từ localStorage khi khởi động ứng dụng
    const savedData = localStorage.getItem('kanbanColumns')
    return savedData ? JSON.parse(savedData) : [
      { id: '1', title: 'To Do', tasks: [] },
      { id: '2', title: 'In Progress', tasks: [] },
      { id: '3', title: 'Done', tasks: [] },
    ]
  })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newTask, setNewTask] = useState({
    title: '',
    code: '',
    planStartDate: '',
    planEndDate: '',
    actualStartDate: '',
    actualEndDate: '',
    assignee: '',
    description: '',
  })

  // Cập nhật localStorage mỗi khi `columns` thay đổi
  useEffect(() => {
    localStorage.setItem('kanbanColumns', JSON.stringify(columns))
  }, [columns])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewTask((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleAddTask = () => {
    if (!newTask.title.trim()) return

    setColumns((prevColumns) => {
      const updatedColumns = prevColumns.map((column, index) => {
        if (index === 0) {
          return {
            ...column,
            tasks: [
              ...column.tasks,
              {
                id: crypto.randomUUID(),
                ...newTask,
              },
            ],
          }
        }
        return column
      })

      return updatedColumns
    })

    setNewTask({
      title: '',
      code: '',
      planStartDate: '',
      planEndDate: '',
      actualStartDate: '',
      actualEndDate: '',
      assignee: '',
      description: '',
    })
    setIsModalOpen(false)
  }

  const handleDragEnd = (taskId: string, sourceColumnId: string, targetColumnId: string) => {
    const sourceColumn = columns.find((col) => col.id === sourceColumnId)!
    const targetColumn = columns.find((col) => col.id === targetColumnId)!

    const task = sourceColumn.tasks.find((t) => t.id === taskId)!
    sourceColumn.tasks = sourceColumn.tasks.filter((t) => t.id !== taskId)
    targetColumn.tasks.push(task)

    setColumns([...columns])
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if ((e.target as HTMLDivElement).classList.contains('modal-overlay')) {
      closeModal()
    }
  }

  return (
    <div className="kanban-wrapper">
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => setIsModalOpen(true)}
          style={{ padding: '10px', cursor: 'pointer' }}
        >
          ➕ Add Task
        </button>
      </div>
      <div
        className={`modal-overlay ${isModalOpen ? 'show' : ''}`}
        onClick={handleOverlayClick}
      >
        <div className="modal-content bg-white p-6 rounded-lg shadow-lg w-96">
          <h3 className="kanban-modal-title text-2xl font-semibold mb-4">Add New Task</h3>

          <div className="kanban-input-container ic1">
            <input
              id="title"
              name="title"
              className="kanban-input"
              type="text"
              value={newTask.title}
              onChange={handleInputChange}
              placeholder=" " />
            <div className="cut"></div>
            <label htmlFor="title" className="placeholder">Task Title</label>
          </div>

          <div className="kanban-input-container ic1">
            <input
              id="code"
              name="code"
              className="kanban-input"
              type="text"
              value={newTask.code}
              onChange={handleInputChange}
              placeholder=" " />
            <div className="cut"></div>
            <label htmlFor="title" className="placeholder">Task Code</label>
          </div>

          <div className="kanban-input-container ic1">
            <input
              id="assignee"
              name="assignee"
              className="kanban-input"
              type="text"
              value={newTask.assignee}
              onChange={handleInputChange}
              placeholder=" " />
            <div className="cut"></div>
            <label htmlFor="assignee" className="placeholder">Assignee</label>
          </div>

          <div className="kanban-input-container ic1">
            <input
              id="planStartDate"
              type="date"
              name="planStartDate"
              value={newTask.planStartDate}
              onChange={handleInputChange}
              placeholder=" "
              className="kanban-input"
            />
            <div className="cut"></div>
            <label htmlFor="planStartDate" className="placeholder">Plan Start Date</label>
          </div>

          <div className="kanban-input-container ic1">
            <input
              id="planEndDate"
              type="date"
              name="planEndDate"
              value={newTask.planEndDate}
              onChange={handleInputChange}
              placeholder=" "
              className="kanban-input"
            />
            <div className="cut"></div>
            <label htmlFor="planEndDate" className="placeholder">Plan End Date</label>
          </div>

          <div className="kanban-input-container ic1">
            <input
              id="actualStartDate"
              type="date"
              name="actualStartDate"
              value={newTask.actualStartDate}
              onChange={handleInputChange}
              placeholder=" "
              className="kanban-input"
            />
            <div className="cut"></div>
            <label htmlFor="actualStartDate" className="placeholder">Actual Start Date</label>
          </div>

          <div className="kanban-input-container ic1">
            <input
              id="actualEndDate"
              type="date"
              name="actualEndDate"
              value={newTask.actualEndDate}
              onChange={handleInputChange}
              placeholder=" "
              className="kanban-input"
            />
            <div className="cut"></div>
            <label htmlFor="actualEndDate" className="placeholder">Actual End Date</label>
          </div>

          <div className="kanban-input-container ic1">
            <textarea
              name="description"
              value={newTask.description}
              onChange={handleInputChange}
              placeholder=" "
              className="kanban-input"
            />
            <div className="cut"></div>
            <label htmlFor="description" className="placeholder">Description</label>
          </div>

          <div className="kanban-modal-footer">
            <button
              onClick={handleAddTask}
              className="kanban-submit"
            >
              Save
            </button>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '20px' }}>
        {columns.map((column) => (
          <ColumnComponent
            key={column.id}
            column={column}
            onDragEnd={handleDragEnd}
            onEditTask={(taskId, newTitle) => {
              setColumns((prevColumns) =>
                prevColumns.map((col) => ({
                  ...col,
                  tasks: col.tasks.map((task) =>
                    task.id === taskId ? { ...task, title: newTitle } : task,
                  ),
                })),
              )
            }}
            onDeleteTask={(taskId, columnId) => {
              setColumns((prevColumns) =>
                prevColumns.map((col) =>
                  col.id === columnId
                    ? { ...col, tasks: col.tasks.filter((task) => task.id !== taskId) }
                    : col,
                ),
              )
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default KanbanBoard
