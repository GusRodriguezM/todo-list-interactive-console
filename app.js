
import { confirmDelettion, inquirerMenu, pause, readInput, showTasksCheckList, tasksListToDelete } from "./helpers/inquirer.js";
import { readFromDB, saveToDB } from "./helpers/saveFile.js";
import Tasks from "./models/tasks.js";

const main = async() => {

    let opt = '';
    const tasks = new Tasks();

    const tasksFromDB = readFromDB();

    if( tasksFromDB ){
        tasks.loadTasksFromDB( tasksFromDB );
    }

    do {
        
        //Prints the menu
        opt = await inquirerMenu();

        switch (opt) {
            //Option 1: Create a task
            case '1':
                const desc = await readInput('Task: ');
                tasks.createTask( desc );
                break;
        
            //Option 2: List all the tasks
            case '2':
                tasks.listAllTasks();
                break;

            //Option 3: List all the completed tasks
            case '3':
                tasks.listsTasksByCompletedField();
                break;
            
            //Option 4: List all the pending tasks
            case '4':
                tasks.listsTasksByCompletedField( false );
                break;

            //Option 5: Check or uncheck the tasks to mark them as pendind or done
            case '5':
                const ids = await showTasksCheckList( tasks.listToArray );
                tasks.toggleTasksState( ids );
                break;

            //Option 6: Delete a task
            case '6':
                const id = await tasksListToDelete( tasks.listToArray );
                if( id !== '0'){
                    const acceptDeletion = await confirmDelettion( 'Are you sure to delete the selected task?' );
                        
                    if( acceptDeletion ){
                        tasks.deleteTasksById( id );
                        console.log('Task deleted!');
                    }
                }
                break;
        }

        //Saving the list of tasks in a file
        saveToDB( tasks.listToArray );

        await pause();

    } while (opt !== '0');

}

main();