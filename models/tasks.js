import Task from "./task.js";

class Tasks {

    _list = {};

    //Getter to transform the list to an array of objects
    get listToArray() {
        const list = [];

        Object.keys(this._list).forEach( key => {
            const task = this._list[key];
            list.push(task);
        });

        return list;
    }

    constructor() {
        this._list = {};
    }

    //Load the tasks from the file 
    loadTasksFromDB( tasks = [] ) {
        tasks.forEach( task => {
            this._list[task.id] = task;
        });

    }

    //Lists all the tasks in the file
    listAllTasks() {

        const list = this.listToArray;

        console.log();
        list.forEach( (task, idx) => {
            console.log(`${idx + 1}. ${task.desc} :: ${task.completedIn === null ? 'Pending' : 'Done'} `);
        });
    }

    listsTasksByCompletedField( completedTasks = true ) {

        this.listToArray.forEach( (task, idx) => {
            
            const { desc, completedIn } = task;
            const state = completedIn ? 'Done' : 'Pending';
            
            if( completedTasks ){
                if( completedIn ){
                    console.log(`${idx + 1}. ${desc} :: ${state} in ${completedIn}`);
                }
            }else{
                if( !completedIn ){
                    console.log(`${idx + 1}. ${desc} :: ${state} `);
                }
            }
        });

    }

    //Creates a new task and adds it to the list
    createTask( desc ) {
        const task = new Task( desc );
        this._list[task.id] = task
    }

    //Deletes a task by the id
    deleteTasksById( id = '' ) {
        if( this._list[id] ){
            delete this._list[id];
        }
    }

    //Change the state of the task (from undone to completed or viceversa)
    toggleTasksState( ids = [] ) {

        ids.forEach( id => {
            const task = this._list[id];
            if( !task.completedIn ){
                task.completedIn = new Date().toISOString();

            }
        });

        this.listToArray.forEach( task => {
            if( !ids.includes( task.id) ){
                this._list[task.id].completedIn = null;
            }
        });
    }

}

export default Tasks;