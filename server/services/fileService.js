const fs = require('fs');
const File = require('../models/File');
const config = require('config');

class FileService {
    createDir(file) {
        const filePath = `${config.get('filePath')}/${file.user}/${file.path}`;
        console.log("filePath: ", filePath);
        return new Promise(((resolve, reject) => {
            try {
                console.log("existSync: ", fs.existsSync(filePath));
                if (!fs.existsSync(filePath)) {
                    fs.mkdirSync(filePath);
                    return resolve({message: 'File was created'});
                } else {
                    return reject({message: 'File already exist'});
                }
            } catch (e) {
                return reject({message: 'File error'});
            }
        }))
    }

    deleteFile(file) {
        const path = this.getPath(file);
        if (file.type === 'dir') {
            fs.rmdirSync(path);
        } else {
            fs.unlinkSync(path);
        }
    }

    getPath(file) {
        return `${file.user}/${file.path}`;
    }

    async getFiles(userId, parent) {
        try {
            const files = await File.find({user: userId, parent});
            return files;
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new FileService();