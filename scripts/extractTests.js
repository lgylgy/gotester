/* eslint-disable @typescript-eslint/no-var-requires */
const commander = require('commander')
const fs = require('fs').promises
const path = require('path')
const ora = require('ora')

const program = new commander.Command()

const main = async () => {
    program
        .option('-o, --output <directory>', 'JSON output')
        .option('-i, --input <directory>', 'Golang sources')

    await program.parseAsync(process.argv)

    const options = program.opts()
    console.log(`input directory: ${options.input}`)
    console.log(`output directory: ${options.output}`)

    const listFilesSpinner = ora('List go test files...').start()
    const files = await listFiles(options.input)
    listFilesSpinner.succeed()

    const listTestsSpinner = ora('List tests...').start()
    const tests = await listTests(files)
    listTestsSpinner.succeed()

    const saveJSONSpinner = ora('Save text.JSON...').start()
    await saveTests(tests)
    saveJSONSpinner.succeed()

    console.log('Extraction succeed')
}

async function listFiles(dir) {
    let files = await fs.readdir(dir)
    files = await Promise.all(
        files.map(async file => {
            const filePath = path.join(dir, file)
            const stats = await fs.stat(filePath)
            if (stats.isDirectory()) return listFiles(filePath)
            else if (stats.isFile()) return filePath
        })
    )
    return files
        .reduce((all, contents) => all.concat(contents), [])
        .filter(file => file.endsWith('_test.go'))
}

const regexGoTest = /func\s*(Test[a-zA-Z0-9_]+)\([^\)]*testing.T\)/gm

async function listTests(files) {
    const tests = await Promise.all(
        files.map(async file => {
            const data = await fs.readFile(file)
            const content = data.toString()

            const localTests = []
            let match = regexGoTest.exec(content)
            do {
                localTests.push({ name: match[1], file: file })
            } while ((match = regexGoTest.exec(content)) !== null)
            return localTests
        })
    )
    return tests.reduce((all, contents) => all.concat(contents), [])
}

async function saveTests(jsonTests) {
    fs.writeFile('tests.json', JSON.stringify(jsonTests), function (err) {
        if (err) {
            console.log(err)
        }
    })
}

main()
