
import { faker } from "@faker-js/faker";
export default (user,count,customeridIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
orderdate: faker.lorem.sentence(1),
customerid: customeridIds[i % customeridIds.length],
orderstatus: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
