# 🍀 SkillPlane - course management

website url https://fir-react-example-e2b28.web.app/

## Functional

- [✔] Login
- [✔] Register
- [✔] Logout
- [✔] Show all course
- [✔] Get course data by Pagination
- [✔] Filter course by course name and course description
- [✔] Filter course by course duration
- [✔] Clear all filter

## Special functional for admin

- [✔] Create course
- [✔] Delete course

## Non-functional

- [✔] Responsive for web, ipad, and mobile size
- [✔] Loading action less than 3 seconds
- [✔] Notification for all action (created course, deleted course and api error)

## Special techniques for large number of users

- [✔] Scrolling pagination
- [✔] Filter course by search params

## Security

- [✔] Access token for sending api request (exp: 1h)
- [✔] Refresh token for re-generate tokens (exp: 7d)
- [✔] When user logout everyone else can't use refresh token anymore
- [✔] Auth route for client side

<br />
<br />

# 🥦 Backend

server deploy on https://skillplange-server.herokuapp.com/

## API document

| Path                                                                                                             | Method | Access  | Description                                                                                                      | Request Body Data                                                                                                                                                                                           |
| ---------------------------------------------------------------------------------------------------------------- | ------ | ------- | ---------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/register`                                                                                                      | POST   | Public  | Register the user                                                                                                | - username (str) <br/>- password (str) <br/>- confirmPassword (str) <br/>-firstname (str)<br/>- lastname (str)<br/>- nickname (str)<br/>- birthday (str)<br/>- gender (str)                                 |
| `/login`                                                                                                         | POST   | Public  | Log the user in                                                                                                  | username (str) <br/>-password (str)                                                                                                                                                                         |
| `/refreshToken`                                                                                                  | POST   | Public  | Re-generate tokens                                                                                               | - username (str) <br/>- refreshToken (str)                                                                                                                                                                  |
| `/logout`                                                                                                        | DELETE | Private |                                                                                                                  |                                                                                                                                                                                                             |
| `/course?take={takeParam}&skip={skipParam}&keyword={keywordParam}&minDuration={minParam}&maxDuration={maxParam}` | GET    | Private | Get course by using pagination technique and filter course by using keyword, minDuration, and maxDuration params |                                                                                                                                                                                                             |
| `/course`                                                                                                        | POST   | Private | Create course                                                                                                    | Using form-data <br /> - image <br/>- name <br/>- description <br/>- category <br/>- subject <br/>- startTime (MM-DD-YYYY) <br/>- endTime (MM-DD-YYYY) <br/>- numberOfStudent <br/>- duration (second unit) |
| `/course/:id`                                                                                                    | DELETE | Private |                                                                                                                  |
<br/>
<br/>

# 🌱 Project Overview Structure
```
root
├───client
│   ├───public
│   └───src
│       ├───api
│       ├───app
│       ├───common
│       │   ├───field
│       │   └───notification
│       ├───components
│       │   ├───course
│       │   ├───empty
│       │   └───navbar
│       ├───constants
│       ├───interfaces
│       ├───pages
│       │   ├───home
│       │   ├───login
│       │   └───register
│       └───slices
└───server
    ├───config
    └───src
        ├───controller
        ├───dto
        ├───entity
        ├───firebase
        ├───interfaces
        ├───middleware
        └───service
package.json
README.md
```
<br/>

# 🍃 Installations
## install client package
```
cd client
npm install
```
## install server package
```
cd server
npm install
```

note : after that don't forget to create env file for client and server <br/>

## run application
```
in root directory

npm run dev

application will run concurrently for client and server side
```

<br/>
<br/>

# 🍏 Frameworks, library, and tools
## Frontend - react, redux-toolkit, ant-design
## Backend - express.js, jwt, firebase-admin, typeorm, postgresql
