import User from "./User";

interface DateResponse {
    id: number;
    date: string;
    members: User[];
}

export default DateResponse;
