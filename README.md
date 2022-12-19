
|      URL       |	HTTP Verb |	 Action |	            Used For           |	Mongoose Model Function |
|----------------|------------|---------|--------------------------------|--------------------------|
|   /api/todos/  |     GET    |	  index |	Displaying a list of all todos |	.find                   |
|   /api/todos/  |    POST  	|  create |	Create a new todo              |	.create                 |
| /api/todos/:id |	   GET    |	 show   |	Display a specific todo        |	.findById               |
| /api/todos/:id |	   PUT    |	 update |	Update a specific todo         |	.findByIdAndUpdate      |
| /api/todos/:id |	 DELETE   |	destroy	| Delete a specific todo         |	.findByIdAndDelete      |