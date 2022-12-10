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

  const root = document.createElement('div')
  root.id = 'ozhlpr-entry'
  document.body.appendChild(root)

  render(<HelloWorld />, root)
})()

export { }
