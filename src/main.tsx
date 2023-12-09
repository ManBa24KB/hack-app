import '@/utils/setFontSize'
import "animate.css"
import ReactDOM from 'react-dom'
import store from '@/state'
import { Provider } from 'react-redux'
import '@/assets/css/global.less'
import '@/assets/css/antd.less'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom' // HashRouter as Router

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
  ,
  document.getElementById('root')
)
