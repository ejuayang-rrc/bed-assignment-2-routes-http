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
    > npm install -D @redocly/cli
    > ```
    >
    > Optionally you can also install Jest if you'd like to run the jest tests using `npm run test`.
    >
    > ```console
    > npm install jest ts-jest @types/jest supertest @types/supertest --save-dev
    > ```

4. An .env file is required to link the Employee and Branch Management System to firestore.
   Contents should look like this:

    > ```dockerfile
    > NODE_ENV=development
    > PORT=3000
    > FIREBASE_PROJECT_ID=bed-demo-g3a74
    > FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nSOME_KEY\n-----END PRIVATE KEY-----\n"
    > FIREBASE_CLIENT_EMAIL=firebase-adminsdk-k9r4p@cloud-project-b7c31.iam.gserviceaccount.com
    > SWAGGER_SERVER_URL=http://localhost:3000/api/v1
    > ```

5. Once set up, to run the system you can do `npm run start` which will host the project in localhost on port 3000.

### API Request Examples

Retrieve collection of all employees:

```console
curl --location 'http://localhost:3000/api/v1/employees/'
```

Retrieve a collection of employees in a specific branch:

```console
curl --location 'http://localhost:3000/api/v1/employees?branchId=3'
```

Retrieve a branch by ID:

```console
curl --location 'http://localhost:3000/api/v1/branch/3'
```

Create a new entry under the Employees collection:

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

Modify an entry in the Branches collection:

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
