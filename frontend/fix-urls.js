const fs = require('fs');
const glob = require('glob');
glob.sync('src/**/*.js').forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes('fetch("/api/')) {
        content = content.replace(/fetch\("\/api\//g, "fetch((process.env.REACT_APP_API_URL || 'http://localhost:5000/api') + '/");
        fs.writeFileSync(file, content);
        console.log('Updated ' + file);
    }
});
