import User from "./User";

interface Necessity {
    name: string;
    amount: number;
    id: number;
    creator: User;
    members: User[];
}

export default Necessity;
