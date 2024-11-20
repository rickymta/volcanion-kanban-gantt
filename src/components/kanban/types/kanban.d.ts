export interface Task {
    id: string; // UUID
    title: string;
    code: string;
    planStartDate: string;
    planEndDate: string;
    actualStartDate: string;
    actualEndDate: string;
    assignee: string;
    description: string;
}

export interface Column {
    id: string;
    title: string;
    tasks: Task[];
}
