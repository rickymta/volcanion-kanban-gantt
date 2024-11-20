import React from 'react';
import GanttChart from './gantt/GanttChart';
import { Task } from './gantt/types';

const generateTasks = (): Task[] => {
  const tasks: Task[] = [];
  const startDate = new Date('2024-11-01');
  const endDate = new Date('2024-11-29');

  for (let i = 1; i <= 50; i++) {
    // Random ngày bắt đầu trong khoảng
    const randomStart = new Date(
      startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime())
    );

    // Random thời gian kết thúc (3-10 ngày sau ngày bắt đầu)
    const randomEnd = new Date(
      randomStart.getTime() + (Math.random() * 7 + 3) * 24 * 60 * 60 * 1000
    );

    // Random % hoàn thành
    const progress = Math.floor(Math.random() * 101);

    tasks.push({
      id: i.toString(),
      name: `Task ${i}`,
      startDate: randomStart,
      endDate: randomEnd,
      progress,
    });
  }

  return tasks;
};

const Wrapper: React.FC = () => {
  const tasks: Task[] = generateTasks();

  const startDate = new Date('2024-11-01');
  const endDate = new Date('2024-11-29');

  return (
    <div style={{ padding: '20px' }}>
      <h1>Gantt Chart</h1>
      <GanttChart tasks={tasks} startDate={startDate} endDate={endDate} />
    </div>
  );
};

export default Wrapper;
