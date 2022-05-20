export function cardTilt(cardWrapper) {
	if (!cardWrapper) {
		throw new Error('Такого DOM-элемента не существует!')
	}

	const cardItem = cardWrapper.firstElementChild
	const firstLayer = cardWrapper.querySelector('.first')
	const secondLayer = cardWrapper.querySelector('.second')
	const thirdLayer = cardWrapper.querySelector('.third')
	const cardWidth = cardItem.offsetWidth
	const cardHeight = cardItem.offsetHeight
	const coefficient = 0.5 // коеффициент наклона (меняет степень поворота элемента)

	cardWrapper.addEventListener('mousemove', (e) => {
		let clientRect = cardItem.getBoundingClientRect() // координаты элемента
		// получаем центр по карточки по высоте и по ширине
		let coordX = e.pageX - clientRect.left - cardItem.offsetWidth / 2
		let coordY = e.pageY - clientRect.top - cardItem.offsetHeight / 2

		// считаем процент наклона по осям X и Y
		let procentX = ((coordX / cardWidth) * 100 * coefficient).toFixed(2)
		let procentY = ((coordY / cardHeight) * 100 * coefficient).toFixed(2)

		cardItem.style.cssText = `transform: rotateX(${-procentY}deg) rotateY(${procentX}deg)`
		if (firstLayer) {
			firstLayer.style.cssText = `
				transform: 
				translateZ(150px) 
				rotateX(${-procentY * 0.4}deg)
				rotateY(${procentX * 0.4}deg)
			`
		}
		if (secondLayer) {
			secondLayer.style.cssText = `
			transform: 
			translateZ(100px) 
			rotateX(${-procentY * 0.6}deg) 
			rotateY(${procentX * 0.6}deg)
		`
		}
		if (thirdLayer) {
			thirdLayer.style.cssText = `
			transform: 
			translateZ(50px) 
			rotateX(${-procentY * 0.8}deg) 
			rotateY(${procentX * 0.8}deg)
		`
		}
	})
	cardWrapper.addEventListener('mouseenter', (e) => {
		if (firstLayer) firstLayer.classList.remove('no-active')
		if (secondLayer) secondLayer.classList.remove('no-active')
		if (thirdLayer) thirdLayer.classList.remove('no-active')
		cardItem.classList.remove('no-active')
	})
	cardWrapper.addEventListener('mouseleave', (e) => {
		if (firstLayer) {
			firstLayer.classList.add('no-active')
			firstLayer.style.cssText = `transform: translateZ(150px) rotateX(0deg) rotateY(0deg)`
		}
		if (secondLayer) {
			secondLayer.classList.add('no-active')
			secondLayer.style.cssText = `transform: translateZ(100px) rotateX(0deg) rotateY(0deg)`
		}
		if (thirdLayer) {
			thirdLayer.classList.add('no-active')
			thirdLayer.style.cssText = `transform: translateZ(50px) rotateX(0deg) rotateY(0deg)`
		}
		// этому классу в CSS нужно добавить transition для плавного возвращения на стандартные позиции
		// .no-active
		// 	transition: transform 1s ease !important
		cardItem.classList.add('no-active')
		cardItem.style.cssText = `transform: rotateX(0deg) rotateY(0deg)`
	})
}