# TowHub

## ℹ️ General Info

This is the repository responsible for TowHub apps.

## 🏭 Applications

- [Backend](./backend) — TowHub application backend.

  _To work properly, fill in the **`.env`** file. Use the **`.env.example`** file as an example._

- [Frontend](./frontend) — TowHub application frontend.

  _To work properly, fill in the **`.env`** file. Use the **`.env.example`** file as an example._

- [Shared](./shared) — TowHub application common modules for reuse.

## 🖍 Requirements

- [NodeJS](https://nodejs.org/en/) (18.x.x);
- [NPM](https://www.npmjs.com/) (9.x.x);
- [PostgreSQL](https://www.postgresql.org/) (15.4)
- run **`npx simple-git-hooks`** at the root of the project, before the start (it will set the [pre-commit hook](https://www.npmjs.com/package/simple-git-hooks) for any commits).

## 🏃‍♂️ Simple Start

1. **`npm run install:all`** at the root
2. Fill ENVs
3. **`npx simple-git-hooks`** at the root
4. **`cd backend && npm run migrate:dev`**
5. **`cd frontend && npm run start:dev`** then **`cd backend && npm run start:dev`**
6. Enjoy <3

## 🏗 Architecture

### 🛖 Application Schema

TBA

### 💽 DB Schema

![db schema](https://github-production-user-asset-6210df.s3.amazonaws.com/19575839/261530664-6140d0e8-abf8-4fb8-80c9-ff9eb7adfcb6.png)

```mermaid

erDiagram

    users {
        id serial PK "not null"
        phone varchar "not null, unique"
        email varchar "not null, unique"
        first_name varchar "not null"
        last_name varchar "not null"
        password_hash varchar "not null"
        password_salt varchar "not null"
        group_id integer FK "not null"
        created_at timestamp "not null"
        updated_at timestamp "not null"
    }
    groups {
        id serial PK "not null"
        name varchar "not null"
        key varchar "not null"
        created_at timestamp "not null"
        updated_at timestamp "not null"
    }
    driver_details {
        id serial PK "not null"
        driverLicenseNumber varchar "not null, unique"
        user_id integer FK "not null"
        business_id integer FK "not null"
        created_at timestamp "not null"
        updated_at timestamp "not null"
    }
    users_trucks {
        user_id integer FK "not null"
        truck_id integer FK "not null"
    }
    trucks {
        id serial PK "not null"
        manufacturer varchar "not null"
        capacity integer "not null"
        price_per_km real "not null"
        license_plate_number varchar "not null"
        year integer "not null"
        tow_type varchar "not null"
        created_at timestamp "not null"
        updated_at timestamp "not null"
        business_id integer FK "not null"
    }
    business_details {
        id serial PK "not null"
        company_name varchar "not null, unique"
        tax_number varchar "not null, unique"
        owner_id integer FK "not null"
        created_at timestamp "not null"
        updated_at timestamp "not null"
    }
    orders {
        id serial PK "not null"
        price integer "not null"
        scheduled_time timestamp "not null"
        start_point varchar "not null"
        end_point varchar "not null"
        status enum "not null"
        user_id integer FK "nullable"
        business_id integer FK "nullable"
        shift_id integer FK "nullable"
        customer_name varchar "nullable"
        customer_phone varchar "nullable"
        cars_qty integer "not null"
        created_at timestamp "not null"
        updated_at timestamp "not null"
    }
    files {
      id serial PK "not null"
      key varchar "not null, unique"
      name varchar "not null"
      content_type varchar "not null"
      created_at timestamp "not null"
      updated_at timestamp "not null"
    }
    shifts {
        id serial PK "not null"
        start_date timestamp "not null"
        end_date timestamp "nullable"
        driver_id integer FK "not null"
        truck_id integer FK "not null"
        created_at timestamp "not null"
        updated_at timestamp "not null"
        deleted_at timestamp "nullable"
    }
    users_trucks one or many -- one trucks: "users_trucks(truck_id) belongs to trucks(id)"
    users_trucks one or many -- one users: "users_trucks(user_id) belongs to users(id)"
    users one or many -- one groups: "users(group_id) belongs to groups(id)"
    business_details zero or one -- one users: "business_details(owner_id) belongs to users(id)"
    driver_details zero or one -- one users: "driver_details(user_id) belongs to users(id)"
    driver_details one or many -- one business_details: "driver_details(business_id) belongs to business_details(id)"
    users one -- zero or many orders: "users(id) has orders(user_id)"
    users one -- zero or many orders: "users(id) has orders(user_id)"
    business_details one -- zero or many orders: "business_details(id) has orders(business_id)"
    shifts one -- zero or many orders: "shifts(id) has orders(shift_id)"
    users zero or one -- one or many shifts: "users(id) has shifts(driver_id)"
    trucks one -- zero or many shifts: "shifts(truck_id) has trucks(id)"
```

### 🌑 Backend

- [Fastify](https://www.fastify.io/) — a backend framework.
- [Drizzle ORM](https://orm.drizzle.team/) — a query builder and ORM

### 🌕 Frontend

- [React](https://reactjs.org/) — a frontend library.
- [Redux](https://redux.js.org/) + [Redux Toolkit](https://redux-toolkit.js.org/) — a state manager.

### 🥊 Code quality

- [simple-git-hooks](https://www.npmjs.com/package/simple-git-hooks) — a tool that lets you easily manage git hooks.
- [lint-staged](https://www.npmjs.com/package/lint-staged) — run linters on git staged files.
- [dangerjs](https://danger.systems/js/) — automate common code review chores.
- [commitlint](https://commitlint.js.org/) — helps your team adhere to a commit convention.
- [editorconfig](https://editorconfig.org/) — helps maintain consistent coding styles for multiple developers working on the same project across various editors and IDEs.
- [prettier](https://prettier.io/) — an opinionated code formatter.
- [ls-lint](https://ls-lint.org/) — file and directory name linter.
- [eslint](https://eslint.org/) — find problems in your JS code.
- [stylelint](https://stylelint.io/) — find and fix problems in your CSS code.

## 🧑‍💻 CI

### 🗞 Git

#### 🏅 Pull Request flow

```
<project-prefix>-<issue-number>: <ticket-title>
```

##### Example

- `th-5: Add Clinician Dashboard`

#### 🌳 Branch flow

```
<type>/<project-prefix>-<issue-number>-<short-desc>
```

##### Types

- task
- fix

##### Examples

- `task/th-5-add-clinician-dashboard`
- `task/th-12-add-clinician-flow`
- `fix/th-16-fix-clinician-flow`

#### 🗂 Commit flow

```
<project-prefix>-<issue-number>: <modifier> <description>
```

##### Modifiers

- `+` (add)
- `*` (edit)
- `-` (remove)

##### Examples

- `th-5: + title for dashboard`
- `th-12: * dashboard title`
- `th-16: - dashboard title`

## 📦 CD

[Handled](.github/workflows/cd.yml) by [GitHub Actions](https://docs.github.com/en/actions).
