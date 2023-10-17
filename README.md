En esta aplicación se usó:

-SCSS
Usando metodología BEM en su mayor parte
y sin el uso de librería externas

-Responsive
No se tendrá un problema para acceder a la
app en ningún momento en alguna parte de la UI
y en todas las resoluciones se ve bien

-Principios de patrones y programación en React
Se usaron Pure Components, Lazy Loading, Suspense,
HOC, componentes de función y componentes de clase
Container-Presentational, el uso de varios hooks, como
useState, useEffect, useContext, useReducer, useMemo, useCallback

-Unit testing
Se probaron algunas partes de la aplicación para probar
casos (técnicas) distintas de testing llegando al 75% de coverage

ACLARACIONES IMPORTANTES:
Debido a que la API trae muchos resultados importantes en Null y vacios
en el selector aparecerá el nombre NA, número de temporada, episodio, descripción
e imagen como Null o string vacios, si desea ver como se vería si la api
si trajera esos datos correctamente, basta con que den click en Ver Mocks para
ver como se vería la información si viniera llena

Para correr la aplicación
npm start

Para testear la aplicación con coverage
npm run test:coverage
