import React from 'react';

const Header = ({ title, subtitle }) => {
  console.log(title, subtitle);
  return (
    <div>
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
    </div>
  );

}

Header.defaultProps = {
  title: 'Weather App',
  subtitle: 'Serving the weather in your local area',
}

export default Header;
