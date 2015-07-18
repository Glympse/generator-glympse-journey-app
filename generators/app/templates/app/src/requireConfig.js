/*globals require*/
require.config({
    shim: {

    },
    paths: {
        requirejs: '../lib/requirejs/require',
        almond: '../lib/almond/almond',
        'glympse-journey-core': '../lib/glympse-journey-core/app/src',
        MessageChannel: '../lib/MessageChannel.js/lib/message_channel',
        UUID: '../lib/UUID.js/dist/uuid.core',
        kamino: '../lib/kamino.js/lib/kamino',
        oasis: '../lib/glympse-viewer-client-adapter/app/src/common/oasis',
        rsvp: '../lib/glympse-viewer-client-adapter/app/src/common/rsvp',
        'glympse-viewer-client-adapter': '../lib/glympse-viewer-client-adapter/app/src'
    },
    packages: [

    ]
});
require(['app']);
