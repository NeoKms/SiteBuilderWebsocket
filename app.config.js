module.exports = {
    apps : [{
        name: "app",
        error_file : "/var/log/pm2_err.log",
        out_file : "/var/log/pm2_out.log",
        script: "./app.js",
        watch: true,
        cwd: "/var/SiteBuilderWebsocket/",
        ignore_watch: [
            "package-lock.json",
            "package.json",
            "node_modules",
            ".git",
            ".*"
        ]
    }]
}
