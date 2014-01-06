whistle.js
==========

User's whistle detector/analyzer written in pure javascript.

Overview
--------

Whistle.js acquires the user's microphone input via getUserMedia and keeps monitoring certain frequencies, believed to be the "whistling" ones. When their level becomes high enough, an event ("whistle" by default) is triggered on an element ("document" by default).

Usage
-----

1. Download `whistle.js` and include it somewhere in your html

        <script src="whistle.js"></script>

2. Initialize it whenever you want or when the document is ready

        whistle.init()

3. The `init()` method takes three optional parameters:
  * `whistleEventName [string]` - by setting this you can specify the name of the event triggered on user's whistle
  * `once [boolean]` - if set to true, the whistle event will be triggered only at the first time user whistles
  * `precision [string]` - if set to 'low', the whistle analyser will be more tolerant. Useful if you need to capture the intensity of whistles

4. Set an event handler for the whistle

        document.addEventListener("whistle", function() { alert("whistle detected!"); }, false)

5. Optionally check if user is whistling in real time and/or how intense his whistles are

        setInterval(function() {
          if(whistle.whistling) {
            console.log("user's whistling at the moment");
            console.log("intensity: " + whistle.intensity);
          }
        }), 10)

6. You can also check if whistle.js is ready and the microphone prompt has been accepted by user

        document.addEventListener("whistleReady", function() { alert("whistle.js is up and running") }, false)

And that's it! Surprised?

Feel free to send any improvements or report issues.

License
-------

Copyright 2013 Michal Siwek

Released under the terms of [GNU General Public License (version 3 or later)](http://www.gnu.org/licenses/gpl.txt)
