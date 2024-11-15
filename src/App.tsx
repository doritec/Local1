import React from 'react';
import { Header } from './components/Header';
import { QuoteSection } from './components/QuoteSection';
import { LoginForm } from './components/LoginForm';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-4xl mx-auto mt-16 px-4">
        <div className="bg-white rounded-xl shadow-sm p-8 flex gap-12">
          <QuoteSection />
          <LoginForm />
        </div>
      </main>
    </div>
  );
}

export default App;