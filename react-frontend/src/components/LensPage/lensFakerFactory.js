
import { faker } from "@faker-js/faker";
export default (user,count,brandidIds,categoryidIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
lensname: faker.lorem.sentence(1),
price: faker.lorem.sentence(1),
availablestockquantity: faker.lorem.sentence(1),
brandid: brandidIds[i % brandidIds.length],
categoryid: categoryidIds[i % categoryidIds.length],

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
