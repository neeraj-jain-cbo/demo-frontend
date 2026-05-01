## Task Frontend (TypeScript + Node.js MVC)

### Setup
```bash
npm install
```

### Run in development mode: Runs TypeScript directly, No build required
```bash
npm run dev
```

### Build, test then run
```bash
npm run build
npm test
npm start
```

### Invokes the following endpoints hosted by a backend API (e.g. http://localhost:8080/api/tasks):
* Method	Endpoint										Description
* GET		/api/tasks?page=0&size=10&sort=dueDate,asc		Get all tasks
* GET		/api/tasks/{id}									Get task by ID
* POST	    /api/tasks										Create task
* PATCH	    /api/tasks/{id}/status?status=TODO				Update task status
* DELETE	/api/tasks/{id}									Delete task