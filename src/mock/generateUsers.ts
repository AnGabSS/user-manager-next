// mock/generateUsers.ts

import { v4 as uuidv4 } from "uuid";

const roles = ["ADMIN", "USER", "MANAGER"];
const names = [
  "David Bowie",
  "Freddie Mercury",
  "Elvis Presley",
  "Aretha Franklin",
  "Nina Simone",
];
const emails = [
  "david@bowie.com",
  "freddie@queen.com",
  "elvis@presley.com",
  "aretha@franklin.com",
  "nina@simone.com",
];

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function randomDate(start: Date, end: Date) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  ).toISOString();
}

export function generateMockUsers(count = 10) {
  const now = new Date();
  const users = Array.from({ length: count }, (_, i) => {
    const name = names[getRandomInt(names.length)];
    const email = emails[getRandomInt(emails.length)];

    return {
      id: uuidv4(),
      name,
      email,
      role: roles[getRandomInt(roles.length)],
      createdAt: randomDate(new Date(now.getFullYear() - 1, 0, 1), now),
      updatedAt: randomDate(new Date(now.getFullYear() - 1, 0, 1), now),
      lastLoginAt: randomDate(new Date(now.getFullYear() - 1, 0, 1), now),
    };
  });

  return {
    data: {
      items: users,
      total: users.length,
      currentPage: 1,
      lastPage: 1,
      perPage: 15,
    },
  };
}
