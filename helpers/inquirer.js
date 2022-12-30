import inquirer from "inquirer";

const questions = [{
    type: 'list',
    name: 'option',
    message: 'What do you want to do?',
    choices: [
        {
            value: '1',
            name: '1. Create a task'
        },
        {
            value: '2',
            name: '2. List all tasks'
        },
        {
            value: '3',
            name: '3. List the completed tasks'
        },
        {
            value: '4',
            name: '4. List the pending tasks'
        },
        {
            value: '5',
            name: '5. Complete task(s)'
        },
        {
            value: '6',
            name: '6. Delete a task'
        },
        {
            value: '0',
            name: '0. Exit'
        }
    ]
    
}];

//Menu to choose an option from
export const inquirerMenu = async() => {

    console.clear();
    
    console.log('=========================');
    console.log('   Choose an option');
    console.log('=========================\n');


    const { option } = await inquirer.prompt( questions );
    
    
    return option;
}

export const pause = async() => {

    const question = [{
        type: 'input',
        name: 'enter',
        message: 'Press ENTER to continue'
    }];

    console.log('\n');
    const opt = await inquirer.prompt( question );

}

//Awaits for the input value typed by the user
export const readInput = async( message ) => {
    const question = [{
        type: 'input',
        name: 'desc',
        message,
        validate( value ){
            if( value.length === 0 ){
                return 'Please add a value'
            }
            return true;
        }
    }];

    const { desc } = await inquirer.prompt( question );

    return desc;
}

//Shows the list of tasks to allow the user to choose one
export const tasksListToDelete = async( tasks = [] ) => {

    //Giving the form of a choice (for the inquirer) to show it as a menu
    const choices = tasks.map( ( task, id ) => {

        const idx = id + 1;

        return {
            value: task.id,
            name: `${idx} ${task.desc}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0. Cancel'
    });

    const questions = [{
        type: 'list',
        name: 'id',
        message: 'Choose a task to delete',
        choices,
        loop: false
    }];

    const { id } = await inquirer.prompt( questions );

    return id;

}

//Shows a confirmation menu to the user to accept the deletion of a task
export const confirmDelettion = async( message ) => {

    const question = [{
        type: 'confirm',
        name: 'ok',
        message
    }];

    const { ok } = await inquirer.prompt( question );

    return ok;
}

//Show a list with a checkbox to change the state from pending to done and viceversa
export const showTasksCheckList = async( tasks = [] ) => {

    //Giving the form of a choice (for the inquirer) to show it as a menu
    const choices = tasks.map( ( task, id ) => {

        const idx = id + 1;

        return {
            value: task.id,
            name: `${idx} ${task.desc}`,
            checked: task.completedIn ? true : false
        }
    });

    const questions = [{
        type: 'checkbox',
        name: 'ids',
        message: 'Choose a task to complete or to mark as undone',
        choices,
        loop: false
    }];

    const { ids } = await inquirer.prompt( questions );

    return ids;

}