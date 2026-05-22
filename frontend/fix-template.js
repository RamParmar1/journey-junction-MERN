const fs = require('fs');
const glob = require('glob');

glob.sync('src/**/*.js').forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;

    // Fix: fetch(`/api/trips/${id}`)
    const regex = /fetch\(`\/api\/(.*?)`([,\)])/g;
    if (regex.test(content)) {
        content = content.replace(regex, "fetch((process.env.REACT_APP_API_URL || 'http://localhost:5000/api') + `/$1`$2");
        changed = true;
    }

    // Fix: const url    = editId ? `/api/admin/trips/${editId}` : "/api/admin/trips";
    if (content.includes("`/api/admin/trips/${editId}` : \"/api/admin/trips\"")) {
        content = content.replace(
            "`/api/admin/trips/${editId}` : \"/api/admin/trips\"",
            "(process.env.REACT_APP_API_URL || 'http://localhost:5000/api') + (editId ? `/admin/trips/${editId}` : '/admin/trips')"
        );
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(file, content);
        console.log('Fixed template literals in ' + file);
    }
});
