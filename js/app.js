import { isWebp } from './components/isWebp.js'
import { cardTilt } from './components/cardTilt.js'

isWebp()

const cardWrappers = document.querySelectorAll('.main__card-wrapper')

cardWrappers.forEach((card) => {
	cardTilt(card)
})
