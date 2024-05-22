<div align="center">

# LingBlog


<img src="./public/img/logo.png" style="width:25%;">

This is a CMS powered by nuxt.js.

 Here is the demo --> [blog.brl0.top](https://blog.brl0.top)

![](https://img.shields.io/badge/NuxtJs-3.9.3-informational?style=flat&logo=nuxtdotjs&logoColor=2bbc8a&color=2bbc8a)
![](https://img.shields.io/badge/Vue-3.4.14-informational?style=flat&logo=vuedotjs&logoColor=2bbc8a&color=2bbc8a)
![](https://img.shields.io/badge/Typescript--informational?style=white&logo=Typescript&logoColor=white&color=white)
![](https://img.shields.io/badge/Typescript-5.9.1-informational?style=white&logo=Prisma&logoColor=#2D3748&color=blue)
![](https://img.shields.io/badge/Yarn-1.22.22-informational?style=white&logo=Yarn&logoColor=white&color=blue)

<br>

<div align="left">

# Quick Start  


## Docker compose up

Please make sure that the latest docker is installed in your machine.

The default port is ```80```,you can change it in ```docker-compose.yml```.

```bash
git clone https://github.com/LingBrian/LingBlog.git
cd LingBlog
docker compose up # -d
```

# Development

## YARN (recommend)/NPM 

If you want to run the dev envriontment , please chage the ```.env``` file to connect to your database.The url format is in [```here```](https://www.prisma.io/docs/orm/reference/connection-urls).The default database is ```Postgrsql```.

```bash
yarn # npm install --isntall the rquired packages
yarn dev #npm run dev --run in localhost
yarn up #npm run up --docker push up
yarn down # npm run down --clear the docker container
```

# Contact

  brianling@qq.com
</div>

</div>
