import React from 'react';
import Counter from './components/Counter/Counter';
import ProductList from './components/ProductList/ProductList';
import Form from './components/Form/Form';

function App() {
  return (
    <div className="App">
      <h1>React Testing App</h1>
      
      <section>
        <h2>Counter Component</h2>
        <Counter />
      </section>
      
      <section>
        <h2>Product List Component</h2>
        <ProductList />
      </section>
      
      <section>
        <h2>Form Component</h2>
        <Form />
      </section>
    </div>
  );
}

export default App;