import {gsap} from "gsap"

const pageToLandingLeave = (container) => {
    return gsap.to(container, {
            opacity: 0,
            duration: 1
        }
    )
}
export default pageToLandingLeave;