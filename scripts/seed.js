const { db } = require("@vercel/postgres");
const { v4 } = require("uuid");

(async () => {
  try {
    const client = await db.connect();

    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    await createPosts(client);
    await seedPosts(client);

    await client.end();
  } catch (e) {
    console.error("An error occurred while attempting to seed the database:", e);
  }
})();

async function createPosts(client) {
  try {
    await client.sql`
      CREATE TABLE IF NOT EXISTS posts (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        top CHAR(1) NOT NULL,
        content VARCHAR(255) NOT NULL
      );
    `;
    console.log(`Created "posts" table`);
  } catch (e) {
    console.error("Error create posts:", e);
    throw e;
  }
}

async function seedPosts(client) {
  const posts = [
    {
      id: v4(),
      top: "❤",
      content: "ハート",
    },
    {
      id: v4(),
      top: "🍖",
      content: "ミート",
    },
    {
      id: v4(),
      top: "🚗",
      content: "カート",
    },
  ];

  try {
    let res = await Promise.all(
      posts.map(
        (post) => client.sql`
        INSERT INTO posts (id, top, content)
        VALUES (${post.id}, ${post.top}, ${post.content})
        ON CONFLICT (id) DO NOTHING;
      `
      )
    );

    console.log(`Seeded ${res.length}`);
  } catch (e) {
    console.error("Error seeding posts:", e);
    throw e;
  }
}
