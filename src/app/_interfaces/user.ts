import { Time } from '@angular/common';

export interface User {
    uid?: string;
    displayName?: string;
    email?: string;
    password?: string;
    confirm?: string;
    photoURL?: string;
    storeName?: string;
    adress?: string;
    zip?: string;
    city?: string;
    lat?: number;
    lng?: number;
    opening: {
        mo: [Time, Time],
        di: [Time, Time],
        mi: [Time, Time],
        do: [Time, Time],
        fr: [Time, Time],
        sa: [Time, Time],
        so: [Time, Time]
    };
}
