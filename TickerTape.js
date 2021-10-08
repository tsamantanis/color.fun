class TickerTape extends HTMLElement {
    constructor() {
      super();
      
      this._shadowRoot = this.attachShadow({ mode: 'open' });
  
      this._tickerElement = document.createElement('span')
      this._shadowRoot.appendChild(this._tickerElement)
  
      this._tickerElement.innerHTML = this.innerHTML
  
    }
  
    static get observedAttributes() {
      return ['time'];
    }  
  
    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'time') {
        this._time = parseInt(newValue) // set the time
        this._clearTimer()  // clear any old Timers
        this._addTimer() // add a new timer
      }
    }
  
  
    connectedCallback() {
      this._addTimer()
    }
  
  
    disconnectedCallback() {
      this._clearTimer()
    }
  
  
    _addTimer() {
      this._tickerElement.style.transition = this._time + 'ms'
      console.log(this._tickerElement)
      this._timer = setInterval(() => {          
          const k = this._tickerElement.textContent
          const l = this._tickerElement.textContent.substring(1, k.length) + k[0]
          this._tickerElement.textContent = l
      }, this._time / this._tickerElement.textContent.length);
    }
  
  
    _clearTimer() {
      console.log('clear', this._time)
      clearInterval(this._timer)
    }
  }
  
  
customElements.define('ticker-tape', TickerTape)