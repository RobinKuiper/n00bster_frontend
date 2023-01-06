import Necessity from "./Necessity";
import User from "./User";
import DateResponse from "./DateResponse";

interface Event {
    title: string;
    description: string;
    id: number;
    identifier: string;
    members: [];
    necessities: Necessity[];
    dates: DateResponse[];
    pickedDates: DateResponse[];
    owner: User;
    isOwner: boolean;
}

export default Event;
