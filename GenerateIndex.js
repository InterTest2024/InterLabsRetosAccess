const fs = require('fs');
const fsAsync = require('fs/promises');
const pug = require('pug')

let dirs = []
let allClass = []

async function GetDirs() {
    return (await fsAsync.readdir('./', { withFileTypes: true }))
            .filter(f => f.isDirectory() && f.name[0] != '.' && f.name != 'node_modules')
            .map(d => d.name)
}

async function SplitCourses(allDirs){
    let cName='';
    let classes=[];
    allDirs.forEach(dir=>{
        const classType = dir.split('-')[0];
        if(cName!=classType){
            cName='';
            classes=new Array();
        }
        cName=classType;
        classes.push(dir);
        const classFound=allClass.find(c=>c.cName==cName)
        if(classFound){
            console.log("Found "+cName);
            classFound.classes.push(dir);
        }else{ //Add new class
            allClass.push({
                cName:cName,
                classes:[dir]
            })
        }
    });
    return allClass
}

async function TranspilePug() {
    const pugger = await fsAsync.readFile('./ClassMenu.pug', { encoding: 'utf8' });
    const poggo = await pug.compileFile('./ClassMenu.pug', {pretty:true})({
        // allClasses: JSON.stringify(allClass.concat(allClass).concat(allClass).concat(allClass))
        allClasses: JSON.stringify(allClass)
    })
    await fsAsync.writeFile('./index.html', poggo)
}

async function main() {
    dirs = await GetDirs();
    await SplitCourses(dirs);
    await TranspilePug()
    console.log(allClass);
}

main();
