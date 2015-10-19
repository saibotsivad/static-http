# static-http

Wow this is a mess.

But if you want to give it a try, run `node server.js` and then
navigate to `localhost:8080` and try the TODO app.

The gist of the idea is that you should be able to confirm that
the resource that you requested is actually the resource you got.

This is done in this app by requesting by the hash.

Since the content is by hash, you should be able to cache the
content for all eternity and it should work. I'm still fiddling
with the caching stuff, but I had it mostly working for a while.

The other thing is that you can't simply inject a JS script
the normal way, e.g.:

	<script src="HASH.js"></script>

Because the browser will run the JS before you can verify it.

So what I was doing is basically grabbing the resource by hash,
and *after* verifying it then injecting it into the DOM.

If you run this app, you'll see that it loads reasonably fast,
but the CSS drops in and looks really bad. With this approach
you'd almost certainly want to have some sort of loading icon
or something until it all loaded nicely.

Anyway, this is a work in progress for a conceptual idea I have
of some bastardized child of npm+browserify, but cryptographically
verifiable.

Open an issue if you want to chat about this topic!
