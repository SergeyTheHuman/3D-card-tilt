export function cardTilt(cardWrapper) {
	if (!cardWrapper) {
		throw new Error('Такого DOM-элемента не существует!')
	}

	const cardItem = cardWrapper.querySelector('.main')
	const firstLayer = cardWrapper.querySelector('.first')
	const secondLayer = cardWrapper.querySelector('.second')
	const thirdLayer = cardWrapper.querySelector('.third')
	const cardWidth = cardItem.offsetWidth
	const cardHeight = cardItem.offsetHeight
	const coefficient = 0.7 // коеффициент наклона (меняет степень поворота элемента)

	cardWrapper.addEventListener('mousemove', (e) => {
		let clientRect = cardItem.getBoundingClientRect() // координаты элемента

		// получаем центр по карточки по высоте и по ширине
		let coordX = e.pageX - clientRect.left - cardItem.offsetWidth / 2
		let coordY = e.pageY - clientRect.top - cardItem.offsetHeight / 2

		// считаем процент наклона по осям X и Y
		let procentX = ((coordX / cardWidth) * 100 * coefficient).toFixed(2)
		let procentY = ((coordY / cardHeight) * 100 * coefficient).toFixed(2)

		cardWrapper.style.cssText = `transform: rotateX(${-procentY}deg) rotateY(${procentX}deg)`

		cardItem.style.cssText = `transform: translateZ(75px) rotateX(${-procentY * 0.2}deg) rotateY(${procentX * 0.2}deg)`
		// cardItem.style.cssText = `transform: translateZ(75px) rotateX(0deg) rotateY(0deg)` // версия без наклона

		if (thirdLayer) {
			thirdLayer.style.cssText = `
			transform: translateZ(150px) rotateX(${-procentY * 0.4}deg) rotateY(${procentX * 0.4}deg)
			`
			// thirdLayer.style.cssText = `transform: translateZ(150px)` // версия без наклона
		}
		if (secondLayer) {
			secondLayer.style.cssText = `
			transform: translateZ(225px) rotateX(${-procentY * 0.6}deg) rotateY(${procentX * 0.6}deg)
			`
			// secondLayer.style.cssText = `transform: translateZ(225px)` // версия без наклона
		}
		if (firstLayer) {
			firstLayer.style.cssText = `
			transform: translateZ(300px) rotateX(${-procentY * 0.8}deg) rotateY(${procentX * 0.8}deg)
			`
			// firstLayer.style.cssText = `transform: translateZ(300px)` // версия без наклона
		}
	})

	cardWrapper.addEventListener('mouseenter', (e) => {
		if (firstLayer) firstLayer.classList.remove('no-active')
		if (secondLayer) secondLayer.classList.remove('no-active')
		if (thirdLayer) thirdLayer.classList.remove('no-active')
		cardItem.classList.remove('no-active')
		cardWrapper.classList.remove('no-active')
	})

	cardWrapper.addEventListener('mouseleave', (e) => {
		if (firstLayer) {
			firstLayer.classList.add('no-active')
			firstLayer.style.cssText = `transform: translateZ(0px) rotateX(0deg) rotateY(0deg)`
		}
		if (secondLayer) {
			secondLayer.classList.add('no-active')
			secondLayer.style.cssText = `transform: translateZ(0px) rotateX(0deg) rotateY(0deg)`
		}
		if (thirdLayer) {
			thirdLayer.classList.add('no-active')
			thirdLayer.style.cssText = `transform: translateZ(0px) rotateX(0deg) rotateY(0deg)`
		}
		// этому классу в CSS нужно добавить transition для плавного возвращения на стандартные позиции
		// .no-active
		// 	transition: transform 1s ease !important
		cardItem.classList.add('no-active')
		cardItem.style.cssText = `transform: rotateX(0deg) rotateY(0deg)`
		cardWrapper.classList.add('no-active')
		cardWrapper.style.cssText = `transform: rotateX(0deg) rotateY(0deg)`
	})
}
