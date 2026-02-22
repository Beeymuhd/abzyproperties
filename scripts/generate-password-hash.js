#!/usr/bin/env node

/**
 * Generate bcrypt password hashes for the demo users
 * Run: node scripts/generate-password-hash.js
 */

const bcrypt = require('bcryptjs');

async function generateHashes() {
  console.log('Generating password hashes for demo users...\n');

  const passwords = [
    { email: 'admin@abzy.com', password: 'admin123' },
    { email: 'demo@example.com', password: 'demo123' },
  ];

  for (const user of passwords) {
    const hash = await bcrypt.hash(user.password, 10);
    console.log(`Email: ${user.email}`);
    console.log(`Password: ${user.password}`);
    console.log(`Hash: ${hash}\n`);
  }

  console.log('Update these hashes in your database:');
  console.log('SQL command:');
  console.log(`UPDATE users SET password_hash = 'HASH_HERE' WHERE email = 'EMAIL_HERE';\n`);
}

generateHashes().catch(console.error);
