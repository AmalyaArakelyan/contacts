export interface Contact {
    id: string;
    name: string;
    username: string;
    photo?: string; // optional field if it exists
    description?: string; // optional field if it exists
}
