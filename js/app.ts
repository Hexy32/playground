const div = document.getElementById('div')
div.style.width = (updateMaxWidth() + updateMinWidth()) / 2 + 'px'

const totalTime = 100
const changedPixels = 100
const itemTransitionTime = totalTime / changedPixels

function updateMaxWidth() {
  const maxDiv = document.createElement('div')
  maxDiv.textContent = div.textContent
  maxDiv.style.width = 'max-content'
  maxDiv.style.opacity = '0'
  maxDiv.style.position = 'absolute'
  maxDiv.style.top = '0px'
  maxDiv.style.left = '-1000px'
  maxDiv.id = 'div'

  const afterDiv = document.querySelectorAll('.after')

  afterDiv.forEach((after) => {
    after.remove()
  })

  maxDiv.className = 'after'

  div.after(maxDiv)

  return maxDiv.clientWidth
}

function updateMinWidth() {
  const minDiv = document.createElement('div')
  minDiv.textContent = div.textContent
  minDiv.style.width = 'min-content'
  minDiv.style.opacity = '0'
  minDiv.style.position = 'absolute'
  minDiv.style.top = '0px'
  minDiv.style.left = '-1000px'
  minDiv.id = 'div'

  const beforeDiv = document.querySelectorAll('.before')

  beforeDiv.forEach((before) => {
    before.remove()
  })

  minDiv.className = 'before'
  minDiv.id = ''

  div.before(minDiv)
  return minDiv.clientWidth
}

function updateText() {
  const text = document.getElementById('input') as HTMLInputElement
  div.textContent = text.value

  div.style.width = (updateMaxWidth() + updateMinWidth()) / 2 + 'px'
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function increaseWidth() {
  const width = div.style.width
  let finalWidth = parseInt(width.substring(0, width.length - 2), 10)

  for (let i = 0; i < changedPixels; i++) {
    await sleep(itemTransitionTime)
    if (finalWidth < updateMaxWidth()) {
      div.style.width = finalWidth + 1 + 'px'
      finalWidth += 1
    } else {
      return
    }
  }
}

async function decreaseWidth() {
  const width = div.style.width
  let finalWidth = parseInt(width.substring(0, width.length - 2), 10)

  for (let i = 0; i < changedPixels; i++) {
    await sleep(itemTransitionTime)
    if (finalWidth > updateMinWidth()) {
      div.style.width = finalWidth - 1 + 'px'
      finalWidth -= 1
    } else {
      return
    }
  }
}
