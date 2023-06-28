const { characterList } = require('./data/characterList.js');
const { replaceFile } = require('./data/replaceFile.js');
const fs = require('fs-extra')

const list = characterList

function replaceContent(data) {
    let newdata = data;
    for (let i = 0; i < list.length; i++) {
        newdata = newdata.replace(new RegExp(list[i].searchCharacter, "g"), list[i].changeCharacter);
    }

    return newdata;
}

async function replaceSpecialCharacter(fileList) {
    console.log('🍙 START replaceSpecialCharacter 🍙')

    for (let i = 0; i < fileList.length; i++) {

        console.log(fileList[i])

        const data = await fs.readFile(fileList[i], 'utf-8');
        const newDate = await replaceContent(data);

        if(newDate !== data) {
            await fs.writeFile(fileList[i], newDate, (writeFileErr) => {
                if (writeFileErr) throw writeFileErr;
                console.log(`　${fileList[i]}の置換が完了しました`);
            });
        }
    }
}

replaceSpecialCharacter(replaceFile)
    .then(() => {
        console.log('🦭 FINISH replaceSpecialCharacter 🦭')
    })
