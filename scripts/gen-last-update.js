const { execSync } = require('child_process');
const fs = require('fs');

try {
  const lastCommit = execSync('git log -1 --format=%cd --date=iso', { encoding: 'utf8' }).trim();
  fs.writeFileSync('app/last-update.json', JSON.stringify({ lastUpdate: lastCommit }), 'utf8');
  console.log('Last update time written:', lastCommit);
} catch (e) {
  console.error('Failed to get last update time:', e);
}
