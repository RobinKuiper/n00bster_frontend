import Necessity from "./Necessity";
import User from "./User";
import Date from "./Date";

interface Event {
    title: string;
    description: string;
    id: number;
    endDate: object;
    startDate: object;
    identifier: string;
    members: [];
    necessities: Necessity[];
    dates: Date[];
    owner: User;
    isOwner: boolean;
}

export default Event;
