import { App } from 'vue';
interface Handlers {
  [key: string]: Array<Function>
}
export class JsEvents {
  protected handlers: Handlers
  constructor() {
    this.handlers = {}
  }

  on(name: string, callback: (...args: any) => void) {
    if (!this.handlers.hasOwnProperty(name)) {
      this.handlers[name] = []
    }
    this.handlers[name].push(callback)
  }

  emit(name: string, ...args: any) {
    if (this.handlers.hasOwnProperty(name)) {
      let events = this.handlers[name]
      events.map(fn => {
        fn(...args)
      })
    }
  }

  off(name: string, callback?: Function) {
    if (this.handlers.hasOwnProperty(name)) {
      if (callback) {
        let list: Array<Function> = []

        this.handlers[name].map(fn => {
          if (callback != fn) {
            list.push(fn)
          }
        })

        this.handlers[name] = list
      } else {
        delete this.handlers[name]
      }

    }
  }
}
export const Events: JsEvents = new JsEvents()
export const EventBus = {
  install(app: App) {
    app.config.globalProperties.$Events = Events
    return app
  }
}

export default Events 
