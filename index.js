const core = require('@actions/core');
const fs = require('fs');

try {
    const androidManifestPath = core.getInput('androidManifestPath');
    const buildGradlePath = core.getInput('buildGradlePath');
    const stringsPath = core.getInput('stringsPath');
    const mainActivityPath = core.getInput('mainActivityPath');
    const mainApplicationPath = core.getInput('mainApplicationPath');
    const reactNativeFlipperPath = core.getInput('reactNativeFlipperPath');
    const newPackageName = core.getInput('newPackageName');
    const oldPackageName = core.getInput('oldPackageName');
    console.log(`newPackageName: ${newPackageName}`);
    console.log(`oldPackageName: ${oldPackageName}`);
    console.log(`androidManifestPath: ${androidManifestPath}`);
    console.log(`buildGradlePath: ${buildGradlePath}`);
    console.log(`stringsPath: ${stringsPath}`);
    console.log(`mainActivityPath: ${mainActivityPath}`);
    console.log(`mainApplicationPath: ${mainApplicationPath}`);
    console.log(`reactNativeFlipperPath: ${reactNativeFlipperPath}`);
    const searchRegExp = new RegExp(oldPackageName, 'g');
    const paths = [androidManifestPath, buildGradlePath, stringsPath, mainActivityPath, mainApplicationPath, reactNativeFlipperPath];
    let manifestOK = false;
    let gradleOK = false;
    let stringsOK = false;
    let mainActivityOK = false;
    let mainApplicationOK = false;
    let reactNativeFlipperOK = false;

    paths.forEach((path) => {
        fs.readFile(path, 'utf8', function (err, data) {
            console.log(`Processing ${path}`);
            const newData = data.replace(searchRegExp, newPackageName);
            fs.writeFile(path, newData, function (err) {
                if (err) throw err;
                console.log(`Successfully override package name ${newPackageName} on ${path}`);
                
                if(path === androidManifestPath){
                    manifestOK = true
                } else if(path === buildGradlePath){
                    gradleOK = true
                } else if(path === stringsPath){
                    stringsOK = true
                } else if(path === mainActivityPath){
                    mainActivityOK = true
                } else if(path === mainApplicationPath){
                    mainApplicationOK = true
                } else if(path === reactNativeFlipperPath){
                    reactNativeFlipperOK = true
                }

                if (manifestOK && gradleOK && stringsOK && mainActivityOK && mainApplicationOK && reactNativeFlipperOK) {
                    console.log('All files have been processed');
                    core.setOutput("result", `Done`);
                }
                
            });
        });
    });

} catch (error) {
    core.setFailed(error.message);
}
