import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import readline from 'readline'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.join(__dirname, '..')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const question = (query) => new Promise((resolve) => rl.question(query, resolve))

/**
 * Replace placeholders in a file
 */
function replacePlaceholders(filePath, replacements) {
  try {
    let content = fs.readFileSync(filePath, 'utf8')

    Object.entries(replacements).forEach(([key, value]) => {
      const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g')
      content = content.replace(regex, value)
    })

    fs.writeFileSync(filePath, content, 'utf8')
    console.log(`✓ Updated ${path.basename(filePath)}`)
  } catch (error) {
    console.error(`✗ Error updating ${filePath}:`, error.message)
  }
}

/**
 * Find all files with placeholders
 */
function findFilesWithPlaceholders(dir, fileList = []) {
  const files = fs.readdirSync(dir)

  files.forEach((file) => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    // Skip node_modules, .git, and other common directories
    if (stat.isDirectory()) {
      if (!['node_modules', '.git', 'dist', 'build', 'logs'].includes(file)) {
        findFilesWithPlaceholders(filePath, fileList)
      }
    } else {
      // Check common file types that might have placeholders
      const ext = path.extname(file)
      if (['.js', '.jsx', '.ts', '.tsx', '.json', '.md', '.env', '.example', '.html'].includes(ext)) {
        const content = fs.readFileSync(filePath, 'utf8')
        if (content.includes('{{PROJECT_NAME}}')) {
          fileList.push(filePath)
        }
      }
    }
  })

  return fileList
}

/**
 * Generate JWT secret
 */
async function generateJWTSecret() {
  const crypto = await import('crypto')
  return crypto.randomBytes(32).toString('hex')
}

/**
 * Main initialization function
 */
async function init() {
  console.log('\n🚀 MERN Stack Template Initialization\n')
  console.log('This script will customize the template for your project.\n')

  // Get project details from user
  const projectName = await question('Project name (lowercase-with-dashes): ')
  const description = await question('Project description: ')
  const author = await question('Author name: ')
  const generateSecret = await question('Generate new JWT secret? (y/n): ')

  // Validate project name
  if (!/^[a-z0-9-]+$/.test(projectName)) {
    console.error('\n✗ Error: Project name must be lowercase with dashes only')
    rl.close()
    process.exit(1)
  }

  console.log('\n📝 Processing files...\n')

  // Prepare replacements
  const replacements = {
    PROJECT_NAME: projectName,
  }

  // Find and update all files with placeholders
  const filesToUpdate = findFilesWithPlaceholders(rootDir)

  console.log(`Found ${filesToUpdate.length} files to update:\n`)

  filesToUpdate.forEach((file) => {
    replacePlaceholders(file, replacements)
  })

  // Update root package.json with description and author
  const rootPackageJsonPath = path.join(rootDir, 'package.json')
  const rootPackageJson = JSON.parse(fs.readFileSync(rootPackageJsonPath, 'utf8'))
  rootPackageJson.description = description
  rootPackageJson.author = author
  fs.writeFileSync(rootPackageJsonPath, JSON.stringify(rootPackageJson, null, 2), 'utf8')
  console.log('✓ Updated package.json metadata')

  // Generate JWT secret if requested
  if (generateSecret.toLowerCase() === 'y') {
    const jwtSecret = await generateJWTSecret()
    const envExamplePath = path.join(rootDir, 'server', '.env.example')
    const envExample = fs.readFileSync(envExamplePath, 'utf8')
    const updatedEnv = envExample.replace(
      /JWT_SECRET=.*/,
      `JWT_SECRET=${jwtSecret}`
    )
    fs.writeFileSync(envExamplePath, updatedEnv, 'utf8')
    console.log('✓ Generated new JWT secret in server/.env.example')
    console.log(`  Make sure to copy .env.example to .env before running!`)
  }

  // Rename README.md to README_ORIGINAL.md
  const readmePath = path.join(rootDir, 'README.md')
  const readmeOriginalPath = path.join(rootDir, 'README_ORIGINAL.md')
  if (fs.existsSync(readmePath)) {
    fs.renameSync(readmePath, readmeOriginalPath)
    console.log('✓ Renamed README.md to README_ORIGINAL.md (review template info there)')
  }

  // Create a new basic README
  const newReadme = `# ${projectName}

${description}

## Quick Start

1. **Install dependencies**
   \`\`\`bash
   npm run install:all
   \`\`\`

2. **Set up environment variables**
   \`\`\`bash
   cp server/.env.example server/.env
   cp client/.env.example client/.env
   \`\`\`

3. **Start development servers**
   \`\`\`bash
   npm run dev
   \`\`\`

   - Client: http://localhost:5173
   - Server: http://localhost:4000

## Tech Stack

- **Frontend**: React 19, React Router, Axios
- **Backend**: Node.js, Express, MongoDB, JWT
- **Security**: Helmet, Rate Limiting, Input Sanitization
- **DevOps**: Docker, Docker Compose

## Project Structure

See \`README_ORIGINAL.md\` for detailed architecture information.

## Author

${author}

## License

MIT
`

  fs.writeFileSync(readmePath, newReadme, 'utf8')
  console.log('✓ Created new README.md')

  console.log('\n✨ Initialization complete!\n')
  console.log('Next steps:')
  console.log('1. Review and customize server/.env based on server/.env.example')
  console.log('2. Review and customize client/.env based on client/.env.example')
  console.log('3. Run: npm run install:all')
  console.log('4. Run: npm run dev')
  console.log('\n📖 See README_ORIGINAL.md for detailed template documentation\n')

  rl.close()
}

// Run initialization
init().catch((error) => {
  console.error('Error during initialization:', error)
  rl.close()
  process.exit(1)
})
