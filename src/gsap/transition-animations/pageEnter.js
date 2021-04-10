import {gsap} from "gsap"

const pageEnter = (next) => {

    return gsap.from(next.container, {
            opacity: 0,
            duration: 1
        }
    )
}
export default pageEnter;