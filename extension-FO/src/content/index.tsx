import { render } from 'preact'

(async () => {
  function HelloWorld() {
    return <button
      style="position: fixed; top: 10px; right: 10px;"
      onClick={() => {
        alert('Hello World!')
      }}
    >
      Hello World!
    </button >
  }

  const observer = new MutationObserver(() => {
    const priceWidget = document.querySelector("[data-widget='webPrice']")
    if (priceWidget) {
      observer.disconnect()
      console.log('priceWidget', priceWidget)
    }
  })
  observer.observe(document.body, { childList: true, subtree: true })

  const root = document.createElement('div')
  root.id = 'ozhlpr-entry'
  document.body.appendChild(root)

  render(<HelloWorld />, root)
})()

export { }
