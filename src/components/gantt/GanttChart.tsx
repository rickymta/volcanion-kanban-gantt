import React from 'react';
import Timeline from './Timeline';
import TaskBar from './TaskBar';
import { Task } from './types';

interface GanttChartProps {
  tasks: Task[];
  startDate: Date;
  endDate: Date;
}

const GanttChart: React.FC<GanttChartProps> = ({ tasks, startDate, endDate }) => {
  const days = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    days.push(new Date(currentDate)); // Lưu mỗi ngày trong phạm vi
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // Tính toán % tổng hoàn thành
  const totalDuration = tasks.reduce((sum, task) => {
    const duration =
      (task.endDate.getTime() - task.startDate.getTime()) / (1000 * 60 * 60 * 24);
    return sum + duration;
  }, 0);

  const totalProgress = tasks.reduce((sum, task) => {
    const duration =
      (task.endDate.getTime() - task.startDate.getTime()) / (1000 * 60 * 60 * 24);
    return sum + duration * (task.progress / 100);
  }, 0);

  const overallProgress = totalDuration > 0 ? (totalProgress / totalDuration) * 100 : 0;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #ccc',
        padding: '10px',
        overflow: 'auto',
      }}
    >
      <h3>Total Progress: {overallProgress.toFixed(2)}%</h3>
      <Timeline startDate={startDate} endDate={endDate} />
      <div
        style={{
          position: 'relative',
          flexGrow: 1,
        }}
      >
        {tasks.map((task) => (
          <TaskBar key={task.id} task={task} startDate={startDate} />
        ))}
      </div>
    </div>
  );
};

export default GanttChart;
