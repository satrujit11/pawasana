// seed.js
import { PrismaClient } from "@prisma/client"

const db = new PrismaClient();

async function seed() {
  try {
    // Sample data for the Adoption model
    const adoptions = [
      {
        name: 'Pet 1',
        sex: 'Male',
        age: 2,
        description: 'Description for Pet 1',
        tags: 'tag1, tag2',
        imageLink: 'https://pawasana-dev.blr1.cdn.digitaloceanspaces.com/adoptions/07e8a587664e30ff3772377ffa1e4c88.jpg',
      },
      {
        name: 'Pet 2',
        sex: 'Female',
        age: 3,
        description: 'Description for Pet 2',
        tags: 'tag3, tag4',
        imageLink: 'https://pawasana-dev.blr1.cdn.digitaloceanspaces.com/adoptions/07e8a587664e30ff3772377ffa1e4c88.jpg',
      },
      // Add more data as needed
    ];

    // Create entries in the Adoption model
    for (const adoptionData of adoptions) {
      await db.adoption.create({ data: adoptionData });
    }

    console.log('Data seeded successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await db.$disconnect();
  }
}

seed();

