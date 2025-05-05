import { createRoot } from 'react-dom/client'
import './index.css'
import { AppWrapper } from './components/appWrapper/AppWrapper.tsx'

createRoot(document.getElementById('root')!).render(
  <AppWrapper/>
)
