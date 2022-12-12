# 🔐 Licensing Engine | Case3D 🔐
[Case3D](https://case-3d.com) | 
[Noubis.com](https://noubis.com) 

Authored by: [Petar Vukmanovic](mailto:petar.vukmanovic@noubis.com)

## Install mkcert:
On your Ubuntu, run the following to install local certificate server, so that we can run HTTPS in localhost. Quite neat.
```sh
sudo apt install mkcert
mkcert -install
```

After that, run:
```sh
./gen-certs.sh
```

## Add at the end of your hosts file:
This will allow us to actually access localhost with a user-friendly URL, allowing a bit more friendlier DevUX. 💻
```sh
vim /etc/hosts
127.0.0.1 licensing.local
```

## Run most of the app:
This'll run your MySQL and Nginx reverse proxy so we can access the app nicely from our dedicated hosts file, and in https. 😌
```sh
docker-compose up -d
```

## Install JS dependencies:
```sh
yarn server install
yarn frontend install
```

## VSCode dependencies:
This'll make your life easier when working with this stack.
Most of these are frontend related, with a bit of help from Prisma package - you'll be a domain modeler superstar! 🚀

_You can click on these links to open them in your VSCode directly and install. Just open this readme.md in VSCode!_

**Required:**

- [Vetur](vscode:extension/octref.vetur)
- [Volar](vscode:extension/Vue.volar)
- [ESLint](vscode:extension/dbaeumer.vscode-eslint)
- [Prettier](vscode:extension/esbenp.prettier-vscode)
- [Prettier ESLint](vscode:extension/rvest.vs-code-prettier-eslint)
- [Stylelint](vscode:extension/stylelint.vscode-stylelint)
- [Prisma](vscode:extension/Prisma.prisma)

Optional:

- [GitLens](vscode:extension/eamodio.gitlens)
- [CSS Variables](vscode:extension/vunguyentuan.vscode-css-variables)

## Run apps:
This'll run the pm2's ecosystem file and everything will be hot-reloaded for ya! Enjoy a realtime updates on both backend and frontend.
```sh
pm2 start
```

## Access frontend:
Now you can find the frontend [on this url: https://licensing.localhost/](https://licensing.localhost/)
You should see NuxtJS / Vuetify _Hello World_ page!

## Docs
Congrats on your setup! Here's a few helpful links to begin:

- Frontend framework: [NuxtJS](https://nuxtjs.org/)
- Frontend CSS Framework: [Vuetify](https://vuetifyjs.com/en/)
- Backend server: [ExpressJS](https://expressjs.com/)
- CSS / SCSS (for custom CSS if needed): [SCSS Lang](https://sass-lang.com/)

> Happy coding!
