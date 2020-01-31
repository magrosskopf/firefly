export interface Deal {
    userId: string;
    title: string;
    description: string;
    active: boolean;
    picture?: string;
    location: string;
    afterPrice: number;
    beforePrice: number;
    id?: string;
    storeName: string;
}
