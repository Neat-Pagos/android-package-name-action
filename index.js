const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
const util = require('util');

try {
    const readFile = util.promisify(fs.readFile);
    const writeFile = util.promisify(fs.writeFile);

    const androidManifestPath = core.getInput('androidManifestPath');
    const buildGradlePath = core.getInput('buildGradlePath');
    const stringsPath = core.getInput('stringsPath');
    const mainActivityPath = core.getInput('mainActivityPath');
    const mainApplicationPath = core.getInput('mainApplicationPath');
    const newPackageName = core.getInput('newPackageName');
    const oldPackageName = core.getInput('oldPackageName');
    const searchRegExp = new RegExp(oldPackageName, 'g');
    const paths = [
        androidManifestPath,
        buildGradlePath,
        stringsPath,
        mainActivityPath,
        mainApplicationPath
    ];

    Promise.allSettled(paths.map(async (path) => {
        const pathData = await readFile(path, 'utf8');
        let newData = pathData.replace(searchRegExp, newPackageName);
        await writeFile(gradlePath, newData);
        console.log(`Successfully override package name ${newPackageName} on ${path}`);
    })).then(() => {
        core.setOutput("result", `Done`);
    });
    

} catch (error) {
    core.setFailed(error.message);
}
