#!/usr/bin/env node

// Quick start script for College ERP
const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting College ERP System...\n');

// Check if we're in the right directory
const packagePath = path.join(process.cwd(), 'package.json');
try {
  require(packagePath);
} catch (e) {
  console.error('❌ Please run this from the project root directory');
  process.exit(1);
}

// Start the server
console.log('📡 Starting backend server...');
const server = spawn('npm', ['run', 'server'], {
  stdio: 'inherit',
  shell: true
});

server.on('error', (err) => {
  console.error('❌ Failed to start server:', err.message);
});

server.on('close', (code) => {
  console.log(`Server exited with code ${code}`);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n👋 Shutting down...');
  server.kill('SIGINT');
  process.exit(0);
});

console.log('\n✅ Server starting...');
console.log('📍 Backend: http://localhost:5000');
console.log('🔍 Health Check: http://localhost:5000/api/health');
console.log('🧪 Auth Test: http://localhost:5000/api/auth/test');
console.log('\n💡 Press Ctrl+C to stop\n');