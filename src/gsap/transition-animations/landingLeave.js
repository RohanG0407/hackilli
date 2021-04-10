import {gsap} from "gsap"

const landingLeave = (container) => {
    return gsap.to(container, {
        opacity: 0,
        duration: 1
        }
    )
}
export default landingLeave;