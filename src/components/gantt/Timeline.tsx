import React from 'react'

interface TimelineProps {
  startDate: Date;
  endDate: Date;
}

const Timeline: React.FC<TimelineProps> = ({ startDate, endDate }) => {
  const days = []
  const currentDate = new Date(startDate)

  while (currentDate <= endDate) {
    days.push(new Date(currentDate)) // Lưu mỗi ngày trong phạm vi
    currentDate.setDate(currentDate.getDate() + 1) // Tăng ngày lên 1
  }

  return (
    <div style={{ display: 'flex', borderBottom: '1px solid #ccc', fontSize: '0.7rem' }}>
      {days.map((day, index) => (
        <div
          key={index}
          style={{
            width: '50px',
            textAlign: 'center',
            borderRight: '1px solid rgba(0, 0, 0, 0.2)',
          }}
        >
          {day.toLocaleDateString()}
        </div>
      ))}
    </div>
  )
}

export default Timeline
