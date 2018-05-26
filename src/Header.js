import React from 'react';

const Header = ({ title, subtitle, credits }) => {
  console.log(title, subtitle);
  return (
    <div>
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
      <h2><a href="https://darksky.net/poweredby/">{credits}</a></h2>
    </div>
  );

}

Header.defaultProps = {
  title: 'Weather App',
  subtitle: 'Serving the weather in your local area',
  credits: 'Powered by Dark Sky',
}

export default Header;
