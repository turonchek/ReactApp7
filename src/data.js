import faker from 'faker';

export function makeNewsItem() {
    const hashtagIndex = faker.datatype.number({ min: 0, max: HASHTAGS.length - 1 });
    const authorsIndex = faker.datatype.number({ min: 0, max: AUTHORS.length - 1 });

    return {
        id: faker.datatype.uuid(),
        title: faker.name.title(),
        text:faker.lorem.sentences(9),
        description: faker.lorem.sentences(3),
        photo: faker.image.imageUrl(),
        hashtags: [
            HASHTAGS[hashtagIndex].id,
            HASHTAGS[hashtagIndex >= HASHTAGS.length - 1 ? 0 : hashtagIndex + 1].id,
        ],
        authors:[
            AUTHORS[authorsIndex].id
        ],
    }
}

export const HASHTAGS = Array(10).fill('').map(() => {
    return {
        id: faker.datatype.uuid(),
        word: faker.random.word(),
    }
});

export const AUTHORS = Array(4).fill('').map(() => {
    return {
        id: faker.datatype.uuid(),
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    }
});


export function makeNews(count = 10) {
    return Array(10).fill('').map(() => makeNewsItem());
}