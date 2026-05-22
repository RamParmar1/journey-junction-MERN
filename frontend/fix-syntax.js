const fs = require('fs');
const glob = require('glob');
glob.sync('src/**/*.js').forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes(") + '/")) {
        content = content.replace(/\) \+ '\//g, ') + "/');
        fs.writeFileSync(file, content);
        console.log('Fixed syntax in ' + file);
    }
});
