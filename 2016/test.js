#!/usr/bin/env node
const inotify = require('inotify').Inotify();
inotify.addWatch({
    // Change this for a valid directory in your machine.
    path:      '.',
    watch_for: Inotify.IN_CLOSE_WRITE,
    callback:  (ev) => {
        console.log(ev)
    }
})