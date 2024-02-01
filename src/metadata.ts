/* eslint-disable */
export default async () => {
    const t = {};
    return { "@nestjs/graphql": { "models": [[import("./data/entities/user.entity"), { "User": { id: {}, firstName: {}, lastName: {}, isActive: {} } }]] } };
};