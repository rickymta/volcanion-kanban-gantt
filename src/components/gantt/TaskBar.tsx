import React, {useState} from 'react';

interface TaskBarProps {
  task: {
    name: string;
    startDate: Date;
    endDate: Date;
    progress: number;
  };
  startDate: Date;
}

const TaskBar: React.FC<TaskBarProps> = ({ task, startDate }) => {
  const daysFromStart = (task.startDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
  const duration = (task.endDate.getTime() - task.startDate.getTime()) / (1000 * 60 * 60 * 24);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)} // Hiển thị popup khi hover
      onMouseLeave={() => setIsHovered(false)} // Ẩn popup khi rời khỏi
      style={{
        position: 'relative',
        marginTop: '10px',
        marginBottom: '10px',
        zIndex: 1,
      }}
    >
      {/* Thanh nhiệm vụ */}
      <div
        style={{
          position: 'absolute',
          left: `${daysFromStart * 50}px`,
          width: `${duration * 50}px`,
          height: '20px',
          backgroundColor: '#ddd',
          border: '1px solid #ccc',
        }}
      >
        {/* Thanh hoàn thành */}
        <div
          style={{
            width: `${task.progress}%`,
            height: '100%',
            backgroundColor: '#4caf50',
          }}
        ></div>
        <span
          style={{
            position: 'absolute',
            top: '50%',
            left: '5px',
            transform: 'translateY(-50%)',
            fontSize: '12px',
            color: 'white',
          }}
        >
          {task.progress}%
        </span>
      </div>

      {/* Popup hiển thị tiêu đề */}
      {isHovered && (
        <div
          style={{
            position: 'absolute',
            top: '-25px', // Hiển thị phía trên task
            left: `${daysFromStart * 50}px`,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            padding: '5px 10px',
            borderRadius: '5px',
            fontSize: '12px',
            whiteSpace: 'nowrap', // Không xuống dòng
            zIndex: 1000,
          }}
        >
          {task.name}
        </div>
      )}

      {/* Tên nhiệm vụ */}
      <div style={{ marginLeft: `${daysFromStart * 50}px`, marginTop: '25px' }}>
        {task.name}
      </div>
    </div>
  );
};

export default TaskBar;
