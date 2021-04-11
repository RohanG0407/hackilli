import Highway from '@dogstudio/highway';

import tween from 'gsap';

class Fade extends Highway.Transition{
    in( { from, to, done } ){

        from.remove();

        Tween.fromTo(to, 0.5, {opacity: 0}, {opacity: 1, oncomplete: done} )
    }

    out( { from, done } ){
        done();
    }

};
module.exports.Fade = Fade;