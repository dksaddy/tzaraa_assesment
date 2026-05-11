|What I have learned|
-----4/5----------5/5---------------------------

dir: routes -> route files: routes return the view.
	
VIEW [
	Different routes from same parent. [use of prefix]
	<< prefix --> group --> function --> route function  >>
	<  adding a human readable route name: function->name("Whatever you want")  >
	<< parameterized route >>
	<  Fallback Route: when destined URL not found we use this  >
	<< /up route to check application is running or not  >>
	<  Passing Data from Route --> View ||->with('var name', $var)->with('email', $email)	   ||
					    || view ('route', compact('name', 'email'))		   ||
			LECTURE:9	    || view ('route', ['name' => $name, 'email' => $email])||

	<< loop and control statement inside blade template	>>
	<  Sub View in blade using: 	   @include('directory.blade_file_name')
	   Passing Value Parent --> Child: @include( same, ['name' => $var])	>
]

CONTROLLER [
	<< grouping the methods which are from same controller
	|| Route::controller(StudentController::class)->group(function {
		routes.........
		});					||	>>
	<  private function, constructor >
	<< 2 types of controller |-> Invokable
				 |-> Resource
]
	

dir: resources -> |-> CSS
		  |-> JS
		  |-> View (HTML) |-> blade Template.|-> Route View
						     |-> Direct View
dir: app -> Http -> Controllers |->


Some Command:
php artisan serve [run the server]
2. php artisan route:list [show all the route]
3. php artisan make:view name_of_view [To create view file]
4. php artisan view:cache [to cache a blade file]
5. php artisan view:clear [to clear cache]

CONTROLLER:
php artisan make:controller controller_of_name
php artisan make:controller controller_of_name --invokable
php artisan make:controller controller_of_name --resource

MIGRATION:
php artisan migrate
php artisan make:migration StudentTable
php artisan make:migration create_students_table [it generates schema]
php artisan make:migration addDateOfBirth --table=students [add col to existing table]

Rollback
5. php artisan migrate:rollback
6. php artisan migrate:rollback --step=2/1/3
7. php artisan migrate [like it was before]
8. php artisan migrate:reset

MODEL
make:model Student
make:model Teachers -mc [model, migration:m, controller:c]


Factories for Database Seeding
make:factory StudentsFactory --model=Students
define in factory -> in Model |-> use 'HasFactory' ---> database/seeders
Seeding Command: php artisan db:seed
4.   		    php artisan db:seed --class=CountriesSeeder [without using factory and model]

Executing SQL Query:[26]
Raw SQL
Query Builder |->DB::
Eloquent ORM  |-> Model instance
// When fetching data if I want to hide a col from select: go to model and     make the instance protected with $hidden var.

// With Eloquent I can use nested where

// Assignment: 40-48 with validation

Clean Validation
make:request StudentAddRequest

Problem I am facing
name method confusionM
I might need to watch the layout again [Lecture 12]
gist.github.com/keeguon/2310008 [country list]


Watching Tutorial again:
 -belongs to --> child to parent.
 -has --> parent to child.
  --pivot(junction) table: hold the info of two separate table. like classes:subject-class:subject.
  
