import {gsap} from "gsap"

const pageLeave = (container) => {
    return gsap.to(container, {
            opacity: 0,
            duration: 1
        }
    )
}
export default pageLeave;