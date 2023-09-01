export enum Status {
    ToDo = "To do",
    Doing = "Doing",
    Done = "Done"
}

export interface Todo {
    id: number;
    titulo: string;
    descricao: string;
    status: Status; 
}