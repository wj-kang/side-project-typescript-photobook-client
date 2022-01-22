type Size = 'sm' | 'md' | 'lg';
type CssCode = string;

const breakpoints = {
  sm: '30rem',
  md: '45rem',
  lg: '60rem',
};

export function mediaQueries(size: Size) {
  return function (styling: CssCode) {
    return `@media (max-width: ${breakpoints[size]}) { ${styling} }`;
  };
}
