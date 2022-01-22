type Size = 'sm' | 'md' | 'lg' | 'xl';
type CssCode = string;

const breakpoints = {
  sm: '20rem',
  md: '30rem',
  lg: '45rem',
  xl: '60rem',
};

export function mediaQueries(size: Size) {
  return function (styling: CssCode) {
    return `@media (min-width: ${breakpoints[size]}) { ${styling} }`;
  };
}
