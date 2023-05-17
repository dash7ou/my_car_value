// import { EntityManager } from 'typeorm';

// global.beforeEach(async () => {
//   const entities = getConnection().entityMetadatas;
//   for (const entity of entities) {
//     const repository = await getConnection().getRepository(entity.name);
//     await repository.query(
//       `TRUNCATE ${entity.tableName} RESTART IDENTITY CASCADE;`,
//     );
//   }
// });
