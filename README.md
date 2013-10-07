whistle.js
==========

User's whistle detector in pure javascript.

Overview
--------

Whistle.js acquires the user's microphone input via getUserMedia and keeps monitoring certain frequencies, believed to be the "whistling" ones. When their level becomes high enough, an event ("whistle" by default) is triggered on an element ("document" by default).

Usage
-----

1. Download `whistle.js` and include it somewhere in your html

        <script src="whistle.js"></script>

2. Initialize it whenever you want or when the document is ready

        whistle.init()

3. Set an event handler for the whistle

        document.addEventListener("whistle", function() { alert("whistle detected!"); }, false)

4. Optionally check if user is whistling in real time

        setInterval(function() {
          if(whistle.whistling) {
            console.log("user's whistling at the moment");
          }
        }), 10)

And that's it! Surprised?

Feel free to send any improvements or report issues.

License
-------

Copyright 2013 Michal Siwek

Released under the terms of [GNU General Public License (version 3 or later)](http://www.gnu.org/licenses/gpl.txt)
