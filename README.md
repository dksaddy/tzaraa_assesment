# 🚀 Laravel Learning Journey

---

## 📊 Progress Status
**Rating:** ⭐ 4/5 ➡️ 5/5

---

## 🗺️ Directory & Core Concepts

### 📍 `routes/` (Route Files Return the View)
* **VIEW**
  * Different routes from same parent. `[use of prefix]`
  * `<< prefix --> group --> function --> route function >>`
  * Adding a human readable route name: `function->name("Whatever you want")`
  * `<< parameterized route >>`
  * Fallback Route: when destined URL not found we use this
  * `<< /up route to check application is running or not >>`
  * Passing Data from Route ➡️ View:
    * `|| ->with('var name', $var)->with('email', $email) ||`
    * `|| view ('route', compact('name', 'email')) ||`
    * **LECTURE 9:** `|| view ('route', ['name' => $name, 'email' => $email]) ||`
  * `<< loop and control statement inside blade template >>`
  * Sub View in blade using: `@include('directory.blade_file_name')`
  * Passing Value Parent ➡️ Child: `@include( same, ['name' => $var])`

### 🎮 `CONTROLLER`
* Grouping the methods which are from same controller:
  ```php
  Route::controller(StudentController::class)->group(function() {
      // routes.........
  });
  ```
* Private function, constructor
* 2 types of controller:
  * ➡️ Invokable
  * ➡️ Resource

### 📁 Directory Mapping
* `dir: resources`
  * ➡️ CSS
  * ➡️ JS
  * ➡️ View (HTML)
    * ➡️ blade Template
      * ➡️ Route View
      * ➡️ Direct View
* `dir: app` ➡️ `Http` ➡️ `Controllers` ➡️

---

## 💻 Technical Command Reference

### 🔥 General Commands
```bash
php artisan serve          # run the server
php artisan route:list     # show all the route
php artisan make:view name # To create view file
php artisan view:cache     # to cache a blade file
php artisan view:clear     # to clear cache
```

### 🎮 Controller Commands
```bash
php artisan make:controller controller_of_name
php artisan make:controller controller_of_name --invokable
php artisan make:controller controller_of_name --resource
```

### 🗄️ Migration Commands
```bash
php artisan migrate                                # run migrations
php artisan make:migration StudentTable             # create basic migration
php artisan make:migration create_students_table   # it generates schema
php artisan make:migration addDateOfBirth --table=students # add col to existing table
```

### 🔙 Rollback Commands
```bash
php artisan migrate:rollback          # rollback last batch
php artisan migrate:rollback --step=2 # rollback specific steps (e.g., 1/2/3)
php artisan migrate                   # migrate [like it was before]
php artisan migrate:reset             # rollback all migrations
```

### 📦 Model Commands
```bash
php artisan make:model Student
php artisan make:model Teachers -mc   # [model, migration:m, controller:c]
```

### 🌱 Factories for Database Seeding
```bash
php artisan make:factory StudentsFactory --model=Students
```
* Define in factory ➡️ in Model `|-> use 'HasFactory'` ➡️ `database/seeders`
* **Seeding Commands:**
  ```bash
  php artisan db:seed
  php artisan db:seed --class=CountriesSeeder # [without using factory and model]
  ```

---

## 🔍 Executing SQL Query [26]
* **Raw SQL**
* **Query Builder** `|-> DB::`
* **Eloquent ORM** `|-> Model instance`
* *Note:* When fetching data if I want to hide a col from select: go to model and make the instance protected with `$hidden` var.
* With Eloquent I can use nested `where`

---

## 📝 Assignments & Watching Tutorial again
* **Assignment:** 40-48 with validation
* **Clean Validation:** `php artisan make:request StudentAddRequest`
* **Relationships:**
  * `-belongs to` ➡️ child to parent.
  * `-has` ➡️ parent to child.
  * `--pivot(junction) table:` hold the info of two separate table. like `classes:subject` -> `class:subject`.
* Make nice readme for github

---

## ⚠️ Problems I am facing
* [ ] `name` method confusion
* [ ] I might need to watch the layout again `[Lecture 12]`
* [ ] Reference link: [country list gist](https://github.com)
