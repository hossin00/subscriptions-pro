import { useState } from 'react'
import SplashScreen from './components/SplashScreen'
import Onboarding from './components/Onboarding'
import App from './App'

const DONE_KEY = 'subscriptions-pro_onboarded_v1'
type Phase = 'splash' | 'onboard' | 'app'

export default function AppWrapper() {
  const [phase, setPhase] = useState<Phase>('splash')
  const features = ["Track all subscriptions", "Monthly and annual totals", "Renewal reminders", "Cancellation notes"]
  return (
    <>
      {phase === 'splash' && <SplashScreen onDone={()=>setPhase(localStorage.getItem(DONE_KEY)?'app':'onboard')} color1="#f43f5e" color2="#e11d48" emoji="💰" name="Subscriptions Pro" tagline="Subscription and recurring expense tracker"/>}
      {phase === 'onboard' && <Onboarding onDone={()=>{localStorage.setItem(DONE_KEY,'1');setPhase('app')}} color1="#f43f5e" emoji="💰" name="Subscriptions Pro" features={features}/>}
      {phase === 'app' && <App/>}
    </>
  )
}