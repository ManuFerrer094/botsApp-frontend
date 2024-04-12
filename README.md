| Tecnología/Librería | Uso                              |
|---------------------|-------------------------------------------------|
| ![React](https://img.shields.io/badge/React-61DAFB?logo=react) | Framework utilizado para construir la interfaz de usuario. |
| ![Axios](https://img.shields.io/badge/Axios-1385FF?logo=axios) | Cliente HTTP utilizado para realizar peticiones al servidor backend. |
| ![Express](https://img.shields.io/badge/Express-000000?logo=express) | Infraestructura web utilizada para construir el servidor backend. |
| ![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?logo=sequelize) | ORM utilizado para interactuar con la base de datos PostgreSQL. |
| ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?logo=postgresql) | Sistema de gestión de bases de datos relacional utilizado como base de datos principal. |

---

### Estrategias de implementación

#### Lógica de la aplicación
Para la lógica de la aplicación, hemos seguido un enfoque basado en componentes utilizando React. Cada componente encapsula su propia lógica y estado, lo que facilita la modularidad y la reutilización del código.

#### Persistencia de datos
Utilizamos Axios para realizar peticiones HTTP al servidor backend, construido con Express y Sequelize ORM para interactuar con la base de datos PostgreSQL. Esta configuración nos proporciona una capa de abstracción sobre la base de datos y nos permite realizar operaciones CRUD de manera eficiente.

#### Autenticación
Actualmente, nuestra aplicación no incluye funcionalidades de autenticación. Para implementar la autenticación en el futuro, podríamos considerar el uso de bibliotecas como Passport.js para manejar la autenticación basada en sesiones o JWT (JSON Web Tokens) para autenticación basada en tokens.

#### Servicio de datos
Los datos utilizados en la aplicación provienen de la base de datos PostgreSQL y no son simulados. Esto nos permite trabajar con datos reales y proporcionar una experiencia más realista a los usuarios finales. No se utiliza un servicio de datos simulados como JSON Server en este caso.
