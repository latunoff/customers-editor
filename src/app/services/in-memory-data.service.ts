import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        const contacts = [
            { id: 1, name: 'Alex', number: '111', email: 'user1@mail.com' },
            { id: 2, name: 'Max', number: '222', email: 'user2@mail.com' },
            { id: 3, name: 'Kate', number: '333', email: 'user3@mail.com' }
        ];
        return { contacts };
    }
}
