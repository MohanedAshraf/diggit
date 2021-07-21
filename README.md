<h1 align="center"> Diggit</h1>
<div align="center">
<img src="https://raw.githubusercontent.com/MohanedAshraf/diggit/eed2368ac7bae7612a455dfb7f4ca216847f9f1a/client/public/images/Diggit.svg" width='250' height='300' align="center"/>
</div>

<p align='center'> <b>Diggit is a simple social media app inspired by reddit , actually it is a reddit clone. </b> </p>
<p align='center' disp> A next level reddit clone because it's built with Nextjs :laughing: </p>

![Heroku](https://heroku-badge.herokuapp.com/?app=diggitbetterthanreddit&root=api) ![Vercel](https://vercelbadge.vercel.app/api/mohanedashraf/diggit)

## Table of contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Run Locally](#run-locally)
- [Deployment](#deployment)
- [BackLog](#backlog)

## Features

This web app consists of a basic features/functionalities of reddit

- Login and Registration
- Search for Subs feature
- Create Sub
- Add Posts to Sub
- Comment feature
- Upload sub's picture and cover to Sub
- Upvote/Downvote feature for Posts and Comments

## Technologies

| Front End   | Back End   |
| ----------- | ---------- |
| Nextjs      | Node       |
| TypeScript  | TypeORM    |
| ContextApi  | postgres   |
| SWR         | TypeScript |
| PostCSS     | Express JS |
| TailwindCSS | JWT        |
| Axios       | Cloudinary |

## Installation

1- Clone the repo

```
$ git clone https://github.com/MohanedAshraf/diggit.git
```

2- Install server dependencies

```
$ npm install
```

3- Install client dependencies

```
$ cd client
$ npm install
```

## Run Locally

Before running the project, make sure to have the following done:

- Download and install [PostgresSQL](https://www.postgresql.org/)
- Create [Cloudinary Account](https://cloudinary.com/) for images upload

* **For Server**
  Create `.env` at the global path and set variables as [env.example](https://github.com/MohanedAshraf/diggit/blob/main/.env.example)

```
PORT=<port eg: 5000>
NODE_ENV=development
APP_URL=<your server url, default: http://localhost:5000>
ORIGIN=<your client url, default: http://localhost:3000>

JWT_SECRET=<any secret key>

DATABASE_URL=postgres://<databse username>:<databse username>@localhost:5432/<database name>
DB_DIALECT=postgres
DB_PORT=5432
DB_HOST=localhost
DB_USERNAME=<databse username>
DB_PASSWORD=<databse username>
DB_DATABASE=<your database name>



CLOUD_NAME=<cloud name>
CLOUDINARY_API_KEY=<cloud key>
CLOUDINARY_API_SECERT=<cloud secret key>

```

- **For Client**
  Create `.env.local` at `/client/` and set variables as [env.example](https://github.com/MohanedAshraf/diggit/blob/main/client/.env.example)

```
NEXT_PUBLIC_SERVER_BASE_URL=<your server url, default: http://localhost:5000>
NEXT_PUBLIC_CLIENT_BASE_URL=<your server url, default: http://localhost:3000>
APP_DOMAIN=localhost
```

After doing the steps above, finally you can now run both ends simultaneously by running:

```
$ npm start dev
```

Or you can run them individually

```
$ npm run client // frontend
$ npm run server // backend

// Or you can change to individual directory then run
$ cd frontend // or cd server
$ npm start
```

## Deployment

You can deploy your react app in [Vercel](http://vercel.app/) or whatever your preferred deployment platform.
And for the backend, you can deploy your server in [Heroku](https://heroku.com)

## BackLog

- [ ] Dark mode feature.
- [ ] Make subs and posts pages responsive.
- [ ] Create modals to tell users to login and signup.
- [ ] Create editable user profile.
- [ ] Add replay feature.
- [ ] Make users post images and videos (youtube).
- [ ] Make users update and delete posts.
- [ ] Make users update and delete comments.
