
import { faker } from "@faker-js/faker";
export default (user,count,lensIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
transactionDate: faker.lorem.sentence(1),
quantityChange: faker.lorem.sentence(1),
transactionType: faker.lorem.sentence(1),
lens: lensIds[i % lensIds.length],

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
