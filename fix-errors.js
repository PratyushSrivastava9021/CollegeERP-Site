// Error fix script
const fs = require('fs');
const path = require('path');

console.log('🔧 Checking for common errors...\n');

// Check if all required files exist
const requiredFiles = [
  'backend/server.js',
  'backend/models/User.js',
  'backend/models/Course.js',
  'backend/controllers/authController.js',
  'backend/controllers/courseController.js',
  'backend/routes/auth.js',
  'backend/routes/courses.js',
  'frontend/src/App.jsx',
  'frontend/src/pages/Login.jsx',
  'frontend/src/pages/Register.jsx',
  'frontend/src/pages/Courses.jsx',
  '.env'
];

let allFilesExist = true;

requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ Missing: ${file}`);
    allFilesExist = false;
  }
});

if (allFilesExist) {
  console.log('\n🎉 All required files exist!');
  console.log('\n🚀 To start your ERP system:');
  console.log('   npm run dev');
  console.log('\n📝 To test the system:');
  console.log('   node test-system.js');
} else {
  console.log('\n❌ Some files are missing. Please check the file structure.');
}

// Check package.json dependencies
try {
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const requiredDeps = ['express', 'mongoose', 'jsonwebtoken', 'bcryptjs'];
  
  console.log('\n📦 Checking dependencies...');
  requiredDeps.forEach(dep => {
    if (pkg.dependencies[dep]) {
      console.log(`✅ ${dep}: ${pkg.dependencies[dep]}`);
    } else {
      console.log(`❌ Missing dependency: ${dep}`);
    }
  });
} catch (error) {
  console.log('❌ Could not read package.json');
}