import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { supabase } from './lib/supabase'

// Example of using Supabase
async function testSupabaseConnection() {
  try {
    const { data, error } = await supabase
      .from('insights')
      .select('*')
      .limit(1)
    
    if (error) {
      console.error('Error connecting to Supabase:', error.message)
    } else {
      console.log('Successfully connected to Supabase!', data)
    }
  } catch (error) {
    console.error('Error:', error)
  }
}

// Test the connection when the app starts
testSupabaseConnection()

createRoot(document.getElementById("root")!).render(<App />);
