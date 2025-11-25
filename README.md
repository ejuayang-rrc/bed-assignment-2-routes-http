# Project Overview

This API is used to manage Employee directory and Branch locations for PiXELL-River Financial's database.

## Installation Instructions

This project requires Typescript, Node dependencies, and an available Firebase project.

1. Start by cloning the repository into the directory.

    > `git clone https://github.com/ejuayang-rrc/bed-assignment-2-routes-http.git`

2. If you haven't already, install Typescript and Node to run the code.

    > ```console
    > npm init -y
    > npm install typescript ts-node @types/node --save-dev
    > ```

3. You'll have to install the dependencies using Node.js' NPM.

    > ```console
    > npm install express @types/express morgan
    > npm install joi
    > npm install swagger-ui-express swagger-jsdoc
    > ```
    >
    > Optionally you can also install Jest if you'd like to run the jest tests using `npm run test`.
    >
    > ```console
    > npm install jest ts-jest @types/jest supertest @types/supertest --save-dev
    > ```

4. Once set up, to run the system you can do `npm run start` which will host the project in localhost on port 3000.

### API Request Examples

```console
curl --location 'http://localhost:3000/api/v1/employees/'
```

```console
curl --location 'http://localhost:3000/api/v1/employees?branchId=3'
```

```console
curl --location 'http://localhost:3000/api/v1/branch/3'
```

```console
curl --location 'http://localhost:3000/api/v1/employees/' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "First Last", 
    "position": "Position", 
    "department": "Department", 
    "email": "email@onlinemail.com", 
    "phone": "(123) 456-7890",
    "branchId": 3
}
```

```console
curl --location --request PUT 'http://localhost:3000/api/v1/branch/3' \
--header 'Content-Type: application/json' \
--data '{
    "address": "123 Birthday Street",
    "phone": "(098) 765-4321"
}'
```

### Documentation Access

You can access documentation for this API online through this link [Documentation](https://ejuayang-rrc.github.io/bed-assignment-2-routes-http/)
or the local index.html file under the docs directory (`../docs/index.html`).
