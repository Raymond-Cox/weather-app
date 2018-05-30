import React from 'react';

const Header = ({ title, subtitle }) => {
  console.log(title, subtitle);
  return (
    <div className="header">
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
    </div>
  );

}

Header.defaultProps = {
  title: '5 Day Weather App',
  subtitle: 'Serving the weather for your local area',
}

export default Header;
