# Server Docs

## Packages
We're coming out with a basic set of tools for the Express app:
- [CORS package](https://github.com/expressjs/cors#readme)
- [Helmet package](https://helmetjs.github.io/)
- [Morgan logger](https://github.com/expressjs/morgan#readme)
- [body-parser](https://github.com/expressjs/body-parser#readme)

Please keep in mind that the core is preconfigured for you already.
Let's dig into things you'd need to configure as you go along:
- [yup - object schema validation](https://github.com/jquense/yup)
- [Prisma - ORM for handling MySQL](https://www.prisma.io/)

That's basically it. Feel free to configure and add more NPM package if you deem it necessary.

## CRUD system
There's a very basic model for CRUD created, a `crud.js` file in `rdms` folder. Feel free to utalize it if you think it's doing it's job, or write CRUD operations yourself. Please see `index.js` in `routes` folder for example with Prisma's Todo model, which of course is here just an example and needs to be scrapped.