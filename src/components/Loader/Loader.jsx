import React from 'react';

const Loader = () => {
  return (
    <div style={style.loader}>
      <h1>Loading...</h1>
    </div>
  );
};

const style = {
  loader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    zIndex: '1',
    backgroundColor: '#f5f5f5',
    color: '#333'
  }
};

export default Loader;
